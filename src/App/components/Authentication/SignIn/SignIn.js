import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';

import '../../../../assets/scss/style.scss';
import Aux from "../../../../hoc/_Aux";
import Breadcrumb from "../../../layout/AdminLayout/Breadcrumb";
import  AlertComponent  from "../../../../helpers/alert/alert";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
// import { getOrder, createOrder, updateOrder } from '../../../store/actions/';
import { getAuthToken } from '../../../../store/actions/authAction';
import Swal from 'sweetalert2';



const SignUp = (props) => {
    const valuedata = useSelector(state => state.auth)
    let statusCodeAuth = useSelector(state => state.statusCodeAuth)
    const [body, setBody] = useState({
        email: "", 
        password: "",
        error: false,
        errorMsg: ""
    })

    const dispatch = useDispatch()
   
    const driverSubmit =e=> {
        e.preventDefault();
    }

    const driverChange = async e => {
        setBody({
            ...body,
            [e.target.name]: e.target.value
        })
    }

    const driverButtom = async (e) => {

        // const data = await dispatch(getAuthToken(dispatch,'auth/login', {email:body.email, password:body.password}));
       
        // console.log('statusCodeAuth login', statusCodeAuth)
        // console.log('statusCodeAuth valuedata', valuedata)
        
        // let url = ApiAuth + "auth";
        let url = `${process.env.REACT_APP_API_BASE}/auth/login`;
        axios.post(url, {email:body.email, password:body.password})
        .then( res => {
            if (res.status && res.data !== "NOT_FOUND_USER") {
                // console.log('datos', res.data)
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('role', res.data.user.role)
                localStorage.setItem('name', res.data.user.name)
                console.log('token', localStorage.getItem('token'))
                props.history.push("/dashboard/default");
            } else {
                setBody({error: true})
                // Swal.fire({
                //     position: 'top',
                //     icon: "error",
                //     title: "Error Login",
                //     text: "Usuario o Contraseña incorrecta",
                //     showConfirmButton: false,
                //     timer: 3000
                // })
            }
            console.log(res)
        }).catch(error => {
            setBody({error: true})
            Swal.fire({
                position: 'top',
                icon: "error",
                title: "Error Login",
                text: "Erro al intentar logueo",
                showConfirmButton: false,
                timer: 3000
            })
        })
        
    }


    return(
        <Aux>
            <Breadcrumb/>
            <div className="auth-wrapper">
                <div className="auth-content">
                    <div className="auth-bg">
                        <span className="r"/>
                        <span className="r s"/>
                        <span className="r s"/>
                        <span className="r"/>
                    </div>
                    <div className="card">
                    <form onSubmit={driverSubmit}>
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <i className="feather icon-unlock auth-icon"/>
                                </div>
                                <h3 className="mb-4">Login</h3>
                                <div className="input-group mb-3">
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        name="email" 
                                        placeholder="Email" 
                                        value={body.email} 
                                        onChange={driverChange} />
                                </div>
                                <div className="input-group mb-4">
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        name="password" 
                                        placeholder="password" 
                                        value={body.password} 
                                        onChange={driverChange}/>
                                </div>
                                <div className="form-group text-left">
                                    <div className="checkbox checkbox-fill d-inline">
                                        <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1"/>
                                            <label htmlFor="checkbox-fill-a1" className="cr"> Save credentials</label>
                                    </div>
                                </div>
                                <button className="btn btn-primary shadow-2 mb-4" onClick={driverButtom}>Login</button>
                                
                                {body.error === true &&
                                <AlertComponent variant="danger" text="Usuario o contraseña incorrepto"/>
                                }
                                <p className="mb-2 text-muted">Forgot password? <NavLink to="/auth/reset-password-1">Reset</NavLink></p>
                                <p className="mb-0 text-muted">Don’t have an account? <NavLink to="/auth/signup-1">Signup</NavLink></p>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
        </Aux>
    );
}

export default SignUp;