import axios from "axios";

export default class orderService {
    constructor(){
        this.url = 'http://localhost:3002';
        this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzJhOTI0MzJjZTNlMmJhMmEyNmEwZTQiLCJyb2xlIjoiVXNlciIsImlhdCI6MTY3ODQ3NDM1MywiZXhwIjoxNjc4NDgxNTUzfQ.v1AHnrOL-IeiI3iNmXlN2Isx0TtNkvdGhsVTn5neKLg'
    }

    async getOrder(extend, limit, page, search, startDate = '', endDate = '') {
        try {
            const data = await axios.get(`${this.url}/${extend}?limit=${limit}&page=${page}&search=${search}&startDate=${startDate}&endDate=${endDate}`);
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
            return await axios.post(`${this.url}/${extend}`, payload);
        } catch (error) {
            throw error;
        }
    }

    async getSearchOrderPaitOut(extend, limit, page, status, startDate = '', endDate = '') {
        try {
            // console.log('payload', payload)
            // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzJhOTI0MzJjZTNlMmJhMmEyNmEwZTQiLCJyb2xlIjoiVXNlciIsImlhdCI6MTY3ODQ2NzEyMCwiZXhwIjoxNjc4NDc0MzIwfQ.mbNv3a4fXe0VQaVq_pgSvZbWEL75dIN_OPVFx-OOO0Q';
            console.log('getSearchOrderPaitOut startDate', startDate)
            console.log('endDate', endDate)
            let  headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}` //the token is a variable which holds the token
            }
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
            // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzJhOTI0MzJjZTNlMmJhMmEyNmEwZTQiLCJyb2xlIjoiVXNlciIsImlhdCI6MTY3ODQ2NzEyMCwiZXhwIjoxNjc4NDc0MzIwfQ.mbNv3a4fXe0VQaVq_pgSvZbWEL75dIN_OPVFx-OOO0Q';
              
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
            // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzJhOTI0MzJjZTNlMmJhMmEyNmEwZTQiLCJyb2xlIjoiVXNlciIsImlhdCI6MTY3ODQ2NzEyMCwiZXhwIjoxNjc4NDc0MzIwfQ.mbNv3a4fXe0VQaVq_pgSvZbWEL75dIN_OPVFx-OOO0Q';
            console.log('payload', payload)
            const dataA = new FormData();
            const data = JSON.stringify({
                amount: payload.amount,
                invoiceNumber: payload.invoiceNumber,
                estimatedAmount: payload.estimatedAmount,
                paymentMethod: payload.paymentMethod,
                providers: payload.providers,
                status: payload.status,
                estimateReceptionDate: payload.estimateReceptionDate,
                orderDate: payload.orderDate,
                paymentDate: payload.paymentDate,
                receptionDate: payload.receptionDate,
                creditPaymentDate:payload.creditPaymentDate,
                descriptionOrder: payload.descriptionOrder,
                descriptionPayment: payload.descriptionPayment,
                descriptionLogistic: payload.descriptionLogistic,
            })
            dataA.append("data",data);
            dataA.append("paymentHasEgress", JSON.stringify(payload.paymentHasEgress));
            // dataA.append("files", payload.files);
            console.log(' payload.files',  payload.files)
            for (let i = 0; i < payload.files.length; i++) {
                dataA.append("files", payload.files[i].file);
            }


            const response = await fetch(`${this.url}/${extend}`, 
                { 
                    method: "POST",
                    headers: {'Authorization': `Bearer ${this.token}`}, 
                    body: dataA 
            }).then((res) => res.json())
            return response;
        } catch (error) {
            throw error;
        }
       
    }

    async updateOrder(extend, payload, id) {
        try {
            // console.log('payload?.idEgress', payload?._idEgress)
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
            })
            let dataFiles = [];
            dataA.append("data",data);
            dataA.append("paymentHasEgress", JSON.stringify(payload?.paymentHasEgress));
            // dataA.append("files", payload.files);
            console.log('payload',payload)
            console.log('data',data)
            for (let i = 0; i < payload?.files.length; i++) {
                if (!payload?.files[i]?.flag) {
                    dataA.append("files", payload.files[i].file)
                } else {
                    dataFiles.push({
                        filename: payload.files[i].filename,
                        file: payload.files[i].file,
                        path: payload.files[i].path,
                        size: payload.files[i].size,
                        mimetype: payload.files[i].mimetype
                    })
                }
                
            }
            console.log('files',dataFiles)
            dataA.append("dataFiles",JSON.stringify(dataFiles));
            // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzJhOTI0MzJjZTNlMmJhMmEyNmEwZTQiLCJyb2xlIjoiVXNlciIsImlhdCI6MTY3ODQ2NzEyMCwiZXhwIjoxNjc4NDc0MzIwfQ.mbNv3a4fXe0VQaVq_pgSvZbWEL75dIN_OPVFx-OOO0Q';
            const response = await fetch(`${this.url}/${extend}`, 
                { 
                    method: "POST", 
                    headers: {'Authorization': `Bearer ${this.token}`},
                    body: dataA 
            }).then((res) => res.json())
            return response;
        } catch (error) {
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