import React, { useState, useEffect, useRef} from 'react';

import Aux from "../../../hoc/_Aux";
import {Row, Col, Card, Button, Form, Badge, ListGroup} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { getTurn, createTurn, updateTurn } from '../../../store/actions/turnAction';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import "../../../../src/styles/datepiker.css";
import DatePicker from 'react-datepicker';

const TurnCreate = (props) => {
   
    const dispatch = useDispatch()
    const turns = useSelector(state => state.turns.docs)
    let [titleButtom, setTitleButtom] = useState('Crear');
    const [body, setBody] = useState({
        _id: null,
        description: "",
        type: "",
        endDate: "",
        startDate: "",
        status: "",
    })

    const [startDate, setStartDate] = useState();

    const [endDate, setEndDate] = useState(null);

    useEffect( () => {
        titleButt()
        if (props.match.params._id) {
            if ( turns === undefined || turns?.length === 0) {
                dispatch(getTurn(dispatch,'turn', props.match.params._id));
            } 
            if (turns !== undefined || turns?.length > 0) {
                const dataTurn = turns.find(turn => turn._id === props.match.params._id)
                validDateFront(dataTurn);
                setBody(dataTurn);
            }
        }
    }, [dispatch, turns, titleButt]);

    
    const typeTurns = [
        { id:1, type: "normal" },
        { id:2, type: "full" },
        { id:3, type: "partial" },
    ];

    const typeStatus = [
        { id:1, type: "Active" },
        { id:2, type: "Stop" },
        { id:3, type: "completed" },
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
        props.history.push("/turn");
    }

    const validDate = async () => {
        if (startDate !== null && startDate !== undefined) {
            body.startDate = moment(startDate).format('MM/DD/YYYY HH:mm:ss');
        }
        if (endDate !== null && endDate !== undefined) {
            body.endDate = moment(endDate).format('MM/DD/YYYY HH:mm:ss');
        }
       
    }

    const validDateFront = async (data) => {
        if (data.startDate !== null && data.startDate !== undefined) {
            let convertFechaStart = data.startDate.toString();
            let resultStart = convertFechaStart.split("T");
            let dataHoraStart = resultStart[1]
            let horaStart = dataHoraStart.split(":");
            let HStar = horaStart[0];
            let MNStar = horaStart[1];
            let SStar = '00'; 
            
            let dataFechaStart = resultStart[0]
            let fechaStart = dataFechaStart.split("-")
            let YStart =fechaStart[2];
            let MStart = fechaStart[0];
            let DStart = fechaStart[1];
            var dateStr = new Date(YStart, MStart-1, DStart, HStar, MNStar, SStar,0);
            setStartDate(new Date(dateStr))
        }
        if (data.endDate !== null && data.endDate !== undefined ) {
            let convertFechaEnd = data.endDate.toString();
            let resultEnd = convertFechaEnd.split("T");
            let dataHoraEnd = resultEnd[1]
            let horaEnd = dataHoraEnd.split(":");
            let HEnd = horaEnd[0];
            let MNEnd = horaEnd[1];
            let SEnd = '00'; 
            
            let dataFechaEnd = resultEnd[0]
            let fechaEnd = dataFechaEnd.split("-")
            let YEnd =fechaEnd[2];
            let MSEnd = fechaEnd[0];
            let DEnd = fechaEnd[1];
            var dateEnd = new Date(YEnd, MSEnd-1, DEnd, HEnd, MNEnd, SEnd,0);
            setEndDate(new Date(dateEnd))
        }
    }

    let handleColor = (time) => {
        return time.getHours() > 12 ? "text-success" : "text-error";
    };

   
    const driverButtomSave = async (e) => {
        validDate()
        setBody({...body});
        if (props.match.params._id) {
            dispatch(updateTurn(dispatch,'turn', body, props.match.params._id))
        } else {
            console.log('ingreso aca')
            dispatch(createTurn(dispatch,'turn', body))
        }
        props.history.push("/turn");
        return;
    }

    return (
        <Aux>
            <Row>
                <Col>
                <Card>
                    <Card.Header>
                        <Row>
                            <Col md={4} className="mt-3">
                                <Card.Title as="h5">Turnos</Card.Title>
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
                                    <Form.Group controlId="form.ControlTurn">
                                        <Form.Label>Tipo Turno</Form.Label>
                                        <Form.Control as="select" name="type" value={body?.type} onChange={handlerChange}>
                                        <option  >selecciona...</option>
                                        {typeTurns.map(turn =>
                                            <option key={turn?.id} value={turn?.type}>{turn?.type}</option>
                                        )}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="form.ControlStatus">
                                        <Form.Label>Estados</Form.Label>
                                        <Form.Control as="select" name="status" value={body?.status} onChange={handlerChange}>
                                        <option  >selecciona...</option>
                                        {typeStatus.map(status =>
                                            <option key={status?.id} value={status?.type}>{status?.type}</option>
                                        )}
                                        </Form.Control>
                                    </Form.Group> 
                                    <Form.Group controlId="form.ControlDescrption">
                                        <Form.Label>Descripcion</Form.Label>
                                        <Form.Control as="textarea" rows="3" name="description" value={body?.description} onChange={handlerChange}/>
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="form.ControlInitDate">
                                    <Form.Label>Fecha Inicio</Form.Label>
                                    <DatePicker
                                        className="form-control input_width"
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        showTimeSelect
                                        timeClassName={handleColor}
                                    />
                                </Form.Group>
                                <Form.Group controlId="form.ControlInitDate">
                                    <Form.Label>Fecha Fin</Form.Label>
                                    <DatePicker
                                        className="form-control input_width"
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        showTimeSelect
                                        timeClassName={handleColor}
                                    />
                                </Form.Group>     
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

export default TurnCreate;