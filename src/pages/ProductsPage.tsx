import { getProducts } from "../services/api.ts"
import { useState, useEffect } from "react";
import { Product } from "../models/model.ts";
import { Link } from "react-router-dom";

export const ProductsPage = () => {
    const [products, setProducts] = useState<Product[] | null>(null)

    useEffect(() => {
        getProducts()
            .then((productsData) => {
                const productsArray: Product[] = productsData as Product[]; 
                setProducts(productsArray);
            })
            .catch((error) => {
                console.error('Error getting products:', error);
            });
    }, []);

    return (
        <div className="flex gap-4">
            {products?.map((product, index) => (
                <Link to="/product" state={product} 
                className="max-w-[20%] max-h-[40%]">
                    <img src={product.colors[index].images[0]} alt={product.name} />
                    <h3>{product.name}</h3>
                </Link>
            ))}
        </div>
    )
}