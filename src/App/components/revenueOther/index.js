import React, { useEffect, useState} from 'react';

import Aux from "../../../hoc/_Aux";
import {Row, Col, Card, Table, Button, Form, Container, Tabs, Tab,  Breadcrumb, Pagination,InputGroup, FormControl} from 'react-bootstrap';
import UcFirst from "../UcFirst";
import { useDispatch, useSelector } from "react-redux";
import { deleteRevenues, getSearchRevenues } from '../../../store/actions/revenueAction';
import { getSearchOrderPaitOut } from '../../../store/actions/orderAction';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

const RevenueOtherIndex = (props) => {
    const revenues = useSelector(state => state.revenues.docs)
    let totalPages = useSelector(state => state.revenues.totalPages)
    let sumRevenue = useSelector(state => state.revenues.sum)
    let [active, setActive] = useState(1);

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    
    const dispatch = useDispatch()
    let pages = [];
    
    const [body, setBody] = useState({
        startDate: null, 
        endDate: null,
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
        validDateSearch();
        console.log('body', body.startDate)
        dispatch(getSearchRevenues(dispatch,'revenue/get-revenue-turn', 5, number, body.startDate, body.endDate));
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
        validDateSearch();
        dispatch(getSearchRevenues(dispatch,'revenue/get-revenue-turn', 5, 1, body.startDate, body.endDate, 'other'));
        createItem()
    }

    useEffect(() => {
        if (active === 1) {
            validDateSearch()
            dispatch(getSearchRevenues(dispatch,'revenue/get-revenue-turn', 5, 1, body.startDate, body.endDate, 'other'));
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
    }

    const driverButtomCreate = async (e) => {
        props.history.push("/revenue-other/create");
    }

    const handlerDelete = async (_id) => {
        dispatch(deleteRevenues(dispatch,'revenue', _id))
    }

    const handlerUpdate = async (id) => {
        props.history.push(`/revenue-other/edit/${id}`);
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
                                    <Card.Title as="h5">Ingresos Extras</Card.Title>
                                </Col>
                            </Row>
                            <Form onSubmit={driverSubmit}> 
                                <Row>
                                    <Col className="mt-2" md={{ span: 4, offset: 5 }}> 
                                        <Form.Label>Rango Fecha Ingreso</Form.Label>
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
                                    <Col className="mt-4"  md={{ span: 1, offset: 0 }} sm={6}> 
                                        <Button  variant="primary" onClick={searchHandler}><UcFirst text="Buscar"/></Button>
                                    </Col>
                                    <Col className="mt-4"  md={{ span: 1, offset: 1 }}> 
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
                        <Col sm={{ span: 6, offset: 3 }} md={{ span: 6, offset: 5 }} lg={{ span: 6, offset: 3 }}>
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

export default RevenueOtherIndex;