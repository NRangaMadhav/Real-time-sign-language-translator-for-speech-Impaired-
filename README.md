# Real-Time Sign Language Translator for Speech-Impaired

📄 **[View IEEE Publication](https://ieeexplore.ieee.org/document/11158535)**

## Overview
Sign language is a crucial means of communication for hearing and speech-impaired individuals. However, the lack of widespread sign language knowledge often creates a communication gap with the general public. 

This project is a **vision-based, real-time sign language recognition system** that bridges this gap. By utilizing computer vision and deep learning (Convolutional Neural Networks), the system captures hand gestures via a standard webcam, classifies them, and instantly translates them into both **text and speech**. Unlike expensive sensor-based gloves, this approach is highly accessible, cost-effective, and designed to promote inclusivity in schools, workplaces, and public areas.

## Key Features
* **Real-Time Processing:** Dynamically captures and processes hand movements with near-instantaneous feedback.
* **High Accuracy:** Utilizes a pre-trained CNN model (`keras_model.h5`) alongside HSV-based background subtraction for precise spatial feature extraction and robust gesture classification under varying lighting conditions.
* **Multilingual Translation:** Translates recognized gestures into text and speech in **English, Hindi, and Telugu**.
* **Dual Output Modes:** Provides on-screen text display and synthesized audio feedback via the Google Text-to-Speech (gTTS) API.
* **Hardware Independent:** Requires only a standard webcam—no proprietary sensors or wearable gloves needed.

## Tech Stack
* **Frontend:** React.js, HTML/CSS
* **Backend:** Python, Flask, Flask-CORS
* **Machine Learning & Vision:** TensorFlow, Keras, OpenCV, CVZone, MediaPipe
* **Audio Synthesis:** gTTS (Google Text-to-Speech)

## Project Structure
```text
Real-time-sign-language-translator-for-speech-Impaired/
│
├── backend/
│   └── server.py             # Flask API handling camera feed and ML inference
│
├── frontend/
│   ├── package.json
│   └── src/                  # React application for the user interface
│
├── model/
│   ├── keras_model.h5        # Trained CNN gesture recognition model
│   └── labels.txt            # Text mapping for gesture classes
│
└── requirements.txt          # Python dependencies


Supported Gestures
The model is currently trained to recognize the following 21 gestures:
Busy, Cat, Dog, Drink, Eat, Fine, Go to, Hello, Help, Hurt, I love you, Like, More, No, Play, Please, Restroom, Same, Thank you, What, Yes.

Prerequisites
Before running the application, ensure your system has the following installed:

Python 3.8+

Node.js & npm

A working webcam

Installation & Setup
1. Clone the Repository
Bash
git clone [https://github.com/yourusername/Real-time-sign-language-translator-for-speech-Impaired.git](https://github.com/yourusername/Real-time-sign-language-translator-for-speech-Impaired.git)
cd Real-time-sign-language-translator-for-speech-Impaired
(Note: Ensure that your keras_model.h5 and labels.txt files are placed inside a model folder at the root of the project, as the backend code expects to find them there).

2. Backend Setup (Python)
It is highly recommended to use a virtual environment to manage dependencies.

Bash
# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install the required libraries (Make sure tensorflow and mediapipe are included)
pip install flask flask-cors opencv-python cvzone numpy gtts tensorflow mediapipe

# Navigate to the backend directory
cd backend

# Start the server
python server.py
The Flask backend will start running on http://127.0.0.1:5000.

3. Frontend Setup (React)
Open a new terminal window/tab, leaving the backend server running.

Bash
# Navigate to the frontend directory
cd frontend

# Install Node modules
npm install

# Start the React development server
npm start
The web application will automatically open in your browser at http://localhost:3000.

How to Use the Application
Open the Web Interface: Navigate to http://localhost:3000.
Select Language: Choose your preferred output language (English, Hindi, or Telugu) from the dropdown menu.
Start Camera: Click the "Start" button to activate your webcam. Your browser may prompt you for camera permissions.
Perform a Gesture: Position your hand within the camera frame. The system will detect the hand, draw a bounding box, and display the predicted text label in real-time.
Listen: Click the "Listen" button to hear the synthesized audio translation of the detected gesture.
Stop/Exit: Click "Stop" to pause the feed, or "Exit" to safely close the application and release camera resources.

