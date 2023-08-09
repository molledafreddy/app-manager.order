import axios from "axios";

export default class productService {
    constructor(){
        this.url = process.env.REACT_APP_API_BASE;
        this.token = localStorage.getItem('token');
    }

    async getProduct(extend, limit, page, search) {
        try {
            return await axios.get(`${this.url}/${extend}?limit=${limit}&page=${page}&search=${search}`);
            // return await axios.get(`${this.url}/${extend}`);
        } catch (error) {
            throw error;
        }
    }

    async getProducts(extend, limit, page, search) {
        try {
            return await axios.get(`${this.url}/${extend}`);
            // return await axios.get(`${this.url}/${extend}`);
        } catch (error) {
            throw error;
        }
    }

    async getProductId(extend, _id) {
        try {
            // return await axios.get(`${this.url}/${extend}/${_id}`);
            let data = await axios.get(`${this.url}/${extend}/${_id}`);
            // console.log('data', data)
            return data;
        } catch (error) {
            throw error;
        }
    }

    async createProduct(extend, payload) {
        try {
            console.log('createProduct payload', payload)
            return await axios.post(`${this.url}/${extend}`, payload);
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(extend, payload, id) {
        try {
            return await axios.put(`${this.url}/${extend}/${id}`, payload);
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(extend, id) {
        try {
            return await axios.delete(`${this.url}/${extend}/${id}`);
        } catch (error) {
            throw error;
        }
    }
}