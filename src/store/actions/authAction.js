import { GET_AUTH, LOADING_AUTH, ERROR_AUTH, NO_DATA_AUTH } from "../types/auth";
import  authService  from "../../services/authService";
import { actionCreator } from "template-redux-helpers";
import Swal from 'sweetalert2';

const AuthService = new authService();

export const getAuthToken = (dispatch, extens, _id) => {
    return dispat => {
        dispatch(actionCreator(LOADING_AUTH, "payload")(true))
        AuthService.getAuthToken(extens, _id).then(data => {
            console.log('llego por aca', data)
            Swal.fire({
                position: 'top',
                icon: "error",
                title: "Error Login",
                text: "Usuario o Contraseña incorrecta",
                showConfirmButton: false,
                timer: 3000
            })
            dispatch(actionCreator(GET_AUTH, "payload")(data))
            dispatch(actionCreator(LOADING_AUTH, "payload")(false))
        })
        .catch(error => {
            
            // console.log('error', error.response.status)
            if (error.response.status === 403) {
                // console.log('error', error.response.status)
                dispatch(actionCreator(ERROR_AUTH, "payload")(error.response));
                Swal.fire({
                    position: 'top',
                    icon: "error",
                    title: "Error Login",
                    text: "Usuario o Contraseña incorrecta",
                    showConfirmButton: false,
                    timer: 3000
                })
            }
            dispatch(actionCreator(LOADING_AUTH, "payload")(false))
        })
    }
}