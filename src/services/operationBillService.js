import axios from "axios";

export default class providerService {
    constructor(){
        this.url = process.env.REACT_APP_API_BASE;
        this.token = localStorage.getItem('token');
    }

    async getOperationBill(extend, limit, page, search, startDate = '', endDate = '') {
        try {
            let  headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}` //the token is a variable which holds the token
            }
            const datas = await axios.get(
                            `${this.url}/${extend}?limit=${limit}&page=${page}&search=${search}&startDate=${startDate}&endDate=${endDate}`,
                            { headers: headers }
                        );
            return datas;
        } catch (error) {
            throw error;
        }
    }

    async getOperationBills(extend, limit, page, search) {
        try {
            return await axios.get(`${this.url}/${extend}`);
            // return await axios.get(`${this.url}/${extend}`);
        } catch (error) {
            throw error;
        }
    }

    async getOperationBillId(extend, _id) {
        try {
            return await axios.get(`${this.url}/${extend}/${_id}`);
        } catch (error) {
            throw error;
        }
    }

    async createOperationBill(extend, payload) {
        try {
            const dataA = new FormData();
            const data = JSON.stringify({
                amount: payload.amount,
                description: payload.description,
                invoiceNumber: payload?.invoiceNumber,
                type: payload.type,
            })
            console.log(' payload',  payload)
            dataA.append("data",data);
            dataA.append("paymentHasEgress", JSON.stringify(payload?.paymentHasEgress));
            dataA.append("files", payload.files);
            console.log(' payload.files',  payload.files)
            for (let i = 0; i < payload?.files?.files?.length; i++) {
                dataA.append("files", payload?.files?.files[i].file);
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

    async updateOperationBill(extend, payload, paymentContainer, id) {
        try {
            // console.log('payload?.idEgress', payload?._idEgress)
            const dataA = new FormData();
            console.log('paymentContainer',paymentContainer)
            const data = JSON.stringify({
                _id: id,
                _idEgress: payload?._idEgress,
                amount: payload?.amount,
                description: payload?.description,
                invoiceNumber: payload?.invoiceNumber,
                type: payload?.type,
            })
            let dataFiles = [];
            dataA.append("data",data);
            dataA.append("paymentHasEgress", JSON.stringify(paymentContainer));
            // dataA.append("files", payload.files);
            // console.log('payload',payload?.files)
            if (payload?.length > 0) {
                for (let i = 0; i < payload?.files.length; i++) {
                    if (!payload?.files?.files[i].flag) {
                        dataA.append("files", payload?.files[i].file)
                    } else {
                        dataFiles.push({
                            filename: payload.files[i].filename,
                            file: payload?.files[i].file,
                            path: payload?.files[i].path,
                            size: payload?.files[i].size,
                            mimetype: payload?.files[i].mimetype
                        })
                    }
                }
                
            }
            dataA.append("dataFiles",JSON.stringify(dataFiles));
            
            const response = await fetch(`${this.url}/${extend}`, 
                { 
                    method: "POST", 
                    headers: {'Authorization': `Bearer ${this.token}`},
                    body: dataA 
            }).then((res) => res);
            // console.log('resultado', response)
            return response;
        } catch (error) {
            console.log('error service', error)
            throw error;
        }
    }

    async deleteOperationBill(extend, id) {
        try {
            return await axios.delete(`${this.url}/${extend}/${id}`);
        } catch (error) {
            throw error;
        }
    }
}