import { useContext, useEffect, useState } from "react";
import { useSearchParams,useNavigate, Link } from "react-router-dom";
import {UserContext} from "./UserContext";


function  AboutProduct(){

    const [product,setProduct]=useState([]);
    const navigate=useNavigate();
    const [searchParams]=useSearchParams();
    const prodID=Number.parseInt(searchParams.get('id'));
    const products=JSON.parse(sessionStorage.getItem('products'));
    const {user}=useContext(UserContext);
    const isLoggedIn=user.userID==='';
    
   


    const handleClick=(e)=>{

        const authToken=sessionStorage.getItem('authToken');

        if(authToken){

            const cart={userID:user.userID,productID:prodID};
        fetch(`http://localhost:8080/addCart`,{headers:{'Content-Type':"application/json",'Authorization':`Basic ${authToken}`},method:"POST",body:JSON.stringify(cart)})
        .then(response=>{
            if(!response.ok)
                throw new Error("Failed to add product to cart");
            navigate("/cart");
        }).catch(error=>{
            console.log(error);
        });
        }
    }

    useEffect(()=>{

        

        setProduct(()=>{

           return products.find(prod=>prod.productID===prodID);
        });
    },[])

    return ( 
    <>
   
    {product&&
    
    <div>
    
        <div className="absolute w-full h-full   mt-24">
        {isLoggedIn&& 
   <Link to={"/login"} className="flex justify-start mb-2 items-start text-white ml-16 text-center bg-blue-500 border w-1/12 ">Log In</Link>
   }
            <div className="flex justify-evenly  ">
                <div className="flex flex-row justify-around gap-6 h-full  border solid p-4 shadow-xl   max-w-screen-lg    ">
                <div className=" border rounded-sm border-solid p-4  h-1/2 "><img className="h-full" src={`products/${product.imgSrc}`} alt={`${product.name}`} /></div>
                <div className="flex flex-col justify-center gap-4">
                    <div className="font-bold text-2xl">{product.name}</div>
                    <div className="">{`Model:\t${product.model}`}</div>
                    <div className="">{`Size:\t${product.size}`}</div>
                    <div className="text-gray-400">{product.availability?"Out of stock":"In Stock"}</div>
                    <div className="flex flex-col gap-4">
                        <div className="overflow-visible text-sm font-normal">{`Description:\n${product.description}`}</div>
                      <div className="text-sm"><pre>{`Includes:\n${product.includes}`}</pre></div>
                    </div>
                </div>
                </div>
                <div className="border  solid w-1/6 h-1/2 p-3 flex flex-col gap-4 justify-center items-center shadow-xl">
                    <div className="">Cart Details</div>
                    <div className="font-bold">{`R ${product.price}/ 7 days`}</div>
                    <div className=" w-full  h-8"><input className={`p-1 border text-center w-full h-full  text-white rounded-md ${user.userID===''? 'cursor-not-allowed bg-gray-500':'cursor-pointer bg-blue-400'} `} disabled={isLoggedIn} type="button" onClick={handleClick} value="ADD TO CART"  /></div>

                </div>
            </div>

        </div>
        <div>

        </div>
   
    </div>
    }


    </>
    )
}

export default AboutProduct;