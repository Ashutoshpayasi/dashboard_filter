import React, { useState } from 'react'
import "./FilteredResult.css"
import { Button } from 'react-bootstrap'
import {MdSubtitles} from "react-icons/md"
import {MdImportContacts} from "react-icons/md"
import { TbMapPinFilled } from "react-icons/tb"
import { dashbordContext } from '../../contex/dashbordContex'
import { useContext } from 'react'
import Shimmer from '../NotFound'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Filter from '../FilterBox/Filter'
import NotFound from '../NotFound'

function FilteredResult() {
   const {setShowDashbord,searchedData,setDashbordId,filterShow}=useContext(dashbordContext)
   const navigate=useNavigate()
   const [result,setResult]=useState([])
   const [found,setFound]=useState(false)
  
  
   useEffect(()=>{
    
    setFound(false)
     const key=Object.keys(searchedData)
     const value=Object.values(searchedData)
     const res={}
     for(let i=0;i<key.length;i++){
      if(value[i][1]!=false){
        res[key[i]]=value[i][0]
      }
     }
     console.log(res)
    fetch("http://localhost:8080/search",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(res)
    })
    .then(res=>res.json())
    .then(result=>{
      if(result.length==0){
        setFound(true)
      }
      console.log(result)
      setResult(result)
    })
   },[searchedData])



  return (
    <div className='filterparent'>
    <div className='ResultParent'>
      { found? <NotFound /> : (result.map((item,index)=>{
        return (
          
          <section key={index} className='ResultCards'>  
          <div className='filtertopic'><MdImportContacts className='filterlogo'   /> <h1>{item.topic}</h1></div>
         <div className='filtertitle'><MdSubtitles className='filterlogo' /><p>{item.title}</p></div>
          <div className='cardButton'>
          <TbMapPinFilled  className='filterlogo'/>
           <h2>{item.country}</h2>
           <Button onClick={()=>{
            localStorage.setItem("id",item._id)
             setDashbordId(item._id)
             setShowDashbord(true) //to show that dashbord logo only whhene persone entes dashbord for the first time
             navigate("/dashbord")
           }} >Dashbord</Button>
          </div>
          </section>
          
        )
      }))}

    </div>
  
    {filterShow &&<Filter />}

    </div>
  )
}

export default FilteredResult
