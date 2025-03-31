import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { Link,useNavigate } from "react-router-dom";
import { ShoppingBasket } from "lucide-react";
import CartCard from "./CartCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";



function Cart(){


    const [cart,setCart]=useState(null);
    const {user}=useContext(UserContext);
    const [startDate,setStartDate]=useState(Date.now);
    const [endDate,setEndDate]=useState(addDays(startDate,7));
    const navigate=useNavigate();




    
    useEffect(()=>{

       if(user?.userID){

        const authToken=sessionStorage.getItem('authToken');
        fetch(`http://localhost:8080/getCart/${user.userID}`,{headers:{'Content-Type':"application/json",'Authorization':`Basic ${authToken}`}})
        .then(response=>{
            if(!response.ok){
                throw new Error("User does not have a cart");
            }

            return response.json();
        })
        .then(data=>{

            setCart(data);
        })
        .catch(error=>{

            console.log(error);
        })  
       }
    },[user.userID]);


    
    useEffect(()=>{

       if(startDate){
        setEndDate(addDays(startDate,7));
       }
    },[startDate]);


    const handleStartDateChange=(date)=>{

        console.log(date);
    if(date){
        setStartDate(date)
    }
    }

    const handleCheckout=()=>{


        const product=JSON.parse(sessionStorage.getItem('products')).find(prod=>prod.productID==cart.productID);
        console.log(product);
        const data={...cart,total:product.price,startDate,endDate};

        
        sessionStorage.setItem('cart',JSON.stringify(data));
        navigate('/checkout');


    }
    return (
        <>
        <div className="">
            {cart?
            (<>
           <div className=" flex gap-40 border-b border-b-gray-400  shadow-md justify-evenly mt-24 py-16    ">
           
          <div className="flex flex-col   py-6 px-12  custom-border">
           <div className="mb-3 text-lg font-bold"> Select Your Rental Dates</div>
            <div className="flex flex-col  gap-4">
               <label htmlFor="startDate" className="flex gap-4">
                <div className="font-semibold font-sans ">Start Date:</div>
                <DatePicker className="custom-border text-center py-1 text-sm font-normal rounded-md focus:outline-none focus:border-blue-100" selected={startDate} onChange={handleStartDateChange} minDate={addDays(new Date(),1)} maxDate={new  Date('2025-12-31')}  name="startDate" id="startDate" dateFormat={"dd/MM/yyyy"}/>
               </label>
               <label htmlFor="endDate" className="flex gap-4 ">
               <div className="font-semibold font-sans ">End Date:</div>
               <DatePicker className="custom-border text-center focus:outline-none focus:border-blue-100 py-1 text-sm font-normal rounded-md ml-2" selected={endDate} id="endDate" minDate={new Date()} maxDate={new  Date('2025-12-31')} dateFormat={"dd/MM/yyyy"} />
               </label>    
            </div>
          </div>
          <div className="">
             <CartCard cart={cart} setCart={setCart} /> 
             
             </div>
          
           </div>
           <div className="absolute overflow-x-auto right-32 flex flex-col justify-end item-end mb-5 mt-2 custom-border gap-4 py-4 px-4">
            <div className="text-center text-lg font-bold">Cart Summary</div>
            <div className="table mb-5  place-items-center">
                <div className="table-row">
                    <div className="table-cell">Subtotal:</div>
                    <div className="table-cell">{`R ${1111}`}</div>
                </div>
                <div className="table-row ">
                    <div className="table-cell">Delivery :</div>
                    <div className="table-cell">{`R ${100}`}</div>
                </div>
                <div className="table-row">
                    <div className="table-cell">Tax (15%):</div>
                    <div className="table-cell">{`R ${11}`}</div>
                </div>
                <div className="table-row font-bold">
                    <div className="table-cell">Total :</div>
                    <div className="table-cell">{`R ${11}`}</div>
                </div>

            </div>
            <button className=" p-1 text-white font-bold bg-blue-500 border-blue-500   rounded-md cursor-pointer" onClick={handleCheckout}>Proceed to checkout</button>
          </div>
            </>
            )
            
            :
           ( <div className="flex flex-col justify-center absolute h-1/2 py-8 w-full items-center  "> 
                <div className="font-semibold text-lg">Shopping cart is empty!</div>
                
                <div className="bg-customGray place-items-center items-baseline h-full p-8 gap-4 w-1/2 rounded-md shadow-sm">
                <div>There are no items in the shopping cart</div>
                <div><ShoppingBasket className="mb-4" color="gray" size={100}/></div>
                <Link className="rounded-md mt-16 py-2 px-3  bg-blue-400 text-white border-solid border " to={"/home"}>Continue Shopping</Link>
                </div>
            
            </div>
        )}
        </div>
        </>     
    )

}

export default Cart;