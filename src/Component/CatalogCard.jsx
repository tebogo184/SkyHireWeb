import { Link } from "react-router-dom";


function CatalogCard({product}){


    return(
    <>
    <Link to={`/aboutProduct?id=${product.productID}`}>
    <div className="border-2 shadow-xl ">
        <div className="flex flex-col justify-center items-center p-4">
            <img className="object-cover w-48 h-44" src={`/products/${product.imgSrc}`} alt={`${product.name}`} />
            <div className="mt-4 text-sm">{product.name}</div>
            <div className="mt-4 font-bold text-md">{`R ${product.price}/7 days`}</div>
        </div>
    </div>
    </Link>
    </>)
}

export default CatalogCard;