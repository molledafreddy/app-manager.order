import React, { useEffect, useState} from 'react';

import Aux from "../../../hoc/_Aux";
import {Row, Col, Card, Table, Button, Form, Container, Pagination,InputGroup, FormControl} from 'react-bootstrap';
import UcFirst from "../../components/UcFirst";
import { useDispatch, useSelector } from "react-redux";
import { deleteProviders, getSearchProviders } from '../../../store/actions/providerAction';


const ProviderIndex = (props) => {
    const providers = useSelector(state => state.provider.docs)
    let totalPages = useSelector(state => state.provider.totalPages)
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
        dispatch(getSearchProviders(dispatch,'provider/search', 6, number, body.search))
    }

    const searchHandler = () => {
        setActive(1);
        dispatch(getSearchProviders(dispatch,'provider/search', 6, 1, body.search));
        createItem()
    }

    useEffect(() => {
        if (active === 1) {
            dispatch(getSearchProviders(dispatch,'provider/search', 6, 1, ''));
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
        props.history.push("/provider/create");
    }

    const handlerDelete = async (_id) => {
        dispatch(deleteProviders(dispatch,'provider', _id))
    }

    const handlerUpdate = async (id) => {
        props.history.push(`/provider/edit/${id}`);
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
                                    <Card.Title as="h5">Proveedores</Card.Title>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={{ span: 6, offset: 4 }}> 
                                    <Form onSubmit={driverSubmit}>  
                                        <InputGroup className="mb-3">
                                            <FormControl
                                                placeholder="Ingresar proveedor"
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
                                <th>Nombre</th>
                                <th>Nombre Contacto</th>
                                <th>Telefono</th>
                                <th>Email</th>
                                <th>Rut</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {providers?.map(provider =>
                                <tr key={provider._id}>
                                <td>{provider.businessName}</td>
                                <td>{provider.contactName}</td>
                                <td>{provider.phone}</td>
                                <td>{provider.email}</td>
                                <td>{provider.rut}</td>
                                <td>
                                    <Button variant="outline-warning" size="sm" onClick={() => handlerUpdate(provider._id)}>
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

export default ProviderIndex;