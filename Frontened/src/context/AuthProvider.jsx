import React from 'react'
import Cookies from "js-cookie"
import { createContext } from 'react'
import { Children } from 'react';
import { useContext } from 'react';
import { useState } from 'react';

//context creation
export const AuthContext=createContext();

// provider
export const AuthProvider=({children})=>{
    const initialUserState=Cookies.get("jwt") || localStorage.getItem("chatApp")

    const [authUser,setAuthUser]=useState(initialUserState? JSON.parse(initialUserState): undefined);

    return (
        <AuthContext.Provider value={[authUser,setAuthUser]}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth=()=>useContext(AuthContext);
