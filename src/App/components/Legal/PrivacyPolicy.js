import React, { useEffect } from 'react';

const PrivacyPolicy = () => {
    useEffect(() => {
        // Redireccionar al archivo HTML estático
        window.location.href = '/privacy-policy.html';
    }, []);

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh',
            fontFamily: 'Arial, sans-serif'
        }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Redirigiendo a Política de Privacidad...</h2>
                <p>Si no es redirigido automáticamente, 
                   <a href="/privacy-policy.html" style={{ color: '#007bff', textDecoration: 'none' }}>
                       haga clic aquí
                   </a>
                </p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
