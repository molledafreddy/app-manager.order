import React, { useEffect, useState} from 'react';

import Aux from "../../../hoc/_Aux";
import {Row, Col, Card, Table, Button, Form, Container, Tabs, Tab, Pagination,InputGroup, FormControl} from 'react-bootstrap';
import UcFirst from "../UcFirst";
import { useDispatch, useSelector } from "react-redux";
import { deleteRevenues, getSearchRevenuesOther, updateCodeErrorRevenue } from '../../../store/actions/revenueAction';
import { getSearchOrderPaitOut, updateCodeError } from '../../../store/actions/orderAction';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Swal from 'sweetalert2';
import 'react-datepicker/dist/react-datepicker.css';

const RevenueOtherIndex = (props) => {
    const revenues = useSelector(state => state.revenueOther.docs)
    let totalPages = useSelector(state => state.revenueOther.totalPages)
    let sumRevenue = useSelector(state => state.revenueOther.sum)
    let isLoadingRevenue = useSelector(state => state.isLoadingRevenue)
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
                if (number > 1 && flag === 0 && active > 1 && totalPages > 3) {
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
                // active < 3  &&
                // if ( number === 1 &&  totalPages > 3 &&  totalPages < 4) {
                //     pages.push(
                //         <Pagination.Item
                //             key={number+1}
                //             active={number+1 === active}
                //             onClick={() => pagination(number+1)}
                //         >
                //             {number+1}
                //         </Pagination.Item>
                //     );
                // }
                // permite validar paginacion cuando se esta desde el item 2 hasta el 4
                // if (number > 1 && number < 4 && active < 3  && totalPages < 3) {
                //     pages.push(
                //         <Pagination.Item
                //             key={number}
                //             active={number === active}
                //             onClick={() => pagination(number)}
                //         >
                //             {number}
                //         </Pagination.Item>
                //     );
                // }
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
        validDateSearch();
        showLoading()
        console.log('body', body.startDate)
        dispatch(getSearchRevenuesOther(dispatch,'revenue/get-revenue-turn', 10, number, body.startDate, body.endDate));
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
        showLoading()
        dispatch(getSearchRevenuesOther(dispatch,'revenue/get-revenue-turn', 10, 1, body.startDate, body.endDate, 'other'));
        createItem()
    }

    useEffect(() => {
        if (isLoadingRevenue === false) {
            Swal.close()
        }

        if (active === 1 && (revenues === undefined ) && isLoadingRevenue === false) {
            validDateSearch()
            showLoading()
            dispatch(getSearchRevenuesOther(dispatch,'revenue/get-revenue-turn', 10, 1, body.startDate, body.endDate, 'other'));
            createItem()
        }
        
    }, [dispatch, createItem(), showLoading, revenues, isLoadingRevenue]);

    
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

    // const handlerDelete = async (_id) => {
    //     dispatch(deleteRevenues(dispatch,'revenue', _id))
    // }

    const handlerUpdate = async (id) => {
        updateCodeError(dispatch);
        props.history.push(`/revenue-other/edit/${id}`);
    }

    const showLoading = () => {
        Swal.fire({
        timerProgressBar: true,
        title: 'Cargando',
        allowOutsideClick: false,
        didOpen: () => { Swal.showLoading() },
        willClose: () => {} });
        updateCodeErrorRevenue(dispatch);
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
                                    <Col className="mt-2" md={{ span: 4, offset: 4 }}> 
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
                                    <Col className="mt-4"  md={{ span: 1, offset: 0 }} sm={4} xs={5}> 
                                        <Button  variant="primary" onClick={searchHandler}><UcFirst text="Buscar"/></Button>
                                    </Col>
                                    <Col className="mt-4"  md={{ span: 1, offset: 1 }} sm={6} xs={6}> 
                                        <Button variant="primary" onClick={driverButtomCreate}><UcFirst text="crear"/></Button>
                                    </Col> 
                                </Row>
                            </Form>
                        </Container>
                    </Card.Header>
                    <Card.Body>
                        <Table striped responsive hover>
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
                                <td>{ new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(revenue?.totalAmount === undefined ? 0: revenue?.totalAmount)}</td>
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