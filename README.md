REAL TIME SIGN LANGUAGE TRANSLATOR FOR SPEECH IMPAIRED
======================================================
https://ieeexplore.ieee.org/document/11158535

Project Description
-------------------
This project is a real-time sign language translator that converts hand gestures into text and speech using computer vision and machine learning. The system detects hand gestures using a webcam and classifies them using a trained deep learning model.

The predicted gesture is displayed as text and converted into speech using a text-to-speech engine. The system supports multiple languages including English, Hindi, and Telugu.

Project Structure
-----------------

Realtime signlanguage translator
│
├── backend
│     server.py
│
├── frontend
│     React application for user interface
│
└── model
      keras_model.h5   (trained gesture recognition model)
      labels.txt       (gesture labels)

Requirements
------------

Python 3.8+

Required Python libraries:

flask
flask-cors
opencv-python
cvzone
numpy
gtts

Install using:

pip install flask flask-cors opencv-python cvzone numpy gtts


How to Run the Project
----------------------

Step 1: Start Backend Server

Open terminal inside the backend folder.

Run:

python server.py


Step 2: Start Frontend

Go to the frontend folder.

Run:

npm install
npm start


Step 3: Open Web Application

Open browser and go to:

http://localhost:3000


Step 4: Start Camera

Press the start button in the interface to activate the webcam.

The system will detect hand gestures and display the predicted sign.


Supported Gestures
------------------

busy
cat
dog
drink
eat
fine
goto
hello
help
hurt
iloveyou
like
more
no
play
please
restroom
same
thankyou
what
yes


Output

The system will:

1. Detect hand gestures from webcam
2. Predict the gesture using the trained model
3. Display the text output
4. Convert the detected sign into speech
