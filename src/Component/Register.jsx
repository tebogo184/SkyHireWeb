import { useState } from "react";
import {useNavigate ,Link} from "react-router-dom";

function Register(){

    const navigate=useNavigate();
    const [form,setForm]=useState({firstName:"",surname:"",email:"",password:"",phoneNumber:""});

    const  handleInput=(e)=>{

       
        const {name,value}=e.target;

        setForm((prevForm)=>{
               return {...prevForm,[name]:value}
            ;});
    }

    const handleSubmit=(e)=>{

        e.preventDefault();

        fetch(`http://localhost:8080/register`,{headers:{"Content-Type":'application/json'},method:'post',body:JSON.stringify(form)})
        .then((response)=>{
            if(!response.ok)
                throw new Error("Failed to register user");
            navigate("/login");
                
        })
        

    }

    return (
        <>
    <div className="flex flex-col justify-center items-center mt-16  w-full">
        
        <form action="#" onSubmit={handleSubmit} className="flex flex-col gap-4 w-1/3  justify-center items-center font-bold bg-customGray  border-2 border-solid p-6 shadow-2xl mb-8  ">
        <h1 className=" text-2xl ">Register</h1>
        <div className=" font-light text-sm">New users create an account here.</div>
                <input className=" rounded-md   shadow-2xl    border-2 text-sm w-full bg-white border-solid font-normal h-8" type="text" name="firstName" id="firstName" placeholder="First Name" value={form.firstName} onChange={handleInput} required/>
                
                <input className=" rounded-md font-normal    w-full  text-sm  border-2  h-8" type="text" placeholder="Surname" name="surname" id="surname"  value={form.surname} onChange={handleInput} required/>
                
                <input className="  rounded-md w-full    text-sm font-normal  border-2 h-8" type="email" placeholder="Email" name="email" id="email" value={form.email} onChange={handleInput} required />
           
                <input className=" rounded-md w-full     text-sm font-normal border-solid   border-2 h-8" type="text" placeholder="Phone Number" name="phoneNumber" id="phoneNumber" value={form.phoneNumber} onChange={handleInput} required/>
            
                <input className=" h-8 rounded-md  font-normal  text-sm  border-2 w-full border-solid" placeholder="Password" type="password" name="password" id="password" value={form.password} onChange={handleInput} required/>
            
            <input type="submit" value="Submit" className="rounded-md cursor-pointer solid shadow-customGray h-8 bg-blue-500 text-white border w-full"  />
            <div className="text-sm font-normal w-full">Already have an account?<Link className="font-bold text-blue-400" to={"/login"}>Login</Link></div>

        </form>
        
    </div>

    </>
    );
    
}

export default Register;