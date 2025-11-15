import React from 'react';
import './LegalStyles.css'; // Archivo de estilos compartido

const TermsOfService = () => {
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
                            <i className="feather icon-file-text" style={{marginRight: '6px'}}></i>
                            Términos de Servicio
                        </span>
                    </div>
                    <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px'}}>
                        <a href="/privacy-policy" className="legal-nav-button" style={{fontSize: '0.85rem', padding: '6px 12px'}}>
                            <i className="feather icon-shield" style={{marginRight: '4px'}}></i>
                            Privacidad
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
                            <h1>Términos de Servicio</h1>
                            <p className="last-updated">Última actualización: {currentDate}</p>
                        </div>

                        <div className="section">
                            <h2>1. ACEPTACIÓN DE TÉRMINOS</h2>
                            <p>Al utilizar los servicios de <strong>TODO MARKET CHILE SpA</strong>, usted acepta estos términos y condiciones en su totalidad. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestros servicios.</p>
                        </div>

                        <div className="section">
                            <h2>2. DESCRIPCIÓN DEL SERVICIO</h2>
                            <p>TODO MARKET es una plataforma de comercio electrónico que ofrece:</p>
                            <ul>
                                <li>Venta de productos de supermercado y abarrotes</li>
                                <li>Servicio de entrega a domicilio</li>
                                <li>Gestión de pedidos online</li>
                                <li>Atención al cliente especializada</li>
                            </ul>
                        </div>

                        <div className="section">
                            <h2>3. REGISTRO Y CUENTA DE USUARIO</h2>
                            <ul>
                                <li>Debe proporcionar información veraz y actualizada</li>
                                <li>Es responsable de mantener la confidencialidad de su contraseña</li>
                                <li>Debe notificar inmediatamente cualquier uso no autorizado</li>
                                <li>Solo personas mayores de 18 años pueden crear cuentas</li>
                            </ul>
                        </div>

                        <div className="section">
                            <h2>4. PEDIDOS Y PAGOS</h2>
                            <p><strong>Proceso de pedidos:</strong></p>
                            <ul>
                                <li>Los precios están sujetos a cambios sin previo aviso</li>
                                <li>Nos reservamos el derecho de cancelar pedidos por falta de stock</li>
                                <li>Los tiempos de entrega son estimados y pueden variar</li>
                                <li>El pago debe realizarse al momento de confirmar el pedido</li>
                            </ul>
                        </div>

                        <div className="section">
                            <h2>5. ENTREGAS</h2>
                            <ul>
                                <li>Entregamos en horarios de 9:00 AM a 8:00 PM</li>
                                <li>Se requiere la presencia del titular o persona autorizada</li>
                                <li>Los productos perecederos deben ser recibidos inmediatamente</li>
                                <li>Verificar el estado de los productos al momento de la entrega</li>
                            </ul>
                        </div>

                        <div className="section">
                            <h2>6. DEVOLUCIONES Y REEMBOLSOS</h2>
                            <ul>
                                <li>Productos defectuosos pueden ser devueltos en 24 horas</li>
                                <li>Los productos perecederos no admiten devolución salvo defecto</li>
                                <li>Reembolsos procesados en 3-5 días hábiles</li>
                                <li>Se requiere comprobante de compra para devoluciones</li>
                            </ul>
                        </div>

                        <div className="section">
                            <h2>7. LIMITACIÓN DE RESPONSABILIDAD</h2>
                            <p>TODO MARKET CHILE SpA no será responsable por:</p>
                            <ul>
                                <li>Daños indirectos o consecuentes</li>
                                <li>Pérdidas de datos o interrupciones del servicio</li>
                                <li>Demoras debido a casos fortuitos o fuerza mayor</li>
                                <li>Uso inadecuado de los productos adquiridos</li>
                            </ul>
                        </div>

                        <div className="contact">
                            <h2>8. CONTACTO Y SOPORTE</h2>
                            <p>Para consultas, reclamos o soporte técnico:</p>
                            <ul>
                                <li><strong>Email:</strong> soporte@todomarket.cl</li>
                                <li><strong>Teléfono:</strong> +56 2 2345 6789</li>
                                <li><strong>WhatsApp:</strong> +56 9 8765 4321</li>
                                <li><strong>Horario:</strong> Lunes a Sábado 8:00 - 20:00 hrs</li>
                            </ul>
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

export default TermsOfService;