import React from 'react'
import { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import sawConversation from '../../zustand/sawConversation';
import useGetAllusers from '../../context/useGetAllusers';
import toast from 'react-hot-toast';

function Search() {
  const [search,setSearch]=useState("");
  const {setselectedConversation}=sawConversation();
  const [allUsers]=useGetAllusers();

  const handleSubmit = (e) => {
  e.preventDefault();

 

  const userAvailable = allUsers.find((user) =>
    user.fullname?.toLowerCase().includes(search.toLowerCase())
  );

  if (userAvailable) {
    setselectedConversation(userAvailable);
    setSearch("");
  } else {
    toast.error("User not found");
    // or setError("User not found") if using state for error display
  }
};



  return (
    <div className='h-[10vh]'>
      <div className='px-6 py-4'>
       <form onSubmit={handleSubmit}>
          <div className='flex space-x-3'>
             <label className="border-[1px]  border-gray-700 bg-slate-900 rounded-lg p-3 flex items-center gap-2 w-[80%]">
        
         <input type="text" className="grow outline-none bg-transparent  " placeholder="Search"
         value={search}
         onChange={(e)=>setSearch(e.target.value)} />
        
       </label>
        <button>
               <FaSearch className='text-5xl p-2 hover:bg-gray-600 rounded-full duration-300'/>
           </button>
          </div>
          </form>
          
    </div>
    </div>
  )
}

export default Search