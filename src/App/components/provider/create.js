import React, {Component, useState, useEffect} from 'react';

import Aux from "../../../hoc/_Aux";
import {Row, Col, Card, Table, Button, Form} from 'react-bootstrap';
// import UcFirst from "../../../App/components/UcFirst";
import UcFirst from "../../components/UcFirst";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../../store/actions";
import { getProviders, createProviders, updateProviders, getProvider } from '../../../store/actions/providerAction';

const ProviderCreate = (props) => {
   
    const dispatch = useDispatch()
    const providers = useSelector(state => state.provider.docs)
    
    let [titleButtom, setTitleButtom] = useState('Crear');
    
    const [body, setBody] = useState({
        _id: null,
        rut: "",
        businessName: "",
        web: "",
        address: "",
        type: "",
        contactName: "",
        phone: "",
        facebook: "",
        instagran: "",
        description: "",
        email: "", 
        error: false,
        errorMsg: "",
        merchandiseType: "",
    })

    useEffect( () => {
        titleButt()
        if (props.match.params._id) {
            if ( providers === undefined || providers?.length === 0) {
                dispatch(getProvider(dispatch,'provider', props.match.params._id));
            } 
            if (providers != undefined || providers?.length > 0) {
                setBody(providers.find(prov => prov._id === props.match.params._id));
            }
        }
    }, [dispatch, providers, titleButt])

    
    const typeProviders = [
        { id:1, type: "distribuidor" },
        { id:2, type: "productor" },
        { id:3, type: "fabricante" },
        { id:4, type: "otros" }
    ];
    
    const driverSubmit =e=> {
        e.preventDefault();
    }

    const handlerChange = async e => {
        setBody({
            ...body,
            [e.target.name]: e.target.value
        })
    }

    const titleButt = async (e) => {
        if (props.match.params._id) {
            setTitleButtom('Editar');
            // titleButtom = 'Editar'
            // return 'Editar';
        }
        // return 'Crear'
    }

    const driverButtomSave = async (e) => {
        if (props.match.params._id) {
            dispatch(updateProviders(dispatch,'provider', body, props.match.params._id))
        } else {
            dispatch(createProviders(dispatch,'provider', body))
        }
        props.history.push("/provider");
        return;
    }

    const handlerBack = async e => {
        props.history.push("/provider");
    }

    return (
        <Aux>
            <Row>
                <Col>
                <Card>
                    <Card.Header>
                        <Row>
                            <Col md={4}>
                                <Card.Title as="h5">Proveedor</Card.Title>
                            </Col>
                            <Col md={{ span: 1, offset: 6  }}>
                            <Button variant="primary" onClick={handlerBack}>Volver</Button>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col md={6}>
                                <Form onSubmit={driverSubmit}>
                                    <Form.Group controlId="form.ControlRut">
                                        <Form.Label>Rut</Form.Label>
                                        <Form.Control type="text" placeholder="rut" name="rut" value={body?.rut} onChange={handlerChange} />
                                    </Form.Group>
                                    <Form.Group controlId="form.ControlBusinessName">
                                        <Form.Label>Nombre Empresa</Form.Label>
                                        <Form.Control type="text" placeholder="Nombre Empresa" name="businessName" value={body?.businessName} onChange={handlerChange} />
                                    </Form.Group>
                                    <Form.Group controlId="form.ControlEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="email" name="email"  value={body?.email} onChange={handlerChange}/>
                                        
                                    </Form.Group>
                                    <Form.Group controlId="form.ControlWeb">
                                        <Form.Label>Web</Form.Label>
                                        <Form.Control type="text" placeholder="direccion web" name="web" value={body?.web} onChange={handlerChange}/>
                                    </Form.Group>
                                    <Form.Group controlId="form.ControlAddress">
                                        <Form.Label>Direccion</Form.Label>
                                        <Form.Control as="textarea" rows="3" name="address" value={body?.address} onChange={handlerChange}/>
                                    </Form.Group>
                                    <Form.Group controlId="form.ControlType">
                                        <Form.Label>Tipo Proveedor</Form.Label>
                                        <Form.Control as="select" name="type" value={body?.type} onChange={handlerChange}>
                                        <option  >selecciona...</option>
                                        {typeProviders.map(provider =>
                                            <option key={provider?.id} value={provider?.type}>{provider?.type}</option>
                                        )}
                                        </Form.Control>
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="form.ControlContactName">
                                    <Form.Label>Nombre Contacto</Form.Label>
                                <Form.Control type="text" placeholder="Nombre Contacto" name="contactName" value={body?.contactName} onChange={handlerChange}/>
                                </Form.Group>
                                <Form.Group controlId="form.ControlPhone">
                                    <Form.Label>Telefono</Form.Label>
                                    <Form.Control type="text" placeholder="Telefono" name="phone" value={body?.phone} onChange={handlerChange}/>
                                </Form.Group>
                                <Form.Group controlId="form.ControlFacebook">
                                    <Form.Label>Facebook</Form.Label>
                                    <Form.Control type="text" placeholder="Facebook" name="facebook" value={body?.facebook} onChange={handlerChange}/>
                                </Form.Group>
                                <Form.Group controlId="form.ControlInstagran">
                                    <Form.Label>Instagran</Form.Label>
                                    <Form.Control type="text" placeholder="instagran" name="instagran" value={body?.instagran} onChange={handlerChange}/>
                                </Form.Group>
                                <Form.Group controlId="form.ControlDescrption">
                                    <Form.Label>Descripcion</Form.Label>
                                    <Form.Control as="textarea" rows="3" name="description" value={body?.description} onChange={handlerChange}/>
                                </Form.Group>
                                <Form.Group controlId="form.ControlMerchandiseType">
                                        <Form.Label>Tipo de Mercancía</Form.Label>
                                        <Form.Control type="text" placeholder="direccion web" name="merchandiseType" value={body?.merchandiseType} onChange={handlerChange}/>
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

export default ProviderCreate;