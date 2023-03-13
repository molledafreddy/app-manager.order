import React, { useState, useEffect, useRef} from 'react';

import Aux from "../../../hoc/_Aux";
import {Row, Col, Card, Button, Form, Badge, ListGroup} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { getOperationBill, createOperationBills, updateOperationBills } from '../../../store/actions/operationBillAction';
import { getPaymentTypes, getPaymentHasEgress } from '../../../store/actions/paymentTypeAction';

const OperationBillCreate = (props) => {
    const inputRef = useRef<HTMLInputElement>(null);
   
    const dispatch = useDispatch()
    const operationBills = useSelector(state => state.operationBills.docs)
    const paymentTypes = useSelector(state => state.paymentTypes)
    const paymentHasEgressR = useSelector(state => state.paymentHasEgress)
    let [titleButtom, setTitleButtom] = useState('Crear');
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
    })

    const [buttomAmount, setButtomAmount] = useState(true);

    const [paymentContainer, setPaymentContainer] = useState([]);

    const [dataFile, setDataFile] = useState({
        files: []
    });

    const [addFile, setAddFile] = useState({
        file: null
    })

    useEffect( () => {
        titleButt()
        if (props.match.params._id) {
            if ( operationBills === undefined || operationBills?.length === 0) {
                formatDataUpdate();
            } 
            if (operationBills !== undefined || operationBills?.length > 0) {
                formatData();
            }  
        }

        if (paymentTypes === undefined || paymentTypes.length === 0) {
            dispatch(getPaymentTypes(dispatch,'payment-type'));
        }

        if (paymentHasEgressR.length > 0 && paymentContainer.length === 0 && props.match.params._id != undefined) {
            formatPaymentContainer();
        }
        
    }, [dispatch, operationBills, paymentTypes, paymentHasEgressR, titleButt, formatData, formatPaymentContainer, formatDataUpdate]);

    const formatPaymentContainer = async () => {
        let dataPayment = [];
        await paymentHasEgressR.forEach(element => {
            dataPayment.push({
                paymentAmount: element?.paymentAmount,
                payments: element?.payments[0]?.name,
                id: element?.payments[0]?.name
            })
        });
        await setPaymentContainer(dataPayment);
    }

    const formatDataUpdate = async () => {
        dispatch(getOperationBill(dispatch,'operation-bills', props.match.params._id));
        
        if ((operationBills !== undefined || operationBills?.length > 0)) {
            const data = await operationBills.find(prov => prov._id === props.match.params._id)
            let filesD = [];
            const formtBody = await {
                _id: data._id,
                description: data.description,
                type: data.type,
                amount: data.amount,
                invoiceNumber: data?.egress[0].invoiceNumber,
                paymentHasEgress: data?.egress[0]?.operationBills,
                files: data?.egress[0]?.files,
                error: false,
                errorMsg: "",
            }
            setBody(formtBody);
            
            if (data.egress[0]._id !== undefined && paymentHasEgressR.length === 0) {
                dispatch(getPaymentHasEgress(dispatch,'operation-bills/payment-has-egress', data.egress[0]._id));
            }

            if (formtBody?.files.length > 0) {
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
        const data = await operationBills.find(prov => prov._id === props.match.params._id)
        let filesD = [];
        
        const formtBody = await {
            _id: data._id,
            _idEgress: data?.egress[0]?._id,
            description: data.description,
            type: data.type,
            amount: data.amount,
            invoiceNumber: data?.egress[0].invoiceNumber,
            paymentHasEgress: data?.egress[0]?.operationBills,
            files: data?.egress[0]?.files,
            error: false,
            errorMsg: "",
        }
        setBody(formtBody);
        
        if (data?.egress[0]?._id !== undefined && paymentHasEgressR.length === 0) {
            dispatch(getPaymentHasEgress(dispatch,'operation-bills/payment-has-egress', data?.egress[0]?._id));
        }

        if (formtBody?.files.length > 0) {
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
        return formtBody;
    }

    const handlerAmount = async e => {
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
                return;
            }
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
                value += Number(payment.paymentAmount) 
            )
            const dataFormat = new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP', minimumFractionDigits: 2}).format(value)
            body.amount = dataFormat; 
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
        body.amount = value; 
        await setBody({...body})
    }
    
    const typeOperationBills = [
        { id:1, type: "salary" },
        { id:2, type: "administrative" },
        { id:3, type: "accountant" },
        { id:4, type: "investment" },
        { id:5, type: "light_service" },
        { id:6, type: "water_service" },
        { id:7, type: "common_expense" },
        { id:8, type: "rent" },
        { id:9, type: "cleaning_products" },
        { id:10, type: "profits" },
        { id:11, type: "construction_materials" },
        { id:12, type: "workforce" },
        { id:13, type: "implements" },
        { id:14, type: "remodeling" },
        { id:15, type: "publicity" },
        { id:16, type: "innovation" },
        { id:17, type: "other" },
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
        }
    }

    const handlerBack = async e => {
        props.history.push("/operation-bill");
    }

    const deleteImg = async (id) => {
        const resultData = dataFile.files.filter((data) => data.id !== id);
        dataFile.files = resultData;
        setDataFile({...dataFile});
    }

    const validIdTypePayment = async () => {
        for (let index = 0; index < paymentContainer.length; index++) {
            const element = paymentContainer[index];
            for (let index = 0; index < paymentTypes.length; index++) {
                const type = paymentTypes[index];
                if (type.name === element.payments) {
                    element.payments = type._id;
                }
            }
        }
    }

    const driverButtomSave = async (e) => {
        validIdTypePayment();
        body.paymentHasEgress = paymentContainer;
        body.files = dataFile.files; 
        setBody({...body});
        console.log('body',body)
        if (props.match.params._id) {
            dispatch(updateOperationBills(dispatch,'operation-bills', body, props.match.params._id))
        } else {
            dispatch(createOperationBills(dispatch,'operation-bills', body))
        }
        props.history.push("/operation-bill");
        return;
    }

    const handlerUploadImages = async (e)  => {
        let data = {
            id:( dataFile?.files?.length + 1),
            file : e.target.files[0],
            name : e.target.files[0].name,
            flag: false,
        }
        dataFile.files.push(data);
        setDataFile({...dataFile})
    }

    return (
        <Aux>
            <Row>
                <Col>
                <Card>
                    <Card.Header>
                        <Row>
                            <Col md={4}>
                                <Card.Title as="h5">Facturas de Operacion</Card.Title>
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
                                    <Form.Group controlId="form.ControIinvoiceNumber">
                                        <Form.Label>Numero factura</Form.Label>
                                        <Form.Control type="text" placeholder="Numero Factura" name="invoiceNumber" value={body?.invoiceNumber} onChange={handlerChange} />
                                    </Form.Group>
                                    <Form.Group controlId="form.ControlDescrption">
                                        <Form.Label>Descripcion</Form.Label>
                                        <Form.Control as="textarea" rows="3" name="description" value={body?.description} onChange={handlerChange}/>
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="form.ControlType">
                                    <Form.Label>Tipo Operacion</Form.Label>
                                    <Form.Control as="select" name="type" value={body?.type} onChange={handlerChange}>
                                    <option  >selecciona...</option>
                                    {typeOperationBills.map(operationBill =>
                                        <option key={operationBill?.id} value={operationBill?.type}>{operationBill?.type}</option>
                                    )}
                                    </Form.Control>
                                </Form.Group> 
                            </Col>
                            <Col className="mb-5" md={12}>
                                <h5 className="mt-3">Pagos</h5>
                                <hr/>
                                <Row>
                                    <Col md={6}>
                                        <Form onSubmit={driverSubmit}>
                                            <Form.Group controlId="form.ControlPayments">
                                                <Form.Label>Tipo Pago</Form.Label>
                                                <Form.Control as="select" name="payments" value={paymentHasEgress?.payments} onChange={handlerAmount}>
                                                    <option key="-1" >selecciona...</option>
                                                    { paymentTypes.map(payment =>
                                                        <option key={payment?._id} value={payment?.name}>{payment?.name}</option>
                                                    )}
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId="form2.ControlPaymentAmount">
                                                <Form.Label>Monto</Form.Label>
                                                <Form.Control type="tel" autoComplete='off' placeholder="Monto Pago" name="paymentAmount" value={paymentHasEgress?.paymentAmount} onChange={handlerAmount} />
                                            </Form.Group>
                                            <Form.Group controlId="form.ControlAmount">
                                                <Form.Label>Monto Total: {body?.amount}</Form.Label>
                                            </Form.Group>
                                            <Form.Group>
                                                <Button disabled={buttomAmount} onClick={addAmount}  className="mb-0">Agregar</Button>
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                    <Col className="mt-4" md={6}>
                                        <ListGroup as="ol" numbered>
                                            { paymentContainer?.map(payment =>
                                                <ListGroup.Item key={payment?.id} as="li" className="d-flex justify-content-between align-items-start">
                                                    <div className="ms-2 me-auto">
                                                        <div className="fw-bold">{payment.payments}</div>
                                                        { new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP', minimumFractionDigits: 2}).format(payment.paymentAmount)}
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
                                    <Col className="mt-4" md={12}>
                                        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                                            {dataFile?.files?.map((file) => 
                                                <Col>
                                                    <Card
                                                     key={file.name}
                                                     style={{ width: '15rem' }}
                                                     border="warning">
                                                        <Card.Title className='title_card'>
                                                            {file?.filename}
                                                            <Badge variant='danger' className='badge_position ml-5' onClick={() => deleteImg(file?.id)}>X</Badge>
                                                        </Card.Title>
                                                        <Card.Img variant="top" src={file?.flag ? file?.file : URL.createObjectURL(file?.file)} />
                                                    </Card>
                                                </Col>
                                            )}
                                            
                                        </Row>
                                    </Col>
                                </Row>
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

export default OperationBillCreate;