import React from 'react'
import Right from './home/Rightpart/Right'
import Left from './home/Leftpart/Left'
import Signup from './Components/Signup'
import Login from './Components/Login'
import { useAuth } from './context/AuthProvider'
import { Navigate, Route, Routes } from 'react-router-dom'
import Loading from './Components/Loading'
import  { Toaster } from 'react-hot-toast';
import { MdOutlineMenu } from "react-icons/md";


function App() {
  const [authUser,]=useAuth();
  console.log('Hello',authUser);



 

 
  return (
    
   

   <>
    <Routes>
     <Route path="/" element={authUser?(
    //    <div className='flex h-screen'>
    //   <Left/>
    //   <Right/>
    
    //  </div>
     <div className="drawer lg:drawer-open">
                <input
                  id="my-drawer-2"
                  type="checkbox"
                  className="drawer-toggle"
                />
                <div className="drawer-content flex flex-col items-center justify-center hide-scrollbar overflow-y-auto">
                  <Right />
                </div>
                <div className="drawer-side hide-scrollbar overflow-y-auto">
                  <label
                    htmlFor="my-drawer-2"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                  ></label>
                  <ul className="menu w-80 min-h-full bg-black text-base-content">
                    <Left />
                  </ul>
                </div>
              </div>
    
 
     ):(
      <Navigate to={"/login"}/>
     ) }/>
      
     <Route path='/login' element={authUser?<Navigate to="/"/>:<Login/>}/>
     <Route path='/signup'element={authUser?<Navigate to="/"/>:<Signup/>}/>
    </Routes>
     <Toaster />
    
    </>
    // <Loading/>
  )
}

export default App
