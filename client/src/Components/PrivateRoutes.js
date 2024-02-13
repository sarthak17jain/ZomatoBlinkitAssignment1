import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext } from './ContextProvider';
import { toast } from 'react-toastify';

function PrivateRoutes() {
    const { account } = useContext(UserContext);
    if(account){
        return <Outlet/> 
    }else{
        toast.error(<p syle="margin:0;">Unauthorized Access!<br/>Please Login!</p>, {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        return <Navigate to='/'/>;
    } 
}

export default PrivateRoutes;
