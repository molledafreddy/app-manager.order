import React, { useEffect, useState} from 'react';

import Aux from "../../../hoc/_Aux";
import {Row, Col, Card, Table, Button, Form, Container,  Breadcrumb, Pagination,InputGroup, FormControl} from 'react-bootstrap';
import UcFirst from "../UcFirst";
import { useDispatch, useSelector } from "react-redux";
import { getTurnForUser, deleteTurn } from '../../../store/actions/turnAction';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Swal from 'sweetalert2';
import 'react-datepicker/dist/react-datepicker.css';
import "../../../../src/styles/datepiker.css";


const TurnIndex = (props) => {
    const turns = useSelector(state => state.turns.docs)
    let totalPages = useSelector(state => state.turns.totalPages)
    let isLoadingTurn = useSelector(state => state.isLoadingTurn)
    let [active, setActive] = useState(1);

    const dispatch = useDispatch()
    let pages = [];

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    
    const [body, setBody] = useState({
        status: "", 
        type: "",
        statusPayment: "",
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
        dispatch(getTurnForUser(dispatch,'turn/search/for/user', 5, number, body.type, body.paymentType, body.status, date))
    }

    const searchHandler = () => {
        const date = validDateSearch();
        dispatch(getTurnForUser(dispatch,'turn/search/for/user', 5, 1, body.type, body.paymentType, body.status, date));
        createItem()
    }

    const handlerChangeSearch = async e => {
        setBody({
            ...body,
            [e.target.name]: e.target.value
        })
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
        if (isLoadingTurn === false) {
            console.log('llego por aca isLoadingTurn', isLoadingTurn)
            Swal.close()
        }
        if (active === 1 && (turns === undefined ) && isLoadingTurn === false) {
            const date = validDateSearch();
            showLoading()
            dispatch(getTurnForUser(dispatch,'turn/search/for/user', 5, 1, '', '', '', date));
            createItem()
        }
    }, [dispatch, createItem(), isLoadingTurn, turns]);

    
    const driverSubmit =e=> {
        e.preventDefault();
    }

    const driverChange = async e => {
        setBody({
            ...body,
            [e.target.name]: e.target.value
        })
    }

    const driverButtomCreate = async (e) => {
        console.log('datos')
        props.history.push("/turn/create");
    }

    const handlerDelete = async (_id) => {
        dispatch(deleteTurn(dispatch,'turn', _id))
    }

    const handlerUpdate = async (id) => {
        props.history.push(`/turn/edit/${id}`);
    }

    const typeTurns = [
        { id:1, type: "normal" },
        { id:2, type: "full" },
        { id:3, type: "partial" },
    ];

    const typeStatus = [
        { id:1, type: "Active" },
        { id:2, type: "Stop" },
        { id:3, type: "completed" },
    ];

    const showLoading = () => {
        Swal.fire({
        // title: 'En Proceso!',
        // html: 'Transaccion en Proceso.',
        timerProgressBar: true,
        allowOutsideClick: false,
        didOpen: () => { Swal.showLoading() },
        willClose: () => {} })
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
                                    <Card.Title as="h5">Gestion Turnos</Card.Title>
                                </Col>
                            </Row>
                            <Form onSubmit={driverSubmit}>
                                <Row>
                                    <Col md={{ span: 4, offset: 0 }}> 
                                        <Form.Group controlId="form.ControlType">
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
                                        </Form.Group>
                                    </Col>
                                    <Col md={{ span: 3, offset: 0 }}> 
                                        <Form.Group controlId="form.ControlType">
                                            <Form.Label>Tipo Turno</Form.Label>
                                            <Form.Control as="select" name="type" value={body?.type} onChange={handlerChangeSearch}>
                                                <option key={`type_`}  value="">todos</option>
                                                {typeTurns.map(turn =>
                                                    <option key={`type_`+turn?.id} value={turn?.type}>{turn?.type}</option>
                                                )}
                                            </Form.Control>
                                        </Form.Group>
                                        
                                    </Col>
                                    <Col md={{ span: 3, offset: 0 }} sm={{ span: 5, offset: 0 }}> 
                                        <Form.Group controlId="form.ControlStatus">
                                            <Form.Label>Estatus</Form.Label>
                                            <Form.Control as="select" name="status" value={body?.status} onChange={handlerChangeSearch}>
                                                <option key={`status_`}  value="">todos</option>
                                                {typeStatus.map(status =>
                                                    <option key={`status_`+status?.id} value={status?.type}>{status?.type}</option>
                                                )}
                                            </Form.Control>
                                        </Form.Group>
                                        
                                    </Col>
                                    <Col md={{ span: 3, offset: 0 }} sm={4} xs={6}> 
                                        <Button className='mt-4'  variant="primary" onClick={searchHandler}><UcFirst text="Buscar"/></Button>
                                    </Col>
                                    <Col md={{ span: 5, offset: 0 }} xs={3}> 
                                        <Button className='mt-4  ml-5' variant="primary" onClick={driverButtomCreate}><UcFirst text="crear"/></Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Container>
                    </Card.Header>
                    <Card.Body>
                        <Table responsive hover>
                            <thead>
                            <tr>
                                <th>Tipo</th>
                                <th>Inicio</th>
                                <th>Final</th>
                                <th>Estado</th>
                                <th>Nota</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {turns?.map(turn =>
                                <tr key={turn._id}>
                                <td>{turn?.type}</td>
                                <td>{moment(turn?.createdAt).format("YYYY-MM-DD")}</td>
                                <td>{moment(turn?.endDate).format("YYYY-MM-DD")}</td>
                                <td>{turn?.status}</td>
                                <td>{turn?.description}</td>
                                <td>
                                    <Button variant="outline-warning" size="sm" onClick={() => handlerUpdate(turn?._id)}>
                                        <i className="feather icon-edit-1" />
                                    </Button>
                                    <Button variant="outline-danger" size="sm" onClick={() => handlerDelete(turn?._id)}>
                                        <i className="feather icon-delete" />
                                    </Button>
                                    
                                </td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                        <Row>
                            <Col sm={{ span: 5, offset: 3 }} md={{ span: 6, offset: 5 }}>
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

export default TurnIndex;