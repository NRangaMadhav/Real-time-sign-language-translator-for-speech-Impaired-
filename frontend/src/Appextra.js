// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//     const [isRunning, setIsRunning] = useState(false);

//     const startCamera = () => {
//         axios.get('http://127.0.0.1:5000/start')
//             .then(() => {
//                 setIsRunning(true);
//                 setTimeout(() => {}, 1000);  // Wait 1 second before fetching frames
//             })
//             .catch(err => console.error("Error starting camera:", err));
//     };

//     const stopCamera = () => {
//         axios.post('http://127.0.0.1:5000/stop')
//             .then(() => setIsRunning(false))
//             .catch(err => console.error("Error stopping camera:", err));
//     };

//     const exitApp = () => {
//         if (window.confirm("Are you sure you want to exit the app?")) {
//             axios.post('http://127.0.0.1:5000/exit')
//                 .then(() => {
//                     setIsRunning(false);
//                     console.log("App exited");
//                 })
//                 .catch(err => console.error("Error exiting app:", err));
//         }
//     };

//     return (
//         <div style={{ textAlign: 'center', padding: '20px' }}>
//             <h1>Hand Gesture Recognition</h1>
//             {isRunning ? (
//                 <img 
//                     src="http://127.0.0.1:5000/video_feed" 
//                     alt="Camera Feed" 
//                     style={{ width: '600px', height: '400px', border: '2px solid black' }}
//                 />
//             ) : (
//                 <p>Click "Start" to begin the camera stream</p>
//             )}

//             <div style={{ marginTop: '20px' }}>
//                 {!isRunning && (
//                     <button onClick={startCamera} style={buttonStyle}>Start</button>
//                 )}
//                 {isRunning && (
//                     <button onClick={stopCamera} style={buttonStyle}>Stop</button>
//                 )}
//                 <button onClick={exitApp} style={{ ...buttonStyle, backgroundColor: 'red' }}>
//                     Exit
//                 </button>
//             </div>
//         </div>
//     );
// }

// const buttonStyle = {
//     margin: '10px',
//     padding: '10px 20px',
//     fontSize: '16px',
//     cursor: 'pointer',
//     backgroundColor: '#4CAF50',
//     color: 'white',
//     border: 'none',
//     borderRadius: '5px',
// };

