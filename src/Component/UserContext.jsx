import React, { useEffect } from "react";
import { createContext, useState } from "react";


export const UserContext=createContext();

export const UserProvider=({children})=>{

 const [user,setUser]=useState({userID:"",role:""});
 const [products,setProducts]=useState([]);


 useEffect(() => {
    console.log("UserContext Mounted, user:", user);
}, []);
    return (
      
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
       
    )
}

