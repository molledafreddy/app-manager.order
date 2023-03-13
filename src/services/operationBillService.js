import axios from "axios";

export default class providerService {
    constructor(){
        this.url = 'http://localhost:3002';
    }

    async getOperationBill(extend, limit, page, search, startDate = '', endDate = '') {
        try {
            const data = await axios.get(`${this.url}/${extend}?limit=${limit}&page=${page}&search=${search}&startDate=${startDate}&endDate=${endDate}`);
        //    console.log('data servicio', data)
            return data;
            // return await axios.get(`${this.url}/${extend}`);
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
                invoiceNumber: payload.invoiceNumber,
                type: payload.type,
            })
            dataA.append("data",data);
            dataA.append("paymentHasEgress", JSON.stringify(payload.paymentHasEgress));
            dataA.append("files", payload.files);
            console.log(' payload.files',  payload.files)
            for (let i = 0; i < payload.files.length; i++) {
                dataA.append("files", payload.files[i].file);
            }

            const response = await fetch(`${this.url}/${extend}`, 
                { 
                    method: "POST", 
                    body: dataA 
            }).then((res) => res.json())
            return response;
        } catch (error) {
            throw error;
        }
       
    }

    async updateOperationBill(extend, payload, id) {
        try {
            // console.log('payload?.idEgress', payload?._idEgress)
            const dataA = new FormData();
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
            dataA.append("paymentHasEgress", JSON.stringify(payload.paymentHasEgress));
            dataA.append("files", payload.files);
            console.log('payload',payload.files)
            for (let i = 0; i < payload.files.length; i++) {
                if (!payload.files[i].flag) {
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
            
            const response = await fetch(`${this.url}/${extend}`, 
                { 
                    method: "POST", 
                    body: dataA 
            }).then((res) => res.json())
            return response;
        } catch (error) {
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