// export default App;


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// with detected sign only 

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function App() {
//     const [isRunning, setIsRunning] = useState(false);
//     const [detectedLabel, setDetectedLabel] = useState("No sign detected");

//     const startCamera = () => {
//         axios.get('http://127.0.0.1:5000/start')
//             .then(() => {
//                 setIsRunning(true);
//                 setTimeout(() => {}, 1000);  // Wait 1 second before fetching frames
//             })
//             .catch(err => console.error("Error starting camera:", err));
//     };

//     const stopCamera = () => {
//         axios.post('http://127.0.0.1:5000/stop')
//             .then(() => setIsRunning(false))
//             .catch(err => console.error("Error stopping camera:", err));
//     };

//     const exitApp = () => {
//         if (window.confirm("Are you sure you want to exit the app?")) {
//             axios.post('http://127.0.0.1:5000/exit')
//                 .then(() => {
//                     setIsRunning(false);
//                     console.log("App exited");
//                 })
//                 .catch(err => console.error("Error exiting app:", err));
//         }
//     };

//     // Fetch the detected label every second
//     useEffect(() => {
//         const interval = setInterval(() => {
//             if (isRunning) {
//                 axios.get('http://127.0.0.1:5000/get_label')
//                     .then(response => {
//                         setDetectedLabel(response.data.detected_label);
//                     })
//                     .catch(err => console.error("Error fetching label:", err));
//             }
//         }, 1000);

//         return () => clearInterval(interval);  // Cleanup on component unmount
//     }, [isRunning]);

//     return (
//         <div style={{ textAlign: 'center', padding: '20px' }}>
//             <h1>Hand Gesture Recognition</h1>
//             {isRunning ? (
//                 <img 
//                     src="http://127.0.0.1:5000/video_feed" 
//                     alt="Camera Feed" 
//                     style={{ width: '600px', height: '400px', border: '2px solid black' }}
//                 />
//             ) : (
//                 <p>Click "Start" to begin the camera stream</p>
//             )}

//             <div style={{ marginTop: '20px' }}>
//                 {!isRunning && (
//                     <button onClick={startCamera} style={buttonStyle}>Start</button>
//                 )}
//                 {isRunning && (
//                     <button onClick={stopCamera} style={buttonStyle}>Stop</button>
//                 )}
//                 <button onClick={exitApp} style={{ ...buttonStyle, backgroundColor: 'red' }}>
//                     Exit
//                 </button>
//             </div>

//             {/* Display Detected Label */}
//             <div style={{ marginTop: '20px', fontSize: '18px', fontWeight: 'bold' }}>
//                 Detected Sign: <span>{detectedLabel}</span>
//             </div>
//         </div>
//     );
// }

// const buttonStyle = {
//     margin: '10px',
//     padding: '10px 20px',
//     fontSize: '16px',
//     cursor: 'pointer',
//     backgroundColor: '#4CAF50',
//     color: 'white',
//     border: 'none',
//     borderRadius: '5px',
// };

// export default App;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// with language menu to change the detected sign 

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function App() {
//     const [isRunning, setIsRunning] = useState(false);
//     const [detectedLabel, setDetectedLabel] = useState("No sign detected");
//     const [language, setLanguage] = useState("english");  // New state for language

//     const startCamera = () => {
//         // Send selected language when starting the camera
//         axios.get(`http://127.0.0.1:5000/start?language=${language}`)
//             .then(() => {
//                 setIsRunning(true);
//                 setTimeout(() => {}, 1000);  // Wait 1 second before fetching frames
//             })
//             .catch(err => console.error("Error starting camera:", err));
//     };

//     const stopCamera = () => {
//         axios.post('http://127.0.0.1:5000/stop')
//             .then(() => setIsRunning(false))
//             .catch(err => console.error("Error stopping camera:", err));
//     };

//     const exitApp = () => {
//         if (window.confirm("Are you sure you want to exit the app?")) {
//             axios.post('http://127.0.0.1:5000/exit')
//                 .then(() => {
//                     setIsRunning(false);
//                     console.log("App exited");
//                 })
//                 .catch(err => console.error("Error exiting app:", err));
//         }
//     };

//     // Fetch the detected label every second
//     useEffect(() => {
//         const interval = setInterval(() => {
//             if (isRunning) {
//                 axios.get('http://127.0.0.1:5000/get_label')
//                     .then(response => {
//                         setDetectedLabel(response.data.detected_label);
//                     })
//                     .catch(err => console.error("Error fetching label:", err));
//             }
//         }, 1000);

//         return () => clearInterval(interval);  // Cleanup on component unmount
//     }, [isRunning]);

//     return (
//         <div style={{ textAlign: 'center', padding: '20px' }}>
//             <h1>Hand Gesture Recognition</h1>

//             {/* Language selection dropdown */}
//             <div style={{ marginBottom: '20px' }}>
//                 <label htmlFor="language">Select Language: </label>
//                 <select
//                     id="language"
//                     value={language}
//                     onChange={(e) => setLanguage(e.target.value)}
//                     style={{ padding: '10px', fontSize: '16px' }}
//                 >
//                     <option value="english">English</option>
//                     <option value="hindi">Hindi</option>
//                     <option value="telugu">Telugu</option>
//                 </select>
//             </div>

//             {isRunning ? (
//                 <img 
//                     src="http://127.0.0.1:5000/video_feed" 
//                     alt="Camera Feed" 
//                     style={{ width: '600px', height: '400px', border: '2px solid black' }}
//                 />
//             ) : (
//                 <p>Click "Start" to begin the camera stream</p>
//             )}

//             <div style={{ marginTop: '20px' }}>
//                 {!isRunning && (
//                     <button onClick={startCamera} style={buttonStyle}>Start</button>
//                 )}
//                 {isRunning && (
//                     <button onClick={stopCamera} style={buttonStyle}>Stop</button>
//                 )}
//                 <button onClick={exitApp} style={{ ...buttonStyle, backgroundColor: 'red' }}>
//                     Exit
//                 </button>
//             </div>

//             {/* Display Detected Label */}
//             <div style={{ marginTop: '20px', fontSize: '18px', fontWeight: 'bold' }}>
//                 Detected Sign: <span>{detectedLabel}</span>
//             </div>
//         </div>
//     );
// }

// const buttonStyle = {
//     margin: '10px',
//     padding: '10px 20px',
//     fontSize: '16px',
//     cursor: 'pointer',
//     backgroundColor: '#4CAF50',
//     color: 'white',
//     border: 'none',
//     borderRadius: '5px',
// };

// export default App;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// with language menu, detected sign and audio of detected sign in the selected language 

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function App() {
//     const [isRunning, setIsRunning] = useState(false);
//     const [detectedLabel, setDetectedLabel] = useState("No sign detected");
//     const [language, setLanguage] = useState("english");
//     const [audioSrc, setAudioSrc] = useState("");
//     const [isAudioPlaying, setIsAudioPlaying] = useState(false);  // Track audio playing state

//     const startCamera = () => {
//         axios.get(`http://127.0.0.1:5000/start?language=${language}`)
//             .then(() => {
//                 setIsRunning(true);
//             })
//             .catch(err => console.error("Error starting camera:", err));
//     };

//     const stopCamera = () => {
//         axios.post('http://127.0.0.1:5000/stop')
//             .then(() => setIsRunning(false))
//             .catch(err => console.error("Error stopping camera:", err));
//     };

//     const exitApp = () => {
//         if (window.confirm("Are you sure you want to exit the app?")) {
//             axios.post('http://127.0.0.1:5000/exit')
//                 .then(() => setIsRunning(false))
//                 .catch(err => console.error("Error exiting app:", err));
//         }
//     };

//     // Fetch detected label and audio every second
//     useEffect(() => {
//         const interval = setInterval(() => {
//             if (isRunning) {
//                 axios.get('http://127.0.0.1:5000/get_label')
//                     .then(response => {
//                         setDetectedLabel(response.data.detected_label);
//                     })
//                     .catch(err => console.error("Error fetching label:", err));
//             }
//         }, 1000);

//         return () => clearInterval(interval);
//     }, [isRunning]);

//     const fetchAudio = () => {
//         if (detectedLabel !== "No sign detected" && !isAudioPlaying) {
//             setIsAudioPlaying(true);  // Set audio playing state to true
//             axios.get(`http://127.0.0.1:5000/get_audio?label=${detectedLabel}&language=${language}`, { responseType: 'blob' })
//                 .then(response => {
//                     const audioUrl = URL.createObjectURL(response.data);
//                     setAudioSrc(audioUrl);
//                     const audio = new Audio(audioUrl);
//                     audio.play().then(() => {
//                         setIsAudioPlaying(false);  // Reset audio playing state after playback
//                     }).catch(error => {
//                         console.error('Error playing audio:', error);
//                         setIsAudioPlaying(false);  // Reset if there is an error
//                     });
//                 })
//                 .catch(err => {
//                     console.error("Error fetching audio:", err);
//                     setIsAudioPlaying(false);  // Reset audio playing state on error
//                 });
//         }
//     };

//     return (
//         <div style={{ textAlign: 'center', padding: '20px' }}>
//             <h1>Hand Gesture Recognition</h1>

//             {/* Language selection dropdown */}
//             <div style={{ marginBottom: '20px' }}>
//                 <label htmlFor="language">Select Language: </label>
//                 <select
//                     id="language"
//                     value={language}
//                     onChange={(e) => setLanguage(e.target.value)}
//                     style={{ padding: '10px', fontSize: '16px' }}
//                 >
//                     <option value="english">English</option>
//                     <option value="hindi">Hindi</option>
//                     <option value="telugu">Telugu</option>
//                 </select>
//             </div>

//             {isRunning ? (
//                 <img
//                     src="http://127.0.0.1:5000/video_feed"
//                     alt="Camera Feed"
//                     style={{ width: '600px', height: '400px', border: '2px solid black' }}
//                 />
//             ) : (
//                 <p>Click "Start" to begin the camera stream</p>
//             )}

//             <div style={{ marginTop: '20px' }}>
//                 {!isRunning && (
//                     <button onClick={startCamera} style={buttonStyle}>Start</button>
//                 )}
//                 {isRunning && (
//                     <button onClick={stopCamera} style={buttonStyle}>Stop</button>
//                 )}
//                 <button onClick={exitApp} style={{ ...buttonStyle, backgroundColor: 'red' }}>
//                     Exit
//                 </button>
//             </div>

//             {/* Display Detected Label */}
//             <div style={{ marginTop: '20px', fontSize: '18px', fontWeight: 'bold' }}>
//                 Detected Sign: <span>{detectedLabel}</span>
//             </div>

//             {/* Play the audio with Listen Button */}
//             {detectedLabel !== "No sign detected" && (
//                 <div style={{ marginTop: '20px' }}>
//                     <button onClick={fetchAudio} style={buttonStyle}>Listen</button>
//                     {audioSrc && (
//                         <audio controls>
//                             <source src={audioSrc} type="audio/mp3" />
//                             Your browser does not support the audio element.
//                         </audio>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// }

// const buttonStyle = {
//     margin: '10px',
//     padding: '10px 20px',
//     fontSize: '16px',
//     cursor: 'pointer',
//     backgroundColor: '#4CAF50',
//     color: 'white',
//     border: 'none',
//     borderRadius: '5px',
// };

// export default App;



//////////////////////////////////////////////////////////
// same as above 