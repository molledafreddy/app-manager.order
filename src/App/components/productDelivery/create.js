import React, { useState, useEffect} from 'react';

import Aux from "../../../hoc/_Aux";
import {Row, Col, Card, Button, Form, ListGroup, Badge} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { updateCodeErrorProductDelivery, getProductHasDelivery, updateProductDelivery, getProductDelivery } from '../../../store/actions/productDeliveryAction';
import Swal from 'sweetalert2';
import { Controller, useForm} from 'react-hook-form';
import "./styles.css";
import { getCategoryProduct } from '../../../store/actions/categoryProductAction';

const ProductDeliveryCreate = (props) => {
   
    const dispatch = useDispatch()
    const productDelivery = useSelector(state => state.productDelivery.docs)
    const errorProductDelivery = useSelector(state => state.errorProductDelivery);
    const statusCodeProductDelivery = useSelector(state => state.statusCodeProductDelivery);
    const productHasDelivery = useSelector(state => state.productHasDelivery);
    const categoryProducts = useSelector(state => state.categoryProducts)
    
    let [titleButtom, setTitleButtom] = useState('Crear');
    let [validProcess, setValidProcess] = useState(false);
    let [flagCategoryProduct, setCategoryProduct] = useState(false);
    const [productContainer, setProductContainer] = useState([]);

    const [validProductDelivery, setValidProductDelivery] = useState(true);
    
    const [body, setBody] = useState({
        _id: null,
        name: "",
        clasification: "",
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

        if (errorProductDelivery?.code !== undefined  && !validProcess) {
            // console.log('ingreso if errorOrder', errorProduct)
            showAlert("Error en el proceso", errorProductDelivery?.message, "error",4000);
            setValidProcess(true);
            setTimeout(() => {
                setValidProcess(false);
            }, 5000);
        } else if (statusCodeProductDelivery === '200' && errorProductDelivery.length === 0) {
            // console.log('ingreso al redirect', statusCodeProduct)
            Swal.close()
            validRedirect()
        }
        // console.log('productDelivery fuera', productDelivery)
        if (props.match.params._id) {
            if ( productDelivery === undefined || productDelivery?.length === 0) {
                // console.log('props.match.params._id', props.match.params._id)
                dispatch(getProductDelivery(dispatch,'product-delivery', props.match.params._id));
            } 
            // console.log('props.match.params._id products', products)
            if (productDelivery !== undefined || productDelivery?.length > 0) {
                // console.log('productDelivery', productDelivery)
                // setBody(providers.find(prov => prov._id === props.match.params._id));
                const dataProduct = productDelivery.find(prov => prov._id === props.match.params._id);
                setValuesProduct(dataProduct)
            }
        }
       
        if (productHasDelivery.length > 0 && productContainer.length === 0 && props.match.params._id !== undefined) {
            setTimeout(() => {
                formatProductContainer();
            }, 450);
        }

    }, [dispatch, productDelivery, productHasDelivery, productContainer, categoryProducts, errorProductDelivery, statusCodeProductDelivery, validRedirect, titleButt, formatProductContainer])

    const setValuesProduct = async (data) => {
        reset(formValues => ({
            _id: data._id,
            nameClient: data?.nameClient,
            address: data?.address,
            phone: data?.phone,
            status: data?.status
        }));
        if (data?._id !== undefined && validProductDelivery) {
            dispatch(getProductHasDelivery(dispatch,'product-delivery/product-has-delivery', data._id));
            setValidProductDelivery(false);
        }
    }

    const formatProductContainer = async () => {
        let dataProduct = [];
        await productHasDelivery.forEach(element => {
            dataProduct.push({
                id: element?._id,
                price: element?.price,
                quantity: element?.quantity,
                name: element?.products[0]?.name,
                type: element?.products[0]?.type,
                clasification: element?.products[0]?.clasification,
                status: element?.products[0]?.status
            })
        });
        console.log('dataProductsss', dataProduct)
        setProductContainer(dataProduct);
        setValue("productHasDelivery", dataProduct);
    }

    const typeStatus = [
        { id:1, type: "activo", value: true },
        { id:2, type: "procesando", value: false },
        { id:3, type: "entregado", value: false },
        { id:4, type: "cancelado", value: false }
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
        }
    }

    const handlerBack = async e => {
        props.history.push("/productDelivery");
    }

    const { register, setValue, handleSubmit, reset, formState: { errors }} = useForm({mode:  "all", reValidateMode: "onChange"});
        
    const onSubmit = (dataInfo) => {
        if (props.match.params._id) {
            console.log('llego por aca', dataInfo)
            dispatch(updateProductDelivery(dispatch,'product-delivery', dataInfo, props.match.params._id));
            showLoading();
        }
    }

    const validRedirect = () => {
        showAlert( "Transaccion exitosa", "El proceso se realizo con exito.", "success",3000);
        dispatch(updateCodeErrorProductDelivery(dispatch));
        props.history.push("/productDelivery");
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
                                <Card.Title as="h5">Ordenes Delivery</Card.Title>
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
                                    <Form.Group controlId="form.ControlnameClient">
                                        <Form.Label>Nombre Cliente</Form.Label>
                                        <Form.Control
                                            type="text" 
                                            placeholder="nameClient" 
                                            className={errors.rut && "error"}
                                            name="nameClient"
                                            {...register("nameClient", {
                                                required: messages.required,
                                                onChange: (e) => {handlerChange(e)}
                                            })} 
                                        />
                                        {errors.nameClient && <p>{errors.nameClient.message}</p>}    
                                    </Form.Group>
                                    <Form.Group controlId="form.ControlPrice">
                                        <Form.Label>Telefono</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Telefono" 
                                            className={errors.phone && "error"}
                                            name="phone"
                                            {...register("phone", {
                                                onChange: (e) => {handlerChange(e)}
                                            })} 
                                        />
                                        {errors.phone && <p>{errors.phone.message}</p>}
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="form.ControlStatus">
                                        <Form.Label>Estados</Form.Label>
                                        <Form.Control 
                                            as="select" 
                                            name="status" 
                                            className={errors.status && "error"}
                                            {...register("status", {
                                                    required: messages.required,
                                            })}>
                                            <option key={`status_`} value="" >selecciona...</option>
                                            {typeStatus.map(status =>
                                                <option key={`status_`+status?.id} value={status?.type}>{status?.type}</option>
                                            )}
                                        </Form.Control>
                                        {errors.status && <p>{errors.status.message}</p>}
                                    </Form.Group>
                                    <Form.Group controlId="form.ControlAddress">
                                        <Form.Label>Direccion</Form.Label>
                                        <Form.Control
                                            as="textarea" 
                                            rows="2" 
                                            placeholder="Direccion" 
                                            className={errors.address && "error"}
                                            name="address"
                                            {...register("address", {
                                                required: messages.required,
                                                onChange: (e) => {handlerChange(e)}
                                            })} 
                                        />
                                        {errors.address && <p>{errors.address.message}</p>}
                                    </Form.Group>
                                </Col>
                                <Col className="mt-5 mb-5" md={12}>
                                    <ListGroup as="ol" numbered>
                                        { productContainer?.map(product =>
                                            <ListGroup.Item key={product?.id} as="li" className="d-flex justify-content-between align-items-start">
                                                <div className="ms-2 me-auto">
                                                    <div className="fw-bold">
                                                        Nombre: {product.name} 
                                                        Cantidad: {product.quantity}
                                                        Precio: { new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(product.price === undefined ? 0 : product.price)}
                                                    </div>
                                                    
                                                </div> 
                                                {/* <Badge key={payment?.id} variant='danger' className='badge_position ml-5' onClick={() => deletePaymentAmount(payment.id)}>X</Badge>   */}
                                            </ListGroup.Item>
                                        )}
                                    </ListGroup>
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

export default ProductDeliveryCreate;