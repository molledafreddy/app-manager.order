import React, { useEffect, useState } from 'react';
import './LegalStyles.css'; // Archivo de estilos compartido

const DataDeletion = () => {
    const [htmlContent, setHtmlContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        // Cargar el contenido HTML directamente
        fetch('/data-deletion.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo cargar la página de eliminación de datos');
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
                console.error('Error cargando eliminación de datos:', error);
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
                            <div className="todomarket-logo-container">
                                <svg width="50" height="50" viewBox="0 0 100 100" style={{marginRight: '15px'}}>
                                    <circle cx="50" cy="50" r="45" fill="#FF8C00" stroke="#2c3e50" strokeWidth="3"/>
                                    <text x="50" y="60" textAnchor="middle" fontSize="36" fontWeight="bold" fill="#2c3e50">75</text>
                                    <path d="M20 30 L35 30 L35 45 L45 45 L45 35 L55 35 L55 50 L70 50 L70 35 L80 35" 
                                          stroke="#2c3e50" strokeWidth="3" fill="none" strokeLinecap="round"/>
                                    <circle cx="25" cy="75" r="8" fill="#2c3e50"/>
                                    <circle cx="75" cy="75" r="8" fill="#2c3e50"/>
                                </svg>
                                <h1>TODO MARKET CHILE SpA</h1>
                            </div>
                            <p>Tu supermercado de barrio de confianza</p>
                        </div>
                        <h2>🗑️ Cargando Eliminación de Datos...</h2>
                        <div className="legal-spinner"></div>
                        <p className="loading-text">Preparando herramientas de privacidad y eliminación...</p>
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
                            <div className="todomarket-logo-container">
                                <svg width="45" height="45" viewBox="0 0 100 100" style={{marginRight: '15px'}}>
                                    <circle cx="50" cy="50" r="45" fill="#FF8C00" stroke="#2c3e50" strokeWidth="3"/>
                                    <text x="50" y="60" textAnchor="middle" fontSize="36" fontWeight="bold" fill="#2c3e50">75</text>
                                    <path d="M20 30 L35 30 L35 45 L45 45 L45 35 L55 35 L55 50 L70 50 L70 35 L80 35" 
                                          stroke="#2c3e50" strokeWidth="3" fill="none" strokeLinecap="round"/>
                                    <circle cx="25" cy="75" r="8" fill="#2c3e50"/>
                                    <circle cx="75" cy="75" r="8" fill="#2c3e50"/>
                                </svg>
                                <h1>TODO MARKET CHILE SpA</h1>
                            </div>
                            <p>Tu supermercado de barrio de confianza</p>
                        </div>
                        <div className="error-icon">⚠️</div>
                        <h2>Error al cargar herramientas</h2>
                        <p>No se pudieron cargar las opciones de eliminación de datos en este momento.</p>
                        <p className="error-detail">Puede acceder directamente a las herramientas de privacidad usando los botones de abajo.</p>
                        <div className="error-actions">
                            <a 
                                href="/data-deletion.html" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="legal-button primary"
                            >
                                <i className="feather icon-external-link" style={{marginRight: '8px'}}></i>
                                Ver Herramientas de Datos
                            </a>
                            <button 
                                onClick={() => window.location.reload()}
                                className="legal-button secondary"
                            >
                                <i className="feather icon-refresh-cw" style={{marginRight: '8px'}}></i>
                                Reintentar Carga
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
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <svg width="30" height="30" viewBox="0 0 100 100" style={{marginRight: '10px'}}>
                            <circle cx="50" cy="50" r="45" fill="#FF8C00" stroke="#2c3e50" strokeWidth="2"/>
                            <text x="50" y="60" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#2c3e50">75</text>
                            <circle cx="25" cy="75" r="6" fill="#2c3e50"/>
                            <circle cx="75" cy="75" r="6" fill="#2c3e50"/>
                        </svg>
                        <a href="/" className="nav-home">
                            <i className="feather icon-home" style={{marginRight: '6px'}}></i>
                            TodoMarket Inicio
                        </a>
                        <span className="nav-separator">|</span>
                        <span className="nav-current">
                            <i className="feather icon-trash-2" style={{marginRight: '6px'}}></i>
                            Eliminación de Datos
                        </span>
                    </div>
                    <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px'}}>
                        <a href="/privacy-policy" className="legal-nav-button" style={{fontSize: '0.85rem', padding: '6px 12px'}}>
                            <i className="feather icon-shield" style={{marginRight: '4px'}}></i>
                            Privacidad
                        </a>
                        <a href="/terms-of-service" className="legal-nav-button" style={{fontSize: '0.85rem', padding: '6px 12px'}}>
                            <i className="feather icon-file-text" style={{marginRight: '4px'}}></i>
                            Términos
                        </a>
                    </div>
                </div>
            </div>
            <div className="legal-content-wrapper">
                <div className="legal-content-container">
                    <div 
                        className="legal-content-card"
                        dangerouslySetInnerHTML={{ __html: htmlContent }} 
                    />
                </div>
            </div>
            <div className="legal-footer">
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '15px'}}>
                    <svg width="25" height="25" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="#FF8C00" stroke="white" strokeWidth="2"/>
                        <text x="50" y="60" textAnchor="middle" fontSize="28" fontWeight="bold" fill="white">75</text>
                        <circle cx="25" cy="75" r="6" fill="white"/>
                        <circle cx="75" cy="75" r="6" fill="white"/>
                    </svg>
                    <div>
                        <p style={{margin: '0', fontWeight: '600'}}>
                            <strong>TODO MARKET CHILE SpA</strong> - Tu supermercado de barrio de confianza
                        </p>
                        <small style={{opacity: '0.8'}}>
                            Herramientas actualizadas: {new Date().toLocaleDateString('es-CL')} | 
                            Cumplimos con Meta Business Manager y normativas de privacidad
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataDeletion;
