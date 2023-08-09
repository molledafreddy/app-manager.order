import React, { useState, useEffect} from 'react';

import Aux from "../../../hoc/_Aux";
import {Row, Col, Card, Button, Form} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { createProducts, updateCodeErrorProduct, updateProducts, getProduct } from '../../../store/actions/productAction';
import Swal from 'sweetalert2';
import { Controller, useForm} from 'react-hook-form';
import "./styles.css";
import { getCategoryProduct } from '../../../store/actions/categoryProductAction';

const ProductCreate = (props) => {
   
    const dispatch = useDispatch()
    const products = useSelector(state => state.product.docs)
    const errorProduct = useSelector(state => state.errorProduct);
    const statusCodeProduct = useSelector(state => state.statusCodeProduct);
    const categoryProducts = useSelector(state => state.categoryProducts)
    
    let [titleButtom, setTitleButtom] = useState('Crear');
    let [validProcess, setValidProcess] = useState(false);
    let [flagCategoryProduct, setCategoryProduct] = useState(false);
    
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

        if (errorProduct?.code !== undefined  && !validProcess) {
            // console.log('ingreso if errorOrder', errorProduct)
            showAlert("Error en el proceso", errorProduct?.message, "error",4000);
            setValidProcess(true);
            setTimeout(() => {
                setValidProcess(false);
            }, 5000);
        } else if (statusCodeProduct === '200' && errorProduct.length === 0) {
            // console.log('ingreso al redirect', statusCodeProduct)
            Swal.close()
            validRedirect()
        }

        if (props.match.params._id) {
            if ( products === undefined || products?.length === 0) {
                // console.log('props.match.params._id', props.match.params._id)
                dispatch(getProduct(dispatch,'product', props.match.params._id));
            } 
            // console.log('props.match.params._id products', products)
            if (products !== undefined || products?.length > 0) {
                
                // setBody(providers.find(prov => prov._id === props.match.params._id));
                const dataProduct = products.find(prov => prov._id === props.match.params._id);
                setValuesProduct(dataProduct)
            }
        }

        if ((categoryProducts === undefined || categoryProducts.length === 0) && (!flagCategoryProduct)) {
            dispatch(getCategoryProduct(dispatch,'product/all/category'));
            setCategoryProduct(true)
        } else {
            
        }
    }, [dispatch, products, categoryProducts, errorProduct, statusCodeProduct, validRedirect, titleButt])

    const setValuesProduct = async (data) => {
        console.log('ingreso por aca setValuesProvider', data)
        reset(formValues => ({
            _id: data._id,
            name: data?.name,
            description: data?.description,
            price: data?.price,
            clasification: data?.clasification,
            type: data?.type,
            status: data?.status,
            categoryProducts: data?.categoryProducts
        }))
    }

    const typeClasifications = [
        { id:1, type: "regular" },
        { id:2, type: "promotion" }
    ];

    const typeMeterage = [
        { id:1, type: "granel" },
        { id:2, type: "unidad" },
    ];

    const typeStatus = [
        { id:1, type: "Active", value: true },
        { id:2, type: "Inactivo", value: false }
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
        props.history.push("/product");
    }

    const { register, handleSubmit, reset, formState: { errors }} = useForm({mode:  "all", reValidateMode: "onChange"});
        
    const onSubmit = (dataInfo) => {
        if (props.match.params._id) {
            console.log('llego por aca', dataInfo)
            dispatch(updateProducts(dispatch,'product', dataInfo, props.match.params._id));
            showLoading();
        } else {
            dispatch(createProducts(dispatch,'product', dataInfo));
            showLoading();
        }
    }

    const validRedirect = () => {
        showAlert( "Transaccion exitosa", "El proceso se realizo con exito.", "success",3000);
        dispatch(updateCodeErrorProduct(dispatch));
        props.history.push("/product");
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
                                <Card.Title as="h5">Productos</Card.Title>
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
                                    <Form.Group controlId="form.ControlName">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control
                                            type="text" 
                                            placeholder="Nombre" 
                                            className={errors.rut && "error"}
                                            name="name"
                                            {...register("name", {
                                                required: messages.required,
                                                onChange: (e) => {handlerChange(e)}
                                            })} 
                                        />
                                        {errors.name && <p>{errors.name.message}</p>}    
                                    </Form.Group>
                                    <Form.Group controlId="form.ControlPrice">
                                        <Form.Label>Precio</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Precio" 
                                            className={errors.price && "error"}
                                            name="price"
                                            {...register("price", {
                                                onChange: (e) => {handlerChange(e)}
                                            })} 
                                        />
                                        {errors.price && <p>{errors.price.message}</p>}
                                    </Form.Group>
                                    <Form.Group controlId="form.ControlClasification">
                                        <Form.Label>Tipo Clasificacion</Form.Label>
                                        <Form.Control 
                                            as="select" 
                                            name="clasification" 
                                            className={errors.type && "error"}
                                            {...register("clasification", {
                                                required: messages.required,
                                            })}>
                                            <option  value="">selecciona...</option>
                                            {typeClasifications.map(clasification =>
                                                <option key={clasification?.id} value={clasification?.type}>{clasification?.type}</option>
                                            )}
                                        </Form.Control>
                                        {errors.clasification && <p>{errors.clasification.message}</p>}
                                    </Form.Group>
                                    <Form.Group controlId="form.ControlType">
                                        <Form.Label>Tipo Medida</Form.Label>
                                        <Form.Control 
                                            as="select" 
                                            name="type" 
                                            className={errors.meterage && "error"}
                                            {...register("type", {
                                                    required: messages.required,
                                            })}>
                                            <option key={`type_`} value="" >selecciona...</option>
                                            {typeMeterage.map(type =>
                                                <option key={`meterage_`+type?.id} value={type?.type}>{type?.type}</option>
                                            )}
                                        </Form.Control>
                                        {errors.type && <p>{errors.type.message}</p>}
                                    </Form.Group> 
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="form.ControlCategoryProducts">
                                        <Form.Label>Categorias</Form.Label>
                                        <Form.Control 
                                            as="select" 
                                            name="categoryProducts"
                                            className={errors.categoryProducts && "error"}
                                            {...register("categoryProducts", {
                                                required: messages.required,
                                            })} 
                                        >
                                            <option value="" >selecciona...</option>
                                            {categoryProducts?.map(category =>
                                                <option key={category?._id} value={category?._id}>{category?.name}</option>
                                            )}
                                        </Form.Control>
                                        {errors.categoryProducts && <p>{errors.categoryProducts.message}</p>}
                                    </Form.Group>
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
                                                <option key={`status_`+status?.id} value={status?.value}>{status?.type}</option>
                                            )}
                                        </Form.Control>
                                        {errors.status && <p>{errors.status.message}</p>}
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

export default ProductCreate;