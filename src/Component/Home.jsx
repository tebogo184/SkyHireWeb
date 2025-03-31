import { useEffect, useState } from "react";
import CatalogCard from "./CatalogCard";


function Home(){

    const [products,setProducts]=useState([]);

    useEffect(()=>{
        
        if(!sessionStorage.getItem('products')){
            
       
        fetch(`http://localhost:8080/getAllProducts`)
        .then(response=>{
            if(!response.ok)
                throw new Error("Failed to fetch product");
            return response.json();
        })
        .then(data=>{
            setProducts(data);
            sessionStorage.setItem('products',JSON.stringify(data));

        })
        .catch(error=>{
            console.log(error);
        })

        }else{

            const savedProducts=JSON.parse(sessionStorage.getItem('products'));
            setProducts(savedProducts);
        }

    },[]); 
    return (
        <>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center mt-32">

            {products&&
            

            products.map((product)=>{

                return(
                
                <CatalogCard key={product.productID} product={product}/>
                
                );
                 
            
            })
            }
        </div>
        </>
    );
}

export default Home;