import React, { useEffect, useState} from 'react';

import Aux from "../../../hoc/_Aux";
import {Row, Col, Card, Table, Button, Form, Container, Pagination} from 'react-bootstrap';
import UcFirst from "../UcFirst";
import { useDispatch, useSelector } from "react-redux";
import { getSearchOrder, deleteOrder, updateCodeError } from '../../../store/actions/orderAction';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { getProviders } from '../../../store/actions/providerAction';
import Swal from 'sweetalert2';
import 'react-datepicker/dist/react-datepicker.css';

import "../../../../src/styles/datepiker.css";


const OrderIndex = (props) => {
    const providers = useSelector(state => state.provider)
    const orders = useSelector(state => state.orders.docs)
    let totalPages = useSelector(state => state.orders.totalPages)
    let isLoadingOrder = useSelector(state => state.isLoadingOrder)
    let [active, setActive] = useState(1);

    const dispatch = useDispatch()
    let pages = [];

    const [estimateReceptionDate, setEstimateReceptionDateRange] = useState([null, null]);
    const [estimateReceptionDateStart, estimateReceptionDateEnd] = estimateReceptionDate;

    const [paymentDate, setPaymentDateRange] = useState([null, null]);
    const [paymentDateStart, paymentDateEnd] = paymentDate;

    const [receptionDate, setReceptionDateRange] = useState([null, null]);
    const [receptionDateStart, receptionDateEnd] = receptionDate;

    const [orderDate, setOrderDateRange] = useState([null, null]);
    const [orderDateStart, orderDateEnd] = orderDate;
    
    const [body, setBody] = useState({
        _idOrder: "",
        providers: "",
        status: "",
        paymentMethod: "",
        limit: 10,
        page:1,
        date: [{
                estimateReceptionDate: { firstDate: null,endDate: null}
            },
            {
                receptionDate: { firstDate: null, endDate: null}
            },
            {
                paymentDate: {firstDate: null, endDate: null }
            },
            {
                orderDate: { firstDate: null, endDate: null}
            },
        ]
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

    function pagination(number) {
        setActive(number);
        body.page = number; 
        setBody({...body});
        validDateSearch();
        showLoading()
        dispatch(getSearchOrder(dispatch,'order/search/detail', body))
    }

    const searchHandler = () => {
        validDateSearch();
        body.page = 1;
        setBody({...body});
        showLoading()
        dispatch(getSearchOrder(dispatch,'order/search/detail', body));
        createItem()
    }

    const validDateSearch = () => {
        let date = {
            estimateReceptionDate: {
                firstDate: null,
                endDate: null,
            },
            receptionDate: {
                firstDate: null,
                endDate: null,
            },
            paymentDate: {
                firstDate: null,
                endDate: null,
            },
            orderDate: {
                firstDate: null,
                endDate: null,
            },
        }
        // providers
        if (estimateReceptionDateStart !== null && estimateReceptionDateEnd !== null) {
            date.estimateReceptionDate.firstDate = moment(estimateReceptionDateStart).format('MM/DD/YYYY');
            date.estimateReceptionDate.endDate = moment(estimateReceptionDateEnd).format('MM/DD/YYYY');
        }
        if (paymentDateStart !== null && paymentDateEnd !== null) {
            date.paymentDate.firstDate = moment(paymentDateStart).format('MM/DD/YYYY');
            date.paymentDate.endDate = moment(paymentDateEnd).format('MM/DD/YYYY');
        }
        if (receptionDateStart !== null && receptionDateEnd !== null) {
            date.receptionDate.firstDate = moment(receptionDateStart).format('MM/DD/YYYY');
            date.receptionDate.endDate = moment(receptionDateEnd).format('MM/DD/YYYY');
        }
        if (orderDateStart !== null && orderDateEnd !== null) {
            date.orderDate.firstDate = moment(orderDateStart).format('MM/DD/YYYY');
            date.orderDate.endDate = moment(orderDateEnd).format('MM/DD/YYYY');
        }  

        body.date = date; 
        setBody({...body});
        return date;
    }

    useEffect(() => {
        
        if (isLoadingOrder === false) {
            Swal.close()
        }
        if (providers === undefined || providers?.length === 0 ) {
            dispatch(getProviders(dispatch,'provider'));
        }
        
        if (active === 1 && (orders === undefined ) && isLoadingOrder === false) {
            console.log('ingreso active', active)
            
            dispatch(getSearchOrder(dispatch,'order/search/detail', body));
            showLoading()
            createItem()
        }

    }, [dispatch,  createItem(), providers, orders, isLoadingOrder]);

    const driverSubmit =e=> {
        e.preventDefault();
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
    }

    const TypePaymentMethod = [
        { id:1, type: "discounted" },
        { id:2, type: "credit" },
        { id:3, type: "partial" },
        { id:4, type: "consignment" }
    ];

    const TypeStatus = [
        { id:1, type: "requested" },
        { id:2, type: "received" },
        { id:3, type: "verified" },
        { id:4, type: "pending_for_payment" },
        { id:5, type: "paid_out" },
        { id:6, type: "no_received" },
        { id:7, type: "cancelled_provider" },
        { id:8, type: "cancelled" }
    ];

    const showLoading = () => {
        Swal.fire({
        timerProgressBar: true,
        allowOutsideClick: false,
        didOpen: () => { Swal.showLoading() },
        willClose: () => {} });
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
                                    <Card.Title as="h5">Gestion Pedidos Proveedores</Card.Title>
                                </Col>
                            </Row>
                            <Form onSubmit={driverSubmit}>
                                <Row>
                                    <Col md={{ span: 4, offset: 0 }}> 
                                        <Form.Label>Fecha Estimada Recepcion</Form.Label>
                                        <DatePicker
                                            className="form-control input_width"
                                            selectsRange={true}
                                            startDate={estimateReceptionDateStart}
                                            endDate={estimateReceptionDateEnd}
                                            onChange={(update) => {
                                                setEstimateReceptionDateRange(update);
                                            }}
                                            isClearable={true}
                                        />
                                    </Col>
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
                                    <Col md={{ span: 4, offset: 0 }}> 
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
                                    </Col>
                                    <Col md={{ span: 4, offset: 0 }}> 
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
                                    </Col>
                                    <Col md={{ span: 4, offset: 0 }}> 
                                        <Form.Group controlId="form.ControlType">
                                            <Form.Label>Proveedor</Form.Label>
                                            <Form.Control as="select" name="providers" value={body?.providers} onChange={handlerChangeSearch}>
                                                <option  value="">todos</option>
                                                {providers?.map(provider =>
                                                    <option key={provider?._id} value={provider?._id}>{provider?.businessName}</option>
                                                )}
                                            </Form.Control>
                                        </Form.Group>
                                        
                                    </Col>
                                    <Col md={{ span: 2, offset: 0 }}> 
                                        <Form.Group controlId="form.ControlType">
                                            <Form.Label>Estado</Form.Label>
                                            <Form.Control as="select" name="status" value={body?.status} onChange={handlerChangeSearch}>
                                                <option  value="">todos</option>
                                                {TypeStatus.map(status =>
                                                    <option key={status?._id} value={status?._id}>{status?.type}</option>
                                                )}
                                            </Form.Control>
                                        </Form.Group>
                                        
                                    </Col>
                                    <Col md={{ span: 2, offset: 0 }}> 
                                        <Form.Group controlId="form.ControlType">
                                            <Form.Label>Metodo Pago</Form.Label>
                                            <Form.Control as="select" name="paymentMethod" value={body?.paymentMethod} onChange={handlerChangeSearch}>
                                                <option  value="">todos</option>
                                                {TypePaymentMethod.map(method =>
                                                    <option key={method?._id} value={method?._id}>{method?.type}</option>
                                                )}
                                            </Form.Control>
                                        </Form.Group>
                                        
                                    </Col>
                                    <Col md={{ span: 1, offset: 0 }} sm={6}> 
                                        <Button  variant="primary" onClick={searchHandler}><UcFirst text="Buscar"/></Button>
                                    </Col>
                                    <Col md={{ span: 1, offset: 1 }} sm={6}> 
                                        <Button variant="primary" onClick={driverButtomCreate}><UcFirst text="crear"/></Button>
                                    </Col> 
                                </Row>
                            </Form>
                        </Container>
                    </Card.Header>
                    <Card.Body>
                        <Table responsive hover>
                            <thead>
                            <tr>
                                <th>Monto Estimado</th>
                                <th>Monto Pagado</th>
                                <th>Estado</th>
                                <th>Proveedor</th>
                                <th>Metodo Pago</th>
                                <th>Fecha Estimada Recepcion</th>
                                <th>Fecha Recepcion</th>
                                <th>Fecha Pedido</th>
                                <th>Fecha Pago</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders?.map(order =>
                                <tr key={order._id}>
                                
                                <td>{ new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(order?.estimatedAmount === undefined ? 0: order?.estimatedAmount)}</td>
                                <td>{ new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(order?.amountPaid === undefined ? 0: order?.amountPaid)}</td>
                                <td>{order?.status}</td>
                                <td>{ order?.providers[0]?.businessName}</td>
                                <td>{ order?.paymentMethod}</td>
                                <td>{order?.EstimateReceptionDate === undefined ? '' : moment(order?.EstimateReceptionDate).format("YYYY-MM-DD")}</td>
                                <td>{order?.receptionDate === undefined ? '' : moment(order?.receptionDate).format("YYYY-MM-DD")}</td>
                                <td>{order?.orderDate === undefined ? '' : moment(order?.orderDate).format("YYYY-MM-DD")}</td>
                                <td>{order?.paymentDate === undefined ? '' : moment(order?.paymentDate).format("YYYY-MM-DD")}</td>
                                <td>
                                    <Button variant="outline-warning" size="sm" onClick={() => handlerUpdate(order?._id)}>
                                        <i className="feather icon-edit-1" />
                                    </Button>
                                    {/* <Button variant="outline-danger" size="sm" onClick={() => handlerDelete(order?._id)}>
                                        <i className="feather icon-delete" />
                                    </Button> */}
                                    
                                </td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                    </Card.Body>
                    <Row>
                        <Col xs={{ span: 7, offset: 4 }} sm={{ span: 7, offset: 2 }} md={{ span: 6, offset: 5 }}>
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
                </Card>
                </Col>
            </Row>
        </Aux>
    );
}

export default OrderIndex;