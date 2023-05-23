import React from 'react'
import "./NotFound.css"
import Toast from 'react-bootstrap/Toast';
import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import { dashbordContext } from '../contex/dashbordContex';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate=useNavigate()
  const{setSearchedData,searchedData}=useContext(dashbordContext)
  return (
    <>
    <div className='foundParent'>
    <Toast className='toast' bg='danger' style={{height:"150px",width:"800px"}}>
    <Toast.Header>
      <img  className="rounded me-2" alt="" />
      <strong className="me-auto">Bootstrap</strong>
      <small>11 mins ago</small>
    </Toast.Header>
    <Toast.Body style={{color:"white",fontSize:"40px",fontWeight:"700"}}>SORRY!! NO RESULT FOUND</Toast.Body>
  </Toast>
  <Button onClick={()=>{
  
    setSearchedData({})
  }} >SHOW ALL DATA</Button>
  </div>
  </>
  )
}

export default NotFound
