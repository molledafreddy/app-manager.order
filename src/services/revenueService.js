import axios from "axios";

export default class revenueService {
    constructor(){
        this.url = process.env.REACT_APP_API_BASE;
        this.token = localStorage.getItem('token');
    }

    async getRevenue(extend, limit, page, startDate = '', endDate = '', type = '') {
        try {
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
            const amountPos = payload?.amountPos === undefined ? 0 : payload?.amountPos.toString().replace(/[$,]/g,'');
            const amountTransfer = payload?.amountTransfer === undefined ? 0 : payload?.amountTransfer.toString().replace(/[$,]/g,'');
            const amountCash = payload?.amountCash === undefined ? 0 : payload?.amountCash.toString().replace(/[$,]/g,'');
            const amountOther = payload?.amountOther === undefined ? 0 : payload?.amountOther.toString().replace(/[$,]/g,'');
            
            const totalAmount = (Number(amountPos) + Number(amountTransfer) + Number(amountCash) + Number(amountOther));
            
            const data = JSON.stringify({
                amountSistem: payload?.amountSistem === undefined ? null : payload?.amountSistem.toString().replace(/[$,]/g,''),
                amountPos: amountPos,
                amountTransfer: amountTransfer,
                amountCash: amountCash,
                amountOther: amountOther,
                description: payload?.description,
                cashFund: payload?.cashFund === undefined ? null : payload?.cashFund.toString().replace(/[$,]/g,''),
                type: payload?.type,
                totalAmount: payload?.totalAmount === undefined ? totalAmount: payload?.totalAmount
            })
            dataA.append("data",data);
            // console.log('data',  data)
            for (let i = 0; i < payload?.files?.files?.length; i++) {
                dataA.append("files", payload?.files?.files[i].file);
            }
            // console.log(' payload.files',  payload?.files)
            const response = await fetch(`${this.url}/${extend}`, 
                { 
                    method: "POST",
                    headers: {'Authorization': `Bearer ${this.token}`}, 
                    body: dataA 
            }).then((res) => res.json());
            return response;
        } catch (error) {
            // console.log('error', error)
            throw error;
        }
    }

    async updateRevenue(extend, payload, id) {
        try {
            // console.log('data valores', payload?.amountCash)
            const amountPos = payload?.amountPos === undefined ? 0 : payload?.amountPos.toString().replace(/[$,]/g,'');
            const amountTransfer = payload?.amountTransfer === undefined ? 0 : payload?.amountTransfer.toString().replace(/[$,]/g,'');
            const amountCash = payload?.amountCash === undefined ? 0 : payload?.amountCash.toString().replace(/[$,]/g,'');
            let amountOther = 0;
            if (payload?.amountOther !== null) {
                amountOther = payload?.amountOther === undefined ? 0 : payload?.amountOther.toString().replace(/[$,]/g,'');
            }
            
            const dataA = new FormData();
            const totalAmount = (Number(amountPos) + Number(amountTransfer) + Number(amountCash) + Number(amountOther));
            const data = JSON.stringify({
                _id: payload._id,
                amountSistem: payload?.amountSistem === undefined ? null : payload?.amountSistem.toString().replace(/[$,]/g,''),
                amountPos: amountPos,
                amountTransfer: amountTransfer,
                amountCash: amountCash,
                amountOther: amountOther,
                description: payload?.description,
                cashFund: payload?.cashFund === undefined ? null : payload?.cashFund.toString().replace(/[$,]/g,''),
                type: payload?.type,
                totalAmount: payload?.totalAmount === undefined ? totalAmount: payload?.totalAmount
            })
            // console.log('data', data)
            let dataFiles = [];
            dataA.append("data",data);
            // dataA.append("paymentHasEgress", JSON.stringify(payload.paymentHasEgress));
            // dataA.append("files", payload.files);
            
            for (let i = 0; i < payload?.files?.files.length; i++) {
                if (!payload?.files?.files[i].flag) {
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
            // console.log('files',dataFiles)
            dataA.append("dataFiles",JSON.stringify(dataFiles));
            // console.log('payload',payload)
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