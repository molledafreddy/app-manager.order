import React from 'react';

// const SignUp1 = React.lazy(() => import('./Demo/Authentication/SignUp/SignUp1'));
// const Signin1 = React.lazy(() => import('./Demo/Authentication/SignIn/SignIn1'));

const Signin = React.lazy(() => import('./App/components/Authentication/SignIn/SignIn'));
const MinimarketLanding = React.lazy(() => import('./App/components/Landing/Minimarket/MinimarketLanding'));

// Componentes legales
const PrivacyPolicy = React.lazy(() => import('./App/components/Legal/PrivacyPolicy'));
const TermsOfService = React.lazy(() => import('./App/components/Legal/TermsOfService'));
const DataDeletion = React.lazy(() => import('./App/components/Legal/DataDeletion'));

const route = [
    // Rutas públicas
    { path: '/', exact: true, name: 'Home', component: MinimarketLanding },
    { path: '/minimarket', exact: true, name: 'Minimarket Landing', component: MinimarketLanding },
    
    // Rutas legales públicas (redirigen a archivos HTML estáticos)
    { path: '/privacy-policy', exact: true, name: 'Privacy Policy', component: PrivacyPolicy },
    { path: '/terms-of-service', exact: true, name: 'Terms of Service', component: TermsOfService },
    { path: '/data-deletion', exact: true, name: 'Data Deletion', component: DataDeletion },
    
    // Rutas de autenticación
    { path: '/auth/signin', exact: true, name: 'Signin', component: Signin },
    // { path: '/auth/signup-1', exact: true, name: 'Signup 1', component: SignUp1 },
    // { path: '/auth/signin-1', exact: true, name: 'Signin 1', component: Signin1 },
];

export default route;