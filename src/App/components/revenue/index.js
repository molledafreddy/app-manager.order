import React, {Component, useEffect, useState} from 'react';

import Aux from "../../../hoc/_Aux";
import {Row, Col, Card, Table, Button, Form, Container, Tabs, Tab,  Breadcrumb, Pagination,InputGroup, FormControl} from 'react-bootstrap';
import UcFirst from "../UcFirst";
import { useDispatch, useSelector } from "react-redux";
import { deleteRevenues, getSearchRevenues } from '../../../store/actions/revenueAction';
import { getSearchOrderPaitOut } from '../../../store/actions/orderAction';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';


const RevenueIndex = (props) => {
    const revenues = useSelector(state => state.revenues.docs)
    let totalPages = useSelector(state => state.revenues.totalPages)
    let sumRevenue = useSelector(state => state.revenues.sum)
    let [active, setActive] = useState(1);

    const orderPaitOuts = useSelector(state => state.orderPaitOuts.docs)
    let totalPagesPait = useSelector(state => state.orderPaitOuts.totalPages)
    let sumOrderPaitOut = useSelector(state => state.orderPaitOuts.sum)
    
    let [activePait, setActivePait] = useState(1);

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    
    const dispatch = useDispatch()
    let pages = [];
    let pagesPait = [];
    
    const [body, setBody] = useState({
        startDate: null, 
        endDate: null,
        error: false,
        errorMsg: "",
        search: ""
    })

    const createItem = () => {
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
    }

    const createItemPait = () => {
        for (let numberPait = 1; numberPait <= totalPagesPait; numberPait++) {
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

    function pagination(number) {
        setActive(number);
        validDateSearch();
        console.log('body', body.startDate)
        dispatch(getSearchRevenues(dispatch,'revenue/get-revenue-turn', 5, number, body.startDate, body.endDate, 'closure'));
    }

    function paginationPait(number) {
        console.log('paginationPait', number)
        setActivePait(number)
        console.log('activePait', activePait)
        validDateSearch();
        console.log('body', body.startDate)
        dispatch(getSearchOrderPaitOut(dispatch,'order/search-order-paitout', 5, number, 'paid_out', body.startDate, body.endDate));
        
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
        dispatch(getSearchRevenues(dispatch,'revenue/get-revenue-turn', 5, 1, body.startDate, body.endDate, 'closure'));
        dispatch(getSearchOrderPaitOut(dispatch,'order/search-order-paitout', 5, 1, 'paid_out', body.startDate, body.endDate));
        createItem()
        createItemPait()
    }

    useEffect(() => {
        if (active === 1) {
            validDateSearch()
            dispatch(getSearchRevenues(dispatch,'revenue/get-revenue-turn', 5, 1, body.startDate, body.endDate, 'closure'));
            createItem()
        }

        if (activePait === 1) {
            validDateSearch()
            dispatch(getSearchOrderPaitOut(dispatch,'order/search-order-paitout', 5, 1, 'paid_out', body.startDate, body.endDate));
            createItemPait()
        }
    }, [dispatch, createItem(), createItemPait()]);

    // providers
    
    const driverSubmit =e=> {
        e.preventDefault();
    }

    const driverChange = async e => {
        setBody({
            ...body,
            [e.target.name]: e.target.value
        })
    }

    const driverChangeSearch = async e => {
        setBody({
            ...body,
            [e.target.name]: e.target.value
        })
        console.log('e.target.value', e.target.value)
    }

    const driverButtomCreate = async (e) => {
        props.history.push("/revenue/create");
    }

    const handlerDelete = async (_id) => {
        dispatch(deleteRevenues(dispatch,'revenue', _id))
    }

    const handlerUpdate = async (id) => {
        props.history.push(`/revenue/edit/${id}`);
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
                                    <Col className="mt-2" md={{ span: 4, offset: 0 }}> 
                                        <Form.Label>Rango Fecha Cierre</Form.Label>
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
                                    <Col md={{ span: 1, offset: 0 }} sm={6}> 
                                        <Button  variant="primary" onClick={searchHandler}><UcFirst text="Buscar"/></Button>
                                    </Col>
                                    <Col md={{ span: 1, offset: 0 }}> 
                                        <Button variant="primary" onClick={driverButtomCreate}><UcFirst text="crear"/></Button>
                                    </Col> 
                                </Row>
                            </Form>
                        </Container>
                    </Card.Header>
                    <Row>
                    <Col md={6} xl={6}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Ingresos Venta del Dia</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                        { new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(sumRevenue)}
                                        </h3>
                                    </div>

                                    {/* <div className="col-3 text-right">
                                        <p className="m-b-0">50%</p>
                                    </div> */}
                                </div>
                                {/* <div className="progress m-t-30" style={{height: '7px'}}>
                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '50%'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"/>
                                </div> */}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={6}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Egresos del Dia</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                            {/* <i className="feather icon-arrow-up text-c-green f-30 m-r-5"/>  */}
                                            { new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(sumOrderPaitOut)}
                                        </h3>
                                    </div>

                                    {/* <div className="col-3 text-right">
                                        <p className="m-b-0">50%</p>
                                    </div> */}
                                </div>
                                {/* <div className="progress m-t-30" style={{height: '7px'}}>
                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '50%'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"/>
                                </div> */}
                            </Card.Body>
                        </Card>
                    </Col>
                    </Row>
                    <Card.Body>
                        <h5 className="mt-0">Cierres y Facturas del dia</h5>
                        <hr/>
                        <Tabs variant="pills" defaultActiveKey="home" className="mb-3">
                            <Tab eventKey="home" title=" Cierres Caja">
                                <Table responsive hover>
                                    <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Monto Sistema</th>
                                        <th>Monto turno</th>
                                        <th>Monto Punto</th>
                                        <th>Monto Efectivo</th>
                                        <th>Monto Transf</th>
                                        <th>Monto Otros</th>
                                        <th>Fondo Caja</th>
                                        <th>Acciones</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {revenues?.map(revenue =>
                                        <tr key={revenue?._id}>
                                        <td>{revenue?.users[0]?.name}</td>
                                        <td>{ new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(revenue?.amountSistem)} </td>
                                        <td>{ new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(revenue?.totalAmount)}</td>
                                        <td>{ new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(revenue?.amountPos)}</td>
                                        <td>{ new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(revenue?.amountCash)}</td>
                                        <td>{ new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(revenue?.amountTransfer)}</td>
                                        <td>{ new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(revenue?.amountOther)}</td>
                                        <td>{ new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(revenue?.cashFund)}</td>
                                        <td>
                                            <Button variant="outline-warning" size="sm" onClick={() => handlerUpdate(revenue?._id)}>
                                                <i className="feather icon-edit-1" />
                                            </Button>
                                            {/* <Button variant="outline-danger" size="sm" onClick={() => handlerDelete(revenue._id)}>
                                                <i className="feather icon-delete" />
                                            </Button> */}
                                            
                                        </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </Table>
                                <Row>
                                    <Col sm={{ span: 1, offset: 4 }} md={{ span: 6, offset: 5 }}>
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
                                <Table responsive hover>
                                    <thead>
                                        <tr>
                                        <th>Monto Pagado</th>
                                        <th>Estado</th>
                                        <th>Proveedor</th>
                                        <th>Metodo Pago</th>
                                        <th>Fecha Pago</th>
                                        <th>Fecha Recepcion</th>
                                        <th>Fecha Pedido</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderPaitOuts?.map(order =>
                                            <tr key={order?._id}>
                                            <td>$ { new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(order?.egress[0]?.amount)}</td>
                                            <td>{order?.status}</td>
                                            <td>{order?.providers[0]?.businessName}</td>
                                            <td>{order?.paymentMethod}</td>
                                            <td>{moment(order?.paymentDate).format("YYYY-MM-DD")}</td>
                                            <td>{moment(order?.receptionDate).format("YYYY-MM-DD")}</td>
                                            <td>{moment(order?.orderDate).format("YYYY-MM-DD")}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                                <Row>
                                    <Col sm={{ span: 1, offset: 4 }} md={{ span: 6, offset: 5 }}>
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