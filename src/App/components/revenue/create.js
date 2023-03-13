import React, { useState, useEffect} from 'react';

import Aux from "../../../hoc/_Aux";
import {Row, Col, Card, Table, Button, Badge, Form} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { createRevenues, updateRevenues, getRevenue } from '../../../store/actions/revenueAction';


const RevenueCreate = (props) => {
   
    const dispatch = useDispatch()
    const revenues = useSelector(state => state.revenues.docs)
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
    })

    const [dataFile, setDataFile] = useState({
        files: []
    });

    const [addFile, setAddFile] = useState({
        file: null
    })

    useEffect( () => {
        titleButt()
        if (props.match.params._id) {
            if ( revenues === undefined || revenues?.length === 0) {
                dispatch(getRevenue(dispatch,'revenue', props.match.params._id));
            }

            if (revenues !== undefined || revenues?.length > 0) {
                const dataRevenue = revenues.find(prov => prov._id === props.match.params._id);
                setBody(dataRevenue);
                addFiles(dataRevenue)
            }
        }
    }, [dispatch, revenues, titleButt])

    const addFiles = async (data) => {
        let filesD = [];
        console.log('body?.files', body?.files)
        if (data?.files.length > 0) {
            data.files.forEach((element, index) => {
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

    const driverSubmit =e=> {
        e.preventDefault();
    }

    const handlerChange = async e => {
        setBody({
            ...body,
            [e.target.name]: e.target.value
        })
    }

    const handlderBlur = async e => {
        validTotalAmount(e.target.name)
    }

    const validTotalAmount = async (name) => {
        if (name === 'amountPos' || name === 'amountCash' || name === 'amountTransfer' || name === 'amountOther') {
            body.totalAmount = ( Number(body.amountPos) + Number(body.amountCash)  + Number( body.amountTransfer) + Number(body.amountOther))
            setBody({...body})
        }
    }

    const titleButt = async (e) => {
        if (props.match.params._id) {
            setTitleButtom('Editar');
        }
    }

    const deleteImg = async (id) => {
        const resultData = dataFile.files.filter((data) => data.id !== id);
        dataFile.files = resultData;
        setDataFile({...dataFile});
    }

    const handlerUploadImages = async (e)  => {
        let data = {
            id:( dataFile?.files?.length + 1),
            file : e.target.files[0],
            filename : e.target.files[0].name,
            flag: false
        }
        dataFile.files.push(data);
        setDataFile({...dataFile})
    }

    const driverButtomSave = async (e) => {
        body.files = dataFile.files; 
        setBody({...body});
        if (props.match.params._id) {
            dispatch(updateRevenues(dispatch,'revenue/working-day', body, props.match.params._id))
        } else {
            dispatch(createRevenues(dispatch,'revenue/working-day', body))
        }
        props.history.push("/revenue");
        return;
    }

    const handlerBack = async e => {
        props.history.push("/revenue");
    }

    return (
        <Aux>
            <Row>
                <Col>
                <Card>
                    <Card.Header>
                        <Row>
                            <Col md={4}>
                                <Card.Title as="h5">Registro Cierre</Card.Title>
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
                                    <Form.Group controlId="form.ControlAmountCash">
                                        <Form.Label>Monto Efectivo</Form.Label>
                                        <Form.Control type="text" placeholder="Monto Efectivo" name="amountCash" value={body?.amountCash} onChange={handlerChange} onBlur={handlderBlur} />
                                    </Form.Group>
                                    <Form.Group controlId="form.ControlAmountTransfer">
                                        <Form.Label>Monto Transferencia</Form.Label>
                                        <Form.Control type="text" placeholder="Monto Transferencia" name="amountTransfer" value={body?.amountTransfer} onChange={handlerChange} onBlur={handlderBlur} />
                                    </Form.Group>
                                    <Form.Group controlId="form.ControlAmountSistem">
                                        <Form.Label>Monto Sistema</Form.Label>
                                        <Form.Control type="text" placeholder="Monto Sistema" name="amountSistem" value={body?.amountSistem} onChange={handlerChange} />
                                    </Form.Group>
                                    <Form.Group controlId="form.ControlDescrption">
                                        <Form.Label>Descripcion</Form.Label>
                                        <Form.Control as="textarea" rows="3" name="description" value={body?.description} onChange={handlerChange}/>
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="form.ControlAmountPos">
                                    <Form.Label>Monto Punto Venta</Form.Label>
                                    <Form.Control type="text" placeholder="Monto Punto Venta" name="amountPos" value={body?.amountPos} onChange={handlerChange} onBlur={handlderBlur} />
                                </Form.Group>
                                <Form.Group controlId="form.ControlAmountOther">
                                    <Form.Label>Monto Otros</Form.Label>
                                    <Form.Control type="text" placeholder="Monto Otros" name="amountOther" value={body?.amountOther} onChange={handlerChange} onBlur={handlderBlur} />
                                </Form.Group>
                                <Form.Group controlId="form.ControlCashFund">
                                    <Form.Label>Fondo de caja</Form.Label>
                                    <Form.Control type="text" placeholder="Fondo de caja" name="cashFund" value={body?.cashFund} onChange={handlerChange} />
                                </Form.Group>
                                <Form.Group controlId="form.ControlTotalAmount">
                                    <Form.Label>Monto Total Turno</Form.Label>
                                <Form.Control type="text" disabled placeholder="totalAmount" name="totalAmount" value={body?.totalAmount} onChange={handlerChange}/>
                                </Form.Group>
                                {/* <Form.Group controlId="form.ControlUsers">
                                    <Form.Label>users</Form.Label>
                                    <Form.Control type="text" placeholder="users" name="users" value={body?.users} onChange={handlerChange}/>
                                </Form.Group> */}
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
                                                    id="inputGroupFile0_8"
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
                                                        className="mt-2"
                                                        key={'card_'+file.filename}
                                                        style={{ width: '15rem' }}
                                                        border="warning">
                                                        <Card.Title key={'card_title_'+file.filename} className='title_card'>
                                                            {file?.filename}
                                                            <Badge key={'card_badge_'+file.filename} variant='danger' className='badge_position ml-5' onClick={() => deleteImg(file?.id)}>X</Badge>
                                                        </Card.Title>
                                                        <Card.Img key={'card_img_'+file.filename} variant="top" src={file?.flag ? file?.file : URL.createObjectURL(file?.file)} />
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

export default RevenueCreate;