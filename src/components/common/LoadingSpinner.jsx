import React from 'react';

const LoadingSpinner = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            backgroundColor: '#000',
            color: '#fff',
            flexDirection: 'column',
            gap: '1rem'
        }}>
            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    .spinner {
                        width: 40px;
                        height: 40px;
                        border: 3px solid rgba(255, 255, 255, 0.3);
                        border-radius: 50%;
                        border-top-color: #fff;
                        animation: spin 0.8s ease-in-out infinite;
                    }
                `}
            </style>
            <div className="spinner"></div>
            <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', opacity: 0.7 }}>LOADING SYSTEM...</div>
        </div>
    );
};

export default LoadingSpinner;
