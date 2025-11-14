import React, { useEffect, useState } from 'react';
import './LegalStyles.css'; // Archivo de estilos compartido

const PrivacyPolicy = () => {
    const [htmlContent, setHtmlContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        // Cargar el contenido HTML directamente
        fetch('/privacy-policy.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo cargar la política de privacidad');
                }
                return response.text();
            })
            .then(html => {
                // Extraer solo el contenido del body
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const bodyContent = doc.body.innerHTML;
                setHtmlContent(bodyContent);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error cargando política de privacidad:', error);
                setError(true);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="legal-container">
                <div className="legal-loading">
                    <div className="legal-loading-content">
                        <div className="todomarket-logo">
                            <h1>🛒 TODO MARKET</h1>
                            <p>CHILE SpA</p>
                        </div>
                        <h2>Cargando Política de Privacidad...</h2>
                        <div className="legal-spinner"></div>
                        <p className="loading-text">Preparando contenido legal...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="legal-container">
                <div className="legal-error">
                    <div className="legal-error-content">
                        <div className="todomarket-logo">
                            <h1>🛒 TODO MARKET</h1>
                            <p>CHILE SpA</p>
                        </div>
                        <div className="error-icon">⚠️</div>
                        <h2>Error al cargar</h2>
                        <p>No se pudo cargar la política de privacidad.</p>
                        <p className="error-detail">Por favor, intente acceder directamente al documento.</p>
                        <div className="error-actions">
                            <a 
                                href="/privacy-policy.html" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="legal-button primary"
                            >
                                📄 Ver en nueva ventana
                            </a>
                            <button 
                                onClick={() => window.location.reload()}
                                className="legal-button secondary"
                            >
                                🔄 Reintentar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="legal-wrapper">
            <div className="legal-navigation">
                <a href="/" className="nav-home">🏠 Inicio</a>
                <span className="nav-separator">|</span>
                <span className="nav-current">Política de Privacidad</span>
            </div>
            <div 
                className="legal-content-wrapper"
                dangerouslySetInnerHTML={{ __html: htmlContent }} 
            />
            <div className="legal-footer">
                <p>
                    <strong>TODO MARKET CHILE SpA</strong> - 
                    Documento actualizado: {new Date().toLocaleDateString('es-CL')}
                </p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
