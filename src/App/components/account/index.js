import React, {Component, useEffect, useState} from 'react';

import Aux from "../../../hoc/_Aux";
import {Row, Col, Card, Table, Button, Form, Container,  Breadcrumb, Pagination,InputGroup, FormControl} from 'react-bootstrap';
// import UcFirst from "../../../App/components/UcFirst";
import UcFirst from "../UcFirst";
import { useDispatch, useSelector } from "react-redux";
// import * as actionTypes from "../../../store/actions";
import * as actionTypes from "../../../store/actions";
import { getAccounts, deleteAccounts } from '../../../store/actions/accountAction';
import { getProviders } from '../../../store/actions/providerAction';
// import DEMO from "../../../../../../store/constant";
import DEMO from "../../../store/constant";



const AccountIndex = (props) => {
    const accounts = useSelector(state => state.accounts.docs)
    const providers = useSelector(state => state.provider)
    let totalPages = useSelector(state => state.accounts.totalPages)
    let [active, setActive] = useState(1);

    const dispatch = useDispatch()
    let pages = [];
    
    const [body, setBody] = useState({
        provider: "",
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
        dispatch(getAccounts(dispatch,'account', 5, number, body?.search))
    }

    const searchHandler = () => {
        setActive(1);
        dispatch(getAccounts(dispatch,'account', 3, 1, body?.search));
        createItem()
    }

    useEffect(() => {
        if (providers === undefined || providers?.length === 0 ) {
            dispatch(getProviders(dispatch,'provider'));
        }
        if (active === 1) {
            dispatch(getAccounts(dispatch,'account', 3, 1, ''));
            
            createItem();
        }
        
    }, [dispatch, createItem()]);

    const driverSubmit =e=> {
        e.preventDefault();
    }

    const handlerChangeSearch = async e => {
        setBody({
            ...body,
            [e.target.name]: e.target.value
        })
    }

    const driverButtomCreate = async (e) => {
        props.history.push("/account/create");
    }

    const handlerDelete = async (_id) => {
        dispatch(deleteAccounts(dispatch,'account', _id))
    }

    const handlerUpdate = async (id) => {
        props.history.push(`/account/edit/${id}`);
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
                                    <Card.Title as="h5">Cuentas de proveedores</Card.Title>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={{ span: 6, offset: 4 }}> 
                                    <Row>
                                    <Col  md={{ span: 9, offset: 0 }}>
                                    <Form onSubmit={driverSubmit}>  
                                        <Form.Group controlId="form.ControlType">
                                            <Form.Control as="select" name="search" value={body?.search} onChange={handlerChangeSearch}>
                                            <option  value="">todos</option>
                                            {providers.map(provider =>
                                                <option key={provider?._id} value={provider?._id}>{provider?.businessName}</option>
                                            )}
                                            </Form.Control>
                                        </Form.Group>
                                    </Form>
                                    </Col>
                                    <Col md={{ span: 1, offset: 0 }}>
                                        <Button variant="primary" name="search" onClick={searchHandler}><UcFirst text="Buscar"/></Button>
                                    </Col> 
                                    </Row>
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
                                <th>Numero</th>
                                <th>Tipo</th>
                                <th>Email</th>
                                <th>Banco</th>
                                <th>Proveedor</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {accounts?.map(account =>
                                <tr key={account._id}>
                                <td>{account.number}</td>
                                <td>{account.type}</td>
                                <td>{account.email}</td>
                                <td>{account?.banks[0]?.name}</td>
                                <td>{account?.providers[0]?.businessName}</td>
                                <td>
                                    <Button variant="outline-warning" size="sm" onClick={() => handlerUpdate(account._id)}>
                                        <i className="feather icon-edit-1" />
                                    </Button>
                                    <Button variant="outline-danger" size="sm" onClick={() => handlerDelete(account._id)}>
                                        <i className="feather icon-delete" />
                                    </Button>
                                </td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                    </Card.Body>
                    <Row>
                        <Col xs={{ span: 4, offset: 4 }} sm={{ span: 1, offset: 2 }} md={{ span: 6, offset: 5 }}>
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

export default AccountIndex;