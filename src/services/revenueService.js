import axios from "axios";

export default class providerService {
    constructor(){
        this.url = 'http://localhost:3002';
        this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzJhOTI0MzJjZTNlMmJhMmEyNmEwZTQiLCJyb2xlIjoiVXNlciIsImlhdCI6MTY3ODQ4MTYwNiwiZXhwIjoxNjc4NDg4ODA2fQ.kUacGOumyiI9DEfJJ-gOJB25z5fH8U_RDpHirN82RAs'
    }

    async getRevenue(extend, limit, page, startDate = '', endDate = '', type = '') {
        try {
            console.log('llego por ael getRevenue', extend)
              
            let  headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}` //the token is a variable which holds the token
            }
            return await axios.get(
                `${this.url}/${extend}?limit=${limit}&page=${page}&startDate=${startDate}&endDate=${endDate}&type=${type}`,
                { headers: headers });
        } catch (error) {
            throw error;
        }
    }

    async getRevenues(extend, limit, page, search) {
        try {
            return await axios.get(`${this.url}/${extend}`);
        } catch (error) {
            throw error;
        }
    }

    async getRevenueId(extend, _id) {
        try {
            
            let  headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}` //the token is a variable which holds the token
            }
            return await axios.get(`${this.url}/${extend}/${_id}`,
                                { headers: headers });
        } catch (error) {
            throw error;
        }
    }

    async createRevenue(extend, payload) {
        try {
            const dataA = new FormData();
       
            const data = JSON.stringify({
                amountSistem: payload?.amountSistem,
                amountPos: payload?.amountPos,
                amountTransfer: payload?.amountTransfer,
                amountCash: payload?.amountCash,
                amountOther: payload?.amountOther,
                description: payload?.description,
                cashFund: payload?.cashFund,
                type: payload?.type,
                totalAmount: payload?.totalAmount
            })
            console.log('data',data )
            dataA.append("data",data);
            // dataA.append("paymentHasEgress", JSON.stringify(payload.paymentHasEgress));
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
            }).then((res) => res.json());
            return response;
        } catch (error) {
            throw error;
        }
    }

    async updateRevenue(extend, payload, id) {
        try {
            // console.log('payload?.idEgress', payload?._idEgress)
            // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzJhOTI0MzJjZTNlMmJhMmEyNmEwZTQiLCJyb2xlIjoiVXNlciIsImlhdCI6MTY3ODQ2NzEyMCwiZXhwIjoxNjc4NDc0MzIwfQ.mbNv3a4fXe0VQaVq_pgSvZbWEL75dIN_OPVFx-OOO0Q';
            const dataA = new FormData();
            const data = JSON.stringify({
                _id: payload._id,
                amountSistem: payload.amountSistem,
                amountPos: payload.amountPos,
                amountTransfer: payload.amountTransfer,
                amountCash: payload.amountCash,
                amountOther: payload.amountOther,
                description: payload.description,
                cashFund: payload.cashFund,
                type: payload?.type,
                totalAmount: payload.totalAmount
            })
            console.log('data', data)
            let dataFiles = [];
            dataA.append("data",data);
            // dataA.append("paymentHasEgress", JSON.stringify(payload.paymentHasEgress));
            // dataA.append("files", payload.files);
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
                    headers: {'Authorization': `Bearer ${this.token}`}, 
                    body: dataA 
            }).then((res) => res.json())
            return response;
        } catch (error) {
            throw error;
        }
    }

    async deleteRevenue(extend, id) {
        try {
            return await axios.delete(`${this.url}/${extend}/${id}`);
        } catch (error) {
            throw error;
        }
    }
}