import React from 'react'
import "./filter.css"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { dashbordContext } from '../../contex/dashbordContex';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function Filter() {
  const navigate = useNavigate()
  const { setSearchedData, setFilterShow } = useContext(dashbordContext)
  const filterCopy = {
    end_year: [],
    topic: [],
    sector: [],
    region: [],
    pestle: [],
    source: [],
    country: []
  }
  const [filters, setFilters] = useState({ ...filterCopy })
  const [text, setText] = useState("")
  const [loopdata, setLoopData] = useState({})
  const [select, setSelect] = useState({
    end_year: ["END YEAR", false]
    , topic: ["TOPIC", false], sector: ["SECTOR", false], region: ["REGION", false], pestle: ["PESTLE", false], source: ["SOURCE", false], country: ["COUNTRY", false]
  })
  const [reset,setReset]=useState({...select})
  const [showMessage,setShowMessage]=useState(true)

  useEffect(() => {
    fetch("https://filter-backend.onrender.com/filterList")
      .then((res) => res.json())
      .then(result => {
 
        result.map(ele => {
          if (!filterCopy.end_year.includes(ele.end_year) && ele.end_year !== null) {
            (filterCopy.end_year.push(ele.end_year))
          }
          if (!filterCopy.topic.includes(ele.topic) && ele.topic !== "") {
            (filterCopy.topic.push(ele.topic))
          }
          if (!filterCopy.sector.includes(ele.sector) && ele.sector !== "") {
            (filterCopy.sector.push(ele.sector))
          }
          if (!filterCopy.region.includes(ele.region)) {
            (filterCopy.region.push(ele.region))
          }
          if (!filterCopy.pestle.includes(ele.pestle) && ele.pestle !== "") {
            (filterCopy.pestle.push(ele.pestle))
          }
          if (!filterCopy.country.includes(ele.country) && ele.country !== "") {
            (filterCopy.country.push(ele.country))
          }
          if (!filterCopy.source.includes(ele.source) && ele.source !== "") {
            (filterCopy.source.push(ele.source))
          }

        })
        setFilters({ ...filterCopy })
        setLoopData({ ...filterCopy })
      })
  }, [])

  const dropdowncss = {
    color:"white",
    minWidth:"7em",
    backgroundColor:"#0099cc",
    color:"white",
    fontWeight:"700",
    fontSize:"1em",
    margin:"0.7em"
    


  }
  function filterlist(list, p) {
    console.log(filters)
    console.log("working")
    return list.map((item, index) => {
      return <Dropdown.Item key={index} onClick={() => {
        setSelect({ ...select, [p]: [item, true] })
        setShowMessage(false)
        setFilters(loopdata)
        setText("")
      }} href="#/action-1">{item} </Dropdown.Item>
    })
  }
  function findinput(obj, e, p) {
    const newarr = obj.filter((ele) => {
      return (String(ele)).toLowerCase().includes(e.toLowerCase())
    })

    setFilters({ ...filters, [p]: [...newarr] })

  }
  return (
    <>
      <div className="filterbox">
        <div className='filterCoulmns' >
          <div className='filterColumn1'>
            {
              ["end_year",
                "topic",
                "sector",
                "region"].map((ele) => {
                  return <Dropdown >
                  <Dropdown.Toggle className='dropdown' style={dropdowncss} variant="secondary">
                  {select[ele][0]}
                  </Dropdown.Toggle>
                 
                  <Dropdown.Menu variant="dark">
                
                    <div className='scrollList' >
                                <input type='text' value={text} placeholder='search' onChange={(e) => {
                                  setText(e.target.value)
                                  findinput(loopdata[ele], e.target.value, ele)
          
                                }} />
                                {filterlist(filters[ele], ele)}</div>
                    
                    
                  </Dropdown.Menu>
                </Dropdown>
                })
            }
          </div>
          <div className='filterColumn2'>
            {
              ["pestle",
                "source",
                "country"].map((ele) => {
                  return <Dropdown >
                  <Dropdown.Toggle className='dropdown' style={dropdowncss} variant="secondary">
                  {select[ele][0]}
                  </Dropdown.Toggle>
                 
                  <Dropdown.Menu variant="dark">
                
                    <div className='scrollList' >
                                <input type='text' value={text} placeholder='search' onChange={(e) => {
                                  setText(e.target.value)
                                  findinput(loopdata[ele], e.target.value, ele)
          
                                }} />
                                {filterlist(filters[ele], ele)}</div>
                    
                    
                  </Dropdown.Menu>
                </Dropdown>
                
                })
            }
          </div>
          
        </div>
        { showMessage &&  <p className='message'>plzz select atleast one</p>}
        
        <div className='searchButton'>
       {showMessage ? <Button style={{color:"gray"}} >SEARCH</Button>:

          <Button onClick={() => {
            let flag=false
            
            setSearchedData(select)
            setFilterShow(false)
            navigate("/")
          }}>SEARCH</Button> }
            <Button onClick={() => {
            setFilterShow(false)
          }}>CLOSE</Button>
           <Button onClick={() => {
            setSelect(reset)
            setShowMessage(true)
          }}>RESET</Button>
        </div>
      </div>
    </>
  )
}

export default Filter
