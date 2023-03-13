import React, { useState, useEffect, useRef} from 'react';

import Aux from "../../../hoc/_Aux";
import {Row, Col, Card, Button, Form, Badge, ListGroup} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { getOrder, createOrder, updateOrder } from '../../../store/actions/orderAction';
import { getPaymentTypes, getPaymentHasEgress } from '../../../store/actions/paymentTypeAction';
import { getProviders } from '../../../store/actions/providerAction';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import "../../../../src/styles/datepiker.css";

const OrderCreate = (props) => {
    const inputRef = useRef<HTMLInputElement>(null);
   
    const dispatch = useDispatch()
    const providers = useSelector(state => state.provider)
    const orders = useSelector(state => state.orders.docs)
    const paymentTypes = useSelector(state => state.paymentTypes)
    const paymentHasEgressR = useSelector(state => state.paymentHasEgress)
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

    const [estimateReceptionDate, setEstimateReceptionDate] = useState();

    const [paymentDate, setPaymentDate] = useState();

    const [receptionDate, setReceptionDate] = useState();

    const [orderDate, setOrderDate] = useState();

    const [creditPaymentDate, setCreditPaymentDate] = useState();

    useEffect( () => {
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
        
    }, [dispatch, orders, paymentTypes, paymentHasEgressR, titleButt, formatData, formatPaymentContainer, formatDataUpdate]);

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
        dispatch(getOrder(dispatch,'order', props.match.params._id));
        if ((orders !== undefined || orders?.length > 0)) {
            const data = await orders.find(prov => prov._id === props.match.params._id)
            let filesD = [];
            const formtBody = await {
                _id: data?._id,
                paymentMethod: data?.paymentMethod,
                status: data?.status,
                estimatedAmount: data?.estimatedAmount,
                descriptionOrder: data?.descriptionOrder,
                amount: data?.egress[0]?.amount,
                descriptionPayment: data?.egress[0]?.description,
                invoiceNumber: data?.egress[0]?.invoiceNumber,
                providers: data?.providers[0]?._id,
                _idEgress: data?.egress[0]?._id,
                paymentHasEgress: data?.egress[0]?.operationBills,
                files: data?.egress[0]?.files,
            }
            setBody(formtBody);
            
            if (data?.egress[0]?._id !== undefined && validPaimentHas) {
                dispatch(getPaymentHasEgress(dispatch,'operation-bills/payment-has-egress', data.egress[0]._id));
                setValidPaimentHas(false);
            }

            if (formtBody?.files?.length > 0) {
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
        const data = await orders.find(prov => prov._id === props.match.params._id)
        if (data._id !== undefined ) {
            validDateFront(data);
            let filesD = [];
            // console.log('data', data)
            const formtBody = await {
                _id: data?._id,
                paymentMethod: data?.paymentMethod,
                status: data?.status,
                estimatedAmount: data?.estimatedAmount,
                descriptionOrder: data?.descriptionOrder,
                amount: data?.egress[0]?.amount,
                descriptionPayment: data?.egress[0]?.description,
                invoiceNumber: data?.egress[0]?.invoiceNumber,
                providers: data?.providers[0]?._id,
                _idEgress: data?.egress[0]?._id,
                paymentHasEgress: data?.egress[0]?.operationBills,
                files: data?.egress[0]?.files,
            }
            setBody(formtBody);
            if ((data?.egress[0]?._id !== undefined) &&  validPaimentHas) {
                dispatch(getPaymentHasEgress(dispatch,'operation-bills/payment-has-egress', data?.egress[0]?._id));
                setValidPaimentHas(false);
            }
            // console.log('paymentHasEgressR', paymentHasEgressR)
            if (formtBody?.files?.length > 0) {
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
            // console.log('data formtBody', formtBody)
            // console.log('data body', body)
            
        }
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
            const dataFormat = new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(value)
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
        props.history.push("/order");
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

    const validDateFront = async (data) => {
        if (data.EstimateReceptionDate !== null && data.EstimateReceptionDate !== undefined) {
            setEstimateReceptionDate(new Date(data.EstimateReceptionDate))
        }
        if (data.paymentDate !== null && data.paymentDate !== undefined ) {
            setPaymentDate(new Date(data.paymentDate))
        }
        if (data.receptionDate !== null && data.receptionDate !== undefined) {
            setReceptionDate(new Date(data.receptionDate))
        }
        if (data.orderDate !== null && data.orderDate !== undefined) {
            setOrderDate(new Date(data.orderDate))
        }
        if (data.creditPaymentDate !== null && data.creditPaymentDate !== undefined) {
            setCreditPaymentDate(new Date(data.creditPaymentDate))
        }
    }

    const validDate = async () => {
        if (estimateReceptionDate !== null && estimateReceptionDate !== undefined) {
            body.estimateReceptionDate = moment(estimateReceptionDate).format('MM/DD/YYYY');
        }
        if (paymentDate !== null && paymentDate !== undefined) {
            body.paymentDate = moment(paymentDate).format('MM/DD/YYYY');
        }
        if (receptionDate !== null && receptionDate !== undefined) {
            body.receptionDate = moment(receptionDate).format('MM/DD/YYYY');
        }
        if (orderDate !== null && orderDate !== undefined) {
            body.orderDate = moment(orderDate).format('MM/DD/YYYY');
        }
        if (creditPaymentDate !== null && creditPaymentDate !== undefined) {
            body.creditPaymentDate = moment(creditPaymentDate).format('MM/DD/YYYY');
        }
    }

    const driverButtomSave = async (e) => {
        validIdTypePayment();
        validDate();
        body.paymentHasEgress = paymentContainer;
        body.files = dataFile.files; 
        setBody({...body});
        if (props.match.params._id) {
            dispatch(updateOrder(dispatch,'order', body, props.match.params._id))
        } else {
            dispatch(createOrder(dispatch,'order', body))
        }
        // props.history.push("/order");
        // return;
    }

    const handlerUploadImages = async (e)  => {
        let data = {
            id:( dataFile?.files?.length + 1),
            file : e.target.files[0],
            filename : e.target.files[0].name,
            flag: false,
        }
        dataFile.files.push(data);
        setDataFile({...dataFile})
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
                        <Row>
                            <Col md={6}>
                                <Form onSubmit={driverSubmit}>
                                    <Form.Group controlId="form.ControlPaymentMethod">
                                        <Form.Label>Metodo pago</Form.Label>
                                        <Form.Control as="select" name="paymentMethod" value={body?.paymentMethod} onChange={handlerChange}>
                                            <option key="" >selecciona...</option>
                                            {TypePaymentMethod.map(method =>
                                                <option key={method?.id} value={method?.type}>{method?.type}</option>
                                            )}
                                        </Form.Control>
                                    </Form.Group> 
                                    <Form.Group controlId="form.ControlEstimatedAmount">
                                        <Form.Label>Monto Estimado pago</Form.Label>
                                        <Form.Control type="text" placeholder="Monto Estimado Pago" name="estimatedAmount" value={body?.estimatedAmount} onChange={handlerChange} />
                                    </Form.Group>
                                    <Form.Group controlId="form.ControlEstimatedReceptionDate">
                                        <Form.Label>Fecha Estimada Recepcion</Form.Label>
                                        <DatePicker
                                            className="form-control input_width"
                                            selected={estimateReceptionDate}
                                            onChange={(update) => {
                                                setEstimateReceptionDate(update);
                                            }}
                                            isClearable={true}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="form.ControlReceptionDate">
                                        <Form.Label>Fecha Recepcion</Form.Label>
                                        <DatePicker
                                            className="form-control input_width"
                                            selected={receptionDate}
                                            onChange={(update) => {
                                                setReceptionDate(update);
                                            }}
                                            isClearable={true}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="form.ControlPaymentDate">
                                    <Form.Label>Fecha Pago Credito</Form.Label>
                                        <DatePicker
                                            className="form-control input_width"
                                            selected={creditPaymentDate}
                                            onChange={(update) => {
                                                setCreditPaymentDate(update);
                                            }}
                                            isClearable={true}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="form.ControlDescrptionOrder">
                                        <Form.Label>Descripcion Productos Pedido</Form.Label>
                                        <Form.Control as="textarea" rows="3" name="descriptionOrder" value={body?.descriptionOrder} onChange={handlerChange}/>
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="form.ControlStatus">
                                    <Form.Label>Estado</Form.Label>
                                    <Form.Control as="select" name="status" value={body?.status} onChange={handlerChange}>
                                    <option  >selecciona...</option>
                                    {TypeStatus.map(status =>
                                        <option key={status?.id} value={status?.type}>{status?.type}</option>
                                    )}
                                </Form.Control>
                                </Form.Group> 
                                <Form.Group controlId="form.ControlProvider">
                                    <Form.Label>Proveedor</Form.Label>
                                    <Form.Control as="select" name="providers" value={body?.providers} onChange={handlerChange}>
                                    <option  >selecciona...</option>
                                    {providers.map(provider =>
                                        <option key={provider?._id} value={provider?._id}>{provider?.businessName}</option>
                                    )}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="form.ControlOrderDate">
                                    <Form.Label>Fecha de solicitud orden</Form.Label>
                                    <DatePicker
                                        className="form-control input_width"
                                        selected={orderDate}
                                        onChange={(update) => {
                                            setOrderDate(update);
                                        }}
                                        isClearable={true}
                                    />
                                </Form.Group>
                                <Form.Group controlId="form.ControlPaymentDate">
                                    <Form.Label>Fecha Pago</Form.Label>
                                    <DatePicker
                                        className="form-control input_width"
                                        selected={paymentDate}
                                        onChange={(update) => {
                                            setPaymentDate(update);
                                        }}
                                        isClearable={true}
                                    />
                                </Form.Group>
                                <Form.Group controlId="form.ControlDescriptionLogistic">
                                    <Form.Label>Nota Logistica Pedido</Form.Label>
                                    <Form.Control as="textarea" rows="3" name="descriptionLogistic" value={body?.descriptionLogistic} onChange={handlerChange}/>
                                </Form.Group>
                            </Col>
                            <Col className="mb-0" md={12}>
                                <h5 className="mt-3">Registro Pago</h5>
                                <hr/>
                                <Row>
                                    <Col md={6}>
                                        <Form onSubmit={driverSubmit}>
                                            <Form.Group controlId="form.ControlInvoiceNumber">
                                                <Form.Label>Numero Factura</Form.Label>
                                                <Form.Control type="text" placeholder="Numero Factura" name="invoiceNumber" value={body?.invoiceNumber} onChange={handlerChange} />
                                            </Form.Group>
                                            <Form.Group controlId="form.ControlDescrptionPayment">
                                            <Form.Label>Descripcion Pago</Form.Label>
                                                <Form.Control as="textarea" rows="1" name="descriptionPayment" value={body?.descriptionPayment} onChange={handlerChange}/>
                                            </Form.Group>
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
                                                        key={file.name}
                                                        style={{ width: '15rem' }}
                                                        border="warning">
                                                            <Card.Title className='title_card'>
                                                                {file?.filename}
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

export default OrderCreate;