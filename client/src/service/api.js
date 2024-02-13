import axios from 'axios';

const url = process.env.REACT_APP_SERVER_BASE_URL;

export const authenticateLogin = async (user) => {
    try {
        return await axios.post(`${url}/auth/login`, user, {withCredentials: true})
    } catch (error) {
        console.log("error api authlogin", error);
        console.log('error while calling login API: ', error);
    }
}

export const authenticateSignup = async (user) => {
    try {
        // return await axios.post(`${url}/auth/signup`, user);
        return await axios.post(`${url}/auth/signup`, user, {withCredentials: true});
    } catch (error) {
        console.log('error while calling Signup API: ', error);
    }
}

export const userLogout = async () => {
    try {
        // return await axios.post(`${url}/auth/signup`, user);
        return await axios.get(`${url}/auth/logout`, {withCredentials: true});
    } catch (error) {
        console.log('error while calling logout API: ', error);
    }
}

export const checkUser = async ()=>{
    try{
        // const res = await axios.get(`${url}/auth/checkuser`);
        console.log("api checkuser called");
        const res = await axios.get(`${url}/auth/checkuser`, {withCredentials: true});
        return res.data;
    }catch(error){
        console.log('error', error);
        throw new Error(error);
    }
}