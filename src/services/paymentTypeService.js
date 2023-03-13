import axios from "axios";

export default class paymentTypeService {
    constructor(){
        this.url = 'http://localhost:3002';
    }

    async getPaymentType(extend, limit, page, search) {
        try {
            return await axios.get(`${this.url}/${extend}?limit=${limit}&page=${page}&search=${search}`);
            // return await axios.get(`${this.url}/${extend}`);
        } catch (error) {
            throw error;
        }
    }
    

    async getPaymentTypes(extend, limit, page, search) {
        try {
            return await axios.get(`${this.url}/${extend}`);
            // return await axios.get(`${this.url}/${extend}`);
        } catch (error) {
            throw error;
        }
    }

    async getPaymentTypeId(extend, _id) {
        try {
            return await axios.get(`${this.url}/${extend}/${_id}`);
        } catch (error) {
            throw error;
        }
    }

    async getPaymentHasEgress(extend, _id) {
        try {
            return await axios.get(`${this.url}/${extend}/${_id}`);
        } catch (error) {
            throw error;
        }
    }

    async createPaymentType(extend, payload) {
        try {
            return await axios.post(`${this.url}/${extend}`, payload);
        } catch (error) {
            throw error;
        }
    }

    async updateProvider(extend, payload, id) {
        try {
            return await axios.put(`${this.url}/${extend}/${id}`, payload);
        } catch (error) {
            throw error;
        }
    }

    async deletePaymentType(extend, id) {
        try {
            return await axios.delete(`${this.url}/${extend}/${id}`);
        } catch (error) {
            throw error;
        }
    }
}