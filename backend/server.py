from flask import Flask, Response, request, jsonify, send_file
from flask_cors import CORS
import cv2
from cvzone.HandTrackingModule import HandDetector
from cvzone.ClassificationModule import Classifier
import numpy as np
import math
from gtts import gTTS
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Load the correct model version
model_path = r"../model/keras_model.h5"
labels_path = r"../model/labels.txt"

classifier = Classifier(model_path, labels_path)

labels = ["busy", "cat", "dog", "drink", "eat", "fine", "goto", "hello", "help", "hurt",
          "iloveyou", "like", "more", "no", "play", "please", "restroom", "same", "thankyou",
          "what", "yes"]

# Language translations for signs
translations = {
    "english": labels,
    "hindi": ["व्यस्त", "बिल्ली", "कुत्ता", "पेय", "खाना", "ठीक", "जाओ", "नमस्ते", "मदद", "चोट",
              "आई लव यू", "पसंद", "अधिक", "नहीं", "खेलो", "कृपया", "बाथरूम", "एक जैसा", "धन्यवाद", 
              "क्या", "हाँ"],
    "telugu": ["బిజీ", "పిల్లి", "కుక్క", "పానీయం", "తినడం", "బాగుంది", "పోయి", "హలో", "సహాయం", "గాయము",
               "ప్రేమ", "నచ్చిన", "మరిన్ని", "లేదు", "ఆడటం", "దయచేసి", "బాత్రూమ్", "అదే", "ధన్యవాదాలు",
               "ఏంటి", "అవును"]
}

cap = None
detector = HandDetector(maxHands=1)
offset = 20
imgSize = 300
is_running = False
detected_label = "No sign detected"  # Initialize with a default label
current_language = "english"  # Default language

# Path to save the audio
audio_folder_path = r"../audio"

# Ensure the audio folder exists
if not os.path.exists(audio_folder_path):
    os.makedirs(audio_folder_path)

def generate_audio(text, lang):
    # Map the language to gTTS codes
    lang_mapping = {
        "english": "en",
        "hindi": "hi",
        "telugu": "te"
    }

    try:
        # Generate speech and save it as an audio file in the specified folder
        tts = gTTS(text=text, lang=lang_mapping.get(lang, "en"))  # Default to "en" if not found
        audio_file_name = text.replace(" ", "_") + ".mp3"  # Save the audio with the sign name
        audio_path = os.path.join(audio_folder_path, audio_file_name)
        tts.save(audio_path)
        return audio_path
    except Exception as e:
        print(f"Error generating audio: {e}")
        return None

def generate_frames():
    global cap, is_running, detected_label
    while is_running:
        if cap is None or not cap.isOpened():
            print("Error: Camera not opened.")
            break

        success, img = cap.read()
        if not success:
            print("Error: Failed to read frame from camera.")
            break

        imgOutput = img.copy()
        hands, img = detector.findHands(img)

        detected_label = "No sign detected"  # Default value if no hand is detected

        if hands:
            hand = hands[0]
            x, y, w, h = hand['bbox']

            y1, y2 = max(0, y - offset), min(img.shape[0], y + h + offset)
            x1, x2 = max(0, x - offset), min(img.shape[1], x + w + offset)

            imgWhite = np.ones((imgSize, imgSize, 3), np.uint8) * 255
            imgCrop = img[y1:y2, x1:x2]

            if imgCrop.shape[0] > 0 and imgCrop.shape[1] > 0:
                aspectRatio = h / w

                if aspectRatio > 1:
                    k = imgSize / h
                    wCal = math.ceil(k * w)
                    imgResize = cv2.resize(imgCrop, (wCal, imgSize))
                    wGap = math.ceil((imgSize - wCal) / 2)
                    imgWhite[:, wGap:wGap + wCal] = imgResize

                else:
                    k = imgSize / w
                    hCal = math.ceil(k * h)
                    imgResize = cv2.resize(imgCrop, (imgSize, hCal))
                    hGap = math.ceil((imgSize - hCal) / 2)
                    imgWhite[hGap:hGap + hCal, :] = imgResize

                prediction, index = classifier.getPrediction(imgWhite, draw=False)
                detected_label_english = labels[index]
                detected_label_translated = translations[current_language][index]

                # Display English label in the camera feed
                cv2.putText(imgOutput, detected_label_english, (x, y - 30),
                            cv2.FONT_HERSHEY_COMPLEX, 1, (0, 255, 0), 2)
                cv2.rectangle(imgOutput, (x - offset, y - offset),
                              (x + w + offset, y + h + offset), (0, 255, 0), 2)

                # Set the translated label
                detected_label = detected_label_translated

                # Generate audio based on the detected sign
                audio_path = generate_audio(detected_label_translated, current_language)

                # Set the audio path for the frontend to use
                global audio_file_path
                audio_file_path = audio_path

        ret, buffer = cv2.imencode('.jpg', imgOutput)
        frame = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/start', methods=['GET'])
def start_camera():
    global cap, is_running, current_language
    current_language = request.args.get('language', 'english')
    if not is_running:
        cap = cv2.VideoCapture(0)
        is_running = True
    return "Camera started"

@app.route('/stop', methods=['GET'])
def stop_camera():
    global cap, is_running
    if is_running:
        cap.release()  # Release the camera capture
        is_running = False
    return jsonify({"status": "Camera stopped"})

@app.route('/exit', methods=['GET'])
def exit_app():
    global cap, is_running
    if cap:
        cap.release()  # Release the camera capture
    is_running = False
    return jsonify({"status": "Application closed"})

@app.route('/get_label', methods=['GET'])
def get_label():
    global detected_label
    return jsonify({"detected_label": detected_label})

@app.route('/get_audio', methods=['GET'])
def get_audio():
    global audio_file_path
    if audio_file_path and os.path.exists(audio_file_path):
        return send_file(audio_file_path, mimetype='audio/mpeg')
    else:
        return jsonify({"error": "No audio file found"}), 404

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(debug=True)

##############################################################################################################

