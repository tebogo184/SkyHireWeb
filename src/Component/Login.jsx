import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { Link, useNavigate } from "react-router-dom";


function Login(){

    const [formData,setFormData]=useState({email:"",password:""});
    const {user,setUser}=useContext(UserContext);
    const navigate=useNavigate();

    const handleInput=(e)=>{

        const {name,value}=e.target;

        setFormData((prevFormData)=>{
            return {...prevFormData,[name]:value};
        })
    }

    const handleSubmit=(e)=>{

        e.preventDefault();
        fetch(`http://localhost:8080/login`,{headers:{"Content-Type":'application/json'},method:'post',body:JSON.stringify(formData)})
        .then(response=>{
            if(!response.ok)
                throw new Error("Failed to login:");
            return response.json();
        })
        .then(data=>{

            const {userID,role}=data;
            
            setUser({userID,role});
            const authToken=btoa(`${formData.email}:${formData.password}`);
            sessionStorage.setItem('authToken',authToken);
            navigate("/home");
           
        }).catch(error=>{

            
            alert(error);
        })

    }
    return (
    <>
    <div className="flex flex-col justify-center items-center mt-16  w-full">
        
        <form action="#" onSubmit={handleSubmit} className="flex flex-col gap-4 w-1/3  justify-center items-center font-bold bg-customGray border border-solid p-6 shadow-xl mb-8  ">
        <h1 className=" text-2xl ">Login</h1>
        <div className=" font-light text-sm">Please login to access your account.</div>
                
                <input className="  rounded-md w-full focus:border-blue-200 focus:ring-blue-500 focus:outline-none text-sm font-normal shadow-customGray border-2 h-8" type="email" placeholder="Email" name="email" id="email" value={formData.email} onChange={handleInput} required />
                       
                <input className=" h-8 rounded-md font-normal  focus:border-blue-200 focus:ring-blue-500 focus:outline-none  text-sm shadow-customGray border-2  w-full border-solid" placeholder="Password" type="password" name="password" id="password" value={formData.password} onChange={handleInput} required/>
            
            <input type="submit" value="Submit" className="rounded-md cursor-pointer solid shadow-customGray h-8 bg-blue-500 text-white border w-full"  />
            <div className="text-sm font-normal w-full">Don't have an account?<Link className="font-bold text-blue-400" to={"/register"}>Register</Link></div>

        </form>
        
    </div>
    </>
    )

}

export default Login;