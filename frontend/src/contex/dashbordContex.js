import { useState } from "react"
import React from "react"

export const dashbordContext=React.createContext()

const DashbordProvider=(props)=>{
    const [searchedData,setSearchedData]=useState({})
    const [dashbordId,setDashbordId]=useState(localStorage.getItem("id"))
    const [filterShow,setFilterShow]=useState(false)
    const [ShowDashbord,setShowDashbord]=useState(false)

    
    
    return(
       < dashbordContext.Provider value={{searchedData,setSearchedData,dashbordId,setDashbordId,filterShow,setFilterShow,ShowDashbord,setShowDashbord}} >
       {props.children}
       </dashbordContext.Provider>
    )

}

export default DashbordProvider

