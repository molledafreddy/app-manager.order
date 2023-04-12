import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import('./Demo/Dashboard/Default'));

// const UIBasicButton = React.lazy(() => import('./Demo/UIElements/Basic/Button'));
// const UIBasicBadges = React.lazy(() => import('./Demo/UIElements/Basic/Badges'));
// const UIBasicBreadcrumbPagination = React.lazy(() => import('./Demo/UIElements/Basic/BreadcrumbPagination'));

// const UIBasicCollapse = React.lazy(() => import('./Demo/UIElements/Basic/Collapse'));
// const UIBasicTabsPills = React.lazy(() => import('./Demo/UIElements/Basic/TabsPills'));
// const UIBasicBasicTypography = React.lazy(() => import('./Demo/UIElements/Basic/Typography'));

// const FormsElements = React.lazy(() => import('./Demo/Forms/FormsElements'));

// const BootstrapTable = React.lazy(() => import('./Demo/Tables/BootstrapTable'));

const Nvd3Chart = React.lazy(() => import('./Demo/Charts/Nvd3Chart/index'));

// const GoogleMap = React.lazy(() => import('./Demo/Maps/GoogleMap/index'));

// const OtherSamplePage = React.lazy(() => import('./Demo/Other/SamplePage'));
// const OtherDocs = React.lazy(() => import('./Demo/Other/Docs'));

//provider
const indexProvider = React.lazy(() => import('./App/components/provider/index'));
const createProvider = React.lazy(() => import('./App/components/provider/create'));

//account
const indexAccount = React.lazy(() => import('./App/components/account/index'));
const createAccount = React.lazy(() => import('./App/components/account/create'));

//operationBill
const indexOperationBill = React.lazy(() => import('./App/components/operationBill/index'));
const createOperationBill = React.lazy(() => import('./App/components/operationBill/create'));

//revenue
const indexRevenue = React.lazy(() => import('./App/components/revenue/index'));
const createRevenue = React.lazy(() => import('./App/components/revenue/create'));

//order
const indexOrder = React.lazy(() => import('./App/components/order/index'));
const createOrder = React.lazy(() => import('./App/components/order/create'));

//order
const indexTurn = React.lazy(() => import('./App/components/turn/index'));
const createTurn = React.lazy(() => import('./App/components/turn/create'));

//revenue-other
const indexRevenueOther = React.lazy(() => import('./App/components/revenueOther/index'));
const createRevenueOther = React.lazy(() => import('./App/components/revenueOther/create'));

//statistics
const indexStatistics = React.lazy(() => import('./App/components/statistics/index'));

const routes = [
    { path: '/dashboard/default', exact: true, name: 'Default', component: DashboardDefault },
    // { path: '/basic/button', exact: true, name: 'Basic Button', component: UIBasicButton },
    // { path: '/basic/badges', exact: true, name: 'Basic Badges', component: UIBasicBadges },
    // { path: '/basic/breadcrumb-paging', exact: true, name: 'Basic Breadcrumb Pagination', component: UIBasicBreadcrumbPagination },
    // { path: '/basic/collapse', exact: true, name: 'Basic Collapse', component: UIBasicCollapse },
    // { path: '/basic/tabs-pills', exact: true, name: 'Basic Tabs & Pills', component: UIBasicTabsPills },
    // { path: '/basic/typography', exact: true, name: 'Basic Typography', component: UIBasicBasicTypography },
    // { path: '/forms/form-basic', exact: true, name: 'Forms Elements', component: FormsElements },
    // { path: '/tables/bootstrap', exact: true, name: 'Bootstrap Table', component: BootstrapTable },
    { path: '/charts/nvd3', exact: true, name: 'Nvd3 Chart', component: Nvd3Chart },
    // { path: '/maps/google-map', exact: true, name: 'Google Map', component: GoogleMap },
    // { path: '/sample-page', exact: true, name: 'Sample Page', component: OtherSamplePage },
    
    { path: '/provider', exact: true, name: 'provider', component: indexProvider },
    { path: '/provider/create', exact: true, name: 'providerCreate', component: createProvider },
    { path: '/provider/edit/:_id', exact: true, name: 'providerEdit', component: createProvider },

    { path: '/account', exact: true, name: 'account', component: indexAccount },
    { path: '/account/create', exact: true, name: 'accountCreate', component: createAccount },
    { path: '/account/edit/:_id', exact: true, name: 'accountEdit', component: createAccount },

    { path: '/operation-bill', exact: true, name: 'operationBill', component: indexOperationBill },
    { path: '/operation-bill/create', exact: true, name: 'operationBillCreate', component: createOperationBill },
    { path: '/operation-bill/edit/:_id', exact: true, name: 'operationBillEdit', component: createOperationBill },

    { path: '/revenue', exact: true, name: 'revenue', component: indexRevenue },
    { path: '/revenue/create', exact: true, name: 'revenueCreate', component: createRevenue },
    { path: '/revenue/edit/:_id', exact: true, name: 'revenueEdit', component: createRevenue },

    { path: '/order', exact: true, name: 'order', component: indexOrder },
    { path: '/order/create', exact: true, name: 'orderCreate', component: createOrder },
    { path: '/order/edit/:_id', exact: true, name: 'orderEdit', component: createOrder },

    { path: '/turn', exact: true, name: 'turn', component: indexTurn },
    { path: '/turn/create', exact: true, name: 'turnCreate', component: createTurn },
    { path: '/turn/edit/:_id', exact: true, name: 'turnEdit', component: createTurn },

    { path: '/revenue-other', exact: true, name: 'revenueOther', component: indexRevenueOther },
    { path: '/revenue-other/create', exact: true, name: 'revenueOtherCreate', component: createRevenueOther },
    { path: '/revenue-other/edit/:_id', exact: true, name: 'revenueOtherEdit', component: createRevenueOther },

    { path: '/statistics', exact: true, name: 'statistics', component: indexStatistics },
    
    // { path: '/docs', exact: true, name: 'Documentation', component: OtherDocs },
];

export default routes;