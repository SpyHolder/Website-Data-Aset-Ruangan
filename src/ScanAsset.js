// src/ScanAsset.js
import React, { useEffect, useRef, useState } from 'react';
import './ScanAsset.css'; // Import the CSS file for styles

const ScanAsset = () => {
    const videoRef = useRef(null);
    const resultRef = useRef(null);
    const [qrCodeScanner, setQrCodeScanner] = useState(null);

    useEffect(() => {
        // Access camera for scanning QR code
        navigator.mediaDevices.getUser Media({ video: { facingMode: 'environment' } })
            .then(stream => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                }
            })
            .catch(err => {
                if (resultRef.current) {
                    resultRef.current.textContent = 'Camera not accessible: ' + err.message;
                }
            });

        // Initialize the QR code scanner
        const Html5QrcodeScanner = window.Html5QrcodeScanner; // Ensure you have the library loaded
        const scanner = new Html5QrcodeScanner(videoRef.current, { fps: 10, qrbox: 250 });
        setQrCodeScanner(scanner);

        // Start scanning
        scanner.render(qrCodeMessage => {
            if (resultRef.current) {
                resultRef.current.textContent = QR Code Content: ${qrCodeMessage};
            }
        }, errorMessage => {
            console.log('QR Code scan error:', errorMessage);
        });

        // Cleanup function to stop the video stream
        return () => {
            if (scanner) {
                scanner.clear();
            }
        };
    }, []);

    const handleLogout = () => {
        // Handle logout logic here
        alert('Logged out');
    };

    return (
        <div className="scan-asset-container">
            {/* Sidebar */}
            <div className="sidebar">
                <h1>Dashboard</h1>
                <a href="Dashboard Overview.html">Overview</a>
                <a href="Dashboard Ruangan.html">Daftar Ruangan</a>
                <a href="Scan Asset.html">Scan Asset</a>
                <a href="#logout" onClick={handleLogout}>Logout</a>
            </div>

            {/* Content Area */}
            <div className="content">
                {/* Navbar */}
                <div className="navbar">
                    <h2>Scan Asset</h2>
                    <button className="logout" onClick={handleLogout}>Logout</button>
                </div>

                {/* Scan QR Code */}
                <div className="scan-container">
                    <h3>Scan QR Code Asset</h3>
                    <video id="video" ref={videoRef} autoPlay></video>
                    <p id="result" ref={resultRef} style={{ marginTop: '15px', fontWeight: 'bold' }}></p>
                </div>
            </div>
        </div>
    );
};

export default ScanAsset;