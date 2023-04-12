import axios from "axios";
import moment from 'moment';

export default class providerService {
    constructor(){
        this.url = process.env.REACT_APP_API_BASE;
        this.dataToken = localStorage.getItem('token')
        // console.log('data', data)
    }

    async getTurn(extend, limit, page, search, startDate = '', endDate = '') {
        try {
            const data = await axios.get(`${this.url}/${extend}?limit=${limit}&page=${page}&search=${search}&startDate=${startDate}&endDate=${endDate}`);
            return data;
        } catch (error) {
            throw error;
        }
    }

    async getTurns(extend, limit, page, search) {
        try {
            return await axios.get(`${this.url}/${extend}`);
        } catch (error) {
            throw error;
        }
    }

    async getTurnForUser(extend, limit, page, type, paymentType, status, startDate, endDate) {
        try {
            let  headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.dataToken}` //the token is a variable which holds the token
            }

            return await axios.get(
                `${this.url}/${extend}?limit=${limit}&page=${page}&type=${type}&paymentType=${paymentType}&status=${status}&startDate=${startDate}&endDate=${endDate}`,
                { headers: headers }
            );
        } catch (error) {
            throw error;
        }
    }

    async getTurnId(extend, _id) {
        try {
            // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzJhOTI0MzJjZTNlMmJhMmEyNmEwZTQiLCJyb2xlIjoiVXNlciIsImlhdCI6MTY3ODM2OTc2OCwiZXhwIjoxNjc4Mzc2OTY4fQ.DjY3zkVO8jMY-YAJRgB48PZv0vXVunNELLh8k-yphsk';
              
            let  headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.dataToken}` //the token is a variable which holds the token
            }
            return await axios.get(`${this.url}/${extend}/${_id}`,
                                    { headers: headers });
        } catch (error) {
            throw error;
        }
    }

    async createTurn(extend, payload) {
        try {
            let  headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.dataToken}` //the token is a variable which holds the token
            }
            payload.startDate = moment(payload.startDate).format('MM/DD/YYYY HH:mm:ss');
            payload.endDate = moment(payload.endDate).format('MM/DD/YYYY HH:mm:ss');
            console.log('payload', payload.startDate)
            return await axios.post(
                `${this.url}/${extend}`, 
                payload,
                { headers: headers });
        } catch (error) {
            throw error;
        }
    }

    async updateTurn(extend, payload, id) {
        try {
            let  headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.dataToken}` //the token is a variable which holds the token
            }
            payload.startDate = moment(payload.startDate).format('MM/DD/YYYY HH:mm:ss');
            payload.endDate = moment(payload.endDate).format('MM/DD/YYYY HH:mm:ss');
            return await axios.post(
                `${this.url}/${extend}`, 
                payload,
                { headers: headers });
        } catch (error) {
            throw error;
        }
    }

    async deleteTurn(extend, id) {
        try {
            return await axios.delete(`${this.url}/${extend}/${id}`);
        } catch (error) {
            throw error;
        }
    }
}