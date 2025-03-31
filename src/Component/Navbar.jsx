import React, { useContext } from "react";
import {Link} from "react-router-dom";
import {UserContext} from "./UserContext";
import { ShoppingCart,CircleUser } from "lucide-react";
function Navbar() {

    const {user}=useContext(UserContext);
    return (
        <>
            <div className=" relative   py-6 px-4 ">
                <div className="absolute top-8 left-16 ">
                    {/**<img className="object-cover bg-cover w-40 h-40" src="products/logo.jpg" alt="logo" /> */ }
                    <Link to={"/home"} className="font-extrabold font-sans text-blue-500 text-4xl w-72 text-center">SkyHire</Link>
                </div>

            <div className="flex justify-center items-center ">
            <input type="text" className="border-2 border-solid w-1/2 mt-4 h-8 text-sm  text-gray-300  border-slate-500 rounded-md" placeholder="Search for anything" id="" />
            </div>

            <div className="absolute top-10 right-32  ">
            <div className="flex flex-row">
            <Link className="mr-12 " to={"/cart"}><ShoppingCart className="text-blue-500" /></Link>
            {user.role===""&&<Link to={"/login"}><CircleUser className="text-blue-500"/></Link>}
            </div>
            </div>


            </div>
           <div>
            
           </div>

                <div className="flex justify-center w-screen py-2 border-solid border-b-2  bg-customGray">
                    <nav className=" font-medium flex justify-evenly w-1/2   ">
                        <Link className="hover:text-blue-500" to={"/home"}>Home</Link>
                        <Link className="hover:text-blue-500" to={"/about"}>About Us</Link>
                        <Link className="hover:text-blue-500" to={"/contact"}>Contact Us</Link>
                        
                    </nav>
                </div>
            
        </>
    )
}

export default Navbar;