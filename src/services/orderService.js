import axios from "axios";
// import moment from 'moment';

export default class orderService {
    constructor(){
        this.url = process.env.REACT_APP_API_BASE;
        this.token = localStorage.getItem('token');
    }

    async getOrder(extend, limit, page, search, startDate = '', endDate = '') {
        try {
            let  headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}` //the token is a variable which holds the token
            }
            const data = await axios.get(`${this.url}/${extend}?limit=${limit}&page=${page}&search=${search}&startDate=${startDate}&endDate=${endDate}`,
                                        { headers: headers });
        //    console.log('data servicio', data)
            return data;
            // return await axios.get(`${this.url}/${extend}`);
        } catch (error) {
            throw error;
        }
    }

    async getSearchOrder(extend, payload) {
        try {
            console.log('payload', payload)
            let  headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}` //the token is a variable which holds the token
            }
            return await axios.post(`${this.url}/${extend}`, payload,
            { headers: headers });
        } catch (error) {
            throw error;
        }
    }

    async getSearchOrderPaitOut(extend, limit, page, status, startDate = '', endDate = '') {
        try {
            // console.log('payload', payload)
            // console.log('getSearchOrderPaitOut startDate', startDate)
            // console.log('endDate', endDate)
            let  headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}` //the token is a variable which holds the token
            }
            console.log('headers', {headers})
            return await axios.get(
                                    `${this.url}/${extend}?limit=${limit}&page=${page}&status=${status}&startDate=${startDate}&endDate=${endDate}`,
                                    { headers: headers });
        } catch (error) {
            throw error;
        }
    }

    async getOrders(extend, limit, page, search) {
        try {
            return await axios.get(`${this.url}/${extend}`);
        } catch (error) {
            throw error;
        }
    }

    async getOrderId(extend, _id) {
        try {
            let  headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}` //the token is a variable which holds the token
            }
            return await axios.get(`${this.url}/${extend}/${_id}`,{ headers: headers });
        } catch (error) {
            throw error;
        }
    }

    async createOrder(extend, payload) {
        try {
            console.log('payload', payload)
            const dataA = new FormData();
            const data = JSON.stringify({
                amount: payload?.amount,
                invoiceNumber: payload?.invoiceNumber,
                estimatedAmount: payload?.estimatedAmount,
                paymentMethod: payload?.paymentMethod,
                providers: payload?.providers,
                status: payload?.status,
                estimateReceptionDate: payload?.estimateReceptionDate,
                orderDate: payload?.orderDate,
                paymentDate: payload?.paymentDate,
                receptionDate: payload?.receptionDate,
                creditPaymentDate:payload?.creditPaymentDate,
                descriptionOrder: payload?.descriptionOrder,
                descriptionPayment: payload?.descriptionPayment,
                descriptionLogistic: payload?.descriptionLogistic,
                validAdmin: "por_verificar"
            })
            dataA.append("data",data);
            dataA.append("paymentHasEgress", JSON.stringify(payload?.paymentHasEgress));
            // dataA.append("files", payload.files);
            console.log(' payload', payload)
            if (payload?.files?.files.length > 0) {
                for (let i = 0; i < payload?.files?.files.length; i++) {
                    dataA.append("files", payload?.files?.files[i].file);
                }
            }


            const response = await fetch(`${this.url}/${extend}`, 
                { 
                    method: "POST",
                    headers: {'Authorization': `Bearer ${this.token}`}, 
                    body: dataA 
            }).then((res) => res)
            return response;
        } catch (error) {
            throw error;
        }
       
    }

    async updateOrder(extend, payload, id) {
        try {
            console.log('payload', payload)
            const dataA = new FormData();
            
            const data = JSON.stringify({
                _id: payload?._id,
                _idEgress: payload?._idEgress,
                amount: payload?.amount,
                invoiceNumber: payload?.invoiceNumber,
                estimatedAmount: payload?.estimatedAmount,
                paymentMethod: payload?.paymentMethod,
                providers: payload?.providers,
                status: payload?.status,
                estimateReceptionDate: payload?.estimateReceptionDate,
                orderDate: payload?.orderDate,
                paymentDate: payload?.paymentDate,
                receptionDate: payload?.receptionDate,
                creditPaymentDate:payload?.creditPaymentDate,
                descriptionOrder: payload?.descriptionOrder,
                descriptionPayment: payload?.descriptionPayment,
                descriptionLogistic: payload?.descriptionLogistic,
                validAdmin: payload?.validAdmin,
                noteValid: payload?.noteValid
            })
            console.log('data', data)
            let dataFiles = [];
            dataA.append("data",data);
            dataA.append("paymentHasEgress", JSON.stringify(payload?.paymentHasEgress));
            dataA.append("files", payload.files);
            // console.log('payload',payload)
            // console.log('payload?.paymentHasEgress',payload?.paymentHasEgress)
            if (payload?.files?.files?.length > 0) {
                for (let i = 0; i < payload?.files?.files.length; i++) {
                    if (!payload.files.files[i]?.flag) {
                        dataA.append("files", payload?.files?.files[i].file)
                    } else {
                        dataFiles.push({
                            filename: payload?.files?.files[i].filename,
                            file: payload?.files?.files[i].file,
                            path: payload?.files?.files[i].path,
                            size: payload?.files?.files[i].size,
                            mimetype: payload?.files?.files[i].mimetype
                        })
                    }
                    
                }
            }
            // console.log('files',dataFiles)
            dataA.append("dataFiles",JSON.stringify(dataFiles));
            const response = await fetch(`${this.url}/${extend}`, 
                { 
                    method: "POST", 
                    headers: {'Authorization': `Bearer ${this.token}`},
                    body: dataA 
            }).then((res) => res)
            // console.log('response', await response.json())
            return response;
        } catch (error) {
            console.log('error', error)
            throw error;
        }
    }

    async deleteOrder(extend, id) {
        try {
            return await axios.delete(`${this.url}/${extend}/${id}`);
        } catch (error) {
            throw error;
        }
    }

}