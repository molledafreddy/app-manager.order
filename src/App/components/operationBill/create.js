import React, { useState, useEffect, useRef} from 'react';

import Aux from "../../../hoc/_Aux";
import {Row, Col, Card, Button, Form, Badge, ListGroup} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { getOperationBill, createOperationBills, updateOperationBills, updateCodeError } from '../../../store/actions/operationBillAction';
import { getPaymentTypes, getPaymentHasEgress } from '../../../store/actions/paymentTypeAction';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import "./styles.css";

const OperationBillCreate = (props) => {
   
    const dispatch = useDispatch()
    const operationBills = useSelector(state => state.operationBills.docs)
    const paymentTypes = useSelector(state => state.paymentTypes)
    const paymentHasEgressR = useSelector(state => state.paymentHasEgress)
    const [validPaimentHas, setValidPaimentHas] = useState(true);
    let isLoadingOperationBill = useSelector(state => state.isLoadingOperationBill)
    let [titleButtom, setTitleButtom] = useState('Crear');

    const errorOperationBill = useSelector(state => state.errorOperationBill);
    const statusCodeOperationBill = useSelector(state => state.statusCodeOperationBill);

    let [validProcess, setValidProcess] = useState(false);
    let [flagPaymentType, setFlagPaymentType] = useState(false);

    const [body, setBody] = useState({
        _id: null,
        description: "",
        type: "",
        amount: "",
        invoiceNumber: "",
        paymentHasEgress: [],
        files: [],
        error: false,
        errorMsg: "",
    })

    const [paymentHasEgress, setPaymentHasEgress] = useState({
        id: null,
        payments: "",
        paymentAmount: "",
        originMoney: ""
    })

    const [buttomAmount, setButtomAmount] = useState(true);

    const [paymentContainer, setPaymentContainer] = useState([]);

    const [dataFile, setDataFile] = useState({
        files: []
    });

    useEffect( () => {
        titleButt()
        console.log('errorOrder', errorOperationBill?.length)
        if (errorOperationBill?.length > 0  && !validProcess) {
            // console.log('ingreso if errorOrder', errorOperationBill)
            showAlert("Error en el proceso", errorOperationBill?.message, "error",4000);
            setValidProcess(true);
            setTimeout(() => {
                setValidProcess(false);
            }, 5000);
            dispatch(updateCodeError(dispatch));
        }
        console.log('statusCodeOrder', statusCodeOperationBill)
        if (statusCodeOperationBill === '200' && errorOperationBill.length === 0) {
            console.log('ingreso al redirect', statusCodeOperationBill)
            Swal.close()
            validRedirect()
        }
        if (props.match.params._id) {
            if ( operationBills === undefined || operationBills?.length === 0) {
                formatDataUpdate();
            } 
            if (operationBills !== undefined || operationBills?.length > 0) {
                formatData();
            }  
        }

        if ((paymentTypes === undefined || paymentTypes.length === 0) && (!flagPaymentType)) {
            dispatch(getPaymentTypes(dispatch,'payment-type'));
            setFlagPaymentType(true);
        }

        if (paymentHasEgressR.length > 0 && paymentContainer.length === 0 && props.match.params._id !== undefined) {
            setTimeout(() => {
                formatPaymentContainer();
            }, 200);
        }
        
    }, [dispatch, operationBills, isLoadingOperationBill, paymentTypes, flagPaymentType, paymentHasEgressR, statusCodeOperationBill, errorOperationBill, validRedirect, titleButt, formatData, formatPaymentContainer, formatDataUpdate]);

    const validRedirect = () => {
        showAlert( "Transaccion exitosa", "El proceso se realizo con exito.", "success",3500);
        dispatch(updateCodeError(dispatch));
        props.history.push("/operation-bill");
        return;
    }

    const formatPaymentContainer = async () => {
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
        
        console.log('lelgo por aca formatPaymentContainer', dataPayment)
    }

    const formatDataUpdate = async () => {
        dispatch(getOperationBill(dispatch,'operation-bills', props.match.params._id));
        
        if ((operationBills !== undefined || operationBills?.length > 0)) {
            const data = await operationBills.find(prov => prov._id === props.match.params._id)
            let filesD = [];
            
            reset(formValues => ({
                // ...formValues,
                _id: data._id,
                _idEgress: data?.egress[0]?._id,
                description: data?.description,
                type: data?.type,
                amount: data?.amount,
                invoiceNumber: data?.egress[0]?.invoiceNumber,
                paymentHasEgress: data?.egress[0]?.operationBills,
                files: data?.egress[0]?.files,
                error: false,
                errorMsg: "",
              }));
            
            if (data.egress[0]._id !== undefined && validPaimentHas) {
                dispatch(getPaymentHasEgress(dispatch,'operation-bills/payment-has-egress', data.egress[0]._id));
                setValidPaimentHas(false);
            }

            if (data?.egress[0]?.files.length > 0) {
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
                setDataFile(dataFile);
            }
        } 
        
    }

    const formatData = async () => {
        const data = await operationBills.find(prov => prov._id === props.match.params._id)
        let filesD = [];
        // console.log('llego por aca', data)
        reset(formValues => ({
            // ...formValues,
            _id: data._id,
            _idEgress: data?.egress[0]?._id,
            description: data?.description,
            type: data?.type,
            amount: data?.amount,
            invoiceNumber: data?.egress[0]?.invoiceNumber,
            files: data?.egress[0]?.files,
            error: false,
            errorMsg: "",
          }));
        
        if (data?.egress[0]?._id !== undefined && validPaimentHas) {
            dispatch(getPaymentHasEgress(dispatch,'operation-bills/payment-has-egress', data?.egress[0]?._id));
            setValidPaimentHas(false);
        }

        if (data?.egress[0]?.files.length > 0) {
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
            setDataFile(dataFile);
        }
        // return formtBody;
    }

    const handlerAmount = async e => {
        numberFormatPositive(e)
        setPaymentHasEgress({
            ...paymentHasEgress,
            [e.target.name]: e.target.value
        })
        if (paymentHasEgress.payments !== '' && paymentHasEgress.paymentAmount !== '' ) {
            setButtomAmount(false)
        } else {
            setButtomAmount(true)
        }
    }

    const addAmount = async e => {
        if ( paymentHasEgress.payments !== '' && paymentHasEgress.paymentAmount !== '' && paymentHasEgress.originMoney !== '' ) {
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
            paymentHasEgress.id = paymentContainer?.length
            paymentHasEgress.paymentAmount = paymentHasEgress.paymentAmount.replace(/,/g,'');
             paymentContainer.push(paymentHasEgress);
            
            await setPaymentContainer(paymentContainer)
            setPaymentHasEgress({
                ...paymentHasEgress,
                "paymentAmount": ''
            });

            setButtomAmount(true);

            let value = 0;
            await paymentContainer.map(payment =>
                value += Number(payment.paymentAmount) 
            )
            // const dataFormat = new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP', minimumFractionDigits: 2}).format(value)
            // const dataFormat = new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(value)
            body.amount = value; 
            console.log('datos', value)
            setValue("paymentHasEgress", paymentContainer);
            setValue("amount", value);
            setBody({...body});
             
        } else {
            alert('debe seleccionar tipo de pago y monto')
        }
    }
   
    const deletePaymentAmount = async (id) => {
       
        const result = await setPaymentContainer((paymentContainer) =>
            paymentContainer.filter((data) => data.id !== id)
        );
        // console.log('result', result)
        let value = 0;
        await paymentContainer.map(payment =>
            value += payment.id !== id ?  Number(payment.paymentAmount) : 0 
        )
        body.amount = value; 
        
    //    setBody({...body})
        setBody(body)
        setValue("amount", value);
        // console.log('paymentContainer', paymentContainer)
        // setValue("paymentHasEgress", paymentContainer);
        setTimeout(() => {
            setValue("paymentHasEgress", paymentContainer);
            console.log('paymentHasEgress', paymentContainer)
        }, 9000);
    }
   
    const typeOperationBills = [
        { id:1, type: "salario" },
        { id:2, type: "administrativo" },
        { id:3, type: "contador" },
        { id:4, type: "inversion" },
        { id:5, type: "servicio_electrico" },
        { id:6, type: "servicio_agua" },
        { id:7, type: "gastos_comunes" },
        { id:8, type: "alquiler" },
        { id:9, type: "productos_limpieza" },
        { id:10, type: "beneficios" },
        { id:11, type: "materiales_contruccion" },
        { id:12, type: "personal" },
        { id:13, type: "implementos" },
        { id:14, type: "remodelacion" },
        { id:15, type: "publicidad" },
        { id:16, type: "innovación" },
        { id:17, type: "ganancia" },
        { id:18, type: "otros" },
    ];

    const handlerChange = async e => {
        setBody({
            ...body,
            [e.target.name]: e.target.value
        })
        numberFormatPositive(e)
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

    const titleButt = async (e) => {
        if (props.match.params._id) {
            setTitleButtom('Editar');
        }
    }

    const handlerBack = async e => {
        setPaymentContainer([])
        props.history.push("/operation-bill");
    }

    const deleteImg = async (id) => {
        const resultData = dataFile.files.filter((data) => data.id !== id);
        dataFile.files = resultData;
        setValue("files", dataFile);
        setDataFile({...dataFile});
    }

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
        reset } = useForm({mode:  "onChange", reValidateMode: "onChange"});
    
        const watchAmount = watch("amount");
    const onSubmit = (dataInfo) => {
        if (props.match.params._id) {
            dispatch(updateOperationBills(dispatch,'operation-bills', dataInfo, paymentContainer, props.match.params._id))
        } else {
            console.log('inbgreso la else')
            dispatch(createOperationBills(dispatch,'operation-bills', dataInfo));
        }
        showLoading();
    };

    const TypeOrigin = [
        { id:1, type: "caja" },
        { id:2, type: "caja chica" },
        { id:3, type: "prestamo" },
    ];

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

    const showLoading = () => {
        Swal.fire({
        title: 'En Proceso!',
        html: 'Transaccion en Proceso.',
        timerProgressBar: true,
        allowOutsideClick: false,
        didOpen: () => { Swal.showLoading() },
        willClose: () => {} })
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

    return (
        <Aux>
            <Row>
                <Col>
                <Card>
                    <Card.Header>
                        <Row>
                            <Col md={4} xs="auto">
                                <Card.Title as="h5">Facturas de Operacion</Card.Title>
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
                                    <Form.Group controlId="form.ControIinvoiceNumber">
                                        <Form.Label>Numero factura</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Numero Factura" 
                                            name="invoiceNumber" 
                                            {...register("invoiceNumber")}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="form.ControlDescrption">
                                        <Form.Label>Descripcion</Form.Label>
                                        <Form.Control 
                                            as="textarea" 
                                            rows="3" 
                                            name="description" 
                                            className={errors.description && "error"}
                                            {...register("description", {
                                                    required: messages.required,
                                                    onChange: (e) => {handlerChange(e)}
                                                })} 
                                            />
                                        {errors.description && <p>{errors.description.message}</p>}
                                    </Form.Group>
                                    
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="form.ControlType">
                                        <Form.Label>Tipo Operacion</Form.Label>
                                        <Form.Control 
                                            as="select" 
                                            name="type" 
                                            className={errors.type && "error"}
                                            {...register("type", {
                                                required: messages.required,
                                            })}>
                                        <option value="" >selecciona...</option>
                                        {typeOperationBills.map(operationBill =>
                                            <option key={operationBill?.id} value={operationBill?.type}>{operationBill?.type}</option>
                                        )}
                                        </Form.Control>
                                        {errors.type && <p>{errors.type.message}</p>}
                                    </Form.Group> 
                                </Col>
                                <Col className="mb-5" md={12}>
                                    <h5 className="mt-3">Pagos</h5>
                                    <hr/>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group controlId="form.ControlPayments">
                                                <Form.Label>Tipo Pago</Form.Label>
                                                <Form.Control 
                                                    as="select" 
                                                    name="payments" 
                                                    value={paymentHasEgress?.payments} 
                                                    onChange={handlerAmount}>
                                                    <option key="-1" value="" >selecciona...</option>
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
                                            <Form.Group controlId="form2.ControlPaymentAmount">
                                                <Form.Label>Monto</Form.Label>
                                                <Form.Control type="tel" autoComplete='off' placeholder="Monto Pago" name="paymentAmount" value={paymentHasEgress?.paymentAmount} onChange={handlerAmount} />
                                            </Form.Group>
                                            <Form.Group controlId="form.ControlAmount">
                                                <Form.Label>Monto Total</Form.Label>
                                                <Form.Control 
                                                    disabled
                                                    type="text" 
                                                    name="amount"
                                                    value={ new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP', minimumFractionDigits: 2}).format(watchAmount === undefined ? 0 :watchAmount)}
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Button disabled={buttomAmount} onClick={addAmount}  className="mb-0">Agregar</Button>
                                            </Form.Group>
                                        </Col>
                                        <Col className="mt-4" md={6}>
                                            <ListGroup as="ol" numbered>
                                                { paymentContainer?.map(payment =>
                                                    <ListGroup.Item key={'cardd_'+payment?.id} as="li" className="d-flex justify-content-between align-items-start">
                                                        <div className="ms-2 me-auto">
                                                            <div className="fw-bold">{payment.payments} - {payment.originMoney}</div>
                                                            { new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP', minimumFractionDigits: 2}).format(payment.paymentAmount === undefined ? 0 : payment.paymentAmount)}
                                                        </div> 
                                                        <Badge variant='danger' className='badge_position ml-5' onClick={() => deletePaymentAmount(payment.id)}>X</Badge>  
                                                    </ListGroup.Item>
                                                )}
                                            </ListGroup>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col className="mb-5" md={12}>
                                    <Row>
                                        <Col md={12}>
                                        <h5 className="mt-5">Archivos</h5>
                                        <hr/>
                                            {/* <Form onSubmit={driverSubmit} inline> */}
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
                                            {/* </Form>  */}
                                        </Col>
                                        <Col className="mt-4" md={12}>
                                            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                                                {dataFile?.files?.map((file) => 
                                                    <Col>
                                                        <Card
                                                        key={'cardd_'+file.filename}
                                                        style={{ width: '15rem', height: '15rem' }}
                                                        border="warning">
                                                            <Card.Title className='title_card'>
                                                                {file?.filename}
                                                                <Badge key={'card_badge_d'+file.filename} variant='primary' className='badge_position ml-5' onClick={() => download(file?.file, file?.flag)}>
                                                                    <i className="fa fa-download" />
                                                                </Badge>
                                                                <Badge variant='danger' className='badge_position ml-5' onClick={() => deleteImg(file?.id)}>X</Badge>
                                                            </Card.Title>
                                                            <Card.Img key={'cardi_'+file.filename} style={{ width: '15rem', height:'12rem' }} variant="top" src={file?.flag ? file?.file : URL.createObjectURL(file?.file)} />
                                                        </Card>
                                                    </Col>
                                                )}
                                                
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

export default OperationBillCreate;