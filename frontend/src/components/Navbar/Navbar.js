import React from 'react'
import "./Navbar.css"
import { FaFilter } from "react-icons/fa"
import { TbHexagonLetterH } from "react-icons/tb"
import { useContext } from 'react'
import { dashbordContext } from '../../contex/dashbordContex'
import { useNavigate } from 'react-router-dom'
import { MdDashboard } from "react-icons/md"
import { BsArrowLeftCircleFill } from "react-icons/bs"
import { AiTwotoneHome } from "react-icons/ai"
function Navbar() {
  const navigate = useNavigate()
  const {setFilterShow, ShowDashbord, setSearchedData } = useContext(dashbordContext)

  return (
    <>
      <div className='navbar'>
      
          <BsArrowLeftCircleFill onClick={() => {
            navigate("/")
          }} className="goBack" />

        <h2 className='heading' >
          <TbHexagonLetterH className="logo" />Asutosh</h2>

        <div className='leftnav'>
          {ShowDashbord && <MdDashboard onClick={() => {
            navigate("/dashbord")
          }} className="mydashbord" />}
          <h2 onClick={() => {
            setFilterShow(true)
          }} ><FaFilter className="filter" />Filter</h2>
        </div>

      </div>


    </>
  )
}

export default Navbar
