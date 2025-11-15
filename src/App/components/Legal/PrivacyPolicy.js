import React from 'react';
import './LegalStyles.css'; // Archivo de estilos compartido

const PrivacyPolicy = () => {
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
                            <i className="feather icon-shield" style={{marginRight: '6px'}}></i>
                            Política de Privacidad
                        </span>
                    </div>
                    <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px'}}>
                        <a href="/terms-of-service" className="legal-nav-button" style={{fontSize: '0.85rem', padding: '6px 12px'}}>
                            <i className="feather icon-file-text" style={{marginRight: '4px'}}></i>
                            Términos
                        </a>
                        <a href="/data-deletion" className="legal-nav-button" style={{fontSize: '0.85rem', padding: '6px 12px'}}>
                            <i className="feather icon-trash-2" style={{marginRight: '4px'}}></i>
                            Eliminar Datos
                        </a>
                    </div>
                </div>
            </div>
            <div className="legal-content-wrapper">
                <div className="legal-content-container">
                    <div className="legal-content-card">
                        <div className="header">
                            <h1>Política de Privacidad</h1>
                            <p className="last-updated">Última actualización: {currentDate}</p>
                        </div>

                        <div className="section">
                            <h2>1. INFORMACIÓN GENERAL</h2>
                            <p><strong>TODO MARKET CHILE SpA</strong> se compromete a proteger la privacidad y seguridad de la información personal de nuestros usuarios. Esta política describe cómo recopilamos, utilizamos y protegemos su información.</p>
                        </div>

                        <div className="section">
                            <h2>2. INFORMACIÓN QUE RECOPILAMOS</h2>
                            <ul>
                                <li><strong>Información de registro:</strong> Nombre, correo electrónico, número de teléfono</li>
                                <li><strong>Información de compras:</strong> Historial de pedidos, preferencias de productos</li>
                                <li><strong>Información técnica:</strong> Dirección IP, tipo de navegador, datos de uso de la aplicación</li>
                                <li><strong>Información de ubicación:</strong> Dirección de entrega para facilitar nuestros servicios</li>
                            </ul>
                        </div>

                        <div className="section">
                            <h2>3. USO DE LA INFORMACIÓN</h2>
                            <p>Utilizamos su información personal para:</p>
                            <ul>
                                <li>Procesar y gestionar sus pedidos</li>
                                <li>Proporcionar servicio al cliente</li>
                                <li>Mejorar nuestros productos y servicios</li>
                                <li>Enviar notificaciones sobre pedidos y promociones</li>
                                <li>Cumplir con obligaciones legales y regulatorias</li>
                            </ul>
                        </div>

                        <div className="section">
                            <h2>4. PROTECCIÓN DE DATOS</h2>
                            <p>Implementamos medidas de seguridad técnicas y organizacionales para proteger su información:</p>
                            <ul>
                                <li>Encriptación de datos sensibles</li>
                                <li>Acceso restringido a información personal</li>
                                <li>Monitoreo regular de seguridad</li>
                                <li>Capacitación continua del personal</li>
                            </ul>
                        </div>

                        <div className="section">
                            <h2>5. SUS DERECHOS</h2>
                            <p>De acuerdo con la Ley N° 19.628 sobre Protección de Datos de Carácter Personal, usted tiene derecho a:</p>
                            <ul>
                                <li><strong>Acceso:</strong> Conocer qué datos personales tenemos sobre usted</li>
                                <li><strong>Rectificación:</strong> Corregir datos inexactos o incompletos</li>
                                <li><strong>Cancelación:</strong> Solicitar la eliminación de sus datos</li>
                                <li><strong>Oposición:</strong> Oponerse al tratamiento de sus datos en casos específicos</li>
                            </ul>
                        </div>

                        <div className="contact">
                            <h2>6. CONTACTO</h2>
                            <p>Para ejercer sus derechos o resolver dudas sobre esta política, contáctenos:</p>
                            <ul>
                                <li><strong>Email:</strong> privacidad@todomarket.cl</li>
                                <li><strong>Teléfono:</strong> +56 2 2345 6789</li>
                                <li><strong>Dirección:</strong> Av. Principal 123, Santiago, Chile</li>
                            </ul>
                            <p><small>Nos comprometemos a responder a sus consultas en un plazo máximo de 5 días hábiles.</small></p>
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

export default PrivacyPolicy;