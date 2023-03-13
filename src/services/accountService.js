import axios from "axios";

export default class providerService {
    constructor(){
        this.url = 'http://localhost:3002';
    }

    async getAccount(extend, limit, page, search) {
        try {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzJhOTI0MzJjZTNlMmJhMmEyNmEwZTQiLCJyb2xlIjoiVXNlciIsImlhdCI6MTY3NzcwMTYwMCwiZXhwIjoxNjc3NzA4ODAwfQ.7DkEjvINTPdcr-HEtD7J4RNXKTwquCqIAezg5-E1AaI';
            return await axios.get(`${this.url}/${extend}?limit=${limit}&page=${page}&search=${search}`,
                                    { headers: {"Authorization" : `Bearer ${token}`} });
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