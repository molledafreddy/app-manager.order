import axios from "axios";

export default class providerService {
    constructor(){
        this.url = process.env.REACT_APP_API_BASE;
        this.token = localStorage.getItem('token');
    }

    async getAccount(extend, limit, page, search) {
        try {
            return await axios.get(`${this.url}/${extend}?limit=${limit}&page=${page}&search=${search}`,
                                    { headers: {"Authorization" : `Bearer ${this.token}`} });
        } catch (error) {
            throw error;
        }
    }

    async getAccountId(extend, _id) {
        try {
            return await axios.get(`${this.url}/${extend}/${_id}`);
        } catch (error) {
            throw error;
        }
    }

    async createAccount(extend, payload) {
        try {
            return await axios.post(`${this.url}/${extend}`, payload);
        } catch (error) {
            throw error;
        }
    }

    async updateAccount(extend, payload, id) {
        try {
            return await axios.put(`${this.url}/${extend}/${id}`, payload);
        } catch (error) {
            throw error;
        }
    }

    async deleteAccount(extend, id) {
        try {
            return await axios.delete(`${this.url}/${extend}/${id}`);
        } catch (error) {
            throw error;
        }
    }
}