import React, { useEffect, useState} from 'react';

import Aux from "../../../hoc/_Aux";
import {Row, Col, Card, Table, Button, Form, Container, Tabs, Tab,  Breadcrumb, Pagination,InputGroup, FormControl} from 'react-bootstrap';
import UcFirst from "../UcFirst";
import { useDispatch, useSelector } from "react-redux";
import { getSearchOrder, deleteOrder } from '../../../store/actions/orderAction';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { getSearchEgress } from '../../../store/actions/egressAction';
import { getSearchRevenues } from '../../../store/actions/revenueAction';

import 'react-datepicker/dist/react-datepicker.css';

import "../../../../src/styles/datepiker.css";


const StatisticsIndex = (props) => {
    const providers = useSelector(state => state.provider)
    const egress = useSelector(state => state.egress.docs)
    let totalPages = useSelector(state => state.egress.totalPages)
    let sumEgress = useSelector(state => state.egress.sum)
    let [active, setActive] = useState(1);

    const revenues = useSelector(state => state.revenues.docs)
    let totalPagesRevenue = useSelector(state => state.revenues.totalPages)
    let sumRevenue = useSelector(state => state.revenues.sum)
    let [activeR, setActiveR] = useState(1);

    const dispatch = useDispatch()
    let pages = [];
    let pagesR = [];

    // const [rangeDate, setDateRange] = useState([null, null]);
    // const [startDate, endDate] = rangeDate;

    const [paymentDate, setPaymentDateRange] = useState([null, null]);
    const [paymentDateStart, paymentDateEnd] = paymentDate;

    // const [receptionDate, setReceptionDateRange] = useState([null, null]);
    // const [receptionDateStart, receptionDateEnd] = receptionDate;

    // const [orderDate, setOrderDateRange] = useState([null, null]);
    // const [orderDateStart, orderDateEnd] = orderDate;
    
    const [body, setBody] = useState({
        _idEgress: "",
        type: "",
        limit: 10,
        page:1,
        paymentDate: {firstDate: null, endDate: null }
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

    const createItemR = () => {
        for (let number = 1; number <= totalPagesRevenue; number++) {
            pagesR.push(
              <Pagination.Item
                key={number}
                active={number === activeR}
                onClick={() => paginationR(number)}
              >
                {number}
              </Pagination.Item>
            );
        }
    }

    function pagination(number) {
        setActive(number);
        body.page = number; 
        setBody({...body});
        validDateSearch();
        dispatch(getSearchEgress(dispatch,'egress/search', body));
    }

    function paginationR(number) {
        setActiveR(number);
        body.page = number; 
        setBody({...body});
        validDateSearch();
        // dispatch(getSearchEgress(dispatch,'egress/search', body));
        dispatch(getSearchRevenues(dispatch,'revenue/get-revenue-turn', 10, number,  body.paymentDate.firstDate, body.paymentDate.endDate, ''));
    }

    const searchHandler = () => {
        validDateSearch();
        body.page = 1;
        setBody({...body});
        // dispatch(getSearchOrder(dispatch,'order/search/detail', body));
        dispatch(getSearchEgress(dispatch,'egress/search', body));
        dispatch(getSearchRevenues(dispatch,'revenue/get-revenue-turn', 10, 1,  body.paymentDate.firstDate, body.paymentDate.endDate, ''));
        createItem()
        createItemR()
    }

    const validDateSearch = () => {
        let paymentDate = {
            firstDate: null,
            endDate: null,
        }
        let date = {
            // estimateReceptionDate: {
            //     firstDate: null,
            //     endDate: null,
            // },
            // receptionDate: {
            //     firstDate: null,
            //     endDate: null,
            // },
            paymentDate: {
                firstDate: null,
                endDate: null,
            },
            // orderDate: {
            //     firstDate: null,
            //     endDate: null,
            // },
        }
        // providers
        // if (estimateReceptionDateStart !== null && estimateReceptionDateEnd !== null) {
        //     date.estimateReceptionDate.firstDate = moment(estimateReceptionDateStart).format('MM/DD/YYYY');
        //     date.estimateReceptionDate.endDate = moment(estimateReceptionDateEnd).format('MM/DD/YYYY');
        // }
        console.log('paymentDateStart', paymentDateStart)
        console.log('paymentDateEnd', paymentDateEnd)
        if (paymentDateStart !== null && paymentDateEnd !== null) {
            paymentDate.firstDate = moment(paymentDateStart).format('MM/DD/YYYY');
            paymentDate.endDate = moment(paymentDateEnd).format('MM/DD/YYYY');
        }
        // if (receptionDateStart !== null && receptionDateEnd !== null) {
        //     date.receptionDate.firstDate = moment(receptionDateStart).format('MM/DD/YYYY');
        //     date.receptionDate.endDate = moment(receptionDateEnd).format('MM/DD/YYYY');
        // }
        // if (orderDateStart !== null && orderDateEnd !== null) {
        //     date.orderDate.firstDate = moment(orderDateStart).format('MM/DD/YYYY');
        //     date.orderDate.endDate = moment(orderDateEnd).format('MM/DD/YYYY');
        // }  

        body.paymentDate = paymentDate; 
        setBody({...body});
        return date;
    }

    useEffect(() => {
        // if (providers === undefined || providers?.length === 0 ) {
        //     dispatch(getSearchEgress(dispatch,'provider'));
        // }
        if (active === 1) {
            // dispatch(getSearchOrder(dispatch,'order/search/detail', body));
            dispatch(getSearchEgress(dispatch,'egress/search', body));
            createItem()
        }

        if (activeR === 1) {
            dispatch(getSearchEgress(dispatch,'egress/search', body));
            dispatch(getSearchRevenues(dispatch,'revenue/get-revenue-turn', 10, 1,  body.paymentDate.firstDate, body.paymentDate.endDate, ''));
            createItemR()
        }
    }, [dispatch, createItem(), createItemR()]);

    
    const driverSubmit =e=> {
        e.preventDefault();
    }

    const driverChangeSearch = async e => {
        setBody({
            ...body,
            [e.target.name]: e.target.value
        })
    }

    const driverButtomCreate = async (e) => {
        console.log('llego')
        props.history.push("/order/create");
    }

    const handlerDelete = async (_id) => {
        dispatch(deleteOrder(dispatch,'order', _id))
    }

    const handlerUpdate = async (id) => {
        props.history.push(`/order/edit/${id}`);
    }

    const handlerChangeSearch = async e => {
        setBody({
            ...body,
            [e.target.name]: e.target.value
        })
        console.log('e.target.name', e.target.name)
        console.log('e.target.value', e.target.value)
    }
    

    const TypePaymentMethod = [
        { id:1, type: "discounted" },
        { id:2, type: "credit" },
        { id:3, type: "partial" },
        { id:4, type: "consignment" }
    ];

    const TypeEgress = [
        { id:1, type: "orders" },
        { id:2, type: "operationBills" },
        { id:3, type: "payroll" }
    ];

    return (
        <Aux>
            <Row>
                <Col>
                <Card>
                    <Card.Header>
                        <Container>
                            <Row>
                                <Col>
                                    <Card.Title as="h5">Balance de Ingresos y Egresos</Card.Title>
                                </Col>
                            </Row>
                            <Form onSubmit={driverSubmit}>
                                <Row>
                                    {/* <Col md={{ span: 4, offset: 0 }}> 
                                        <Form.Label>Rango de Fechas</Form.Label>
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
                                    </Col> */}
                                    <Col md={{ span: 4, offset: 0 }}> 
                                        <Form.Label>Fecha Pago</Form.Label>
                                        <DatePicker
                                            className="form-control input_width"
                                            selectsRange={true}
                                            startDate={paymentDateStart}
                                            endDate={paymentDateEnd}
                                            onChange={(update) => {
                                                setPaymentDateRange(update);
                                            }}
                                            isClearable={true}
                                        />
                                    </Col>
                                    {/* <Col md={{ span: 4, offset: 0 }}> 
                                        <Form.Label>Fecha Recepcion</Form.Label>
                                        <DatePicker
                                            className="form-control input_width"
                                            selectsRange={true}
                                            startDate={receptionDateStart}
                                            endDate={receptionDateEnd}
                                            onChange={(update) => {
                                                setReceptionDateRange(update);
                                            }}
                                            isClearable={true}
                                        />
                                    </Col> */}
                                    {/* <Col md={{ span: 4, offset: 0 }}> 
                                        <Form.Label>Fecha de Pedido</Form.Label>
                                        <DatePicker
                                            className="form-control input_width"
                                            selectsRange={true}
                                            startDate={orderDateStart}
                                            endDate={orderDateEnd}
                                            onChange={(update) => {
                                                setOrderDateRange(update);
                                            }}
                                            isClearable={true}
                                        />
                                    </Col> */}
                                    {/* <Col md={{ span: 4, offset: 0 }}> 
                                        <Form.Group controlId="form.ControlType">
                                            <Form.Label>Proveedor</Form.Label>
                                            <Form.Control as="select" name="providers" value={body?.providers} onChange={handlerChangeSearch}>
                                                <option  value="">todos</option>
                                                {providers.map(provider =>
                                                    <option key={provider?._id} value={provider?._id}>{provider?.businessName}</option>
                                                )}
                                            </Form.Control>
                                        </Form.Group>
                                        
                                    </Col> */}
                                    {/* <Col md={{ span: 2, offset: 0 }}> 
                                        <Form.Group controlId="form.ControlType">
                                            <Form.Label>Estado</Form.Label>
                                            <Form.Control as="select" name="status" value={body?.status} onChange={handlerChangeSearch}>
                                                <option  value="">todos</option>
                                                {TypeStatus.map(status =>
                                                    <option key={status?._id} value={status?._id}>{status?.type}</option>
                                                )}
                                            </Form.Control>
                                        </Form.Group>
                                        
                                    </Col> */}
                                    <Col md={{ span: 2, offset: 0 }}> 
                                        <Form.Group controlId="form.ControlType">
                                            <Form.Label>Tipo Egreso</Form.Label>
                                            <Form.Control as="select" name="type" value={body?.type} onChange={handlerChangeSearch}>
                                                <option  value="">todos</option>
                                                {TypeEgress.map(egres =>
                                                    <option key={egres?.id} value={egres?.id}>{egres?.type}</option>
                                                )}
                                            </Form.Control>
                                        </Form.Group>
                                        
                                    </Col>
                                    <Col md={{ span: 1, offset: 0 }} sm={6}> 
                                        <Button  variant="primary" onClick={searchHandler}><UcFirst text="Buscar"/></Button>
                                    </Col> 
                                </Row>
                            </Form>
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
                                            { new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(sumEgress)}
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
                        </Container>
                    </Card.Header>
                    <Card.Body>
                        <h5>Lista Ingresos Y Egresos</h5>
                        <hr/>
                        <Tabs defaultActiveKey="home">
                            <Tab eventKey="home" title="Egresos">
                                <Table responsive hover>
                                    <thead>
                                        <tr>
                                            <th>Monto Pagado</th>
                                            <th>Numero factura</th>
                                            <th>Tipo</th>
                                            <th>Descripcion</th>
                                            <th>Fecha Pago</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {egress?.map(egres =>
                                            <tr key={egres._id}>
                                            <td>{new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(egres?.amount)}</td>
                                            
                                            <td>{egres?.invoiceNumber}</td>
                                            <td>{ egres?.type}</td>
                                            <td>{ egres?.description}</td>
                                            <td>{moment(egres?.paymentDate).format("YYYY-MM-DD")}</td>
                                            {/* <td>
                                                <Button variant="outline-warning" size="sm" onClick={() => handlerUpdate(order?._id)}>
                                                    <i className="feather icon-edit-1" />
                                                </Button>
                                                <Button variant="outline-danger" size="sm" onClick={() => handlerDelete(order?._id)}>
                                                    <i className="feather icon-delete" />
                                                </Button>
                                                
                                            </td> */}
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                                <Row>
                                    <Col sm={{ span: 1, offset: 2 }} md={{ span: 6, offset: 5 }}>
                                        <Pagination size="sm" class="row justify-content-center">
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
                            <Tab eventKey="profile" title="Ingresos">
                                <Table responsive hover>
                                    <thead>
                                        <tr>
                                            <th>User</th>
                                            <th>Monto Ingreso</th>
                                            <th>Descripcion</th>
                                            <th>Fecha Creacion</th>
                                            <th>Fecha Actualizacion</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {revenues?.map(revenue =>
                                            <tr key={revenue?._id}>
                                            <td>{revenue?.users[0]?.name}</td>
                                            <td>{revenue?.totalAmount}</td>
                                            <td>{revenue?.description}</td>
                                            <td>{moment(revenue?.createdAt).format("YYYY-MM-DD")}</td>
                                            <td>{moment(revenue?.updateAt).format("YYYY-MM-DD")}</td>
                                            
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
                                    <Col sm={{ span: 1, offset: 2 }} md={{ span: 6, offset: 5 }}>
                                        <Pagination size="sm" class="row justify-content-center">
                                            <Pagination.First
                                                onClick={() => {if (activeR > 1) {pagination(1);}}}
                                            />
                                            <Pagination.Prev
                                                onClick={() => {if (activeR > 1) {pagination(activeR - 1);}}}
                                            />
                                            {pagesR}
                                            <Pagination.Next
                                                onClick={() => {if (activeR < totalPagesRevenue) {pagination(totalPagesRevenue);}}}
                                            />
                                            <Pagination.Last 
                                                onClick={() => { if (activeR < totalPagesRevenue) {pagination(totalPagesRevenue);}}}
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

export default StatisticsIndex;