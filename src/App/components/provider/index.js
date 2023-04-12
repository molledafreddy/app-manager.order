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
        dispatch(getSearchProviders(dispatch,'provider/search', 3, number, body.search))
    }

    const searchHandler = () => {
        setActive(1);
        dispatch(getSearchProviders(dispatch,'provider/search', 3, 1, body.search));
        createItem()
    }

    useEffect(() => {
        if (active === 1) {
            dispatch(getSearchProviders(dispatch,'provider/search', 3, 1, ''));
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
                        <Table responsive hover>
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
                                    <Button variant="outline-danger" size="sm" onClick={() => handlerDelete(provider._id)}>
                                        <i className="feather icon-delete" />
                                    </Button>
                                    
                                </td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                    </Card.Body>
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
                </Card>
                </Col>
            </Row>
        </Aux>
    );
}

export default ProviderIndex;