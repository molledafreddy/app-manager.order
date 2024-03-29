import React, { useEffect, useState} from 'react';

import Aux from "../../../hoc/_Aux";
import {Row, Col, Card, Table, Button, Form, Container, Tabs, Tab,  Badge, Pagination,InputGroup, FormControl} from 'react-bootstrap';
import UcFirst from "../UcFirst";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { getSearchEgress } from '../../../store/actions/egressAction';
import { getSearchRevenuesStadistics } from '../../../store/actions/revenueAction';
import 'react-datepicker/dist/react-datepicker.css';
import "./styles.css";
import "../../../../src/styles/datepiker.css";
import Swal from 'sweetalert2';


const StatisticsIndex = (props) => {
    const providers = useSelector(state => state.provider)
    const egress = useSelector(state => state.egress.docs)
    let isLoadingEgress = useSelector(state => state.isLoadingEgress)
    let totalPages = useSelector(state => state.egress.totalPages)
    let sumEgress = useSelector(state => state.egress.sum)
    let [active, setActive] = useState(1);

    const revenues = useSelector(state => state.revenueStadistic.docs)
    let totalPagesRevenue = useSelector(state => state.revenueStadistic.totalPages)
    let sumRevenue = useSelector(state => state.revenueStadistic.sum)
    let isLoadingRevenue = useSelector(state => state.isLoadingRevenue)
    let [activeR, setActiveR] = useState(1);
    let [validCash, setValidCash] = useState(0);

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
        limit: 20,
        page:1,
        paymentDate: {firstDate: null, endDate: null }
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

    const createItemR = () => {
        let flagR = 0
        if (totalPagesRevenue > 0 && totalPagesRevenue <= 4) {
            for (let numberR = 1; numberR <= totalPagesRevenue; numberR++) {
                pagesR.push(
                  <Pagination.Item
                    key={numberR}
                    active={numberR === activeR}
                    onClick={() => paginationR(numberR)}
                  >
                    {numberR}
                  </Pagination.Item>
                );
            }
            return;
        } else if (totalPagesRevenue > 4) {
            for (let numberR = 1; numberR <= totalPagesRevenue; numberR++) {
                if (numberR > 1 && flagR === 0 && activeR > 1) {
                    pagesR.push( <Pagination.Ellipsis /> );
                    flagR = 1
                }
                if (numberR === 1) {
                    pagesR.push(
                        <Pagination.Item
                            key={numberR}
                            active={numberR === activeR}
                            onClick={() => paginationR(numberR)}
                        >
                            {numberR}
                        </Pagination.Item>
                    );
                }
                // permite validar paginacion cuando se esta desde el item 2 hasta el 4
                if (numberR > 1 && numberR < 4 && activeR < 3 ) {
                    pagesR.push(
                        <Pagination.Item
                            key={numberR}
                            activeR={numberR === activeR}
                            onClick={() => paginationR(numberR)}
                        >
                            {numberR}
                        </Pagination.Item>
                    );
                }
                if ( numberR === activeR && (activeR === 3 || activeR > 3) && activeR < totalPagesRevenue-1) {
                    pagesR.push(
                        <Pagination.Item
                            key={activeR-1}
                            active={numberR === activeR-1}
                            onClick={() => paginationR(activeR-1)}
                        >
                            {activeR-1}
                        </Pagination.Item>
                    );
                    pagesR.push(
                        <Pagination.Item
                            key={activeR}
                            active={numberR === activeR}
                            onClick={() => paginationR(activeR)}
                        >
                            {activeR}
                        </Pagination.Item>
                    );
                    pagesR.push(
                        <Pagination.Item
                            key={activeR+1}
                            active={numberR === activeR+1}
                            onClick={() => paginationR(active+1)}
                        >
                            {activeR+1}
                        </Pagination.Item>
                    );
                }
                if (activeR === totalPagesRevenue-1 && activeR === numberR) {
                    pagesR.push(
                        <Pagination.Item
                            key={activeR-1}
                            active={numberR === activeR-1}
                            onClick={() => paginationR(activeR-1)}
                        >
                            {activeR-1}
                        </Pagination.Item>
                    );
                    pagesR.push(
                        <Pagination.Item
                            key={numberR}
                            active={numberR === activeR}
                            onClick={() => paginationR(numberR)}
                        >
                            {numberR}
                        </Pagination.Item>
                    );
                }
    
                if (activeR === totalPagesRevenue && activeR === numberR) {
                    pagesR.push(
                        <Pagination.Item
                            key={activeR-2}
                            active={numberR === activeR-2}
                            onClick={() => paginationR(activeR-2)}
                        >
                            {activeR-2}
                        </Pagination.Item>
                    );
                    pagesR.push(
                        <Pagination.Item
                            key={activeR-1}
                            active={numberR === activeR-1}
                            onClick={() => paginationR(activeR-1)}
                        >
                            {activeR-1}
                        </Pagination.Item>
                    );
                }
                if (numberR ===  (totalPagesRevenue - 1) && activeR !== totalPagesRevenue) { pages.push( <Pagination.Ellipsis /> ); }
                if (numberR === totalPagesRevenue) {
                    pagesR.push(
                        <Pagination.Item
                            key={numberR}
                            active={numberR === activeR}
                            onClick={() => paginationR(numberR)}
                        >
                            {numberR}
                        </Pagination.Item>
                    );
                }
            }
            return;
        }
    }

    function pagination(number) {
        setActive(number);
        body.page = number; 
        setBody({...body});
        validDateSearch();
        validCashF();
        showLoading()
        dispatch(getSearchEgress(dispatch,'egress/search', body));
    }

    function paginationR(number) {
        setActiveR(number);
        body.page = number; 
        setBody({...body});
        validDateSearch();
        validCashF();
        showLoading()
        dispatch(getSearchRevenuesStadistics(dispatch,'revenue/get-revenue-turn', 20, number,  body.paymentDate.firstDate, body.paymentDate.endDate, ''));
    }

    const searchHandler = () => {
        validDateSearch();
        showLoading()
        body.page = 1;
        setBody({...body});
        // dispatch(getSearchOrder(dispatch,'order/search/detail', body));
        dispatch(getSearchEgress(dispatch,'egress/search', body));
        dispatch(getSearchRevenuesStadistics(dispatch,'revenue/get-revenue-turn', 20, 1,  body.paymentDate.firstDate, body.paymentDate.endDate, ''));
        createItem()
        createItemR()
        validCashF()
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
       
        if (isLoadingRevenue === false) {
            Swal.close()
        }
        if (isLoadingEgress === false) {
            Swal.close()
        }
        validCashF()

        if (active === 1 && (egress === undefined ) && isLoadingEgress === false) {
            showLoading()
            dispatch(getSearchEgress(dispatch,'egress/search', body));
            validCashF()
            createItem()
        }
        
        if (activeR === 1 && (revenues === undefined ) && isLoadingRevenue === false) {
            dispatch(getSearchRevenuesStadistics(dispatch,'revenue/get-revenue-turn', 20, 1,  body.paymentDate.firstDate, body.paymentDate.endDate, ''));
            validCashF()
            createItemR()
        }
    }, [dispatch, createItem(), validCashF, createItemR(), isLoadingRevenue, revenues, egress, isLoadingEgress]);

    const showLoading = () => {
        Swal.fire({
        timerProgressBar: true,
        title: 'Cargando',
        allowOutsideClick: false,
        didOpen: () => { Swal.showLoading() },
        willClose: () => {} });
    }

    const validCashF = async ()=> {
        if (sumRevenue > 0 && sumEgress > 0) {
            let sum = sumRevenue - sumEgress;
            let result = Math.sign(sum)
            console.log('result',result)
            setValidCash(result);
        }
    }

    const driverSubmit =e=> {
        e.preventDefault();
    }

    const driverChangeSearch = async e => {
        setBody({
            ...body,
            [e.target.name]: e.target.value
        })
    }

    const renderMonthContent = (month, shortMonth, longMonth) => {
        const tooltipText = `Tooltip for month: ${longMonth}`;
        return <span title={tooltipText}>{shortMonth}</span>;
    };

    // const driverButtomCreate = async (e) => {
    //     console.log('llego')
    //     props.history.push("/order/create");
    // }

    // const handlerDelete = async (_id) => {
    //     dispatch(deleteOrder(dispatch,'order', _id))
    // }

    // const handlerUpdate = async (id) => {
    //     props.history.push(`/order/edit/${id}`);
    // }

    // const handlerChangeSearch = async e => {
    //     setBody({
    //         ...body,
    //         [e.target.name]: e.target.value
    //     })
    //     console.log('e.target.name', e.target.name)
    //     console.log('e.target.value', e.target.value)
    // }
    

    // const TypePaymentMethod = [
    //     { id:1, type: "discounted" },
    //     { id:2, type: "credit" },
    //     { id:3, type: "partial" },
    //     { id:4, type: "consignment" }
    // ];

    // const TypeEgress = [
    //     { id:1, type: "orders" },
    //     { id:2, type: "operationBills" },
    //     { id:3, type: "payroll" }
    // ];

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
                            <Form className='mb-2' onSubmit={driverSubmit}>
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
                                    <Col md={{ span: 4, offset: 6 }}> 
                                        <Form.Label>Fecha Pago</Form.Label>
                                        {/* <DatePicker
                                            className="form-control input_width"
                                            selectsRange={true}
                                            startDate={paymentDateStart}
                                            endDate={paymentDateEnd}
                                            onChange={(update) => {
                                                setPaymentDateRange(update);
                                            }}
                                            isClearable={true}
                                        /> */}
                                        <DatePicker
                                        className="form-control input_width"
                                            selected={new Date()}
                                            renderMonthContent={renderMonthContent}
                                            showMonthYearPicker
                                            dateFormat="MM/yyyy"
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
                                    {/* <Col md={{ span: 2, offset: 0 }}> 
                                        <Form.Group controlId="form.ControlType">
                                            <Form.Label>Tipo Egreso</Form.Label>
                                            <Form.Control as="select" name="type" value={body?.type} onChange={handlerChangeSearch}>
                                                <option  value="">todos</option>
                                                {TypeEgress.map(egres =>
                                                    <option key={egres?.id} value={egres?.id}>{egres?.type}</option>
                                                )}
                                            </Form.Control>
                                        </Form.Group>
                                        
                                    </Col> */}
                                    <Col className='mb-2 mt-4' md={{ span: 1, offset: 0 }} sm={6}> 
                                        <Button  variant="primary" onClick={searchHandler}><UcFirst text="Buscar"/></Button>
                                    </Col> 
                                </Row>
                            </Form>
                            <Row>
                    <Col md={6} xl={6}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4 ingress_title'>Ingresos</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0 ingress_color">
                                        { new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(sumRevenue === undefined ? 0 : sumRevenue)}
                                        </h3>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={6}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4 egress_title'>Egresos</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0 egress_color">
                                            {/* <i className="feather icon-arrow-up text-c-green f-30 m-r-5"/>  */}
                                            { new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(sumEgress === undefined ? 0 : sumEgress)}
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
                                <h6 className='mb-4 egress_title'>Total Disponible</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0 ">
                                            <span className={`${validCash === -1 ? 'egress_color' : 'positive_ingress_color'}`}>
                                                { new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(sumRevenue - sumEgress)}
                                            </span>
                                        </h3>
                                    </div>
                                </div>
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
                                <Table striped responsive hover>
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
                                            <td>
                                                <Badge className='badge_position text_tam' variant={`${egres?.type === 'operationBills' ? 'warning' : 'success'}`} >
                                                    { egres?.type === 'operationBills' ? 'Gastos Operation' : 'Gastos ordenes'}           
                                                </Badge>
                                            </td>
                                            <td>{ egres?.description}</td>
                                            <td>{moment(egres?.paymentDate).format("YYYY-MM-DD")}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                                <Row>
                                    <Col sm={{ span: 5, offset: 2 }} md={{ span: 6, offset: 5 }}>
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
                            <Tab eventKey="profile" title="Ingresos">
                                <Table striped responsive hover>
                                    <thead>
                                        <tr>
                                            <th>Usuario</th>
                                            <th>Monto Ingreso</th>
                                            <th>Tipo</th>
                                            <th>Descripcion</th>
                                            <th>Fecha Creacion</th>
                                            <th>Fecha Actualizacion</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {revenues?.map(revenue =>
                                            <tr key={revenue?._id}>
                                                <td>{revenue?.users[0]?.name}</td>
                                                <td>{new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(revenue?.totalAmount === undefined ? 0 : revenue?.totalAmount) }</td>
                                                <td>
                                                    <Badge className='badge_position text_tam' variant={`${revenue?.type === 'other' ? 'warning' : 'success'}`} >
                                                        {revenue?.type === 'other' ? 'Ingreso Extra' : 'Cierre Caja'}           
                                                    </Badge>
                                                </td>
                                                
                                                <td>{revenue?.description}</td>
                                                <td>{moment(revenue?.createdAt).format("YYYY-MM-DD")}</td>
                                                <td>{moment(revenue?.updateAt).format("YYYY-MM-DD")}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                                <Row>
                                    <Col sm={{ span: 5, offset: 2 }} md={{ span: 6, offset: 5 }}>
                                        <Pagination size="sm" className="row justify-content-center">
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