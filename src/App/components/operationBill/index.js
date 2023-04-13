import React, { useEffect, useState} from 'react';

import Aux from "../../../hoc/_Aux";
import {Row, Col, Card, Table, Button, Form, Container,  Breadcrumb, Pagination,InputGroup, FormControl} from 'react-bootstrap';
import UcFirst from "../../components/UcFirst";
import { useDispatch, useSelector } from "react-redux";
import { getOperationBills, deleteOperationBills, getSearchOperationBills } from '../../../store/actions/operationBillAction';
import DatePicker from 'react-datepicker';
import Moment from 'react-moment';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

import "../../../../src/styles/datepiker.css";


const OperationBillIndex = (props) => {
    const operationBills = useSelector(state => state.operationBills.docs)
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
        const date = validDateSearch();
        dispatch(getSearchOperationBills(dispatch,'operation-bills/search', 5, number, body.search, date))
    }

    const searchHandler = () => {
       const date = validDateSearch();
        dispatch(getSearchOperationBills(dispatch,'operation-bills/search', 5, 1, body.search, date));
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
        if (active === 1) {
            const date = validDateSearch();
            dispatch(getSearchOperationBills(dispatch,'operation-bills/search', 5, 1, '', date));
            createItem()
        }
    }, [dispatch, createItem()]);

    
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
                                <Col md={{ span: 4, offset: 0 }}> 
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
                        <Table responsive hover>
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
                                <td>{ operation?.egress[0]?.amount}</td>
                                <td>{operation?.description}</td>
                                <td>{moment(operation?.createdAt).format("YYYY-MM-DD")}</td>
                                <td>{moment(operation?.updatedAt).format("YYYY-MM-DD")}</td>
                                <td>
                                    <Button variant="outline-warning" size="sm" onClick={() => handlerUpdate(operation?._id)}>
                                        <i className="feather icon-edit-1" />
                                    </Button>
                                    <Button variant="outline-danger" size="sm" onClick={() => handlerDelete(operation?._id)}>
                                        <i className="feather icon-delete" />
                                    </Button>
                                    
                                </td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                    </Card.Body>
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
                </Card>
                </Col>
            </Row>
        </Aux>
    );
}

export default OperationBillIndex;