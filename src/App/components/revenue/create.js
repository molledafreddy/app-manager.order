import React, { useState, useEffect} from 'react';

import Aux from "../../../hoc/_Aux";
import {Row, Col, Card, Button, Badge, Form} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { createRevenueClosure, updateRevenueClosure, getRevenue, updateCodeErrorClosure } from '../../../store/actions/revenueAction';
import Swal from 'sweetalert2';
import { Controller, useForm} from 'react-hook-form';
import "./styles.css";
//  
const RevenueCreate = (props) => {
   
    const dispatch = useDispatch()
    const revenues = useSelector(state => state.revenuesClosure.docs);
    const isLoadingRevenue = useSelector(state => state.isLoadingRevenue);
    const errorRevenue = useSelector(state => state.errorRevenueClosure);
    const statusCodeRevenue = useSelector(state => state.statusCodeRevenueClosure);

    let [validProcess, setValidProcess] = useState(false);
    let [roleUser, setRoleUser] = useState('');

    let [titleButtom, setTitleButtom] = useState('Crear');
   
    const [body, setBody] = useState({
        _id: null,
        amountSistem: "",
        amountPos: "",
        amountCash: "",
        amountTransfer: "",
        amountOther: "",
        description: "",
        cashFund: "",
        users: "",
        files: [],
        amountTurn: 0,
        totalAmount: "",
        turn: "",
        type: "closure"
    })

    const [dataFile, setDataFile] = useState({
        files: []
    });

    useEffect( () => {
        titleButt();
        setRoleUser(localStorage.getItem('role'));
        // console.log('datos watchValidAdmin', watchValidAdmin)
        console.log('datos errorRevenue', errorRevenue)
        console.log('statusCodeRevenue', statusCodeRevenue)
        if (errorRevenue?.code !== undefined && errorRevenue?.codeHttp === '400' ) {
           
            console.log('ingreso aca errorRevenue',  errorRevenue.message)
            showAlert("Error en el proceso", errorRevenue?.message, "error",4000);
            setValidProcess(true);
            setTimeout(() => {
                setValidProcess(false);
                dispatch(updateCodeErrorClosure(dispatch));
                ;
            }, 5000);
            
        } else if (errorRevenue.length > 0 && validProcess === false ) {
            // console.log('errorRevenue', errorRevenue)
            console.log('datos errorRevenue validProcess', validProcess)
            dispatch(updateCodeErrorClosure(dispatch));
            showAlert("Error en el proceso", 'Error al realizar la transaccion', "error",4000);
            setValidProcess(true);
            setTimeout(() => {
                setValidProcess(false);
            }, 5000);
            
        }else if (statusCodeRevenue === '400') {
            dispatch(updateCodeErrorClosure(dispatch));
            showAlert("Error en el proceso", 'Error al realizar la transaccion', "error",4000);
            console.log('ingreso por aca')
            setValidProcess(true);
            setTimeout(() => {
                setValidProcess(false);
            }, 5000);
            
        }
        
        // console.log('statusCodeRevenue', statusCodeRevenue)
        if (statusCodeRevenue === '200' && errorRevenue.length === 0) {
            Swal.close();
            validRedirect();
        }
        if (props.match.params._id) {
            if ( revenues === undefined || revenues?.length === 0) {
                dispatch(getRevenue(dispatch,'revenue', props.match.params._id));
            }

            if (revenues !== undefined || revenues?.length > 0) {
                const dataRevenue = revenues.find(prov => prov._id === props.match.params._id);
                setValuesRevenue(dataRevenue)
                addFiles(dataRevenue)
            }
        }
    }, [dispatch, updateCodeErrorClosure, revenues, isLoadingRevenue, errorRevenue, statusCodeRevenue, titleButt, validRedirect]);

    const setValuesRevenue = async (data) => {
        reset(formValues => ({
            _id: data._id,
            amountPos: data?.amountPos,
            description: data?.description,
            amountCash: data?.amountCash,
            amountTransfer: data?.amountTransfer,
            amountOther: data?.amountOther,
            amountSistem: data?.amountSistem,
            cashFund: data?.cashFund,
            validAdmin: data?.validAdmin,
            validDate: data?.validDate,
            noteValid: data?.noteValid,
            usersAdmin: data?.usersAdmin,
        }))
    }

    const addFiles = async (data) => {
        let filesD = [];
        console.log('body?.files', body?.files)
        if (data?.files.length > 0) {
            data.files.forEach((element, index) => {
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
            setValue("files", dataFile);
        }
    }

    const handlerChange = async e => {
        numberFormatPositive(e);
    }

    const  numberFormatPositive = async (e) => {
        // Format only positive decimal numbers
        if ( 
            e.target.name === 'amountPos' || e.target.name === 'amountCash' || 
            e.target.name === 'amountTransfer' || e.target.name === 'amountOther' || 
            e.target.name === 'cashFund' || e.target.name === 'amountSistem' ) {
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
        return resultado;
    }

    const titleButt = async (e) => {
        // console.log('inbrgeso titleButt')
        if (props.match.params._id) {
            setTitleButtom('Editar');
        }
    }

    const deleteImg = async (id) => {
        const resultData = dataFile.files.filter((data) => data.id !== id);
        dataFile.files = resultData;
        setDataFile({...dataFile});
        setValue("files", dataFile);
    }

    const handlerUploadImages = async (e)  => {
        const resultValid = await validImages(e);
        if (resultValid) {
            let data = {
                id:( dataFile?.files?.length + 1),
                file : e.target.files[0],
                filename : e.target.files[0].name,
                flag: false
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

    const handlerBack = async e => {
        props.history.push("/revenue");
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

    const { 
        register, 
        handleSubmit, 
        formState: { errors }, 
        setValue, 
        watch, 
        reset,
        control } = useForm({mode:  "all", reValidateMode: "onChange"});
        const watchValidAdmin = watch("validAdmin");
    // const watchTotalAmount = watch("totalAmount");
    
    const onSubmit = (dataInfo) => {
        if (dataInfo.files === undefined || dataInfo.files.length === 0) {
            showAlert(
                'validacion Cierre Ventas', 
                "Debe Ingresar los archivos que validen los montos del Cierre.", 
                "warning",
                4000);
                return;
        }
        if (props.match.params._id) {
            dispatch(updateRevenueClosure(dispatch,'revenue/working-day', dataInfo, props.match.params._id));
            showLoading()
        } else {
            dispatch(createRevenueClosure(dispatch,'revenue/working-day', dataInfo));
            showLoading()
        }
    }

    const validRedirect = () => {
        showAlert( "Transaccion exitosa", "El proceso se realizo con exito.", "success",9500);
        dispatch(updateCodeErrorClosure(dispatch));
        props.history.push("/revenue");
        return;
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

    const TypeStatus = [
        { id:1, type: "Verificado" },
        { id:2, type: "por_verificar" },
        { id:3, type: "con_error" },
    ];

    return (
        <Aux>
            <Row>
                <Col>
                <Card>
                    <Card.Header>
                        <Row>
                            <Col md={4} sm={4} xs={7}>
                                <Card.Title as="h5">Registro Cierre Caja</Card.Title>
                            </Col>
                            <Col md={{ span: 1, offset: 6  }} sm={{ span: 1, offset: 6  }} xs={{ span: 1, offset: 1 }}>
                            <Button variant="primary" onClick={handlerBack}>Volver</Button>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="form.ControlAmountCash">
                                        <Form.Label>Monto Efectivo</Form.Label>
                                        <Form.Control
                                            disabled={roleUser === 'Admin' ? true : false} 
                                            type="text" 
                                            placeholder="Monto Efectivo" 
                                            className={errors.amountCash && "error"}
                                            name="amountCash"
                                            {...register("amountCash", {
                                                required: messages.required,
                                                onChange: (e) => {handlerChange(e)}
                                            })} 
                                        />
                                        {errors.amountCash && <p>{errors.amountCash.message}</p>}
                                    </Form.Group>
                                    <Form.Group controlId="form.ControlAmountPos">
                                        <Form.Label>Monto Punto Venta</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            disabled={roleUser === 'Admin' ? true : false}
                                            placeholder="Monto Punto Venta" 
                                            className={errors.amountPos && "error"}
                                            name="amountPos"
                                            {...register("amountPos", {
                                                required: messages.required,
                                                onChange: (e) => {handlerChange(e)}
                                            })} 
                                        />
                                        {errors.amountPos && <p>{errors.amountPos.message}</p>}
                                    </Form.Group>
                                    <Form.Group controlId="form.ControlAmountTransfer">
                                        <Form.Label>Monto Transferencia</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            disabled={roleUser === 'Admin' ? true : false}
                                            placeholder="Monto Transferencia" 
                                            className={errors.amountTransfer && "error"}
                                            name="amountTransfer"
                                            {...register("amountTransfer", {
                                                required: messages.required,
                                                onChange: (e) => {handlerChange(e)}
                                            })} 
                                        />
                                        {errors.amountTransfer && <p>{errors.amountTransfer.message}</p>}
                                    </Form.Group>
                                    <Form.Group controlId="form.ControlAmountOther">
                                        <Form.Label>Monto Otros</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            disabled={roleUser === 'Admin' ? true : false}
                                            placeholder="Monto Otros" 
                                            name="amountOther"
                                            {...register("amountOther", {
                                                onChange: (e) => {handlerChange(e)}
                                            })} 
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="form.ControlCashFund">
                                        <Form.Label>Fondo de caja</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            disabled={roleUser === 'Admin' ? true : false}
                                            placeholder="Monto Fondo de Caja" 
                                            className={errors.cashFund && "error"}
                                            name="amountOther"
                                            {...register("cashFund", {
                                                required: messages.required,
                                                onChange: (e) => {handlerChange(e)}
                                            })} 
                                        />
                                        {errors.cashFund && <p>{errors.cashFund.message}</p>}
                                    </Form.Group>
                                    <Form.Group controlId="form.ControlAmountSistem">
                                        <Form.Label>Monto Sistema</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            disabled={roleUser === 'Admin' ? true : false}
                                            placeholder="Monto Sistema" 
                                            className={errors.amountSistem && "error"}
                                            name="amountSistem"
                                            {...register("amountSistem", {
                                                required: messages.required,
                                                onChange: (e) => {handlerChange(e)}
                                            })} 
                                        />
                                        {errors.amountSistem && <p>{errors.amountSistem.message}</p>}
                                    </Form.Group>
                                    <Form.Group controlId="form.ControlDescrption">
                                        <Form.Label>Descripcion</Form.Label>
                                        <Controller 
                                            control={control} 
                                            name="description"  
                                            disabled={roleUser === 'Admin' ? true : false}
                                            className={errors.description && "error"}     
                                            // rules={{ required: messages.required }}  
                                            render={({ field: { onChange, onBlur, value, ref } }) => (                             
                                            <Form.Control 
                                                as="textarea" 
                                                rows="3"
                                                disabled={roleUser === 'Admin' ? true : false}
                                                onChange={ onChange}
                                                onBlur={onBlur} 
                                                name="description"
                                                value={value}  
                                                ref={ref}                         
                                                // isInvalid={errors.description} 
                                                {...register("description")}                                                         
                                                // placeholder="Monto Sistema" 

                                            />)} 
                                        />        
                                    </Form.Group>
                                </Col>
                                {(roleUser === 'Admin' && roleUser !== '' )  && (
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
                                                    {TypeStatus.map(status =>
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
                                            <Form.Group as={Row}>
                                                <Form.File
                                                    disabled={roleUser === 'Admin' ? true : false}
                                                    type="file"
                                                    className="custom-file-label"
                                                    id="inputGroupFile0_8"
                                                    onChange={(e) => handlerUploadImages(e)}
                                                    custom
                                                    name="file"
                                                    multiple
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col className="mt-5" md={12}>
                                            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                                                <Col>
                                                    {dataFile?.files?.map((file) => 
                                                        <Card
                                                            className="mt-2"
                                                            key={'card_'+file.filename}
                                                            style={{ width: '15rem' }}
                                                            border="warning">
                                                            <Card.Title key={'card_title_'+file.filename} className='title_card'>
                                                                {file?.filename}
                                                                <Badge key={'card_badge_d'+file.filename} variant='primary' className='badge_position ml-5' onClick={() => download(file?.file, file?.flag)}>
                                                                    <i className="fa fa-download" />
                                                                </Badge>
                                                                {roleUser !== 'Admin' && (
                                                                    <Badge key={'card_badge_'+file.filename} variant='danger' className='badge_position ml-5' onClick={() => deleteImg(file?.id)}>X</Badge>
                                                                )}
                                                            </Card.Title>
                                                            <Card.Img style={{ width: '15rem', height:'12rem' }} key={'card_img_'+file.filename} variant="top" src={file?.flag ? file?.file : URL.createObjectURL(file?.file)} />
                                                        </Card>
                                                    )}
                                                </Col>
                                                
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={6}>
                                    <Button disabled={roleUser === 'User' && watchValidAdmin === 'Verificado' ? true : false} type='submit' variant="primary" >{titleButtom}</Button>                  
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

export default RevenueCreate;