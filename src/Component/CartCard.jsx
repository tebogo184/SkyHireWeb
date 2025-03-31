
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
function CartCard({ cart,setCart }) {

    const products = JSON.parse(sessionStorage.getItem('products'));

    const product = products.find(prod => prod.productID === cart?.productID);

    const navigate=useNavigate();

    const handleRemoveClick=()=>{

        const authToken=sessionStorage.getItem('authToken');
        if(authToken){
            
        fetch(`http://localhost:8080/deleteCart/${cart.userID}`,{headers:{'Content-Type':"application/json",'Authorization':`Basic ${authToken}`},method:'DELETE',body:{}})
        .then(response=>{
            if(!response.ok){
                throw new Error("Failed to delete cart");
            }
            setCart(null);
            
        }).catch(error=>{
            console.log(error);
        });
        }



    }

    return (
        <>
            <div className="   flex custom-border pt-12 px-28  ">
                <div className="relative  -left-24">
                    <img className="  object-cover w-48 h-24" src={`products/${product.imgSrc}`} alt={`${product.name}`} />
                </div>
                <div className="flex flex-col gap-4">
                    <div className="text-xl">{product.name}</div>
                    <div className="">{product.model}</div>
                    <div className="text-xs font-bold">In Stock</div>
                    <div className="font-bold text-lg"> {`R ${product.price}`}</div>

                </div>
                    <div className=" flex justify-end items-end relative mb-2 -right-1/4 mr-3"><Trash2 color="red" size={30} className="cursor-pointer " onClick={handleRemoveClick}/></div>
               
            </div>
            
        </>
    )
}

export default CartCard;