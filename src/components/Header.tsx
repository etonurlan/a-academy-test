import { Link } from "react-router-dom"
import BasketSvg from "../img/basket-shopping-solid.svg?react"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

export const Header = () => {
    const basketProducts = useSelector((state: RootState) => state.basket)

    return (
        <header className="flex py-4 mb-3">
            <Link to="/" 
            className="font-bold text-[40px] mr-auto">
                SHOP
            </Link>
            <Link to="/basket" 
            className="w-8 relative">
                <BasketSvg className="w-8" />
                {basketProducts.length > 0 && (
                    <span className="absolute top-[-5px] right-[-5px] px-[6px]
                    bg-green-600 rounded-full">
                        {basketProducts.length}
                    </span>
                )}
            </Link>
        </header>
    )
}