import React, { useState, useEffect} from 'react';

import Aux from "../../../hoc/_Aux";
import {Row, Col, Card, Button, Form, Badge, ListGroup} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { getOrder, createOrder, updateOrder, updateCodeError } from '../../../store/actions/orderAction';
import { getPaymentTypes, getPaymentHasEgress } from '../../../store/actions/paymentTypeAction';
import { getProviders } from '../../../store/actions/providerAction';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "../../../../src/styles/datepiker.css";

import {Controller, useForm} from 'react-hook-form';

import InputMask from 'react-input-mask';
import "./styles.css";
import Swal from 'sweetalert2';

const OrderCreate = (props) => {
   
    const dispatch = useDispatch()

    const providers = useSelector(state => state.provider);
    const orders = useSelector(state => state.orders.docs);
    const paymentTypes = useSelector(state => state.paymentTypes);
    const paymentHasEgressR = useSelector(state => state.paymentHasEgress);
    const errorOrder = useSelector(state => state.errorOrder);
    const statusCodeOrder = useSelector(state => state.statusCodeOrder);

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
    })

    const [validPaimentHas, setValidPaimentHas] = useState(true);

    const [buttomAmount, setButtomAmount] = useState(true);

    const [paymentContainer, setPaymentContainer] = useState([]);

    const [dataFile, setDataFile] = useState({
        files: []
    });

    const [addFile, setAddFile] = useState({
        file: null
    })

    useEffect( () => {
        console.log('errorOrder', errorOrder)
        if (errorOrder?.code !== undefined  && !validProcess) {
            console.log('ingreso if errorOrder', errorOrder)
            showAlert("Error en el proceso", errorOrder?.message, "error",4000);
            setValidProcess(true);
            setTimeout(() => {
                setValidProcess(false);
            }, 5000);
        }
        // console.log('statusCodeOrder', statusCodeOrder)
        if (statusCodeOrder === '200' && errorOrder.length === 0) {
            console.log('ingreso al redirect', statusCodeOrder)
            validRedirect()
        }
        titleButt()
        if (providers === undefined || providers?.length === 0 ) {
            dispatch(getProviders(dispatch,'provider'));
        }
        if (props.match.params._id) {
            if ( orders === undefined || orders?.length === 0) {
                formatDataUpdate();
            } 
            if (orders !== undefined || orders?.length > 0) {
                formatData();
            }  
        }

        if (paymentTypes === undefined || paymentTypes.length === 0) {
            dispatch(getPaymentTypes(dispatch,'payment-type'));
        }

        if (paymentHasEgressR.length > 0 && paymentContainer.length === 0 && props.match.params._id !== undefined) {
            formatPaymentContainer();
        }
        
    }, [dispatch, orders, statusCodeOrder, errorOrder, paymentTypes, paymentHasEgressR, validRedirect, titleButt, formatData, formatPaymentContainer, formatDataUpdate]);

    const validRedirect = () => {
        console.log('validRedirect')
        showAlert( "Transaccion exitosa", "El proceso se realizo con exito.", "success",3500);
        dispatch(updateCodeError(dispatch));
        props.history.push("/order");
        return;
    }

    const formatPaymentContainer = async () => {
        let dataPayment = [];
        await paymentHasEgressR.forEach(element => {
            dataPayment.push({
                paymentAmount: element?.paymentAmount,
                payments: element?.payments[0]?.name,
                id: element?.payments[0]?.name
            })
        });
        setPaymentContainer(dataPayment);
        setValue("paymentHasEgress", dataPayment);
    }

    const formatDataUpdate = async () => {
        console.log('llego por aca formatDataUpdate')
        dispatch(getOrder(dispatch,'order', props.match.params._id));
        if ((orders !== undefined || orders?.length > 0)) {
            console.log('formatDataUpdate', orders)
            const data = await orders.find(prov => prov._id === props.match.params._id)
            let filesD = [];
            reset(formValues => ({
                // ...formValues,
                _id: data._id,
                estimatedAmount: data?.estimatedAmount,
                paymentMethod: data?.paymentMethod,
                estimateReceptionDate: new Date(data.EstimateReceptionDate),
                orderDate: new Date(data.orderDate),
                paymentDate: new Date(data.paymentDate),
                receptionDate: new Date(data.receptionDate),
                creditPaymentDate: new Date(data.creditPaymentDate),
                status: data?.status,
                descriptionOrder: data?.descriptionOrder,
                amount: data?.egress[0]?.amount,
                descriptionPayment: data?.egress[0]?.description,
                invoiceNumber: data?.egress[0]?.invoiceNumber,
                providers: data?.providers[0]?._id,
                _idEgress: data?.egress[0]?._id,
                paymentHasEgress: data?.egress[0]?.operationBills,
                files: data?.egress[0]?.files,
            }))
            
            if (data?.egress[0]?._id !== undefined && validPaimentHas) {
                dispatch(getPaymentHasEgress(dispatch,'operation-bills/payment-has-egress', data.egress[0]._id));
                setValidPaimentHas(false);
            }

            if (data?.egress[0]?.fileslength > 0) {
                data.egress[0].files.forEach((element, index) => {
                    filesD.push({
                        id: index,
                        filename: element.filename,
                        file: `http://localhost:3002/upload/${element.filename}`,
                        flag: true,
                        path: element.path,
                        size: element.size,
                        mimetype: element.mimetype
                    })
                });
                dataFile.files = filesD;
                setDataFile(dataFile);
            }
        } 
        
    }

    const formatData = async () => {
        const data = await orders.find(prov => prov._id === props.match.params._id);
        
        if (data._id !== undefined ) {
            console.log('llego por aca formatDataUpdate', data.paymentDate)
            // validDateFront(data);
            let filesD = [];
            reset(formValues => ({
                // ...formValues,
                _id: data?._id,
                estimatedAmount: data?.estimatedAmount,
                paymentMethod: data?.paymentMethod,
                estimateReceptionDate: data.EstimateReceptionDate === undefined ? undefined : new Date(data.EstimateReceptionDate),
                orderDate: data.paymentDate === undefined ? undefined : new Date(data.orderDate),
                paymentDate: data.paymentDate === undefined ? undefined : new Date(data.paymentDate),
                receptionDate: data.receptionDate === undefined ? undefined : new Date(data.receptionDate),
                creditPaymentDate: data.creditPaymentDate === undefined ? undefined : new Date(data.creditPaymentDate),
                status: data?.status,
                descriptionOrder: data?.descriptionOrder,
                amount: data?.egress[0]?.amount,
                descriptionPayment: data?.egress[0]?.description,
                invoiceNumber: data?.egress[0]?.invoiceNumber,
                providers: data?.providers[0]?._id,
                _idEgress: data?.egress[0]?._id,
                files: data?.egress[0]?.files,

              }));
           
            if ((data?.egress[0]?._id !== undefined) &&  validPaimentHas) {
                dispatch(getPaymentHasEgress(dispatch,'operation-bills/payment-has-egress', data?.egress[0]?._id));
                setValidPaimentHas(false);
            }
            if (data?.egress[0]?.files.length > 0) {
                data.egress[0].files.forEach((element, index) => {
                    filesD.push({
                        id: index,
                        filename: element.filename,
                        file: `http://localhost:3002/upload/${element.filename}`,
                        flag: true,
                        path: element.path,
                        size: element.size,
                        mimetype: element.mimetype
                    })
                });
                dataFile.files = filesD;
                setDataFile(dataFile);
            }
            
        }
    }

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

    const  numberFormat = async (strNumber, n, thousands, decimals, minusSigned = true) => {
        /**
         *This function is called from other functions that are activated when the "keyup"
         *event occurs when typing from the keyboard by entering a character within a text
         *entry in a form that you want to give a numeric format.
         *
         *As it is allowed to add characters to the beginning in the middle or at the
         *end of the input text of the form, cases of generation of invalid numbers
         *can occur due to the concurrence of multiple factors.
         *Cases to control of strNumber content with the rule that there can only be
         *one minus symbol and it must be at the beginning and a single decimal
         *separator that can be anywhere.
         *In addition, the following combinations must be processed
         * "-" "." "-." "--" ".." "0" "-0" "-0." "0." "00" "0n" ".n" ".n." "-n-"
         *         
         * This function also serves to return a formatted number for printing or display
         * on the screen independently of using it in the numeric fields of a form
         * ===============================================================================
         * @param string strNumber: string with the number to format
         * @param integer n: length of decimal (>0)fixed (=0)integer (=-1)float not fixed
         * @param string  thousands: sections delimiter THOUSANDS  USA "," SPAIN "."
         * @param string  decimals: decimal separator   DECIMALS   USA "." SPAIN ","
         * ===============================================================================
         * @VERSION  : 1.0
         * @DATE     : 27 January 2020
         * @AUTHOR   : Aitor Solozabal Merino (aitorsolozabal@gmail.com)
         * sample use:
         * integer not minus
         * console.log("integer "+"-123456.789"+"  0 decimales = "+numberFormat("-123456.789", 0, ",", ".",false));
         * output 123,456
         * float indistinct not fixed
         * console.log("float "+"-123456.789"+"  -1 decimales = "+numberFormat("-123456.789", -1, ",", ".",true));
         * output -123,456.789
         * float fixed not minus
         * console.log("float "+"-123456.789"+"   2 decimales = "+numberFormat("-123456.789",  2, THOUSANDS, DECIMALS,false));
         * output 123,456.78
         */
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
        //filter (minusSigned && n!==0) numbers, minus symbol, decimals separator
        let filterNumber1 = new RegExp('[^ 0-9\\-\\'+decimals+']', 'g');
        //filter (minusSigned && n===0) numbers, minus symbol not decimals separator
        let filterNumber2 = new RegExp('[^ 0-9\\-]', 'g');
        //filter (!minusSigned && n!==0) numbers, decimals separator not minus symbol
        let filterNumber3 = new RegExp('[^ 0-9\\'+decimals+']', 'g');
        //filter (!minusSigned && n===0) only numbers are permitted
        let filterNumber4 = new RegExp('[^ 0-9]', 'g');
        //Only numbers, decimals separator and minus symbol are allowed, so the
        //number is filtered to eliminate those characters that are not valid
        //================================================================== F I R S T
        //first filtering of invalid characters
        //the thousands delimeters are eliminated in this filter process
        strNumber = strNumber.replace(filterNumber1, "");
        console.log('strNumber', strNumber)
        if (strNumber.length>0) {
            //============================================================ S E C O N D
            //If the minusSigned parameter is false, then this symbol is not allowed
            //and only positive values are valid.
            //Therefore you have to see if the first character is the minus symbol "-"
            //and, if so, it must be removed to be added to the final result of the
            //formatting process if the minusSigned parameter is true.
            hasminusSymbol = (strNumber.substring(0, 1)==="-");
            strNumber = strNumber.replace(filterNumber3, "");
            if (strNumber.length>0) {
                //========================================================== T H I R D
                //if the first character is the decimal separator strNumber must be
                //filtered eliminating all ocurrences of the decimalseparator in
                //strNumber with a filter and then it is added with the zero character
                //previously "." --> "0."
                hasdecimalsSeparator = (strNumber.substring(0, 1)===decimals);
                strNumber = (hasdecimalsSeparator)? "0.": strNumber;
                if (!hasdecimalsSeparator) {
                    //if there is no decimal separator at the beginning, check if there
                    //is a decimal separator and check that this is the only one by
                    //erasing the excess ones
                    firstDecimal = strNumber.indexOf(decimals);
                    hasdecimalsSeparator = (firstDecimal>0);
                    //There is at least one decimal separator in strNumber
                    //Clean any other occurrence of a decimal separator in strNumber
                    strNumber = hasdecimalsSeparator?strNumber.substring(0, firstDecimal)+decimals+strNumber.substring(firstDecimal+1, strNumber.length).replace(filterNumber4, ""):strNumber;
                }
                //======================================================== F O U R T H
                //"0"
                initialZero = (strNumber.substring(0, 1)==="0");
                //the first character can be a 0 or a decimal separator
                if (initialZero) {
                    //if the first character is the number zero then the next character
                    //must be obtained and find out if it is a number or the decimal
                    //separator.
                    //It could be a "0." or a "0n"
                    nextCharacter = (strNumber.length>1)? strNumber.substring(1, 2): "";
                    //strNumber is of type "0n"
                    //"01"     "1" / "00"    "0"
                    //In this case the leading zero character is removed
                    strNumber = ((nextCharacter.length>0) && (nextCharacter!==decimals))?strNumber.substring(1, strNumber.length):strNumber;
                }
                //========================================================== F I F T H
                //strNumber is divided into 2 parts using the defined decimal separator
                //character as an element that separates the integer part and the
                //decimal part if it exists
                numParts = strNumber.split(decimals);
                integerPart = numParts[0];
                decimalPart = (numParts.length>1)? numParts[1]: "";
                //========================================================== S I X T H
                // add the thousands separators
                resultado = integerPart.replace(new RegExp(re, 'g'), '$&' + (thousands));
                //====================================================== S E V E N T H
                //join the 2 parts to obtain the result with the established format
                if (n!==0) {
                    if (n>0) {
                        //fixed decimals
                        decimalPart = (decimalPart.length>n)? decimalPart.substring(0, n): decimalPart;
                    }
                    resultado = (hasdecimalsSeparator)? resultado+decimals+decimalPart: resultado;
                }
            }
        }
        //================================================================ E I G H T H
        //check if the minus symbol is allowed so that if it exists add it to the final
        //result before being returned
        resultado = (minusSigned && hasminusSymbol)? "-"+resultado: resultado;
        console.log('resultado', resultado)
        return resultado;
    }

    const handlerAmount = async e => {
        numberFormatPositive(e);
        setPaymentHasEgress({
            ...paymentHasEgress,
            [e.target.name]: e.target.value
        })
        if (paymentHasEgress.payments !== '' && paymentHasEgress.paymentAmount !== '' ) {
            setButtomAmount(false);
        } else {
            setButtomAmount(true);
        }
    }

    const addAmount = async e => {
        if ( paymentHasEgress.payments !== '' && paymentHasEgress.paymentAmount !== '' ) {
            let data = false;
            paymentContainer.forEach(element => {
                if (paymentHasEgress.payments === element.payments) {
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
            // console.log('valor amount', value)
            
            // const dataFormat = new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(value)
            // body.amount = dataFormat; 
            body.amount = value; 
            // let DECIMALS = ".";
            // let THOUSANDS = ",";
            // let val = await numberFormat(value.toString(), -1, THOUSANDS, DECIMALS, false);
            // console.log('valores formaot', dataFormat)
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
        // console.log('llego por aca')
        // formatAmount(e)
        numberFormatPositive(e)
        // procTecla(e)
    }

    const titleButt = async (e) => {
        if (props.match.params._id) {
            setTitleButtom('Editar');
        }
    }

    const handlerBack = async e => {
        props.history.push("/order");
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
        console.log('flag', flag)
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

    const TypePaymentMethod = [
        { id:1, type: "discounted" },
        { id:2, type: "credit" },
        { id:3, type: "partial" },
        { id:4, type: "consignment" }
    ];

    const TypeStatus = [
        { id:1, type: "requested" },
        { id:2, type: "received" },
        { id:3, type: "verified" },
        { id:4, type: "pending_for_payment" },
        { id:5, type: "paid_out" },
        { id:6, type: "no_received" },
        { id:7, type: "cancelled_provider" },
        { id:8, type: "cancelled" }
    ];

    const messages = {
        required: "Este campo es obligatorio",
        name: "El formato introducido no es el correcto",
        estimatedAmount: "El formato introducido no es el correcto",
        mail: "Debes introducir una dirección correcta",
        phone: "Debes introducir un número correcto"
    };

    const patterns = {
        name: /^[A-Za-z]/gi,
        mail: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        phone: /^[0-9]+$/i,
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
    // const watchEstimateReceptionDate = watch("estimateReceptionDate");

    const onSubmit = (dataInfo) => {
        console.log('dataInfo', dataInfo.amount)
        if (dataInfo.status === 'requested' && (dataInfo.estimateReceptionDate === undefined )) {
            showAlert(
                'validacion factura', 
                "Si el estado de la orden es 'paid_out' debe indicar Fecha de pago y Fecha de Recepcion", 
                "warning",
                4000);
                return;
        }
        if (dataInfo.status === 'paid_out' && (dataInfo.paymentDate === undefined || dataInfo.receptionDate === undefined)) {
            showAlert(
                'validacion factura', 
                "Si el estado de la orden es 'paid_out' debe indicar Fecha de pago y Fecha de Recepcion", 
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

        if (dataInfo.status === 'paid_out' && (dataInfo.amount === '' || dataInfo.amount === undefined)) {
            showAlert(
                'validacion factura', 
                "Si el estado de la orden es 'paid_out' debe ingresar el Monto pagado", 
                "warning",
                4000);
                return;
        } 
        
        if (props.match.params._id) {
            dispatch(updateOrder(dispatch,'order', dataInfo, props.match.params._id));
            // showAlert(
            //     false, 
            //     "Se realizo la transacion con exito", 
            //     "success",
            //     3000);
        } else {
            dispatch(createOrder(dispatch,'order', dataInfo));
            // console.log('result', data)
            // showAlert(
            //     false, 
            //     "Se realizo la transacion con exito", 
            //     "success",
            //     3000);
        }
        // props.history.push("/order");
        // return;
    };

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
                                    <Card.Title as="h5">Gestion Ordenes</Card.Title>
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
                                                {providers.map(provider =>
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
                                                    {watchStatus === 'paid_out' && (
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
                                                            <Form.Group controlId="form.ControlAmount">
                                                                <Form.Label>Monto Total</Form.Label>
                                                                <Form.Control 
                                                                    disabled
                                                                    type="text" 
                                                                    name="amount"
                                                                    value={ watchAmount}
                                                                />
                                                            </Form.Group>
                                                            <Form.Group>
                                                                <Button disabled={buttomAmount} onClick={addAmount}  className="mb-0">Agregar</Button>
                                                            </Form.Group>
                                                        </div>
                                                    )}
                                                </Col>
                                                <Col className="mt-5" md={6}>
                                                    <ListGroup as="ol" numbered>
                                                        { paymentContainer?.map(payment =>
                                                            <ListGroup.Item key={payment?.id} as="li" className="d-flex justify-content-between align-items-start">
                                                                <div className="ms-2 me-auto">
                                                                    <div className="fw-bold">{payment.payments}</div>
                                                                    { new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(payment.paymentAmount)}
                                                                </div> 
                                                                <Badge key={payment?.id} variant='danger' className='badge_position ml-5' onClick={() => deletePaymentAmount(payment.id)}>X</Badge>  
                                                            </ListGroup.Item>
                                                        )}
                                                    </ListGroup>
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