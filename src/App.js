import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import AuthForm from './component/Authentication/AuthForm';
import { useSelector } from 'react-redux';
import Header from './component/Layout/Header';
import ForgotPassword from './component/Authentication/ForgotPassword';


function App() {

  const isAuthenticated=useSelector(state=> state.auth.isAuthenticated)
  return (
    <>
    <Routes>
      {!isAuthenticated && <Route path="/" element={<AuthForm/>} />}
        {isAuthenticated && <Route path="/" element={<Header/>}/>}
      <Route path="/forgotpassword" element={<ForgotPassword/>}> 
      </Route>
    </Routes>
    </>
);
}
export default App;