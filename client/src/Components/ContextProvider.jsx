import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const UserContext = createContext(null);

const ContextProvider = ({children}) => {
    const [ account, setAccount ] = useState('');
    const [ loading, setLoading ] = useState(true); 
    const navigate = useNavigate();
    
    useEffect(()=>{
        // console.log("useEffect login context called")
        // try{
        //     const res = checkUser();
        //     console.log(res);
        //     setAccount(res.account);
        // }catch(err){
        //     console.log("client contextprovider error");
        //     console.log(err);
        // }
        const checkUser = async ()=>{
            try{
                const res = await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/checkuser`, {withCredentials: true});
                console.log(res);
                const accountDetails = res.data.account;
                // setAccount(accountDetails);
                setAccount(accountDetails, navigate('/gallery'));
            }catch(error){
                console.log('error', error);
            }finally {
                setLoading(false);
            }
        }
        checkUser();
    }, []);
    return (
        <UserContext.Provider value={{ account, setAccount, loading, setLoading }}>
            {children}
        </UserContext.Provider>
    )
}

export default ContextProvider;