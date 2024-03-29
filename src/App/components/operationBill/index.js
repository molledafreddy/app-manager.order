import React, { useEffect, useState} from 'react';

import Aux from "../../../hoc/_Aux";
import {Row, Col, Card, Table, Button, Form, Container, Pagination,InputGroup, FormControl} from 'react-bootstrap';
import UcFirst from "../../components/UcFirst";
import { useDispatch, useSelector } from "react-redux";
import { deleteOperationBills, getSearchOperationBills, updateCodeError } from '../../../store/actions/operationBillAction';
import DatePicker from 'react-datepicker';
import Moment from 'react-moment';
import moment from 'moment';
import Swal from 'sweetalert2';
import 'react-datepicker/dist/react-datepicker.css';

import "../../../../src/styles/datepiker.css";


const OperationBillIndex = (props) => {
    const operationBills = useSelector(state => state.operationBills.docs)
    let isLoadingOperationBill = useSelector(state => state.isLoadingOperationBill)
    let totalPages = useSelector(state => state.operationBills.totalPages)
    let [active, setActive] = useState(1);

    const dispatch = useDispatch()
    let pages = [];

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    
    const [body, setBody] = useState({
        email: "", 
        password: "",
        error: false,
        errorMsg: "",
        search: "",
        startDate: null,
        endDate,
    })

    const createItem = () => {
        let flag = 0
        if (totalPages <= 4) {
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
        } else {
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
        }
    }

    function pagination(number) {
        setActive(number);
        const date = validDateSearch();
        showLoading()
        dispatch(getSearchOperationBills(dispatch,'operation-bills/search', 10, number, body.search, date))
    }

    const searchHandler = () => {
       const date = validDateSearch();
       showLoading()
        dispatch(getSearchOperationBills(dispatch,'operation-bills/search', 10, 1, body.search, date));
        createItem()
    }

    const validDateSearch = () => {
        let date = {
            startDate: null,
            endDate: null,
        }
        if (startDate !== null && endDate !== null) {
            date.startDate = moment(startDate).format('MM/DD/YYYY');
            date.endDate = moment(endDate).format('MM/DD/YYYY');
        } 
        return date;
    }

    useEffect(() => {
        if (isLoadingOperationBill === false) {
            Swal.close()
        }
    
        if (active === 1  && (operationBills === undefined ) && isLoadingOperationBill === false) {
            const date = validDateSearch();
            showLoading();
            dispatch(getSearchOperationBills(dispatch,'operation-bills/search', 10, 1, '', date));
            createItem()
        }
    }, [dispatch, createItem(), showLoading, isLoadingOperationBill, operationBills]);

    const showLoading = () => {
        Swal.fire({
        timerProgressBar: true,
        title: 'Cargando',
        allowOutsideClick: false,
        didOpen: () => { Swal.showLoading() },
        willClose: () => {} });
        updateCodeError(dispatch)
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

    const driverButtomCreate = async (e) => {
        props.history.push("/operation-bill/create");
    }

    const handlerDelete = async (_id) => {
        dispatch(deleteOperationBills(dispatch,'operation-bill', _id))
    }

    const handlerUpdate = async (id) => {
        props.history.push(`/operation-bill/edit/${id}`);
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
                                    <Card.Title as="h5">Facturas de Operacion</Card.Title>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={{ span: 4, offset: 0 }} > 
                                    <Form.Label>Fecha Registro</Form.Label>
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
                                <Col md={{ span: 5, offset: 1 }}> 
                                    <Form onSubmit={driverSubmit}>  
                                    <Form.Label>busqueda</Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl
                                                placeholder="Ingresar informacion"
                                                aria-label="Recipient's username"
                                                aria-describedby="basic-addon2"
                                                value={body?.search}
                                                name="search"
                                                onChange={driverChangeSearch}
                                            />
                                            <InputGroup.Append>
                                                <Button variant="info" onClick={searchHandler}>Buscar</Button>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Form>
                                </Col>
                                <Col md={{ span: 1, offset: 0 }}> 
                                    <Button variant="primary" onClick={driverButtomCreate}><UcFirst text="crear"/></Button>
                                </Col> 
                            </Row>
                        </Container>
                    </Card.Header>
                    <Card.Body>
                        <Table striped responsive hover>
                            <thead>
                            <tr>
                                <th>Tipo</th>
                                <th>Numero Factura</th>
                                <th>Monto</th>
                                <th>descripcion</th>
                                <th>Fecha Creacion</th>
                                <th>Fecha Actualizacion</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {operationBills?.map(operation =>
                                <tr key={operation._id}>
                                <td>{operation?.type}</td>
                                <td>{operation?.egress[0]?.invoiceNumber}</td>
                                <td>{ new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(operation?.egress[0]?.amount === undefined ? operation?.amount: operation?.egress[0]?.amount)}</td>
                                <td>{operation?.description}</td>
                                <td>{moment(operation?.createdAt).format("YYYY-MM-DD")}</td>
                                <td>{moment(operation?.updatedAt).format("YYYY-MM-DD")}</td>
                                <td>
                                    <Button variant="outline-warning" size="sm" onClick={() => handlerUpdate(operation?._id)}>
                                        <i className="feather icon-edit-1" />
                                    </Button>
                                    {/* <Button variant="outline-danger" size="sm" onClick={() => handlerDelete(operation?._id)}>
                                        <i className="feather icon-delete" />
                                    </Button> */}
                                    
                                </td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                        <Row>
                            <Col xs={12}  sm={{ span: 8, offset: 2 }} md={{ span: 6, offset: 1 }} lg={12}>
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
                    </Card.Body>
                    
                </Card>
                </Col>
            </Row>
        </Aux>
    );
}

export default OperationBillIndex;