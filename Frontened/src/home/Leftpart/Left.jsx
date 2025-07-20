import React from 'react'
import Search from './Search'
import User from './User'
import Logout from './Logout'

function Left() {
  return (
    <div className=' w-full bg-black text-white hide-scrollbar overflow-y-auto'>
      
         
           
      
   <Search/>
    <div
        className="hide-scrollbar overflow-y-auto"
        style={{ minHeight: "calc(84vh - 8vh)" }}
      >
        <User/>
      </div>
  
   <Logout/>
    </div>
  )
}

export default Left
