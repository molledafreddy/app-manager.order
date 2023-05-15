import React, { useState, useEffect} from 'react';

import Aux from "../../../hoc/_Aux";
import {Row, Col, Card, Table, Button, Form} from 'react-bootstrap';
import UcFirst from "../../components/UcFirst";
import { useDispatch, useSelector } from "react-redux";
import { getProviders } from '../../../store/actions/providerAction';

import { createAccounts, updateAccounts, getAccount } from '../../../store/actions/accountAction';
import { getBanks } from '../../../store/actions/bankAction';


const AccountCreate = (props) => {
   
    const dispatch = useDispatch()
    const accounts = useSelector(state => state.accounts.docs)
    const providers = useSelector(state => state.provider.docs)
    const banks = useSelector(state => state.banks)

    let [titleButtom, setTitleButtom] = useState('Crear');
    let [flagProvider, setFlagProvider] = useState(false);
    let [flagBank, setFlagBank] = useState(false);
    
    const [body, setBody] = useState({
        _id: null,
        number: "",
        type: "",
        email: "",
        banks: "",
        providers: "",
        error: false,
        errorMsg: "",
    })

    useEffect( () => {
        titleButt()
        if (props.match.params._id) {
            if ( accounts === undefined || accounts?.length === 0) {
                dispatch(getAccount(dispatch,'account', props.match.params._id));
            }

            if (accounts !== undefined || accounts?.length > 0) {
                setBody(accounts.find(prov => prov._id === props.match.params._id));
            }
        }
        console.log('provider', providers)
        if ((providers === undefined || providers.length === 0) && (!flagProvider)) {
            dispatch(getProviders(dispatch,'provider'));
            setFlagProvider(true);
        }

        if ((banks === undefined || banks.length === 0) && (!flagBank)) {
            dispatch(getBanks(dispatch,'bank'));
            setFlagBank(true)
        }

    }, [dispatch, accounts, providers, banks, flagProvider, flagBank, titleButt])

    const typeAccounts = [
        { id:1, type: "corriente" },
        { id:2, type: "vista" },
        { id:3, type: "ahorro" },
        { id:4, type: "rut" }
    ];
    
    const driverSubmit =e=> {
        e.preventDefault();
    }

    const handlerChange = async e => {
        console.log('e.target.name', e.target.name, e.target.value)
        setBody({
            ...body,
            [e.target.name]: e.target.value
        })
        
    }

    const titleButt = async (e) => {
        if (props.match.params._id) {
            setTitleButtom('Editar');
        }
    }

    const driverButtomSave = async (e) => {
        if (props.match.params._id) {
            dispatch(updateAccounts(dispatch,'account', body, props.match.params._id))
        } else {
            dispatch(createAccounts(dispatch,'account', body))
        }
        props.history.push("/account");
        return;
    }

    const handlerBack = async e => {
        props.history.push("/account");
    }

    return (
        <Aux>
            <Row>
                <Col>
                <Card>
                    <Card.Header>
                        <Row>
                            <Col md={4} xs="auto">
                                <Card.Title as="h5">Cuentas proveedor</Card.Title>
                            </Col>
                            <Col md={{ span: 1, offset: 6  }} xs={{ span: 1, offset: 3  }}>
                            <Button variant="primary" onClick={handlerBack}>Volver</Button>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col md={6}>
                                <Form onSubmit={driverSubmit}>
                                    <Form.Group controlId="form.ControlRut">
                                        <Form.Label>Numero</Form.Label>
                                        <Form.Control type="text" placeholder="Numero" name="number" value={body?.number} onChange={handlerChange} />
                                    </Form.Group>
                                    <Form.Group controlId="form.ControlEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="email" name="email"  value={body?.email} onChange={handlerChange}/>
                                        
                                    </Form.Group>
                                    <Form.Group controlId="form.ControlType">
                                        <Form.Label>Tipo Cuenta</Form.Label>
                                        <Form.Control as="select" name="type" value={body?.type} onChange={handlerChange}>
                                        <option  >selecciona...</option>
                                        {typeAccounts.map(account =>
                                            <option key={account?.id} value={account?.type}>{account?.type}</option>
                                        )}
                                        </Form.Control>
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col md={6}>
                            <Form.Group controlId="form.ControlType">
                                <Form.Label>Proveedor</Form.Label>
                                <Form.Control as="select" name="providers" value={body?.providers} onChange={handlerChange}>
                                <option  >selecciona...</option>
                                {providers?.map(provider =>
                                    <option key={provider?._id} value={provider?._id}>{provider?.businessName}</option>
                                )}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="form.ControlType">
                                <Form.Label>Banco</Form.Label>
                                <Form.Control as="select" name="banks" value={body?.banks} onChange={handlerChange}>
                                <option  >selecciona...</option>
                                {banks?.map(bank =>
                                    <option key={bank?._id} value={bank?._id}>{bank?.name}</option>
                                )}
                                </Form.Control>
                            </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Button variant="primary" onClick={driverButtomSave}>{titleButtom}</Button>                  
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </Aux>
    );
}

export default AccountCreate;