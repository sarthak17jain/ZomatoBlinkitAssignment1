import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Navbar from './Components/Navbar';
import Gallery from './Components/Gallery';
import AddImage from './Components/AddImage';
import PrivateRoutes from './Components/PrivateRoutes';
import ContextProvider from './Components/ContextProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
        <ContextProvider>
            <ToastContainer/>
            <Navbar/>
            <Routes>
                <Route path= '/' element={<Login />} />
                <Route path= '/signup' element={<SignUp />} />
                <Route element={<PrivateRoutes/>}>
                    <Route path= '/gallery' element={<Gallery />} />
                    <Route path= '/addImage' element={<AddImage />} />
                </Route>
            </Routes>
        </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
