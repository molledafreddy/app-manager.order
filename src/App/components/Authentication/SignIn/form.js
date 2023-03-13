import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';

import '../../../../assets/scss/style.scss';
import Aux from "../../../../hoc/_Aux";
// import Breadcrumb from "../../../layout/AdminLayout/Breadcrumb";
import  AlertComponent  from "../../../../helpers/alert/alert";
// import 
import axios from 'axios';

// class SignUp extends React.Component {
    const FormLogin = () => {
    
    // constructor(props){
    //     super(props);
    // }
    // state = {
    //     form:{
    //         "email":"",
    //         "password":"",
    //     },
    //     error: false,
    //     errorMsg: ""
    // }
    
    // const [form, setForm] = useState({email: "", password: ""})
   
    const driverSubmit =e=> {
        e.preventDefault();
    }

    // driverChange = async e => {
    //     // await this.setState({
    //     //     form:{
    //     //         ...this.state.form,
    //     //         [e.target.name]: e.target.value
    //     //     }
    //     // })
    //     await setForm({
    //         ...form
    //     })
    // }

    const driverButtom = async e => {
        // let url = ApiAuth + "auth";
        // let url = "http://localhost:3002/auth/login";
        // axios.post(url, this.state.form)
        // .then( res => {
        //     if (res.status && res.data != "NOT_FOUND_USER") {
        //         console.log('proceso realizado con exito')
        //         localStorage.setItem('token', res.data.token)
        //         localStorage.setItem('role', res.data.user.role)
        //         this.props.history.push("/dashboard/default")
        //     } else {
        //         console.log('error al registrar')
        //         this.setState({
        //             error: true
        //         })
        //     }
        //     console.log(res)
        // }).catch(error => {
        //     console.log('ocurrio un error', error)
        //     this.setState({
        //         error: true
        //     })
        // })
        // // await this.setState({
        // //     form:{
        // //         ...this.state.form,
        // //         [e.target.name]: e.target.value
        // //     }
        // // })
        // console.log("enviado")
    }

    // render () {
        // const [form, setForm] = useState({email: "", password: ""})
        
        // const driverChange = async e => {
        //     // await this.setState({
        //     //     form:{
        //     //         ...this.state.form,
        //     //         [e.target.name]: e.target.value
        //     //     }
        //     // })
        //     await setForm({
        //         ...form,
        //         [e.target.name]: e.target.value
        //     })
        //     console.log(form)
        // }

        return(
            <Aux>
                <form onSubmit={this.driverSubmit}>
                                <div className="card-body text-center">
                                    <div className="mb-4">
                                        <i className="feather icon-unlock auth-icon"/>
                                    </div>
                                    <h3 className="mb-4">Login</h3>
                                    <div className="input-group mb-3">
                                    {/* onChange={this.driverChange} */}
                                        <input 
                                            type="email" 
                                            className="form-control" 
                                            name="email" 
                                            placeholder="Email" 
                                            // value={form.email} 
                                            onChange={this.driverChange} />
                                    </div>
                                    <div className="input-group mb-4">
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            name="password" 
                                            placeholder="password" 
                                            // value={form.password} 
                                            onChange={this.driverChange}/>
                                    </div>
                                    <div className="form-group text-left">
                                        <div className="checkbox checkbox-fill d-inline">
                                            <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1"/>
                                                <label htmlFor="checkbox-fill-a1" className="cr"> Save credentials</label>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary shadow-2 mb-4" onClick={this.driverButtom}>Login</button>
                                    
                                    {/* {this.state.error === true &&
                                    <AlertComponent/>
                                    } */}
                                    <p className="mb-2 text-muted">Forgot password? <NavLink to="/auth/reset-password-1">Reset</NavLink></p>
                                    <p className="mb-0 text-muted">Don’t have an account? <NavLink to="/auth/signup-1">Signup</NavLink></p>
                                </div>
                                
                            </form>
            </Aux>
        );
    // }
}

export default FormLogin;