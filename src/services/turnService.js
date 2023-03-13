import axios from "axios";

export default class providerService {
    constructor(){
        this.url = 'http://localhost:3002';
        this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzJhOTI0MzJjZTNlMmJhMmEyNmEwZTQiLCJyb2xlIjoiVXNlciIsImlhdCI6MTY3ODQ3NDM1MywiZXhwIjoxNjc4NDgxNTUzfQ.v1AHnrOL-IeiI3iNmXlN2Isx0TtNkvdGhsVTn5neKLg'
    }

    async getTurn(extend, limit, page, search, startDate = '', endDate = '') {
        try {
            const data = await axios.get(`${this.url}/${extend}?limit=${limit}&page=${page}&search=${search}&startDate=${startDate}&endDate=${endDate}`);
        //    console.log('data servicio', data)
            return data;
            // return await axios.get(`${this.url}/${extend}`);
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
            // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzJhOTI0MzJjZTNlMmJhMmEyNmEwZTQiLCJyb2xlIjoiVXNlciIsImlhdCI6MTY3ODQ2NzEyMCwiZXhwIjoxNjc4NDc0MzIwfQ.mbNv3a4fXe0VQaVq_pgSvZbWEL75dIN_OPVFx-OOO0Q';
              
            let  headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}` //the token is a variable which holds the token
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
                'Authorization': `Bearer ${this.token}` //the token is a variable which holds the token
            }
            return await axios.get(`${this.url}/${extend}/${_id}`,
                                    { headers: headers });
        } catch (error) {
            throw error;
        }
    }

    async createTurn(extend, payload) {
        try {
            // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzJhOTI0MzJjZTNlMmJhMmEyNmEwZTQiLCJyb2xlIjoiVXNlciIsImlhdCI6MTY3ODM2OTc2OCwiZXhwIjoxNjc4Mzc2OTY4fQ.DjY3zkVO8jMY-YAJRgB48PZv0vXVunNELLh8k-yphsk';
            let  headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}` //the token is a variable which holds the token
            }
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
            // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzJhOTI0MzJjZTNlMmJhMmEyNmEwZTQiLCJyb2xlIjoiVXNlciIsImlhdCI6MTY3ODM2OTc2OCwiZXhwIjoxNjc4Mzc2OTY4fQ.DjY3zkVO8jMY-YAJRgB48PZv0vXVunNELLh8k-yphsk';
            let  headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}` //the token is a variable which holds the token
            }
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