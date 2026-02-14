import React, { useState, useEffect, useCallback, useMemo} from 'react';

import Aux from "../../../hoc/_Aux";
import {Row, Col, Card, Button, Form, Badge, ListGroup} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { getOrderPaitOut, updateOrderClosure, updateCodeError } from '../../../store/actions/orderAction';
import { getPaymentTypes, getPaymentHasEgress } from '../../../store/actions/paymentTypeAction';
import { getProviders } from '../../../store/actions/providerAction';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "../../../../src/styles/datepiker.css";

import {Controller, useForm} from 'react-hook-form';
import "./styles.css";
import Swal from 'sweetalert2';

const OrderCreate = (props) => {
   
    const dispatch = useDispatch()

    const providers = useSelector(state => state.provider);
    // const orders = useSelector(state => state.orders.docs);
    const orderPaitOuts = useSelector(state => state.orderPaitOuts.docs)
    const paymentTypes = useSelector(state => state.paymentTypes);
    const paymentHasEgressR = useSelector(state => state.paymentHasEgress);
    const errorOrder = useSelector(state => state.errorOrder);
    const statusCodeOrder = useSelector(state => state.statusCodeOrder);

    let [roleUser, setRoleUser] = useState('');
    let [validProcess, setValidProcess] = useState(false);
    let [titleButtom, setTitleButtom] = useState('Crear');
  
    const [body, setBody] = useState({
        _id: null,
        paymentMethod: "",
        status: "",
        estimatedAmount: "",
        estimateReceptionDate: "",
        receptionDate: "",
        orderDate: "",
        paymentDate: "",
        creditPaymentDate: "",
        descriptionOrder: "",
        descriptionPayment: "",
        descriptionLogistic: "",
        amount: "",
        invoiceNumber: "",
        paymentHasEgress: [],
        files: [],
        workingDay: "",
        providers: "",
    })

    const [paymentHasEgress, setPaymentHasEgress] = useState({
        id: null,
        payments: "",
        paymentAmount: "",
        originMoney: ""
    })

    const [validPaimentHas, setValidPaimentHas] = useState(true);
    const [buttomAmount, setButtomAmount] = useState(true);
    const [paymentContainer, setPaymentContainer] = useState([]);

    const [dataFile, setDataFile] = useState({
        files: []
    });

    const TypePaymentMethod = [
        { id:1, type: "descontado" },
        { id:2, type: "credito" },
        { id:3, type: "parcial" },
        { id:4, type: "consignacion" }
    ];

    const TypeStatus = [
        { id:1, type: "solicitado" },
        { id:2, type: "recibido" },
        { id:3, type: "verificado" },
        { id:4, type: "pendiente_por_pago" },
        { id:5, type: "pagado" },
        { id:6, type: "no_recibido" },
        { id:7, type: "cancelado_proveedor" },
        { id:8, type: "cancelado" }
    ];

    const TypeOrigin = [
        { id:1, type: "caja" },
        { id:2, type: "caja chica" },
        { id:3, type: "prestamo" },
    ];

    const TypeStatusValid = [
        { id:1, type: "Verificado" },
        { id:2, type: "por_verificar" },
        { id:3, type: "con_error" },
    ];

    const messages = {
        required: "Este campo es obligatorio",
        name: "El formato introducido no es el correcto",
        estimatedAmount: "El formato introducido no es el correcto",
        mail: "Debes introducir una dirección correcta",
        phone: "Debes introducir un número correcto"
    };

    const { 
            register, 
            handleSubmit, 
            formState: { errors }, 
            setValue, 
            watch, 
            reset,
            control } = useForm({mode:  "onChange", reValidateMode: "onChange"});
    const watchStatus = watch("status");
    const watchPaymentMethod = watch("paymentMethod");
    const watchAmount = watch("amount");

    //USAR useCallback para funciones que van en dependencies
    const showAlert = useCallback((title, text, icon, timer) => {
        Swal.fire({
            position: 'top',
            icon: icon,
            title: title,
            text: text,
            showConfirmButton: false,
            timer: timer
        })
    }, []);

    const showLoading = useCallback(() => {
        Swal.fire({
            title: 'En Proceso!',
            html: 'Transaccion en Proceso.',
            timerProgressBar: true,
            allowOutsideClick: false,
            didOpen: () => { Swal.showLoading() },
            willClose: () => {} 
        })
    }, []);

    const validRedirect = useCallback(() => {
        showAlert( "Transaccion exitosa", "El proceso se realizo con exito.", "success",6500);
        dispatch(updateCodeError(dispatch));
        props.history.push("/revenue");
    }, [dispatch, showAlert]);

    const formatData = useCallback(async () => {
        if (!orderPaitOuts || orderPaitOuts.length === 0) {
            console.log('⚠️ [formatData] orderPaitOuts vacío');
            return;
        }

        const data = await orderPaitOuts.find(prov => prov._id === props.match.params._id);
        console.log('⚠️ [formatData] Orden encontrada:', data);
        if (!data?._id) {
            console.log('⚠️ [formatData] Orden no encontrada');
            return;
        }

        let filesD = [];
        
        reset(formValues => ({
            _id: data?._id,
            estimatedAmount: data?.estimatedAmount,
            paymentMethod: data?.paymentMethod,
            estimateReceptionDate: data?.EstimateReceptionDate ? new Date(data.EstimateReceptionDate) : undefined,
            orderDate: data?.orderDate ? new Date(data.orderDate) : undefined,
            paymentDate: data?.paymentDate ? new Date(data.paymentDate) : undefined,
            receptionDate: data?.receptionDate ? new Date(data.receptionDate) : undefined,
            creditPaymentDate: data?.creditPaymentDate ? new Date(data.creditPaymentDate) : undefined,
            status: data?.status,
            descriptionOrder: data?.descriptionOrder,
            amount: data?.egress[0]?.amount,
            descriptionPayment: data?.egress[0]?.description,
            invoiceNumber: data?.egress[0]?.invoiceNumber,
            providers: data?.providers[0]?._id,
            _idEgress: data?.egress[0]?._id,
            paymentHasEgress: [],
            files: data?.egress[0]?.files || [],
            validAdmin: data?.validAdmin,
            validDate: data?.validDate ? new Date(data.validDate) : new Date(),
            noteValid: data?.noteValid,
            usersAdmin: data?.usersAdmin,
        }));
        
        // ✅ Validar egress correctamente
        if (data?.egress[0]?._id !== undefined && validPaimentHas) {
            dispatch(getPaymentHasEgress(dispatch,'operation-bills/payment-has-egress', data.egress[0]._id));
            setValidPaimentHas(false);
        }

        // ✅ Validar archivos correctamente (CORREGIR TYPO)
        if (data?.egress[0]?.files && data?.egress[0]?.files.length > 0) {
            console.log('📁 [formatData] Procesando archivos:', data.egress[0].files.length);
            
            data.egress[0].files.forEach((element, index) => {
                filesD.push({
                    id: index,
                    filename: element.filename,
                    file: `${process.env.REACT_APP_API_BASE}/upload/${element.filename}`,
                    flag: true,
                    path: element.path,
                    size: element.size,
                    mimetype: element.mimetype
                })
            });
            dataFile.files = filesD;
            setDataFile({...dataFile});
        } else {
            console.log('⚠️ [formatData] Sin archivos');
        }
    }, [orderPaitOuts, props.match.params._id, validPaimentHas, dispatch, reset]);

    const formatPaymentContainer = useCallback(async () => {
        
        if (!paymentHasEgressR || paymentHasEgressR.length === 0) {
            console.log('⚠️ [formatPaymentContainer] paymentHasEgressR vacío');
            return;
        }

        let dataPayment = [];
        await paymentHasEgressR.forEach(element => {
            dataPayment.push({
                paymentAmount: element?.paymentAmount,
                originMoney: element?.originMoney,
                payments: element?.payments[0]?.name,
                id: element?.payments[0]?.name
            })
        });
        setPaymentContainer(dataPayment);
        setValue("paymentHasEgress", dataPayment);
        
    }, [paymentHasEgressR, setValue]);

     // ✅ REFACTORIZAR: useEffect principal (SIMPLIFICADO)
    useEffect(() => {
        
        setRoleUser(localStorage.getItem('role'));
        
        // ✅ Manejar errores
        if (errorOrder?.code !== undefined && !validProcess) {
            showAlert("Error en el proceso", errorOrder?.message, "error", 4000);
            setValidProcess(true);
            setTimeout(() => {
                setValidProcess(false);
            }, 5000);
        } 
        // ✅ Manejo de éxito
        else if (statusCodeOrder === '200' && errorOrder.length === 0) {
            Swal.close();
            validRedirect();
        }
        
        // ✅ Actualizar título del botón
        if (props.match.params._id) {
            setTitleButtom('Editar');
        } else {
            setTitleButtom('Crear');
        }
        
    }, [statusCodeOrder, errorOrder, validProcess, showAlert, validRedirect, props.match.params._id]);

    // ✅ AGREGAR: useEffect para cargar proveedores
    useEffect(() => {
        
        if (providers === undefined || providers?.length === 0) {
            dispatch(getProviders(dispatch,'provider'));
        }
    }, [providers, dispatch]);

    // ✅ AGREGAR: useEffect para cargar tipos de pago
    useEffect(() => {
        if (paymentTypes === undefined || paymentTypes.length === 0) {
            dispatch(getPaymentTypes(dispatch,'payment-type'));
        }
    }, [paymentTypes, dispatch]);

    // ✅ AGREGAR: useEffect para cargar orden
    useEffect(() => {
        
        if (!props.match.params._id) {
            return;
        }
        
        if (orderPaitOuts === undefined || orderPaitOuts?.length === 0) {
            dispatch(getOrderPaitOut(dispatch,'order', props.match.params._id));
        } else {
            formatData();
        }

    }, [props.match.params._id, orderPaitOuts, dispatch, formatData]);

    // ✅ AGREGAR: useEffect para formatear contenedor de pagos
    useEffect(() => {
        // if (paymentHasEgressR.length > 0 && paymentContainer.length === 0 && props.match.params._id !== undefined) {
        //     formatPaymentContainer();
        // }

        // Formatear contenedor de pagos
        console.log('🔄 [useEffect] paymentHasEgressR:', paymentHasEgressR);
        if (paymentHasEgressR.length > 0 && paymentContainer.length === 0 && props.match.params._id) {
            setTimeout(() => {
                formatPaymentContainer();
            }, 450);
        }
    }, [paymentHasEgressR, paymentContainer.length, props.match.params._id, formatPaymentContainer]);

    const  numberFormatPositive = async (e) => {
        // Format only positive decimal numbers
        if ( e.target.name === 'estimatedAmount' || e.target.name === 'paymentAmount' ) {
            let DECIMALS = ".";
            let THOUSANDS = ",";
            
            let value = await e.target.value.length>0? numberFormat(e.target.value, -1, THOUSANDS, DECIMALS, false): "";
            // console.log('value', value)
            e.target.value  = await value;
        }
    }

    const numberFormat = async (strNumber, n, thousands, decimals, minusSigned = true) => {
        // ... código sin cambios ...
        let re = '\\d(?=(\\d{3})+$)';
        let resultado = "";
        let hasminusSymbol = false;
        let hasdecimalsSeparator = false;
        let nextCharacter = "";
        let initialZero = false;
        let numParts =[];
        let integerPart = "";
        let decimalPart = "";
        let firstDecimal = -1;
        
        let filterNumber1 = new RegExp('[^ 0-9\\-\\'+decimals+']', 'g');
        let filterNumber2 = new RegExp('[^ 0-9\\-]', 'g');
        let filterNumber3 = new RegExp('[^ 0-9\\'+decimals+']', 'g');
        let filterNumber4 = new RegExp('[^ 0-9]', 'g');
        
        strNumber = strNumber.replace(filterNumber1, "");
        if (strNumber.length>0) {
            hasminusSymbol = (strNumber.substring(0, 1)==="-");
            strNumber = strNumber.replace(filterNumber3, "");
            if (strNumber.length>0) {
                hasdecimalsSeparator = (strNumber.substring(0, 1)===decimals);
                strNumber = (hasdecimalsSeparator)? "0.": strNumber;
                if (!hasdecimalsSeparator) {
                    firstDecimal = strNumber.indexOf(decimals);
                    hasdecimalsSeparator = (firstDecimal>0);
                    strNumber = hasdecimalsSeparator?strNumber.substring(0, firstDecimal)+decimals+strNumber.substring(firstDecimal+1, strNumber.length).replace(filterNumber4, ""):strNumber;
                }
                
                initialZero = (strNumber.substring(0, 1)==="0");
                if (initialZero) {
                    nextCharacter = (strNumber.length>1)? strNumber.substring(1, 2): "";
                    strNumber = ((nextCharacter.length>0) && (nextCharacter!==decimals))?strNumber.substring(1, strNumber.length):strNumber;
                }
                
                numParts = strNumber.split(decimals);
                integerPart = numParts[0];
                decimalPart = (numParts.length>1)? numParts[1]: "";
                
                resultado = integerPart.replace(new RegExp(re, 'g'), '$&' + (thousands));
                
                if (n!==0) {
                    if (n>0) {
                        decimalPart = (decimalPart.length>n)? decimalPart.substring(0, n): decimalPart;
                    }
                    resultado = (hasdecimalsSeparator)? resultado+decimals+decimalPart: resultado;
                }
            }
        }
        
        resultado = (minusSigned && hasminusSymbol)? "-"+resultado: resultado;
        return resultado;
    }

    const handlerAmount = async e => {
        numberFormatPositive(e);
        setPaymentHasEgress({
            ...paymentHasEgress,
            [e.target.name]: e.target.value
        })
        if (paymentHasEgress.payments !== '' && paymentHasEgress.paymentAmount !== '' && paymentHasEgress.originMoney !== '' ) {
            setButtomAmount(false);
        } else {
            setButtomAmount(true);
        }
    }

    const addAmount = async e => {
        console.log('➕ [addAmount]', paymentHasEgress);
        if ( paymentHasEgress.payments !== '' && paymentHasEgress.paymentAmount !== '' && paymentHasEgress.originMoney !== ''  ) {
            let data = false;
            paymentContainer.forEach(element => {
                if (paymentHasEgress.payments === element.payments && paymentHasEgress.originMoney === element.originMoney) {
                    data = true;
                }
            });
            if (data === true) {
                setPaymentHasEgress({
                    ...paymentHasEgress,
                    "paymentAmount": ''
                });
                setButtomAmount(true);
                showAlert(
                    'Tipo de pago registrado', 
                    "Si desea aumentar o disminuir el monto debe eliminar el registrado y Agregar con el nuevo monto", 
                    "warning",
                    4000);
                return;
            }
            paymentHasEgress.paymentAmount = paymentHasEgress.paymentAmount.replace(/,/g,'');
            paymentHasEgress.id = paymentContainer?.length
             paymentContainer.push(paymentHasEgress);
            
            await setPaymentContainer(paymentContainer)
            setPaymentHasEgress({
                ...paymentHasEgress,
                "paymentAmount": ''
            });

            setButtomAmount(true);

            let value = 0;
            await paymentContainer.map(payment =>
                value += Number(payment?.paymentAmount )
            )
            
            body.amount = value; 
            setValue("paymentHasEgress", paymentContainer);
            setValue("amount", value);
            setBody({...body});
             
        } else {
            alert('debe seleccionar tipo de pago y monto')
        }
    }
   
    const deletePaymentAmount = async (id) => {
        await setPaymentContainer((paymentContainer) =>
            paymentContainer.filter((data) => data.id !== id)
        );

        let value = 0;
        await paymentContainer.map(payment =>
            value += payment.id !== id ?  Number(payment.paymentAmount) : 0 
        )
        const dataFormat = new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(value)
        setValue("amount", dataFormat);
        setValue("paymentHasEgress", paymentContainer);
        body.amount = dataFormat; 
        await setBody({...body})
    }
    
    const driverSubmit =e=> {
        e.preventDefault();
    }

    const handlerChange = async e => {
        setBody({
            ...body,
            [e.target.name]: e.target.value
        })
        numberFormatPositive(e)
    }

    const handlerBack = async e => {
        props.history.push("/revenue");
    }

    const deleteImg = async (id) => {
        const resultData = dataFile.files.filter((data) => data.id !== id);
        dataFile.files = resultData;
        setDataFile({...dataFile});
        setValue("files", dataFile);
    }

    const download = async (originalImage, flag) => {
        let imageBlog = null;
        let  duplicateName = '';
        if (flag) {
        const image = await fetch(originalImage);
        const nameSplit=originalImage.split("/");
            duplicateName=nameSplit.pop();

            imageBlog = await image.blob()
       } else {
            imageBlog = originalImage
            duplicateName = 'image'
       }
        
        const imageURL = URL.createObjectURL(imageBlog)
        const link = document.createElement('a')
        link.href = imageURL;
        link.download = ""+duplicateName+"";
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    };

    const handlerUploadImages = async (e)  => {
        const resultValid = await validImages(e);
        if (resultValid) {
            let data = {
                id:( dataFile?.files?.length + 1),
                file : e.target.files[0],
                filename : e.target.files[0].name,
                flag: false,
            }
            dataFile.files.push(data);
            setDataFile({...dataFile})
            setValue("files", dataFile);
        }
    }

    const validImages = async (e) => {
        var maxSize = 9048;

        var file = e.target.files[0];
        var imageType = file.type;
        var match = ["image/jpeg", "image/png", "image/jpg"];
        var fileSize = file.size;
        var sizeKilo = parseInt(fileSize / 1024);
        if(!match.includes(imageType)) {
            showAlert(
                'validacion Imagenes', 
                "Debe Cargar Archivos con las siguientes extensiones (JPEG/JPG/PNG).", 
                "warning",
                4000);
                e.target.value = '';
            return false;
        }
        // Comparar tamaño de archivo contra máximo permitido
        if (sizeKilo > maxSize) {
            showAlert(
                'validacion Imagenes', 
                "El Archivo que intenta Cargar supera el tamaño maximo permitido.", 
                "warning",
                4000);
            e.target.value = '';
            return false;
        }
        return true;
    }

    // const watchEstimateReceptionDate = watch("estimateReceptionDate");

    const onSubmit = (dataInfo) => {
        if (dataInfo.status === 'requested' && (dataInfo.estimateReceptionDate === undefined )) {
            showAlert(
                'validacion factura', 
                "Si el estado de la orden es 'pagado' debe indicar Fecha de pago y Fecha de Recepcion", 
                "warning",
                4000);
                return;
        }
        if (dataInfo.status === 'pagado' && (dataInfo.paymentDate === undefined || dataInfo.receptionDate === undefined)) {
            showAlert(
                'validacion factura', 
                "Si el estado de la orden es 'pagado' debe indicar Fecha de pago y Fecha de Recepcion", 
                "warning",
                4000);
                return;
        }
        
        if (dataInfo.paymentMethod === 'credit' && ( dataInfo.creditPaymentDate === undefined )) {
            showAlert(
                'validacion factura', 
                "Si el Metodo de Pago es 'credit' debe indicar Fecha de pago del credito", 
                "warning",
                4000);
                return;
        }

        if (dataInfo.status === 'pagado' && (dataInfo.amount === '' || dataInfo.amount === undefined)) {
            console.log('dataInfo.amount', dataInfo)
            showAlert(
                'validacion factura', 
                "Si el estado de la orden es 'pagado' debe ingresar el Monto pagado", 
                "warning",
                4000);
                return;
        } 
        
        if (props.match.params._id) {
            dispatch(updateOrderClosure(dispatch,'order', dataInfo, props.match.params._id));
            showLoading();
        }
    };

    return (
        <Aux>
        <loading/>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Row>
                                <Col md={4} xs="auto">
                                    <Card.Title as="h5">Gestion Ordenes</Card.Title>
                                </Col>
                                <Col md={{ span: 1, offset: 6  }} xs={{ span: 1, offset: 2  }}>
                                <Button variant="primary" onClick={handlerBack}>Volver</Button>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="form.ControlPaymentMethod">
                                            <Form.Label >Metodo pago</Form.Label>
                                            <Form.Control 
                                                as="select" 
                                                name="paymentMethod"
                                                className={errors.paymentMethod && "error"}
                                                {...register("paymentMethod", {
                                                    required: messages.required,
                                                })}
                                            >
                                                <option value="">selecciona...</option>
                                                {TypePaymentMethod.map(method =>
                                                    <option key={method?.id} value={method?.type}>{method?.type}</option>
                                                )}
                                            </Form.Control>
                                            {errors.paymentMethod && <p>{errors.paymentMethod.message}</p>}
                                        </Form.Group> 
                                        <Form.Group controlId="form.ControlEstimatedAmount">
                                            <Form.Label>Monto Estimado pago</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Monto Estimado Pago" 
                                                className={errors.estimatedAmount && "error"}
                                                name="estimatedAmount"
                                                {...register("estimatedAmount", {
                                                    onChange: (e) => {handlerChange(e)}
                                                })} 
                                            />
                                            {errors.estimatedAmount && <p>{errors.estimatedAmount.message}</p>}
                                        </Form.Group>
                                        <Form.Group controlId="form.ControlEstimatedReceptionDate">
                                            <Form.Label>Fecha Estimada Recepcion</Form.Label>
                                            <Controller 
                                                control={control} 
                                                name="estimateReceptionDate"                                            
                                                render={({ field: { onChange, onBlur, value, ref } }) => (                             
                                                    <DatePicker
                                                    className="form-control input_width"
                                                    selected={value}
                                                    onChange={onChange}
                                                    ref={ref}
                                                    isClearable={true}
                                                />)} 
                                            />  
                                        </Form.Group>
                                        <Form.Group controlId="form.ControlReceptionDate">
                                            <Form.Label>Fecha Recepcion</Form.Label>
                                            <Controller 
                                                control={control} 
                                                name="receptionDate"                                            
                                                render={({ field: { onChange, onBlur, value, ref } }) => (                             
                                                    <DatePicker
                                                    className="form-control input_width"
                                                    selected={value}
                                                    onChange={onChange}
                                                    ref={ref}
                                                    isClearable={true}
                                                />)} 
                                            /> 
                                        </Form.Group>
                                        {watchPaymentMethod === 'credit' && (
                                            <Form.Group controlId="form.ControlPaymentCredit">
                                                <Form.Label>Fecha Pago Credito</Form.Label>
                                                <Controller 
                                                    control={control} 
                                                    name="creditPaymentDate"                                            
                                                    render={({ field: { onChange, onBlur, value, ref } }) => (                             
                                                        <DatePicker
                                                        className="form-control input_width"
                                                        selected={value}
                                                        onChange={onChange}
                                                        ref={ref}
                                                        isClearable={true}
                                                    />)} 
                                                /> 
                                            </Form.Group>
                                        )}
                                        <Form.Group controlId="form.ControlDescrptionOrder">
                                            <Form.Label>Descripcion Productos Pedidos</Form.Label>
                                            <Form.Control 
                                                as="textarea" 
                                                rows="3" 
                                                name="descriptionOrder" 
                                                {...register("descriptionOrder")} 
                                                />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="form.ControlStatus">
                                            <Form.Label>Estado</Form.Label>
                                            <Form.Control 
                                                as="select" 
                                                name="status" 
                                                className={errors.status && "error"}
                                                {...register("status", {
                                                    required: messages.required,
                                                })}>
                                                <option  value="">selecciona...</option>
                                                {TypeStatus.map(status =>
                                                    <option key={status?.id} value={status?.type}>{status?.type}</option>
                                                )}
                                            </Form.Control>
                                            {errors.status && <p>{errors.status.message}</p>}
                                        </Form.Group> 
                                        <Form.Group controlId="form.ControlProvider">
                                            <Form.Label>Proveedor</Form.Label>
                                            <Form.Control 
                                                as="select" 
                                                name="providers"
                                                className={errors.providers && "error"}
                                                {...register("providers", {
                                                    required: messages.required,
                                                })} 
                                            >
                                                <option value="" >selecciona...</option>
                                                {providers?.map(provider =>
                                                    <option key={provider?._id} value={provider?._id}>{provider?.businessName}</option>
                                                )}
                                            </Form.Control>
                                            {errors.providers && <p>{errors.providers.message}</p>}
                                        </Form.Group>
                                        <Form.Group controlId="form.ControlOrderDate">
                                            <Form.Label>Fecha de solicitud orden</Form.Label>
                                            <Controller 
                                                control={control} 
                                                name="orderDate"                                            
                                                render={({ field: { onChange, onBlur, value, ref } }) => (                             
                                                    <DatePicker
                                                    className="form-control input_width"
                                                    selected={value}
                                                    onChange={onChange}
                                                    ref={ref}
                                                    isClearable={true}
                                                />)} 
                                            /> 
                                            {/* {errors.orderDate && <p>{errors.orderDate.message}</p>} */}
                                        </Form.Group>
                                        <Form.Group controlId="form.ControlPaymentDate">
                                            <Form.Label>Fecha Pago</Form.Label>
                                            <Controller 
                                                control={control} 
                                                name="paymentDate"                                            
                                                render={({ field: { onChange, onBlur, value, ref } }) => (                             
                                                    <DatePicker
                                                    className="form-control input_width"
                                                    selected={value}
                                                    onChange={onChange}
                                                    ref={ref}
                                                    isClearable={true}
                                                />)} 
                                            /> 
                                        </Form.Group>
                                        <Form.Group controlId="form.ControlDescriptionLogistic">
                                            <Form.Label>Nota Logistica Pedido</Form.Label>
                                            <Form.Control 
                                                as="textarea" 
                                                rows="3" 
                                                name="descriptionLogistic" 
                                                type="text" 
                                                {...register("descriptionLogistic")} 
                                            />
                                        </Form.Group>
                                    </Col>
                                    {watchStatus !== 'requested' && watchStatus !== ''   && (
                                        <Col className="mb-0" md={12}>
                                            <h5 className="mt-3">Registro Pago</h5>
                                            <hr/>
                                            <Row>
                                                <Col md={6}>
                                                    <Form.Group controlId="form.ControlInvoiceNumber">
                                                        <Form.Label>Numero Factura</Form.Label>
                                                        <Form.Control 
                                                            type="text" 
                                                            placeholder="Numero Factura" 
                                                            name="invoiceNumber" 
                                                            {...register("invoiceNumber")}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group controlId="form.ControlDescrptionPayment">
                                                        <Form.Label>Descripcion Pago</Form.Label>
                                                        <Form.Control 
                                                            as="textarea" 
                                                            rows="1" 
                                                            name="descriptionPayment" 
                                                            {...register("descriptionPayment")}
                                                        />
                                                    </Form.Group>
                                                    {watchStatus === 'pagado' && (
                                                        <div>
                                                            <Form.Group controlId="form.ControlPayments">
                                                                <Form.Label>Tipo Pago</Form.Label>
                                                                <Form.Control 
                                                                    as="select" 
                                                                    name="payments"
                                                                    value={paymentHasEgress?.payments} 
                                                                    onChange={handlerAmount} 
                                                                    >
                                                                    <option key="-1" >selecciona...</option>
                                                                    { paymentTypes.map(payment =>
                                                                        <option key={payment?._id} value={payment?.name}>{payment?.name}</option>
                                                                    )}
                                                                </Form.Control>
                                                            </Form.Group>
                                                            <Form.Group controlId="form.ControlOriginMokey">
                                                                <Form.Label>Origen del Dinero</Form.Label>
                                                                <Form.Control 
                                                                    as="select" 
                                                                    name="originMoney"
                                                                    value={paymentHasEgress?.originMoney} 
                                                                    onChange={handlerAmount} 
                                                                    >
                                                                    <option key="-1" >selecciona...</option>
                                                                    { TypeOrigin.map(origin =>
                                                                        <option key={origin?.id} value={origin?.type}>{origin?.type}</option>
                                                                    )}
                                                                </Form.Control>
                                                            </Form.Group>
                                                            <Form.Group controlId="form.ControlPaymentAmount">
                                                                <Form.Label>Monto</Form.Label>
                                                                <Form.Control 
                                                                    type="text" 
                                                                    placeholder="Monto Pagado" 
                                                                    name="paymentAmount" 
                                                                    value={paymentHasEgress?.paymentAmount} 
                                                                    onChange={handlerAmount} 
                                                                />        
                                                            </Form.Group>
                                                            <Form.Group>
                                                                <Button disabled={buttomAmount} onClick={addAmount}  className="mb-0">Agregar</Button>
                                                            </Form.Group>
                                                            <Form.Group controlId="form.ControlAmount">
                                                                <Form.Label>Monto Total</Form.Label>
                                                                <Form.Control 
                                                                    disabled
                                                                    type="text" 
                                                                    name="amount"
                                                                    value={ new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(watchAmount === undefined ? '' : watchAmount)}
                                                                />
                                                            </Form.Group>
                                                        </div>
                                                    )}
                                                </Col>
                                                <Col className="mt-5" md={6}>
                                                    <ListGroup as="ol" numbered>
                                                        { paymentContainer?.map(payment =>
                                                            <ListGroup.Item key={payment?.id} as="li" className="d-flex justify-content-between align-items-start">
                                                                <div className="ms-2 me-auto">
                                                                    <div className="fw-bold">{payment.payments} - {payment.originMoney}</div>
                                                                    { new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(payment.paymentAmount === undefined ? 0 : payment.paymentAmount)}
                                                                </div> 
                                                                <Badge key={payment?.id} variant='danger' className='badge_position ml-5' onClick={() => deletePaymentAmount(payment.id)}>X</Badge>  
                                                            </ListGroup.Item>
                                                        )}
                                                    </ListGroup>
                                                </Col>
                                            </Row>
                                        </Col>
                                    )}
                                    {(roleUser === 'admin' && roleUser !== '' )  && (
                                        <Col className="mb-0" md={12}>
                                            <h5 className="mt-3">Validacion de Cierre</h5>
                                            <hr/>
                                            <Row>
                                                <Col md={6}>
                                                <Form.Group controlId="form.ControlStatus">
                                                    <Form.Label>Estado Validacion</Form.Label>
                                                    <Form.Control 
                                                        as="select" 
                                                        name="validAdmin" 
                                                        className={errors.status && "error"}
                                                        {...register("validAdmin", {
                                                        })}>
                                                        <option  value="">selecciona...</option>
                                                        {TypeStatusValid.map(status =>
                                                            <option key={status?.id} value={status?.type}>{status?.type}</option>
                                                        )}
                                                    </Form.Control>
                                                    {errors.validAdmin && <p>{errors.validAdmin.message}</p>}
                                                </Form.Group> 
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group controlId="form.ControlNoteValid">
                                                        <Form.Label>Nota Validacion</Form.Label>
                                                        <Form.Control 
                                                            as="textarea" 
                                                            rows="3" 
                                                            name="noteValid" 
                                                            {...register("noteValid")}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                
                                            </Row>
                                        </Col>
                                    )}
                                    
                                    <Col className="mb-5" md={12}>
                                        <h5 className="mt-5">Archivos</h5>
                                        <hr/>                 
                                        <Row>          
                                            <Col md={12}>
                                                <Form onSubmit={driverSubmit} inline>
                                                    <Form.Group as={Row}>
                                                        <Form.File
                                                            type="file"
                                                            className="custom-file-label"
                                                            id="inputGroupFile01"
                                                            onChange={(e) => handlerUploadImages(e)}
                                                            custom
                                                            name="file"
                                                            multiple
                                                        />
                                                    </Form.Group>
                                                </Form> 
                                            </Col>
                                            <Col className="mt-5" md={12}>
                                                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                                                    <Col>
                                                        {dataFile?.files?.map((file) => 
                                                                <Card
                                                                className="mt-3"
                                                                key={'card_'+file.filename}
                                                                style={{ width: '15rem' }}
                                                                border="warning">
                                                                    <Card.Title className='title_card'>
                                                                        {file?.filename}
                                                                        {/* <a href="#" download onClick={() => download(file?.file, file?.flag)} >
                                                                            <i className="fa fa-download" />
                                                                            d
                                                                        </a> */}
                                                                        <Badge key={'card_badge_d'+file.filename} variant='primary' className='badge_position ml-5' onClick={() => download(file?.file, file?.flag)}>
                                                                            <i className="fa fa-download" />
                                                                        </Badge>
                                                                        <Badge variant='danger' className='badge_position ml-5' onClick={() => deleteImg(file?.id)}>X</Badge>
                                                                    </Card.Title>
                                                                    <Card.Img variant="top" src={file?.flag ? file?.file : URL.createObjectURL(file?.file)} />
                                                                </Card>
                                                        )}
                                                    </Col>
                                                    
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md={6}>
                                        <Button type='submit' variant="primary" >{titleButtom}</Button>                  
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

export default OrderCreate;