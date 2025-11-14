import React, { useEffect } from 'react';

const TermsOfService = () => {
    useEffect(() => {
        // Redireccionar al archivo HTML estático
        window.location.href = '/terms-of-service.html';
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
                <h2>Redirigiendo a Términos de Servicio...</h2>
                <p>Si no es redirigido automáticamente, 
                   <a href="/terms-of-service.html" style={{ color: '#007bff', textDecoration: 'none' }}>
                       haga clic aquí
                   </a>
                </p>
            </div>
        </div>
    );
};

export default TermsOfService;
