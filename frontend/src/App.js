import React, { useState, useEffect,useCallback } from 'react';
import axios from 'axios';

function App() {
    const [isRunning, setIsRunning] = useState(false);
    const [detectedLabel, setDetectedLabel] = useState("No sign detected");
    const [language, setLanguage] = useState("english");
    const [audioSrc, setAudioSrc] = useState("");
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);

    const startCamera = () => {
        axios.get(`http://127.0.0.1:5000/start?language=${language}`)
            .then(() => setIsRunning(true))
            .catch(err => console.error("Error starting camera:", err));
    };

    const stopCamera = () => {
        axios.get('http://127.0.0.1:5000/stop')
            .then(() => {
                setIsRunning(false);
                setDetectedLabel("No sign detected"); // Reset label after stopping
                setAudioSrc(""); // Clear audio
            })
            .catch(err => console.error("Error stopping camera:", err));
    };

    const exitApp = () => {
        if (window.confirm("Are you sure you want to exit the app?")) {
            axios.get('http://127.0.0.1:5000/exit')
                .then(() => {
                    setIsRunning(false);
                    window.close(); // Close the frontend tab
                })
                .catch(err => console.error("Error exiting app:", err));
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (isRunning) {
                axios.get('http://127.0.0.1:5000/get_label')
                    .then(response => {
                        const newLabel = response.data.detected_label;
                        setDetectedLabel(newLabel);
                        if (newLabel !== "No sign detected" && !isAudioPlaying) {
                            fetchAudio(newLabel);
                        }
                    })
                    .catch(err => console.error("Error fetching label:", err));
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning,isAudioPlaying]);

    const fetchAudio = useCallback((label) => {
        if (!isAudioPlaying) {
            setIsAudioPlaying(true);
            axios.get(`http://127.0.0.1:5000/get_audio?label=${label}`, { responseType: 'blob' })
                .then(response => {
                    const audioUrl = URL.createObjectURL(response.data);
                    setAudioSrc(audioUrl);
                    const audio = new Audio(audioUrl);
                    audio.play().then(() => setIsAudioPlaying(false))
                        .catch(error => {
                            console.error('Error playing audio:', error);
                            setIsAudioPlaying(false);
                        });
                })
                .catch(err => {
                    console.error("Error fetching audio:", err);
                    setIsAudioPlaying(false);
                });
        }
    }, [isAudioPlaying]);

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Hand Gesture Recognition</h1>

            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="language">Select Language: </label>
                <select
                    id="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    style={{ padding: '10px', fontSize: '16px' }}
                >
                    <option value="english">English</option>
                    <option value="hindi">Hindi</option>
                    <option value="telugu">Telugu</option>
                </select>
            </div>

            {isRunning ? (
                <div style={{ position: 'relative' }}>
                    <img
                        src="http://127.0.0.1:5000/video_feed"
                        alt="Camera Feed"
                        style={{ width: '600px', height: '400px', border: '2px solid black' }}
                    />
                    <div style={{
                        position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)',
                        fontSize: '24px', fontWeight: 'bold', color: 'white',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '5px', borderRadius: '5px'
                    }}>
                        {detectedLabel}
                    </div>
                </div>
            ) : (
                <p>Click "Start" to begin the camera stream</p>
            )}

            <div style={{ marginTop: '20px' }}>
                {!isRunning && (
                    <button onClick={startCamera} style={buttonStyle}>Start</button>
                )}
                {isRunning && (
                    <button onClick={stopCamera} style={buttonStyle}>Stop</button>
                )}
                <button onClick={exitApp} style={{ ...buttonStyle, backgroundColor: 'red' }}>Exit</button>
            </div>

            {detectedLabel !== "No sign detected" && (
                <div style={{ marginTop: '20px' }}>
                    <button onClick={() => fetchAudio(detectedLabel)} style={buttonStyle}>Listen</button>
                    {audioSrc && (
                        <audio controls autoPlay>
                            <source src={audioSrc} type="audio/mp3" />
                            Your browser does not support the audio element.
                        </audio>
                    )}
                </div>
            )}
        </div>
    );
}

const buttonStyle = {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
};

export default App;



/////////////////////////////////////////////////////////////////////////////////////////////////////////////

