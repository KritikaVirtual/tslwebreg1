import React,{ useState} from 'react';
import './index.css';
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
const AdminDashboard=()=> {
  const loginData=useSelector((state)=>state.user);
  const navigate=useNavigate();
  const logout=()=>{
    sessionStorage.removeItem('adminToken');
    navigate('/admin');
}
  return (
    <>
      <h1>Account page</h1>
      <p> This page is under maintenance</p>
      <p><button type='submit' onClick={logout}>Logout</button></p>
    </>
  );
}
export default AdminDashboard; 