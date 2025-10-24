import React from 'react';
import { NavLink } from 'react-router-dom';
import './../../../../assets/scss/style.scss';
import Aux from "../../../../hoc/_Aux";

class MinimarketLanding extends React.Component {
    
    generateWhatsAppQR = (phoneNumber, message) => {
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        return `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(whatsappUrl)}`;
    };

    componentDidMount() {
        document.title = "TODO MARKET CHILE SpA - Delivery Gratis | Tu tienda de barrio";
        
        // Agregar estilos personalizados con imagen de minimarket
        const style = document.createElement('style');
        style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800;900&display=swap');
            
            .hero-gradient {
                background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)),
                           url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80') center/cover;
                position: relative;
                overflow: hidden;
                min-height: 100vh;
            }
            
            .hero-gradient::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(45deg, 
                    rgba(255, 215, 0, 0.1) 0%, 
                    rgba(255, 165, 0, 0.1) 25%, 
                    rgba(255, 140, 0, 0.05) 50%, 
                    transparent 75%);
                opacity: 0.8;
            }
            
            .hero-content {
                position: relative;
                z-index: 3;
            }
            
            .navbar-custom {
                background: linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.95) 0%, 
                    rgba(255, 248, 220, 0.95) 100%) !important;
                backdrop-filter: blur(20px);
                border-bottom: 2px solid rgba(255, 215, 0, 0.2);
                box-shadow: 0 4px 20px rgba(255, 215, 0, 0.1);
            }
            
            .logo-text {
                font-family: 'Poppins', sans-serif;
                font-weight: 800;
                letter-spacing: -0.02em;
                color: #2c3e50 !important;
                background: linear-gradient(135deg, #2c3e50, #34495e);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            
            .cta-button {
                background: linear-gradient(45deg, #FFD700, #FFA500);
                border: none;
                color: #2c3e50 !important;
                font-family: 'Poppins', sans-serif;
                font-weight: 700;
                font-size: 1rem;
                padding: 12px 25px;
                box-shadow: 0 4px 20px rgba(255, 215, 0, 0.3);
                transition: all 0.3s ease;
                border-radius: 20px;
            }
            
            .cta-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 30px rgba(255, 215, 0, 0.4);
                background: linear-gradient(45deg, #FFA500, #FF8C00);
                color: #2c3e50 !important;
            }
            
            .delivery-badge {
                background: linear-gradient(45deg, #32CD32, #00FF32);
                border: none;
                box-shadow: 0 6px 20px rgba(50, 205, 50, 0.3);
                animation: pulse-glow 2s ease-in-out infinite alternate;
                font-family: 'Poppins', sans-serif;
                font-weight: 800;
            }
            
            @keyframes pulse-glow {
                from { box-shadow: 0 6px 20px rgba(50, 205, 50, 0.3); }
                to { box-shadow: 0 6px 25px rgba(50, 205, 50, 0.5); }
            }
            
            .feature-icon {
                background: linear-gradient(135deg, #FFD700, #FFA500);
                border-radius: 50%;
                width: 80px;
                height: 80px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 1rem;
                box-shadow: 0 6px 20px rgba(255, 215, 0, 0.3);
                border: 2px solid rgba(255, 255, 255, 0.3);
            }
            
            .feature-text {
                font-family: 'Poppins', sans-serif;
                font-weight: 700;
                color: white;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
            }
            
            .feature-subtext {
                font-family: 'Poppins', sans-serif;
                font-weight: 500;
                color: rgba(255, 255, 255, 0.9);
                text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
            }
            
            .qr-card {
                backdrop-filter: blur(20px);
                background: linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.95) 0%, 
                    rgba(255, 248, 220, 0.95) 100%);
                border: 2px solid rgba(255, 215, 0, 0.3);
                box-shadow: 0 25px 70px rgba(0, 0, 0, 0.2);
            }
            
            .qr-title {
                font-family: 'Poppins', sans-serif;
                font-weight: 800;
                color: #2c3e50;
            }
            
            .qr-subtitle {
                font-family: 'Poppins', sans-serif;
                font-weight: 600;
                color: #2c3e50;
            }
            
            .whatsapp-button {
                background: linear-gradient(135deg, #25D366, #128C7E);
                border: none;
                box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
                transition: all 0.3s ease;
                font-family: 'Poppins', sans-serif;
                font-weight: 700;
            }
            
            .whatsapp-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4);
                background: linear-gradient(135deg, #128C7E, #075E54);
            }
            
            .social-button {
                background: linear-gradient(135deg, #FFD700, #FFA500);
                border: 1px solid rgba(255, 215, 0, 0.3);
                color: #2c3e50;
                font-family: 'Poppins', sans-serif;
                font-weight: 600;
                transition: all 0.3s ease;
                box-shadow: 0 2px 10px rgba(255, 215, 0, 0.2);
            }
            
            .social-button:hover {
                transform: translateY(-1px);
                background: linear-gradient(135deg, #FFA500, #FF8C00);
                box-shadow: 0 4px 15px rgba(255, 165, 0, 0.3);
                color: #2c3e50;
            }
            
            .section-title {
                font-family: 'Poppins', sans-serif;
                font-weight: 800;
                color: #2c3e50;
            }
            
            .section-subtitle {
                font-family: 'Poppins', sans-serif;
                font-weight: 600;
                color: #FFD700;
            }
            
            .product-card {
                transition: all 0.3s ease;
                border: none;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
                background: linear-gradient(145deg, #ffffff, #f8f9fa);
                font-family: 'Poppins', sans-serif;
            }
            
            .product-card:hover {
                transform: translateY(-8px) scale(1.02);
                box-shadow: 0 15px 40px rgba(255, 215, 0, 0.2);
            }
            
            .category-icon {
                width: 70px;
                height: 70px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 1.5rem;
                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
                transition: all 0.3s ease;
            }
            
            .category-icon:hover {
                transform: scale(1.1) rotate(5deg);
            }
            
            .product-title {
                font-family: 'Poppins', sans-serif;
                font-weight: 700;
                color: #2c3e50;
            }
            
            .product-description {
                font-family: 'Poppins', sans-serif;
                font-weight: 500;
                color: #666;
            }
            
            .contact-info-icon {
                color: #FFD700;
                font-size: 1.2rem;
            }
            
            .schedule-item {
                background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 165, 0, 0.1));
                border-left: 4px solid #FFD700;
                transition: all 0.3s ease;
                border-radius: 8px;
                font-family: 'Poppins', sans-serif;
            }
            
            .schedule-item:hover {
                background: linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 165, 0, 0.2));
                transform: translateX(5px);
                box-shadow: 0 4px 15px rgba(255, 215, 0, 0.2);
            }
        `;
        document.head.appendChild(style);
    }

    render() {
        const minimarketData = {
            nombre: "TODO MARKET CHILE SpA",
            telefono: "+56 9 7964 3935",
            whatsapp: "56979643935",
            direccion: "Comuna de Providencia, Santiago, Chile",
            email: "contacto@todomarket.cl",
            instagram: "@todomarket_chile",
            tiktok: "@todomarketchile",
            facebook: "todomarket"
        };

        const qrMessage = "¡Hola TodoMarket! 🛒 Me gustaría hacer un pedido. ¿Qué productos tienen disponibles hoy?";
        
        return (
            <Aux>
                {/* Navbar mejorado con logo SIN FONDO */}
                <nav className="navbar navbar-expand-lg navbar-light navbar-custom fixed-top">
                    <div className="container">
                        <a className="navbar-brand d-flex align-items-center" href="/">
                            <div className="d-flex align-items-center">
                                {/* Logo SVG sin contenedor de fondo */}
                                <svg width="40" height="40" viewBox="0 0 100 100" style={{marginRight: '12px'}}>
                                    <circle cx="50" cy="50" r="45" fill="#FF8C00" stroke="#2c3e50" strokeWidth="3"/>
                                    <text x="50" y="60" textAnchor="middle" fontSize="36" fontWeight="bold" fill="#2c3e50">75</text>
                                    <path d="M20 30 L35 30 L35 45 L45 45 L45 35 L55 35 L55 50 L70 50 L70 35 L80 35" 
                                          stroke="#2c3e50" strokeWidth="3" fill="none" strokeLinecap="round"/>
                                    <circle cx="25" cy="75" r="8" fill="#2c3e50"/>
                                    <circle cx="75" cy="75" r="8" fill="#2c3e50"/>
                                </svg>
                                <span className="logo-text" style={{fontSize: '2rem'}}>
                                    {minimarketData.nombre}
                                </span>
                            </div>
                        </a>
                        <div className="navbar-nav ml-auto">
                            <NavLink to="/auth/signin" className="btn cta-button">
                                <i className="feather icon-settings mr-2"/>
                                Panel Admin
                            </NavLink>
                        </div>
                    </div>
                </nav>

                {/* Espaciado para navbar fijo */}
                <div style={{paddingTop: '90px'}}></div>

                {/* Hero Section con fondo de supermercado */}
                <section className="hero-gradient text-white py-5">
                    <div className="container hero-content">
                        <div className="row align-items-center" style={{minHeight: '85vh'}}>
                            <div className="col-lg-6">
                                <div className="mb-4">
                                    <h1 className="main-title display-3 mb-4" style={{
                                        fontSize: '3.8rem',
                                        letterSpacing: '-0.03em',
                                        lineHeight: '1.1',
                                        color: 'white'
                                    }}>
                                        Tenemos <span style={{
                                            color: '#32CD32', 
                                            textShadow: '3px 3px 6px rgba(0,0,0,0.5)',
                                            fontWeight: '900'
                                        }}>delivery</span>
                                        <br/>
                                        <span style={{
                                            fontSize: '5rem', 
                                            fontWeight: '900', 
                                            color: '#FFD700',
                                            textShadow: '4px 4px 8px rgba(0,0,0,0.7)'
                                        }}>GRATIS</span>
                                    </h1>
                                    <p className="subtitle lead mb-4" style={{
                                        fontSize: '1.5rem',
                                        fontWeight: '600',
                                        color: 'white',
                                        maxWidth: '500px',
                                        lineHeight: '1.4'
                                    }}>
                                        Tu supermercado de barrio ahora llega hasta tu puerta. 
                                        <span style={{color: '#FFD700', fontWeight: '700'}}> Miles de productos frescos</span> y de calidad.
                                    </p>
                                </div>
                                
                                {/* Delivery Badge mejorado */}
                                <div className="delivery-badge alert text-dark mb-4 d-inline-block" style={{
                                    fontSize: '1.3rem',
                                    fontWeight: '800',
                                    padding: '20px 35px',
                                    borderRadius: '35px',
                                    border: '3px solid rgba(255, 255, 255, 0.3)'
                                }}>
                                    <i className="feather icon-truck mr-2" style={{fontSize: '1.6rem'}}/>
                                    DELIVERY GRATIS en compras SOLO sobre $1.000
                                </div>
                                
                                {/* Features mejoradas */}
                                <div className="row mt-5">
                                    <div className="col-sm-4 text-center mb-3">
                                        <div className="feature-icon">
                                            <i className="feather icon-clock text-white" style={{fontSize: '2.4rem', textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}/>
                                        </div>
                                        <h6 className="feature-text" style={{fontSize: '1rem', marginBottom: '0.5rem'}}>Horarios Extendidos</h6>
                                        <small className="feature-subtext" style={{fontSize: '0.9rem'}}>Hasta las 23:00</small>
                                    </div>
                                    <div className="col-sm-4 text-center mb-3">
                                        <div className="feature-icon">
                                            <i className="feather icon-zap text-white" style={{fontSize: '2.4rem', textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}/>
                                        </div>
                                        <h6 className="feature-text" style={{fontSize: '1rem', marginBottom: '0.5rem'}}>Entrega Rápida</h6>
                                        <small className="feature-subtext" style={{fontSize: '0.9rem'}}>20-30 minutos</small>
                                    </div>
                                    <div className="col-sm-4 text-center mb-3">
                                        <div className="feature-icon">
                                            <i className="feather icon-shield text-white" style={{fontSize: '2.4rem', textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}/>
                                        </div>
                                        <h6 className="feature-text" style={{fontSize: '1rem', marginBottom: '0.5rem'}}>Productos Frescos</h6>
                                        <small className="feature-subtext" style={{fontSize: '0.9rem'}}>Calidad garantizada</small>
                                    </div>
                                </div>
                            </div>
                            
                            {/* QR Code Section mejorado */}
                            <div className="col-lg-6 text-center">
                                <div className="qr-card p-5" style={{borderRadius: '30px'}}>
                                    <h3 className="qr-title mb-4" style={{
                                        fontSize: '2rem',
                                        marginBottom: '1.5rem'
                                    }}>
                                        <i className="feather icon-smartphone mr-3" style={{color: '#25D366', fontSize: '2.2rem'}}/>
                                        ¡Pide por WhatsApp!
                                    </h3>
                                    
                                    <div className="mb-4">
                                        <img 
                                            src={this.generateWhatsAppQR(minimarketData.whatsapp, qrMessage)}
                                            alt="QR Code WhatsApp TodoMarket"
                                            className="img-fluid"
                                            style={{
                                                maxWidth: '260px',
                                                borderRadius: '25px',
                                                boxShadow: '0 15px 50px rgba(0, 0, 0, 0.2)',
                                                border: '5px solid #FFD700'
                                            }}
                                        />
                                    </div>
                                    
                                    <p className="qr-subtitle mb-3" style={{
                                        fontSize: '1.3rem',
                                        marginBottom: '1rem'
                                    }}>
                                        Escanea y pide al instante
                                    </p>
                                    <p className="text-muted mb-4" style={{
                                        fontSize: '1.1rem', 
                                        fontWeight: '500',
                                        fontFamily: 'Poppins, sans-serif'
                                    }}>
                                        Acceso directo a WhatsApp para hacer pedidos de 
                                        <strong style={{color: '#FFD700'}}> más de 1000 productos</strong>
                                    </p>
                                    
                                    {/* Botón WhatsApp mejorado */}
                                    <div className="mb-4">
                                        <a 
                                            href={`https://wa.me/${minimarketData.whatsapp}?text=${encodeURIComponent(qrMessage)}`}
                                            className="btn whatsapp-button btn-lg mb-3 d-block text-white"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                borderRadius: '30px',
                                                padding: '18px 30px',
                                                fontSize: '1.2rem'
                                            }}
                                        >
                                            <i className="feather icon-message-circle mr-2"/>
                                            {minimarketData.telefono}
                                        </a>
                                        
                                        {/* Botones de redes sociales mejorados */}
                                        <div className="row">
                                            <div className="col-4">
                                                <a href="#" className="btn social-button instagram btn-sm d-block" style={{borderRadius: '20px', padding: '10px 8px'}}>
                                                    <i className="feather icon-instagram" style={{fontSize: '1.3rem'}}/>
                                                    <small className="d-block mt-1" style={{fontSize: '0.75rem', fontWeight: '600'}}>Instagram</small>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="#" className="btn social-button tiktok btn-sm d-block" style={{borderRadius: '20px', padding: '10px 8px'}}>
                                                    <i className="feather icon-music" style={{fontSize: '1.3rem'}}/>
                                                    <small className="d-block mt-1" style={{fontSize: '0.75rem', fontWeight: '600'}}>TikTok</small>
                                                </a>
                                            </div>
                                            <div className="col-4">
                                                <a href="#" className="btn social-button facebook btn-sm d-block" style={{borderRadius: '20px', padding: '10px 8px'}}>
                                                    <i className="feather icon-facebook" style={{fontSize: '1.3rem'}}/>
                                                    <small className="d-block mt-1" style={{fontSize: '0.75rem', fontWeight: '600'}}>Facebook</small>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Productos Section con tipografía mejorada */}
                <section className="py-5" style={{backgroundColor: '#f8f9fa'}}>
                    <div className="container">
                        <div className="text-center mb-5">
                            <h2 className="section-title" style={{
                                fontSize: '3rem',
                                marginBottom: '1rem'
                            }}>
                                Más de 1000 productos disponibles
                            </h2>
                            <p className="section-subtitle lead" style={{fontSize: '1.4rem'}}>Todo lo que necesitas para tu hogar</p>
                        </div>
                        
                        <div className="row">
                            {[
                                {
                                    title: 'Abarrotes', 
                                    desc: 'Arroz, aceite, azúcar, pasta y productos básicos', 
                                    emoji: '🌾',
                                    gradient: 'linear-gradient(135deg, #FFD700, #FFA500)'
                                },
                                {
                                    title: 'Bebidas', 
                                    desc: 'Refrescos, agua, jugos, cervezas y más', 
                                    emoji: '🥤',
                                    gradient: 'linear-gradient(135deg, #4ECDC4, #44A08D)'
                                },
                                {
                                    title: 'Lácteos', 
                                    desc: 'Leche fresca, quesos, yogurt, mantequilla', 
                                    emoji: '🥛',
                                    gradient: 'linear-gradient(135deg, #74b9ff, #0984e3)'
                                },
                                {
                                    title: 'Panadería', 
                                    desc: 'Pan fresco diario, pasteles y repostería', 
                                    emoji: '🍞',
                                    gradient: 'linear-gradient(135deg, #fdcb6e, #e17055)'
                                },
                                {
                                    title: 'Higiene y Limpieza', 
                                    desc: 'Detergentes, jabones, productos de aseo', 
                                    emoji: '🧽',
                                    gradient: 'linear-gradient(135deg, #a29bfe, #6c5ce7)'
                                },
                                {
                                    title: 'Snacks', 
                                    desc: 'Dulces, chocolates, papas y golosinas', 
                                    emoji: '🍿',
                                    gradient: 'linear-gradient(135deg, #fd79a8, #e84393)'
                                }
                            ].map((product, index) => (
                                <div key={index} className="col-md-4 mb-4">
                                    <div className="product-card card h-100 text-center" style={{borderRadius: '25px'}}>
                                        <div className="card-body p-4">
                                            <div className="category-icon" style={{
                                                background: product.gradient,
                                                fontSize: '3rem',
                                                border: '3px solid rgba(255, 215, 0, 0.3)'
                                            }}>
                                                {product.emoji}
                                            </div>
                                            <h5 className="product-title" style={{
                                                fontSize: '1.5rem',
                                                marginBottom: '1rem'
                                            }}>
                                                {product.title}
                                            </h5>
                                            <p className="product-description" style={{
                                                lineHeight: '1.6',
                                                fontSize: '1rem'
                                            }}>
                                                {product.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Mapa y Contacto con MAPA REAL */}
                <section className="bg-light py-5">
                    <div className="container">
                        <h2 className="section-title text-center mb-5" style={{fontSize: '2.8rem'}}>
                            Ubicación y Contacto
                        </h2>
                        <div className="row">
                            <div className="col-lg-6 mb-4">
                                <div className="card h-100" style={{borderRadius: '25px', border: 'none', boxShadow: '0 12px 35px rgba(0,0,0,0.1)'}}>
                                    <div className="card-body p-4">
                                        <h4 className="mb-4" style={{fontFamily: 'Poppins, sans-serif', fontWeight: '700', color: '#2c3e50'}}>
                                            <i className="feather icon-map-pin mr-2 contact-info-icon"/>
                                            ¡Encuéntranos!
                                        </h4>
                                        
                                        {/* Mapa REAL con dirección del local */}
                                        <div className="embed-responsive embed-responsive-16by9 mb-3">
                                            <iframe
                                                className="embed-responsive-item"
                                                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dRWTU7wRuIwlOg&q=${encodeURIComponent(minimarketData.direccion)}&zoom=16`}
                                                style={{
                                                    borderRadius: '20px',
                                                    border: '3px solid #FFD700',
                                                    minHeight: '250px'
                                                }}
                                                allowFullScreen=""
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                                title="Ubicación TodoMarket"
                                            />
                                        </div>
                                        
                                        <div className="contact-info">
                                            <p className="mb-3 p-3" style={{background: 'rgba(255,215,0,0.15)', borderRadius: '15px', fontFamily: 'Poppins, sans-serif'}}>
                                                <i className="feather icon-map-pin mr-2 contact-info-icon"/>
                                                <strong>{minimarketData.direccion}</strong>
                                            </p>
                                            <p className="mb-3 p-3" style={{background: 'rgba(255,215,0,0.15)', borderRadius: '15px', fontFamily: 'Poppins, sans-serif'}}>
                                                <i className="feather icon-phone mr-2 contact-info-icon"/>
                                                <a href={`tel:${minimarketData.telefono}`} className="text-decoration-none" style={{color: '#2c3e50', fontWeight: '600'}}>
                                                    {minimarketData.telefono}
                                                </a>
                                            </p>
                                            <p className="mb-3 p-3" style={{background: 'rgba(37,211,102,0.15)', borderRadius: '15px', fontFamily: 'Poppins, sans-serif'}}>
                                                <i className="feather icon-message-circle mr-2" style={{color: '#25D366'}}/>
                                                <a href={`https://wa.me/${minimarketData.whatsapp}`} className="text-success text-decoration-none" style={{fontWeight: '600'}}>
                                                    WhatsApp: {minimarketData.telefono}
                                                </a>
                                            </p>
                                            <p className="mb-0 p-3" style={{background: 'rgba(255,215,0,0.15)', borderRadius: '15px', fontFamily: 'Poppins, sans-serif'}}>
                                                <i className="feather icon-mail mr-2 contact-info-icon"/>
                                                <a href={`mailto:${minimarketData.email}`} className="text-decoration-none" style={{color: '#2c3e50', fontWeight: '600'}}>
                                                    {minimarketData.email}
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-lg-6">
                                <div className="card h-100" style={{borderRadius: '25px', border: 'none', boxShadow: '0 12px 35px rgba(0,0,0,0.1)'}}>
                                    <div className="card-body p-4">
                                        <h4 className="mb-4" style={{fontFamily: 'Poppins, sans-serif', fontWeight: '700', color: '#2c3e50'}}>
                                            <i className="feather icon-clock mr-2 contact-info-icon"/>
                                            Horarios de Atención
                                        </h4>
                                        
                                        <div className="schedule mb-4">
                                            <div className="schedule-item d-flex justify-content-between mb-3 p-3">
                                                <span style={{fontWeight: '700', color: '#2c3e50'}}>Lunes - Viernes:</span>
                                                <span style={{color: '#FFD700', fontWeight: '700', fontSize: '1.1rem'}}>7:30 AM - 00:00 AM</span>
                                            </div>
                                            <div className="schedule-item d-flex justify-content-between mb-3 p-3">
                                                <span style={{fontWeight: '700', color: '#2c3e50'}}>Sábados:</span>
                                                <span style={{color: '#FFD700', fontWeight: '700', fontSize: '1.1rem'}}>7:30 AM - 00:00 AM</span>
                                            </div>
                                            <div className="schedule-item d-flex justify-content-between mb-4 p-3">
                                                <span style={{fontWeight: '700', color: '#2c3e50'}}>Domingos:</span>
                                                <span style={{color: '#FFD700', fontWeight: '700', fontSize: '1.1rem'}}>9:00 AM - 00:00 AM</span>
                                            </div>
                                        </div>
                                        
                                        {/* Servicios Adicionales */}
                                        <h5 className="mb-3" style={{color: '#2c3e50', fontWeight: '700', fontFamily: 'Poppins, sans-serif'}}>Servicios Adicionales</h5>
                                        <ul className="list-unstyled">
                                            <li className="mb-3 p-3" style={{background: 'rgba(50,205,50,0.15)', borderRadius: '15px', fontFamily: 'Poppins, sans-serif'}}>
                                                <i className="feather icon-truck mr-2" style={{color: '#32CD32', fontSize: '1.4rem'}}/>
                                                <strong>Delivery Gratis</strong> (compras +$1.000)
                                            </li>
                                            <li className="mb-3 p-3" style={{background: 'rgba(255,215,0,0.15)', borderRadius: '15px', fontFamily: 'Poppins, sans-serif'}}>
                                                <i className="feather icon-smartphone mr-2 contact-info-icon" style={{fontSize: '1.4rem'}}/>
                                                <strong>Recarga de celular</strong> (todas las operadoras)
                                            </li>
                                            <li className="mb-3 p-3" style={{background: 'rgba(255,215,0,0.15)', borderRadius: '15px', fontFamily: 'Poppins, sans-serif'}}>
                                                <i className="feather icon-credit-card mr-2 contact-info-icon" style={{fontSize: '1.4rem'}}/>
                                                <strong>Pago de servicios públicos</strong>
                                            </li>
                                            <li className="mb-3 p-3" style={{background: 'rgba(37,211,102,0.15)', borderRadius: '15px', fontFamily: 'Poppins, sans-serif'}}>
                                                <i className="feather icon-message-circle mr-2" style={{color: '#25D366', fontSize: '1.4rem'}}/>
                                                <strong>Pedidos por WhatsApp</strong> (respuesta inmediata)
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA para Administradores con fondo de supermercado */}
                <section className="hero-gradient text-white text-center py-5">
                    <div className="container hero-content">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <h3 className="mb-4" style={{
                                    fontFamily: 'Poppins, sans-serif',
                                    fontWeight: '800', 
                                    fontSize: '2.5rem', 
                                    color: 'white',
                                    textShadow: '3px 3px 6px rgba(0,0,0,0.5)'
                                }}>
                                    ¿Administras este TODO MARKET CHILE SpA?
                                </h3>
                                <p className="lead mb-4" style={{
                                    fontSize: '1.4rem', 
                                    color: 'white', 
                                    fontWeight: '600',
                                    fontFamily: 'Poppins, sans-serif',
                                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                                }}>
                                    Gestiona inventario, ventas y pedidos desde nuestro panel administrativo
                                </p>
                                <NavLink to="/auth/signin" className="btn cta-button btn-lg" style={{
                                    fontSize: '1.3rem', 
                                    padding: '20px 45px',
                                    borderRadius: '30px'
                                }}>
                                    <i className="feather icon-settings mr-2"/>
                                    Acceder al Panel de Control
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer mejorado SIN FONDO EN LOGO */}
                <footer className="bg-dark text-white py-5">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <div className="d-flex align-items-center mb-3">
                                    <svg width="35" height="35" viewBox="0 0 100 100" style={{marginRight: '12px'}}>
                                        <circle cx="50" cy="50" r="45" fill="#FF8C00" stroke="white" strokeWidth="2"/>
                                        <text x="50" y="60" textAnchor="middle" fontSize="32" fontWeight="bold" fill="white">75</text>
                                        <circle cx="25" cy="75" r="6" fill="white"/>
                                        <circle cx="75" cy="75" r="6" fill="white"/>
                                    </svg>
                                    <h4 className="logo-text mb-0 text-white">{minimarketData.nombre}</h4>
                                </div>
                                <p className="text-muted mb-1" style={{fontFamily: 'Poppins, sans-serif'}}>Tu supermercado de barrio de confianza</p>
                                <small className="text-muted" style={{fontFamily: 'Poppins, sans-serif'}}>Delivery gratis • Productos frescos • Atención hasta la media Noche</small>
                            </div>
                            <div className="col-md-6 text-md-right">
                                <p className="mb-1" style={{fontFamily: 'Poppins, sans-serif'}}>&copy; 2025 {minimarketData.nombre}. Todos los derechos reservados.</p>
                                <small className="text-muted" style={{fontFamily: 'Poppins, sans-serif'}}>Desarrollado con ❤️ para la comunidad chilena</small>
                            </div>
                        </div>
                    </div>
                </footer>
            </Aux>
        );
    }
}

export default MinimarketLanding;