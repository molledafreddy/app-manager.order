import React from 'react';
import './LegalStyles.css'; // Archivo de estilos compartido

const DataDeletion = () => {
    const currentDate = new Date().toLocaleDateString('es-CL');

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
                    <div className="legal-content-card">
                        <div className="header">
                            <h1>Eliminación de Datos Personales</h1>
                            <p className="last-updated">Política actualizada: {currentDate}</p>
                        </div>

                        <div className="section">
                            <h2>1. DERECHO A LA ELIMINACIÓN</h2>
                            <p>En <strong>TODO MARKET CHILE SpA</strong> respetamos su derecho a solicitar la eliminación de sus datos personales de nuestros sistemas, conforme a la Ley N° 19.628 sobre Protección de Datos de Carácter Personal.</p>
                        </div>

                        <div className="section">
                            <h2>2. DATOS QUE PODEMOS ELIMINAR</h2>
                            <ul>
                                <li><strong>Información de perfil:</strong> Nombre, correo electrónico, teléfono</li>
                                <li><strong>Historial de compras:</strong> Pedidos realizados y preferencias</li>
                                <li><strong>Datos de entrega:</strong> Direcciones y contactos asociados</li>
                                <li><strong>Información de marketing:</strong> Suscripciones y preferencias de comunicación</li>
                                <li><strong>Datos técnicos:</strong> Cookies, logs de acceso y datos de uso</li>
                            </ul>
                        </div>

                        <div className="section">
                            <h2>3. DATOS QUE DEBEMOS CONSERVAR</h2>
                            <p>Por obligaciones legales y fiscales, debemos conservar ciertos datos por períodos específicos:</p>
                            <ul>
                                <li><strong>Información fiscal:</strong> Facturas y comprobantes (6 años)</li>
                                <li><strong>Datos contables:</strong> Registros financieros según normativa chilena</li>
                                <li><strong>Información legal:</strong> Datos requeridos por autoridades competentes</li>
                                <li><strong>Prevención de fraude:</strong> Información necesaria para seguridad</li>
                            </ul>
                        </div>

                        <div className="section">
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

                        <div className="section">
                            <h2>5. TIEMPOS DE PROCESAMIENTO</h2>
                            <ul>
                                <li><strong>Confirmación de recepción:</strong> Inmediata</li>
                                <li><strong>Verificación de identidad:</strong> 1-2 días hábiles</li>
                                <li><strong>Procesamiento de eliminación:</strong> 5-10 días hábiles</li>
                                <li><strong>Notificación final:</strong> Dentro de 15 días hábiles</li>
                            </ul>
                        </div>

                        <div className="section">
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

                        <div className="section">
                            <h2>7. ALTERNATIVAS A LA ELIMINACIÓN</h2>
                            <p>Antes de eliminar sus datos, considere estas opciones:</p>
                            <ul>
                                <li><strong>Desactivar cuenta:</strong> Suspender temporalmente sin eliminar datos</li>
                                <li><strong>Actualizar preferencias:</strong> Modificar configuración de privacidad</li>
                                <li><strong>Limitar comunicaciones:</strong> Reducir emails y notificaciones</li>
                                <li><strong>Revisar configuración:</strong> Ajustar qué datos compartir</li>
                            </ul>
                        </div>

                        <div className="contact">
                            <h2>8. SOLICITAR ELIMINACIÓN</h2>
                            <p>Para eliminar sus datos personales, contáctenos por cualquiera de estos medios:</p>
                            <ul>
                                <li><strong>Email principal:</strong> eliminar-datos@todomarket.cl</li>
                                <li><strong>Email alternativo:</strong> privacidad@todomarket.cl</li>
                                <li><strong>Teléfono:</strong> +56 2 2345 6789 (opción 3)</li>
                                <li><strong>Formulario web:</strong> <a href="#formulario">todomarket.cl/eliminar-cuenta</a></li>
                            </ul>
                            <div style={{background: '#fff3cd', padding: '15px', borderRadius: '8px', marginTop: '15px', borderLeft: '4px solid #ffc107'}}>
                                <p style={{margin: '0'}}><strong>⚠️ Importante:</strong> La eliminación es irreversible. Asegúrese de descargar cualquier información que desee conservar antes de proceder.</p>
                            </div>
                        </div>
                    </div>
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
                            Documento actualizado: {currentDate} | 
                            Cumplimos con la normativa chilena de protección de datos
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataDeletion;