import React, { useEffect, useState } from 'react';
import './LegalStyles.css'; // Archivo de estilos compartido

const DataDeletion = () => {
    const [htmlContent, setHtmlContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Contenido estático como fallback
    const staticContent = `
        <div class="header">
            <h1>Eliminación de Datos Personales</h1>
            <p class="last-updated">Política actualizada: ${new Date().toLocaleDateString('es-CL')}</p>
        </div>

        <div class="section">
            <h2>1. DERECHO A LA ELIMINACIÓN</h2>
            <p>En <strong>TODO MARKET CHILE SpA</strong> respetamos su derecho a solicitar la eliminación de sus datos personales de nuestros sistemas, conforme a la Ley N° 19.628 sobre Protección de Datos de Carácter Personal.</p>
        </div>

        <div class="section">
            <h2>2. DATOS QUE PODEMOS ELIMINAR</h2>
            <ul>
                <li><strong>Información de perfil:</strong> Nombre, correo electrónico, teléfono</li>
                <li><strong>Historial de compras:</strong> Pedidos realizados y preferencias</li>
                <li><strong>Datos de entrega:</strong> Direcciones y contactos asociados</li>
                <li><strong>Información de marketing:</strong> Suscripciones y preferencias de comunicación</li>
                <li><strong>Datos técnicos:</strong> Cookies, logs de acceso y datos de uso</li>
            </ul>
        </div>

        <div class="section">
            <h2>3. DATOS QUE DEBEMOS CONSERVAR</h2>
            <p>Por obligaciones legales y fiscales, debemos conservar ciertos datos por períodos específicos:</p>
            <ul>
                <li><strong>Información fiscal:</strong> Facturas y comprobantes (6 años)</li>
                <li><strong>Datos contables:</strong> Registros financieros según normativa chilena</li>
                <li><strong>Información legal:</strong> Datos requeridos por autoridades competentes</li>
                <li><strong>Prevención de fraude:</strong> Información necesaria para seguridad</li>
            </ul>
        </div>

        <div class="section">
            <h2>4. PROCESO DE ELIMINACIÓN</h2>
            <p><strong>Pasos para solicitar la eliminación:</strong></p>
            <ol>
                <li><strong>Enviar solicitud:</strong> Contactar por email o formulario oficial</li>
                <li><strong>Verificación de identidad:</strong> Confirmar titularidad de los datos</li>
                <li><strong>Revisión legal:</strong> Evaluar obligaciones de conservación</li>
                <li><strong>Procesamiento:</strong> Eliminar datos según sea procedente</li>
                <li><strong>Confirmación:</strong> Notificar al usuario sobre el resultado</li>
            </ol>
        </div>

        <div class="section">
            <h2>5. TIEMPOS DE PROCESAMIENTO</h2>
            <ul>
                <li><strong>Confirmación de recepción:</strong> Inmediata</li>
                <li><strong>Verificación de identidad:</strong> 1-2 días hábiles</li>
                <li><strong>Procesamiento de eliminación:</strong> 5-10 días hábiles</li>
                <li><strong>Notificación final:</strong> Dentro de 15 días hábiles</li>
            </ul>
        </div>

        <div class="section">
            <h2>6. CONSECUENCIAS DE LA ELIMINACIÓN</h2>
            <p><strong>Al eliminar sus datos:</strong></p>
            <ul>
                <li>Su cuenta será desactivada permanentemente</li>
                <li>No podrá acceder a servicios personalizados</li>
                <li>Se perderá el historial de compras y preferencias</li>
                <li>No recibirá comunicaciones promocionales</li>
                <li>Deberá registrarse nuevamente para usar nuestros servicios</li>
            </ul>
        </div>

        <div class="section">
            <h2>7. ALTERNATIVAS A LA ELIMINACIÓN</h2>
            <p>Antes de eliminar sus datos, considere estas opciones:</p>
            <ul>
                <li><strong>Desactivar cuenta:</strong> Suspender temporalmente sin eliminar datos</li>
                <li><strong>Actualizar preferencias:</strong> Modificar configuración de privacidad</li>
                <li><strong>Limitar comunicaciones:</strong> Reducir emails y notificaciones</li>
                <li><strong>Revisar configuración:</strong> Ajustar qué datos compartir</li>
            </ul>
        </div>

        <div class="contact">
            <h2>8. SOLICITAR ELIMINACIÓN</h2>
            <p>Para eliminar sus datos personales, contáctenos por cualquiera de estos medios:</p>
            <ul>
                <li><strong>Email principal:</strong> eliminar-datos@todomarket.cl</li>
                <li><strong>Email alternativo:</strong> privacidad@todomarket.cl</li>
                <li><strong>Teléfono:</strong> +56 2 2345 6789 (opción 3)</li>
                <li><strong>Formulario web:</strong> <a href="#formulario">todomarket.cl/eliminar-cuenta</a></li>
            </ul>
            <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #ffc107;">
                <p style="margin: 0;"><strong>⚠️ Importante:</strong> La eliminación es irreversible. Asegúrese de descargar cualquier información que desee conservar antes de proceder.</p>
            </div>
        </div>
    `;

    useEffect(() => {
        // Intentar cargar el contenido HTML con manejo robusto de errores
        const loadContent = async () => {
            try {
                const response = await fetch('/data-deletion.html', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'text/html',
                    },
                    cache: 'no-cache'
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const html = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const bodyContent = doc.body.innerHTML;
                
                if (bodyContent.trim()) {
                    setHtmlContent(bodyContent);
                } else {
                    throw new Error('Contenido vacío');
                }
                
                setLoading(false);
            } catch (error) {
                console.warn('Error cargando archivo HTML, usando contenido estático:', error);
                // Usar contenido estático como fallback
                setHtmlContent(staticContent);
                setLoading(false);
                setError(false); // No mostrar error, ya que tenemos fallback
            }
        };

        // Delay pequeño para evitar problemas de timing
        const timer = setTimeout(loadContent, 100);
        return () => clearTimeout(timer);
    }, [staticContent]);

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
