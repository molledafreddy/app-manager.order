import React, { useEffect, useState} from 'react';

import Aux from "../../../hoc/_Aux";
import {Row, Col, Card, Table, Button, Form, Badge, Container, Pagination,InputGroup, FormControl} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { getSearchProductDeliveries } from '../../../store/actions/productDeliveryAction';


const ProductDeliveryIndex = (props) => {
    const productDelivery = useSelector(state => state.productDelivery.docs)
    let totalPages = useSelector(state => state.productDelivery.totalPages)
    let [active, setActive] = useState(1);

    const dispatch = useDispatch()
    let pages = [];
    
    const [body, setBody] = useState({
        email: "", 
        password: "",
        error: false,
        errorMsg: "",
        search: ""
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
        dispatch(getSearchProductDeliveries(dispatch,'product-delivery/search', 10, number, body.search))
    }

    const searchHandler = () => {
        setActive(1);
        dispatch(getSearchProductDeliveries(dispatch,'product-delivery/search', 10, 1, body.search));
        createItem()
    }

    useEffect(() => {
        if (active === 1) {
            dispatch(getSearchProductDeliveries(dispatch,'product-delivery/search', 10, 1, ''));
            createItem()
        }
    }, [dispatch, createItem()]);

    
    const driverSubmit =e=> {
        e.preventDefault();
    }

    const driverChangeSearch = async e => {
        setBody({
            ...body,
            [e.target.name]: e.target.value
        })
    }

    const handlerUpdate = async (id) => {
        props.history.push(`productDelivery/edit/${id}`);
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
                                    <Card.Title as="h5">Delivery</Card.Title>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={{ span: 6, offset: 4 }}> 
                                    <Form onSubmit={driverSubmit}>  
                                        <InputGroup className="mb-3">
                                            <FormControl
                                                placeholder="Ingresar producto"
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
                            </Row>
                        </Container>
                    </Card.Header>
                    <Card.Body>
                        <Table striped responsive hover>
                            <thead>
                            <tr>
                                <th>Nombre Cliente</th>
                                <th>Direccion</th>
                                <th>Telefono</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {productDelivery?.map(product =>
                                <tr key={product._id}>
                                <td>{product?.nameClient}</td>
                                <td>{product?.address}</td>
                                <td>{product?.phone}</td>
                                <td >
                                    <Badge className='badge_position text_tam' variant={`${product?.status === 'activo' ? 'primary' : product?.status === 'cancelado' ? 'danger' : product?.status === 'procesando' ? 'warning' :   'success'  }`} >
                                        {product?.status}            
                                    </Badge>
                                </td>
                                <td>
                                    <Button variant="outline-warning" size="sm" onClick={() => handlerUpdate(product._id)}>
                                        <i className="feather icon-edit-1" />
                                    </Button>
                                </td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                    </Card.Body>
                    <Row>
                        <Col xs={{ span: 7, offset: 2 }} sm={{ span: 6, offset: 2 }} md={{ span: 6, offset: 3 }}>
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

export default ProductDeliveryIndex;