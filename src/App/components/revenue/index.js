import React, {useEffect, useState} from 'react';

import Aux from "../../../hoc/_Aux";
import {Row, Col, Card, Table, Button, Form, Container, Tabs, Tab, Pagination, Badge} from 'react-bootstrap';
import UcFirst from "../UcFirst";
import { useDispatch, useSelector } from "react-redux";
import { getSearchRevenuesClosure, updateCodeError } from '../../../store/actions/revenueAction';
import { getSearchOrderPaitOut } from '../../../store/actions/orderAction';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Swal from 'sweetalert2';
import 'react-datepicker/dist/react-datepicker.css';
import "./styles.css";

const RevenueIndex = (props) => {
    const revenues = useSelector(state => state.revenuesClosure.docs)
    let totalPages = useSelector(state => state.revenuesClosure.totalPages)
    let sumRevenue = useSelector(state => state.revenuesClosure.sum)
    let isLoadingRevenue = useSelector(state => state.isLoadingRevenue)
    // const paymentHasEgressR = useSelector(state => state.paymentHasEgress);
    let [active, setActive] = useState(1);
    let [roleUser, setRoleUser] = useState('');

    const orderPaitOuts = useSelector(state => state.orderPaitOuts.docs)
    const paymentHasEgress = useSelector(state => state.orderPaitOuts.paymentHasEgress)
    let totalPagesPait = useSelector(state => state.orderPaitOuts.totalPages)
    let sumOrderPaitOut = useSelector(state => state.orderPaitOuts.sum)
    let isLoadingOrder = useSelector(state => state.isLoadingOrder)

    let [paymentWithBox, setPaymentWithBox] = useState(0);
    let [validCash, setValidCash] = useState(0);
    let [totalCash, setTotalCash] = useState(0);

    let [activePait, setActivePait] = useState(1);

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    
    const dispatch = useDispatch()
    let pages = [];
    let pagesPait = [];

    // const [paymentHasEgress, setPaymentHasEgress] = useState({
    //     id: null,
    //     payments: "",
    //     paymentAmount: "",
    //     originMoney: ""
    // });

    // const [paymentContainer, setPaymentContainer] = useState([]);
    
    const [body, setBody] = useState({
        startDate: null, 
        endDate: null,
        error: false,
        errorMsg: "",
        search: ""
    })

    const createItem = () => {
        let flag = 0
        if (totalPages > 0 && totalPages <= 4) {
            for (let number = 1; number <= totalPages; number++) {
                pages.push(
                  <Pagination.Item
                    key={number}
                    active={number === active}
                    onClick={() => pagination(number)}
                  >
                    {number}
                  </Pagination.Item>
                );
            }
            return;
        } else if (totalPages > 4) {
            for (let number = 1; number <= totalPages; number++) {
                if (number > 1 && flag === 0 && active > 1) {
                    pages.push( <Pagination.Ellipsis /> );
                    flag = 1
                }
                if (number === 1) {
                    pages.push(
                        <Pagination.Item
                            key={number}
                            active={number === active}
                            onClick={() => pagination(number)}
                        >
                            {number}
                        </Pagination.Item>
                    );
                }
                // permite validar paginacion cuando se esta desde el item 2 hasta el 4
                if (number > 1 && number < 4 && active < 3 ) {
                    pages.push(
                        <Pagination.Item
                            key={number}
                            active={number === active}
                            onClick={() => pagination(number)}
                        >
                            {number}
                        </Pagination.Item>
                    );
                }
                if ( number === active && (active === 3 || active > 3) && active < totalPages-1) {
                    pages.push(
                        <Pagination.Item
                            key={active-1}
                            active={number === active-1}
                            onClick={() => pagination(active-1)}
                        >
                            {active-1}
                        </Pagination.Item>
                    );
                    pages.push(
                        <Pagination.Item
                            key={active}
                            active={number === active}
                            onClick={() => pagination(active)}
                        >
                            {active}
                        </Pagination.Item>
                    );
                    pages.push(
                        <Pagination.Item
                            key={active+1}
                            active={number === active+1}
                            onClick={() => pagination(active+1)}
                        >
                            {active+1}
                        </Pagination.Item>
                    );
                }
                if (active === totalPages-1 && active === number) {
                    pages.push(
                        <Pagination.Item
                            key={active-1}
                            active={number === active-1}
                            onClick={() => pagination(active-1)}
                        >
                            {active-1}
                        </Pagination.Item>
                    );
                    pages.push(
                        <Pagination.Item
                            key={number}
                            active={number === active}
                            onClick={() => pagination(number)}
                        >
                            {number}
                        </Pagination.Item>
                    );
                }
    
                if (active === totalPages && active === number) {
                    pages.push(
                        <Pagination.Item
                            key={active-2}
                            active={number === active-2}
                            onClick={() => pagination(active-2)}
                        >
                            {active-2}
                        </Pagination.Item>
                    );
                    pages.push(
                        <Pagination.Item
                            key={active-1}
                            active={number === active-1}
                            onClick={() => pagination(active-1)}
                        >
                            {active-1}
                        </Pagination.Item>
                    );
                }
                if (number ===  (totalPages - 1) && active !== totalPages) { pages.push( <Pagination.Ellipsis /> ); }
                if (number === totalPages) {
                    pages.push(
                        <Pagination.Item
                            key={number}
                            active={number === active}
                            onClick={() => pagination(number)}
                        >
                            {number}
                        </Pagination.Item>
                    );
                }
            }
            return;
        }
    }

    const createItemPait = () => {
        let flagPait = 0
        if (totalPagesPait > 0 && totalPagesPait <= 4) {
            for (let numberPait = 1; numberPait <= totalPagesPait; numberPait++) {
                pagesPait.push(
                  <Pagination.Item
                    key={numberPait}
                    activePait={numberPait === activePait}
                    onClick={() => paginationPait(numberPait)}
                  >
                    {numberPait}
                  </Pagination.Item>
                );
            }
            return;
        } else if (totalPagesPait > 4) {
            for (let numberPait = 1; numberPait <= totalPages; numberPait++) {
                if (numberPait > 1 && flagPait === 0 && activePait > 1) {
                    pagesPait.push( <Pagination.Ellipsis /> );
                    flagPait = 1
                }
                if (numberPait === 1) {
                    pagesPait.push(
                        <Pagination.Item
                            key={numberPait}
                            active={numberPait === active}
                            onClick={() => paginationPait(numberPait)}
                        >
                            {numberPait}
                        </Pagination.Item>
                    );
                }
                // permite validar paginacion cuando se esta desde el item 2 hasta el 4
                if (numberPait > 1 && numberPait < 4 && activePait < 3 ) {
                    pagesPait.push(
                        <Pagination.Item
                            key={numberPait}
                            active={numberPait === activePait}
                            onClick={() => paginationPait(numberPait)}
                        >
                            {numberPait}
                        </Pagination.Item>
                    );
                }
                if ( numberPait === activePait && (activePait === 3 || activePait > 3) && activePait < totalPagesPait-1) {
                    pagesPait.push(
                        <Pagination.Item
                            key={activePait-1}
                            active={numberPait === activePait-1}
                            onClick={() => paginationPait(activePait-1)}
                        >
                            {activePait-1}
                        </Pagination.Item>
                    );
                    pagesPait.push(
                        <Pagination.Item
                            key={activePait}
                            active={numberPait === activePait}
                            onClick={() => paginationPait(activePait)}
                        >
                            {activePait}
                        </Pagination.Item>
                    );
                    pagesPait.push(
                        <Pagination.Item
                            key={activePait+1}
                            active={numberPait === activePait+1}
                            onClick={() => paginationPait(activePait+1)}
                        >
                            {activePait+1}
                        </Pagination.Item>
                    );
                }
                if (activePait === totalPagesPait-1 && activePait === numberPait) {
                    pagesPait.push(
                        <Pagination.Item
                            key={activePait-1}
                            active={numberPait === activePait-1}
                            onClick={() => paginationPait(activePait-1)}
                        >
                            {activePait-1}
                        </Pagination.Item>
                    );
                    pagesPait.push(
                        <Pagination.Item
                            key={numberPait}
                            active={numberPait === activePait}
                            onClick={() => paginationPait(numberPait)}
                        >
                            {numberPait}
                        </Pagination.Item>
                    );
                }
    
                if (activePait === totalPagesPait && activePait === numberPait) {
                    pagesPait.push(
                        <Pagination.Item
                            key={activePait-2}
                            active={numberPait === activePait-2}
                            onClick={() => paginationPait(activePait-2)}
                        >
                            {activePait-2}
                        </Pagination.Item>
                    );
                    pagesPait.push(
                        <Pagination.Item
                            key={activePait-1}
                            active={numberPait === activePait-1}
                            onClick={() => paginationPait(activePait-1)}
                        >
                            {activePait-1}
                        </Pagination.Item>
                    );
                }
                if (numberPait ===  (totalPagesPait - 1) && activePait !== totalPagesPait) { pagesPait.push( <Pagination.Ellipsis /> ); }
                if (numberPait === totalPagesPait) {
                    pagesPait.push(
                        <Pagination.Item
                            key={numberPait}
                            active={numberPait === activePait}
                            onClick={() => paginationPait(numberPait)}
                        >
                            {numberPait}
                        </Pagination.Item>
                    );
                }
            }
            return;
        }
    }

    function pagination(number) {
        setActive(number);
        validDateSearch();
        showLoading()
        console.log('body', body.startDate)
        dispatch(getSearchRevenuesClosure(dispatch,'revenue/get-revenue-turn', 10, number, body.startDate, body.endDate, 'closure'));
    }

    function paginationPait(number) {
        setActivePait(number)
        validDateSearch();
        showLoading()
        dispatch(getSearchOrderPaitOut(dispatch,'order/search-order-paitout', 10, number, 'pagado', body.startDate, body.endDate));
        
    }

    const validDateSearch = () => {
        if (startDate !== null && endDate !== null) {
            body.startDate = moment(startDate).format('MM/DD/YYYY');
            body.endDate = moment(endDate).format('MM/DD/YYYY');
        }
        setBody({...body});
    }

    const searchHandler = () => {
        setActive(1);
        setActivePait(1)
        validDateSearch();
        showLoading()
        dispatch(getSearchRevenuesClosure(dispatch,'revenue/get-revenue-turn', 10, 1, body.startDate, body.endDate, 'closure'));
        dispatch(getSearchOrderPaitOut(dispatch,'order/search-order-paitout', 10, 1, 'pagado', body.startDate, body.endDate));
        createItem()
        createItemPait()
    }

    

    useEffect(() => {
        setRoleUser(localStorage.getItem('role'));

        if (isLoadingRevenue === false) {
            Swal.close()
        }

        validCashF()
        // console.log('datos paymentHasEgress', paymentHasEgress)
        // if (paymentWithBox === 0) {
            moneyOrigin()
            closingBoxCalculations()
            
            
        // }
        
        if (isLoadingOrder === false) {
            Swal.close()
        }
        if (active === 1 && (revenues === undefined ) && isLoadingRevenue === false) {
            validDateSearch()
            showLoading()
            dispatch(getSearchRevenuesClosure(dispatch,'revenue/get-revenue-turn', 10, 1, body.startDate, body.endDate, 'closure'));
            createItem()
            
        }
        
        if (activePait === 1 && (orderPaitOuts === undefined ) && isLoadingOrder === false) {
            validDateSearch()
            dispatch(getSearchOrderPaitOut(dispatch,'order/search-order-paitout', 10, 1, 'pagado', body.startDate, body.endDate));
            createItemPait()
        }

        // if (paymentHasEgressR.length > 0 && paymentContainer.length === 0 && props.match.params._id !== undefined) {
        //     formatPaymentContainer();
        // }
    }, [dispatch, createItem(), validCashF, createItemPait(), showLoading, paymentHasEgress, moneyOrigin, isLoadingRevenue, revenues, isLoadingOrder, orderPaitOuts ]);
    
    const driverSubmit =e=> {
        e.preventDefault();
    }

    const moneyOrigin = async () => {
        let totalPaymentBox = 0
        if (paymentHasEgress?.length > 0) {
            paymentHasEgress.forEach(element => {
                if (element.originMoney === 'caja') {
                    totalPaymentBox += Number(element.paymentAmount) 
                }
            });
            setPaymentWithBox(totalPaymentBox)
        }
    }

    const closingBoxCalculations = async () => {
        let sumTotalCash = 0
        // console.log('revenues',revenues)
        if (revenues?.length > 0) {
            revenues.forEach(element => {
                // console.log('orderPaitOuts',element.amountCash)
                // if (element.originMoney === 'caja') {
                    sumTotalCash += Number(element.amountCash) 
                // }
            });
            
            setTotalCash(sumTotalCash)
        }
        validCashF()
        // console.log('totalCash',totalCash)
    }

    const validCashF = async ()=> {
        if (totalCash > 0 || paymentWithBox > 0) {
            console.log('paymentWithBox if', paymentWithBox)
            let sum = totalCash - paymentWithBox;
            let result = Math.sign(sum)
            console.log('result',result)
            setValidCash(result);
        } else {
            console.log('paymentWithBox else', paymentWithBox)
            paymentWithBox = 0;
        }
    }

    const driverButtomCreate = async (e) => {
        props.history.push("/revenue/create");
    }

    const handlerUpdate = async (id) => {
        props.history.push(`/revenue/edit/${id}`);
    }

    const handlerVieworder = async (id) => {
        props.history.push(`/revenue/view/order/${id}`);
    }

    const showLoading = () => {
        Swal.fire({
        title: 'Cargando',
        timerProgressBar: true,
        allowOutsideClick: false,
        didOpen: () => { Swal.showLoading() },
        willClose: () => {} })
        updateCodeError(dispatch);
    }

    return (
        <Aux>
            <Row>
                <Col>
                <Card>
                    <Card.Header>
                        <Container>
                            <Row>
                                <Col>
                                    <Card.Title as="h5">Cierre de Caja</Card.Title>
                                </Col>
                            </Row>
                            <Form onSubmit={driverSubmit}> 
                                <Row>
                                {/* className="mt-2"  */}
                                    <Col md={{ span: 5, offset: 3 }} sm={{ span: 5, offset: 2 }} xs={12}> 
                                        <Form.Label>Rango Fecha</Form.Label>
                                        <DatePicker
                                            className="form-control input_width"
                                            selectsRange={true}
                                            startDate={startDate}
                                            endDate={endDate}
                                            onChange={(update) => {
                                                setDateRange(update);
                                            }}
                                            isClearable={true}
                                        />
                                    </Col>
                                    <Col className='margin_buttom' md={{ span: 2, offset: 0 }} sm={2} xs={4}> 
                                        <Button variant="primary" onClick={searchHandler}><UcFirst text="Buscar"/></Button>
                                    </Col>
                                    {(roleUser !== 'Admin' && roleUser !== '' )  && (
                                        <Col className='margin_buttom' md={{ span: 2  , offset: 0 }} sm={2} xs={4}> 
                                            <Button variant="primary" onClick={driverButtomCreate}><UcFirst text="crear"/></Button>
                                        </Col>
                                    )}
                                     
                                </Row>
                            </Form>
                        </Container>
                    </Card.Header>
                    <Row>
                    <Col md={6} xl={6}>
                        <Card className='border_card_egress'>
                            <Card.Body>
                                <h6 className='mb-4 ingress_title'>Ingresos Cierres de Caja</h6>
                                <Row>
                                    <Col sm={7} md={6} xl={6}>
                                        <div className='text_card'>
                                            <span className='ubication_title'>Ingreso por Cierre:</span>
                                            <span className='ingress'>
                                                { new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(sumRevenue === undefined ? 0 : sumRevenue)}
                                            </span>
                                        </div>
                                    </Col>
                                    <Col sm={5} md={6} xl={6}>
                                        <div className='text_card'>
                                            <span className='ubication_title'>Ingreso En Efectivo:</span>
                                            <span className='ingress'>
                                                { new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(totalCash)}
                                            </span>
                                        </div>
                                    </Col>
                                    <Col sm={12} md={12} xl={12}>
                                        <div className='text_card ubication_cash'>
                                            <span className='ubication_title'>Disponible Efectivo:</span>
                                            {/* className={`${validCash === -1 ? 'egress_color' : 'positive_ingress_color'}`} */}
                                            <span className={`${validCash === -1 ? 'egress_color' : 'ingress'}`} >
                                                { new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(totalCash - paymentWithBox)}
                                            </span>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={6}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4 egress_title'>Egresos del Dia Pago Ordenes</h6>
                                <Row>
                                    <Col sm={7} md={6} xl={5}>
                                        <div className='text_card'>
                                            <span className='ubication_title'>Pagados con Caja:</span>
                                            <span className='egress_color'>
                                                { new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(paymentWithBox)}
                                            </span>
                                        </div>
                                    </Col>
                                    <Col sm={5} md={6} xl={7}>
                                        <div className='text_card'>
                                        <span className='ubication_title'>Total Pagados:</span> 
                                            <span className='egress_color'>
                                                { new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(sumOrderPaitOut === undefined ? 0 :sumOrderPaitOut)}
                                            </span> 
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    </Row>
                    <Card.Body>
                        <h5 className="mt-0">Cierres y Facturas del dia</h5>
                        <hr/>
                        <Tabs  defaultActiveKey="home" className="mb-3">
                            <Tab eventKey="home" title=" Cierres Caja">
                                <Table striped responsive hover>
                                    <thead>
                                    <tr>
                                        <th>Usuario</th>
                                        <th>Monto Sistema</th>
                                        <th>Monto turno</th>
                                        <th>Monto Punto</th>
                                        <th>Monto Efectivo</th>
                                        <th>Monto Transf</th>
                                        <th>Monto Otros</th>
                                        <th>Fondo Caja</th>
                                        <th>Validacion Cierre</th>
                                        {/* <th>Usuario Validador</th> */}
                                        {/* <th>Nota Validacion</th> */}
                                        {/* <th>Fecha Validacion</th> */}
                                        <th>Acciones</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {revenues?.map(revenue =>
                                        <tr key={revenue?._id} onClick={() => handlerUpdate(revenue?._id)}>
                                        <td>{revenue?.users[0]?.name}</td>
                                        <td>{ new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(revenue?.amountSistem === undefined ? 0 : revenue?.amountSistem)} </td>
                                        <td>{ new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(revenue?.totalAmount === undefined ? 0 : revenue?.totalAmount)}</td>
                                        <td>{ new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(revenue?.amountPos === undefined ? 0 : revenue?.amountPos)}</td>
                                        <td>{ new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(revenue?.amountCash === undefined ? 0 : revenue?.amountCash)}</td>
                                        <td>{ new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(revenue?.amountTransfer === undefined ? 0 : revenue?.amountTransfer)}</td>
                                        <td>{ new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(revenue?.amountOther === undefined ? 0 : revenue?.amountOther)}</td>
                                        <td>{ new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(revenue?.cashFund === undefined ? 0 : revenue?.cashFund)}</td>
                                        <td >
                                            <Badge className='badge_position text_tam' variant={`${revenue?.validAdmin === 'Verificado' ? 'success' : revenue?.validAdmin === 'con_error' ? 'danger' :  'warning'}`} >
                                                {revenue?.validAdmin}            
                                            </Badge>
                                        </td>
                                        {/* <td>{revenue?.usersAdmin}</td> */}
                                        {/* <td>{revenue?.noteValid}</td> */}
                                        {/* <td>{revenue?.validDate === undefined ? '' : moment( revenue?.validDate).format("YYYY-MM-DD")}</td> */}
                                        <td>
                                            <Button variant="outline-warning" size="sm" onClick={() => handlerUpdate(revenue?._id)}>
                                                <i className="feather icon-edit-1" />
                                            </Button>
                                        </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </Table>
                                <Row>
                                    <Col xs={{ span: 6, offset: 2 }} sm={{ span: 4, offset: 4 }} md={{ span: 6, offset: 3 }}>
                                        <Pagination size="sm" className="row justify-content-center">
                                            <Pagination.First
                                                onClick={() => {if (active > 1) {pagination(1);}}}
                                            />
                                            <Pagination.Prev
                                                onClick={() => {if (active > 1) {pagination(active - 1);}}}
                                            />
                                            {pages}
                                            <Pagination.Next
                                                onClick={() => {if (active < totalPages) {pagination(totalPages);}}}
                                            />
                                            <Pagination.Last 
                                                onClick={() => { if (active < totalPages) {pagination(totalPages);}}}
                                            />
                                        </Pagination>
                                    </Col>
                                </Row>
                            </Tab>
                            <Tab eventKey="profile" title="Facturas Pagadas">
                                <Table striped responsive hover>
                                    <thead>
                                        <tr>
                                            <th>Monto Pagado</th>
                                            <th>Estado</th>
                                            <th>Proveedor</th>
                                            <th>Metodo Pago</th>
                                            <th>Fecha Pago</th>
                                            <th>Fecha Recepcion</th>
                                            <th>Fecha Pedido</th>
                                            <th>Validacion Cierre</th>
                                            <th>Nota Validacion</th> 
                                            {(roleUser === 'Admin' )  && (
                                                <th>Acciones</th>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderPaitOuts?.map(order =>
                                            <tr key={order?._id}>
                                                <td>{ new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(order?.egress[0]?.amount === undefined ? 0 : order?.egress[0]?.amount)}</td>
                                                <td>{order?.status}</td>
                                                <td>{order?.providers[0]?.businessName}</td>
                                                <td>{order?.paymentMethod}</td>
                                                <td>{order?.paymentDate === undefined ? '' : order?.paymentDate === null ? '' : moment(order?.paymentDate).format("YYYY-MM-DD")}</td>
                                                <td>{order?.receptionDate === undefined ? '' : order?.receptionDate === null ? '' : moment(order?.receptionDate).format("YYYY-MM-DD")}</td>
                                                <td>{order?.orderDate === undefined ? '' : order?.orderDate === null ? '' : moment(order?.orderDate).format("YYYY-MM-DD")}</td>
                                                <td>
                                                    <Badge className='badge_position text_tam' variant={`${order?.validAdmin === 'Verificado' ? 'success' : order?.validAdmin === 'con_error' ? 'danger' : 'warning'}`} >
                                                        {order?.validAdmin}            
                                                    </Badge>
                                                </td>
                                                <td>{order?.noteValid}</td>
                                                {(roleUser === 'Admin' )  && ( 
                                                    <td>
                                                        <Button   variant="outline-warning" size="sm" onClick={() => handlerVieworder(order?._id)}>
                                                            <i className="feather icon-edit-1" />
                                                        </Button>
                                                    </td>
                                                )}
                                                
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                                <Row>
                                    <Col xs={{ span: 6, offset: 2 }} sm={{ span: 4, offset: 2 }} md={{ span: 4, offset: 2 }}>
                                        <Pagination size="sm" className="row justify-content-center">
                                            <Pagination.First
                                                onClick={() => {if (activePait > 1) {paginationPait(1);}}}
                                            />
                                            <Pagination.Prev
                                                onClick={() => {if (activePait > 1) {paginationPait(activePait - 1);}}}
                                            />
                                            {pagesPait}
                                            <Pagination.Next
                                                onClick={() => {if (activePait < totalPagesPait) {paginationPait(totalPagesPait);}}}
                                            />
                                            <Pagination.Last 
                                                onClick={() => { if (activePait < totalPagesPait) {paginationPait(totalPagesPait);}}}
                                            />
                                        </Pagination>
                                    </Col>
                                </Row>
                            </Tab>
                        </Tabs>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </Aux>
    );
}

export default RevenueIndex;