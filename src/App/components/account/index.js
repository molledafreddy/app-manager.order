import React, { useEffect, useState} from 'react';

import Aux from "../../../hoc/_Aux";
import {Row, Col, Card, Table, Button, Form, Container, Pagination} from 'react-bootstrap';
import UcFirst from "../UcFirst";
import { useDispatch, useSelector } from "react-redux";
import { getAccounts, deleteAccounts } from '../../../store/actions/accountAction';
import { getProviders } from '../../../store/actions/providerAction';

const AccountIndex = (props) => {
    const accounts = useSelector(state => state.accounts.docs)
    const providers = useSelector(state => state.provider.docs)
    let totalPages = useSelector(state => state.accounts.totalPages)
    let [active, setActive] = useState(1);
    let [flagProvider, setFlagProvider] = useState(false);

    const dispatch = useDispatch()
    let pages = [];
    
    const [body, setBody] = useState({
        provider: "",
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
        dispatch(getAccounts(dispatch,'account', 5, number, body?.search))
    }

    const searchHandler = () => {
        setActive(1);
        dispatch(getAccounts(dispatch,'account', 5, 1, body?.search));
        createItem()
    }

    useEffect(() => {
        if ((providers === undefined || providers?.length === 0) && ( flagProvider === false)) {
            dispatch(getProviders(dispatch,'provider'));
            setFlagProvider(true)
        }
        if (active === 1) {
            dispatch(getAccounts(dispatch,'account', 5, 1, ''));
            createItem();
        }
        
    }, [dispatch, createItem(), providers, flagProvider, getProviders]);

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

    // const handlerDelete = async (_id) => {
    //     dispatch(deleteAccounts(dispatch,'account', _id))
    // }

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
                                            { providers?.map(provider =>
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
                        <Table striped responsive hover>
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
                                    {/* <Button variant="outline-danger" size="sm" onClick={() => handlerDelete(account._id)}>
                                        <i className="feather icon-delete" />
                                    </Button> */}
                                </td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                    </Card.Body>
                    <Row>
                        <Col xs={{ span: 4, offset: 4 }} sm={{ span: 5, offset: 2 }} md={{ span: 6, offset: 5 }}>
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

export default AccountIndex;