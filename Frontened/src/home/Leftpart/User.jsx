import React from "react";
import Users from "./Users";
import useGetAllusers from "../../context/useGetAllusers";

function User() {
  const [allUsers,loading]=useGetAllusers();
  console.log( 'users',allUsers)
  console.log(allUsers);
  return (
    <div>
      <h1 className="px-8 py-2 bg-slate-800 font-semibold text-white rounded-md  my-2 "  >
        Contacts
      </h1>

     <div  >
       <div 
        className="hide-scrollbar overflow-y-auto flex-1"
        style={{ maxHeight: "calc(83vh - 10vh)" }}
      >
       {allUsers.map((user,index)=>(
        <Users key={index} user={user}/>
       ))}
     </div>
      </div>
    </div>
  );
}

export default User;
