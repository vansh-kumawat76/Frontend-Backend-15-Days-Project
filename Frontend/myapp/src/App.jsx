import React from 'react'
import Signup from './Signup'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './Home'
import Login from './Login'
import ForgetPassword from './assets/ForgetPassword'
import OtpPage from './assets/OtpPage'
import ResetPassword from './assets/ResetPassword'
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
const App = () => {
  return (
<>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path="/signup" element = {<Signup/>}/>
    <Route path='/login' element = {<Login/>}/>
    <Route path='/forgetPassword' element={<ForgetPassword/>}/>
    <Route path='/otpPage' element={<OtpPage/>}/>
    <Route path='/resetPassword' element={<ResetPassword/>}/>
   </Routes>
   </BrowserRouter>
   <ToastContainer/>
   </>
  )
}

export default App