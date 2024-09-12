import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../redux/store"
import { removeProduct } from "../redux/features/basketSlice"

export const Basket = () => {
    const basketProducts = useSelector((state: RootState) => state.basket)
    const dispatch = useDispatch()

    return (
        <div className="flex items-center justify-center flex-wrap">
            {basketProducts?.map((product, index) => (
                <div key={index} className="flex flex-col max-w-[20%] mr-5
                [&:nth-child(4n)]:mr-0 max-h-[20%]">
                    <img src={product.product.images[0]} alt={product.product.name} />
                    <div className="flex flex-col items-center justify-center">
                        <h4 className="font-semibold text-[36px]">
                            {product.type.name}
                        </h4>
                        <h5 className="text-[24px]">
                            Размер: {product.size.label}
                        </h5>
                        <h5 className="text-[24px]">
                            Цвет: {product.product.name}
                        </h5>
                        <h5 className="text-[24px]">
                            Цена: {product.product.price}
                        </h5>
                    </div>
                    <button onClick={() => dispatch(removeProduct(index))} 
                    className="font-semibold text-[24px] text-red-600">
                        Удалить
                    </button>
                </div>
            ))}
        </div>
    )
}