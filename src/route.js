import React from 'react';

const SignUp1 = React.lazy(() => import('./Demo/Authentication/SignUp/SignUp1'));
const Signin1 = React.lazy(() => import('./Demo/Authentication/SignIn/SignIn1'));

const Signin = React.lazy(() => import('./App/components/Authentication/SignIn/SignIn'));

const route = [
    { path: '/auth/signin', exact: true, name: 'Signin', component: Signin },
    { path: '/auth/signup-1', exact: true, name: 'Signup 1', component: SignUp1 },
    { path: '/auth/signin-1', exact: true, name: 'Signin 1', component: Signin1 },
];

export default route;