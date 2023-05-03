import React, { useState, useEffect} from 'react';

import Aux from "../../../hoc/_Aux";
import {Row, Col, Card, Button, Form} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { createProviders, updateCodeErrorProvider, updateProviders, getProvider } from '../../../store/actions/providerAction';
import Swal from 'sweetalert2';
import { Controller, useForm} from 'react-hook-form';
import "./styles.css";

const ProviderCreate = (props) => {
   
    const dispatch = useDispatch()
    const providers = useSelector(state => state.provider.docs)
    const errorProvider = useSelector(state => state.errorProvider);
    const statusCodeProvider = useSelector(state => state.statusCodeProvider);
    
    let [titleButtom, setTitleButtom] = useState('Crear');
    let [validProcess, setValidProcess] = useState(false);
    
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

        if (errorProvider?.code !== undefined  && !validProcess) {
            console.log('ingreso if errorOrder', errorProvider)
            showAlert("Error en el proceso", errorProvider?.message, "error",4000);
            setValidProcess(true);
            setTimeout(() => {
                setValidProcess(false);
            }, 5000);
        } else if (statusCodeProvider === '200' && errorProvider.length === 0) {
            console.log('ingreso al redirect', statusCodeProvider)
            Swal.close()
            validRedirect()
        }

        if (props.match.params._id) {
            if ( providers === undefined || providers?.length === 0) {
                console.log('props.match.params._id', props.match.params._id)
                dispatch(getProvider(dispatch,'provider', props.match.params._id));
            } 
            console.log('props.match.params._id providers', providers)
            if (providers !== undefined || providers?.length > 0) {
                
                // setBody(providers.find(prov => prov._id === props.match.params._id));
                const dataProvider = providers.find(prov => prov._id === props.match.params._id);
                setValuesProvider(dataProvider)
            }
        }
    }, [dispatch, providers, errorProvider, statusCodeProvider, validRedirect, titleButt])

    const setValuesProvider = async (data) => {
        console.log('ingreso por aca setValuesProvider', data)
        reset(formValues => ({
            _id: data._id,
            rut: data?.rut,
            businessName: data?.businessName,
            web: data?.web,
            address: data?.address,
            type: data?.type,
            contactName: data?.contactName,
            phone: data?.phone,
            facebook: data?.facebook,
            instagran: data?.instagran,
            description: data?.description,
            email: data?.email,
            merchandiseType: data?.merchandiseType,
        }))
    }

    const typeProviders = [
        { id:1, type: "distribuidor" },
        { id:2, type: "productor" },
        { id:3, type: "fabricante" },
        { id:4, type: "otros" }
    ];
    
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

    const handlerBack = async e => {
        props.history.push("/provider");
    }

    const { register, handleSubmit, reset, formState: { errors }} = useForm({mode:  "all", reValidateMode: "onChange"});
        
        const onSubmit = (dataInfo) => {
            if (props.match.params._id) {
                dispatch(updateProviders(dispatch,'provider', dataInfo, props.match.params._id));
                showLoading();
            } else {
                dispatch(createProviders(dispatch,'provider', dataInfo));
                showLoading();
            }
        }

        const validRedirect = () => {
            showAlert( "Transaccion exitosa", "El proceso se realizo con exito.", "success",3000);
            dispatch(updateCodeErrorProvider(dispatch));
            props.history.push("/provider");
            return;
        }

        const messages = {
            required: "Este campo es obligatorio",
            name: "El formato introducido no es el correcto",
            estimatedAmount: "El formato introducido no es el correcto",
            mail: "Debes introducir una dirección correcta",
            phone: "Debes introducir un número correcto"
        };
    
        const showLoading = () => {
            Swal.fire({
            title: 'En Proceso!',
            html: 'Transaccion en Proceso.',
            timerProgressBar: true,
            allowOutsideClick: false,
            didOpen: () => { Swal.showLoading() },
            willClose: () => {} })
        }
        
        const showAlert = (title, text, icon, timer) => {
            Swal.fire({
                position: 'top',
                icon: icon,
                title: title,
                text: text,
                showConfirmButton: false,
                timer: timer
            })
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
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="form.ControlRut">
                                        <Form.Label>Rut</Form.Label>
                                        <Form.Control
                                            type="text" 
                                            placeholder="rut" 
                                            className={errors.rut && "error"}
                                            name="rut"
                                            {...register("rut", {
                                                required: messages.required,
                                                onChange: (e) => {handlerChange(e)}
                                            })} 
                                        />
                                        {errors.rut && <p>{errors.rut.message}</p>}
                                    </Form.Group>
                                    <Form.Group controlId="form.ControlBusinessName">
                                        <Form.Label>Nombre Empresa</Form.Label>
                                        <Form.Control
                                            type="text" 
                                            placeholder="Nombre Empresa" 
                                            className={errors.rut && "error"}
                                            name="businessName"
                                            {...register("businessName", {
                                                required: messages.required,
                                                onChange: (e) => {handlerChange(e)}
                                            })} 
                                        />
                                        {errors.businessName && <p>{errors.businessName.message}</p>}    
                                    </Form.Group>
                                    <Form.Group controlId="form.ControlEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email" 
                                            placeholder="Email" 
                                            name="email"
                                            {...register("email")} 
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="form.ControlWeb">
                                        <Form.Label>Web</Form.Label>
                                        <Form.Control
                                            type="text" 
                                            placeholder="direccion web" 
                                            name="web"
                                            {...register("web")} 
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="form.ControlAddress">
                                        <Form.Label>Direccion</Form.Label>
                                        <Form.Control
                                            as="textarea" 
                                            rows="1" 
                                            className={errors.address && "error"}
                                            name="address"
                                            {...register("address", {
                                                required: messages.required,
                                                onChange: (e) => {handlerChange(e)}
                                            })} 
                                        />
                                        {errors.address && <p>{errors.address.message}</p>}
                                    </Form.Group>
                                    <Form.Group controlId="form.ControlType">
                                        <Form.Label>Tipo Proveedor</Form.Label>
                                        <Form.Control 
                                            as="select" 
                                            name="type" 
                                            className={errors.type && "error"}
                                            {...register("type", {
                                                required: messages.required,
                                            })}>
                                            <option  value="">selecciona...</option>
                                            {typeProviders.map(provider =>
                                                <option key={provider?.id} value={provider?.type}>{provider?.type}</option>
                                            )}
                                        </Form.Control>
                                        {errors.type && <p>{errors.type.message}</p>}
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="form.ControlContactName">
                                        <Form.Label>Nombre Contacto</Form.Label>
                                        <Form.Control
                                            type="text" 
                                            placeholder="Nombre Contacto" 
                                            className={errors.contactName && "error"}
                                            name="contactName"
                                            {...register("contactName")} 
                                        />
                                        {errors.contactName && <p>{errors.contactName.message}</p>}
                                    </Form.Group>
                                    <Form.Group controlId="form.ControlPhone">
                                        <Form.Label>Telefono</Form.Label>
                                        <Form.Control
                                            type="text" 
                                            placeholder="Telefono" 
                                            className={errors.phone && "error"}
                                            name="phone"
                                            {...register("phone", {
                                                required: messages.required,
                                                onChange: (e) => {handlerChange(e)}
                                            })} 
                                        />
                                        {errors.phone && <p>{errors.phone.message}</p>}
                                    </Form.Group>
                                    <Form.Group controlId="form.ControlFacebook">
                                        <Form.Label>Facebook</Form.Label>
                                        <Form.Control
                                            type="text" 
                                            placeholder="Facebook" 
                                            name="facebook"
                                            {...register("facebook")} 
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="form.ControlInstagran">
                                        <Form.Label>Instagran</Form.Label>
                                        <Form.Control
                                            type="text" 
                                            placeholder="instagram" 
                                            name="instagran"
                                            {...register("instagran")} 
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="form.ControlDescrption">
                                        <Form.Label>Descripcion</Form.Label>
                                        <Form.Control
                                            as="textarea" 
                                            rows="3" 
                                            placeholder="descripcion" 
                                            className={errors.description && "error"}
                                            name="description"
                                            {...register("description", {
                                                required: messages.required,
                                                onChange: (e) => {handlerChange(e)}
                                            })} 
                                        />
                                        {errors.description && <p>{errors.description.message}</p>}
                                    </Form.Group>
                                    <Form.Group controlId="form.ControlMerchandiseType">
                                            <Form.Label>Tipo de Mercancía</Form.Label>
                                            <Form.Control
                                            as="textarea" 
                                            rows="3" 
                                            placeholder="Tipo de Mercancía" 
                                            className={errors.merchandiseType && "error"}
                                            name="merchandiseType"
                                            {...register("merchandiseType", {
                                                required: messages.required,
                                                onChange: (e) => {handlerChange(e)}
                                            })} 
                                        />
                                        {errors.merchandiseType && <p>{errors.merchandiseType.message}</p>}
                                        </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Button variant="primary"  type='submit'>{titleButtom}</Button>                  
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </Aux>
    );
}

export default ProviderCreate;