import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Checkout() {


    const cart = JSON.parse(sessionStorage.getItem('cart'));
    const products = JSON.parse(sessionStorage.getItem('products'));
    const product = products.find(prod => prod.productID == cart.productID);
    const [formData, setFormData] = useState({ firstName: '', surname: '', email: '', idNumber: '',address:'', cardNumber: '', cvv: '', expiryDate: '' })
    const navigate = useNavigate();

    const handleInput = (e) => {

        const {name,value}=e.target;

        setFormData((prevFormData)=>{

            return {...prevFormData,[name]:value};
        })
    }

    const handleSubmit=(e)=>{

        e.preventDefault();
     const {idNumber}=formData;
     const order={...cart}
     
     const authToken=sessionStorage.getItem('authToken');
     fetch(`http://localhost:8080/checkout`,{headers:{'Content-Type':'application/json','Authorization':`Basic ${authToken}`},method:"POST",body:JSON.stringify({idNumber,order})})
     .then(response=>{

        if(!response.ok){
            throw new Error("Failed to checkout the cart with response status:"+response.statusText);
        }

        navigate('/order');
     })
     .catch(error=>{

        console.log('failed to checkout cart:'+error)
     })

    }
    return (
        <>
            {cart ?
                <>
                    <div className="flex justify-center  mt-16  w-full  ">
                        <div className="flex justify-center border-r-2 border-solid  px-5 pb-56  w-1/2">

                            <form className="flex justify-center items-center flex-col gap-4  w-full px-5 mt-14 " action='#' onSubmit={handleSubmit}>
                                <div className="text-xl font-bold">Personal Details</div>
                                <div className="flex w-full justify-evenly gap-4">

                                    <input type="text" className="custom-border w-1/2 focus:outline-none text-sm" name="firstName" placeholder="First Name " value={formData.firstName} onChange={handleInput} required />
                                    <input type="text" className="custom-border w-1/2 h-8 focus:outline-none text-sm" name="surname" placeholder="Surname" id="" value={formData.surname} onChange={handleInput} required />
                                </div>
                                <input type="text" className="custom-border w-full h-8 focus:outline-none text-sm" name="idNumber" placeholder="ID Number" id="" value={formData.idNumber} onChange={handleInput} required />
                                <input type="email" className="custom-border w-full h-8 focus:outline-none text-sm" name="email" placeholder="Email" id="" value={formData.email} onChange={handleInput} required />
                                <div className="flex w-full gap-4  ">
                                    <input type="text" className="custom-border w-full h-8 focus:outline-none text-sm" name="address" placeholder="Delivery Address" id="" value={formData.address} onChange={handleInput} required />
                                    <input className=" font-bold text-white bg-blue-500 rounded-md cursor-pointer p-1" type="button" value="Search" required/>
                                </div>


                                <div className="font-bold text-xl">Card Details</div>
                                <input className="custom-border w-full h-8 text-sm focus:outline-none" type="text" placeholder="Card Number" name="cardNumber" id="" value={formData.cardNumber} onChange={handleInput} required />
                                <div className="w-full flex justify-evenly gap-4">
                                    <input className="custom-border w-1/2 h-8 focus:outline-none text-sm" type="text" placeholder="CVV" name="cvv" id="" value={formData.cvv} onChange={handleInput} required />
                                    <input className="custom-border w-1/2 h-8 focus:outline-none text-sm expiry date " placeholder="Expiry Date" type="text" name="expiryDate" id="" value={formData.expiryDate} onChange={handleInput} required />

                                </div>
                                <input className="w-full bg-blue-500 h-12 text-xl font-bold text-white cursor-pointer rounded-md" type="submit" value="PAY NOW" />
                            </form>


                        </div>
                        <div className="sticky w-1/4">

                            <div className="  flex flex-col w-full">
                                <div className="flex gap-6">
                                    <div><img className="object-cover w-12 h-12" src={`products/${product.imgSrc}`} alt={product.name} /></div>
                                    <div>{product.name}</div>
                                    <div>{`R ${product.price}`}</div>
                                </div>
                                <div className="text-lg font-bold">Rental Period:<span>{`${new Date(cart.startDate).toLocaleDateString()}-${new Date(cart.endDate).toLocaleDateString()}`}</span></div>
                                <div className="flex mt-5 mb-5 gap-6">
                                    <input type="text" name="discount" id="" placeholder="Discount code or gift card" className="custom-border px-3 py-1 focus:outline-none text-sm" />
                                    <input type="button" value="Apply" className="border p-1 bg-blue-500 rounded-md text-white font-bold cursor-pointer  " />
                                </div>
                                <div>
                                    <div className="font-bold text-lg">Total:{`R ${product.price}`}</div>
                                </div>
                            </div>
                        </div>
                    </div>



                </>
                :
                navigate("/cart")
            }
        </>
    )
}

export default Checkout;
