import React, { useEffect } from 'react';

const DataDeletion = () => {
    useEffect(() => {
        // Redireccionar al archivo HTML estático
        window.location.href = '/data-deletion.html';
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
                <h2>Redirigiendo a Eliminación de Datos...</h2>
                <p>Si no es redirigido automáticamente, 
                   <a href="/data-deletion.html" style={{ color: '#007bff', textDecoration: 'none' }}>
                       haga clic aquí
                   </a>
                </p>
            </div>
        </div>
    );
};

export default DataDeletion;
