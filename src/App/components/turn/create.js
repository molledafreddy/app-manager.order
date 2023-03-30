import React, { useState, useEffect, useRef} from 'react';

import Aux from "../../../hoc/_Aux";
import {Row, Col, Card, Button, Form, Badge, ListGroup} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { getTurn, createTurn, updateTurn } from '../../../store/actions/turnAction';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import "../../../../src/styles/datepiker.css";
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2';
import {Controller, useForm} from 'react-hook-form';
import "./styles.css";

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

    useEffect( () => {
        titleButt()
        if (props.match.params._id) {
            if ( turns === undefined || turns?.length === 0) {
                dispatch(getTurn(dispatch,'turn', props.match.params._id));
            } 
            if (turns !== undefined || turns?.length > 0) {
                const dataTurn = turns.find(turn => turn._id === props.match.params._id)
                setValuesTurn(dataTurn);
            }
        }
    }, [dispatch, turns, titleButt]);

    const setValuesTurn = async (data) => {
        let dateStr = undefined;
        let dateEnd = undefined;
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
            dateStr = new Date(YStart, MStart-1, DStart, HStar, MNStar, SStar,0);
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
            dateEnd = new Date(YEnd, MSEnd-1, DEnd, HEnd, MNEnd, SEnd,0);
        }
        reset(formValues => ({
            _id: data._id,
            type: data?.type,
            description: data?.description,
            status: data?.status,
            startDate: dateStr,
            endDate: dateEnd,
        }))
    }

    
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

    const titleButt = async (e) => {
        if (props.match.params._id) {
            setTitleButtom('Editar');
        }
    }

    const handlerBack = async e => {
        props.history.push("/turn");
    }

    let handleColor = (time) => {
        return time.getHours() > 12 ? "text-success" : "text-error";
    };

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

        const onSubmit = (dataInfo) => {
            console.log('dataInfo', dataInfo)
            if (dataInfo.startDate === undefined ) {
                showAlert(
                    'validacion Turno', 
                    "Debe Ingresar la fecha y Hora del turno", 
                    "warning",
                    4000);
                    return;
            }
            if (dataInfo.status === 'completed' && dataInfo.endDate === undefined ) {
                showAlert(
                    'validacion factura', 
                    "Debe Ingresar la fecha y Hora de culminacion del turno, Cuando el turno es completado.", 
                    "warning",
                    4000);
                    return;
            }
            
            
            if (props.match.params._id) {
                dispatch(updateTurn(dispatch,'turn', dataInfo, props.match.params._id))
                showAlert(
                    false, 
                    "Se realizo la transacion con exito", 
                    "success",
                    3000);
            } else {
                dispatch(createTurn(dispatch,'turn', dataInfo))
                showAlert(
                    false, 
                    "Se realizo la transacion con exito", 
                    "success",
                    3000);
            }
            props.history.push("/turn");
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
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="form.ControlTurn">
                                        <Form.Label>Tipo Turno</Form.Label>
                                        <Form.Control 
                                            as="select" 
                                            name="type" 
                                            className={errors.type && "error"}
                                            {...register("type", {
                                                    required: messages.required,
                                            })}>
                                        <option key={`type_`} value="">selecciona...</option>
                                        {typeTurns.map(turn =>
                                            <option key={`type_`+turn?.id} value={turn?.type}>{turn?.type}</option>
                                        )}
                                        </Form.Control>
                                        {errors.type && <p>{errors.type.message}</p>}
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
                                                <option key={`status_`+status?.id} value={status?.type}>{status?.type}</option>
                                            )}
                                        </Form.Control>
                                        {errors.status && <p>{errors.status.message}</p>}
                                    </Form.Group> 
                                    <Form.Group controlId="form.ControlDescrption">
                                        <Form.Label>Descripcion</Form.Label>
                                        <Form.Control 
                                            as="textarea" 
                                            rows="3" 
                                            name="description" 
                                            {...register("description", {})}/>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="form.ControlInitDate">
                                        <Form.Label>Fecha Inicio</Form.Label>
                                        <Controller 
                                            control={control} 
                                            name="startDate"                                            
                                            render={({ field: { onChange, onBlur, value, ref } }) => (                             
                                                <DatePicker
                                                className="form-control input_width"
                                                selected={value}
                                                onChange={onChange}
                                                ref={ref}
                                                showTimeSelect
                                                timeClassName={handleColor}
                                            />)} 
                                        /> 
                                    </Form.Group>
                                    <Form.Group controlId="form.ControlInitDate">
                                        <Form.Label>Fecha Fin</Form.Label>
                                        <Controller 
                                            control={control} 
                                            name="endDate"                                            
                                            render={({ field: { onChange, onBlur, value, ref } }) => (                             
                                                <DatePicker
                                                className="form-control input_width"
                                                selected={value}
                                                onChange={onChange}
                                                ref={ref}
                                                showTimeSelect
                                                timeClassName={handleColor}
                                            />)} 
                                        />
                                    </Form.Group>     
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

export default TurnCreate;