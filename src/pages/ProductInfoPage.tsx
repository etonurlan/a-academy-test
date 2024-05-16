import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import { getSizes } from "../services/api";
import CircleSvg from "../img/circle-solid.svg?react"
import { Color, Size } from "../models/model";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/features/basketSlice";

export const ProductInfoPage = () => {
    const [imgNumber, setImgNumber] = useState(0)
    const [colorNumber, setColorNumber] = useState(0)
    const [sizeNumber, setSizeNumber] = useState<Size | null>(null)
    const [sizes, setSizes] = useState<Size[] | null>(null)

    let { state } = useLocation()

    const dispatch = useDispatch()

    useEffect(() => {
        getSizes()
            .then((sizesData) => {
                const sizesArray: Size[] = sizesData as Size[]; 
                setSizes(sizesArray);
            })
            .catch((error) => {
                console.error('Error getting products:', error);
            });
    }, []);


    return (
        <div className="flex items-center justify-center">
            <div className="flex items-center justify-center flex-col w-[50%]">
                <h2 className="text-[32px] font-semibold mb-2">
                    {state.name}
                </h2>
                <img className="max-w-[40%] max-h-[40%] mb-2"
                src={state.colors[colorNumber].images[imgNumber]} 
                alt={state.colors[colorNumber].name} />
                <div className="flex">
                    <CircleSvg onClick={() => setImgNumber(0)} 
                    className={`w-4 h-4 mr-2 cursor-pointer
                    ${imgNumber == 1 && 'fill-slate-200'}`} />
                    <CircleSvg onClick={() => setImgNumber(1)} 
                    className={`w-4 h-4 cursor-pointer
                    ${imgNumber == 0 && 'fill-slate-200'}`} />
                </div>
            </div>
            <div className="w-[50%]">
                <div className="flex mb-4">
                    {state.colors.map((color: Color, index: number) => (
                        <img onClick={() => {
                            setSizeNumber(null)
                            setColorNumber(index)
                        }} 
                        className="max-w-[10%] mr-2 last:mr-0 cursor-pointer" 
                        src={color.images[0]} alt={color.name} />
                    ))}
                </div>
                <div className="flex mb-8">
                    {sizes?.map((size, index) => {
                        const availableSizes = state.colors[colorNumber].sizes;
                        
                        return (
                            <button onClick={() => setSizeNumber(size)}
                            disabled={!availableSizes.includes(index+1)} 
                            className="mr-4 last:mr-0">
                                <h4 className={`font-medium text-[20px]
                                p-1 bg-slate-400 rounded-lg
                                ${availableSizes.includes(index+1) 
                                ? (sizeNumber?.id == (index+1) 
                                    ? 'bg-amber-300' 
                                    : 'bg-slate-600 text-white hover:bg-amber-200') 
                                : 'bg-slate-400'}`}>
                                    {size.label}
                                </h4> 
                            </button>
                        );
                    })}
                </div>
                <button onClick={() => dispatch(addProduct(
                    {
                        type: {
                            name: state.name,
                            id: state.id
                        },
                        product: state.colors[colorNumber],
                        size: sizeNumber
                    }
                ))} 
                disabled={sizeNumber == null} 
                className="font-semibold text-[36px] bg-white px-4
                rounded-lg hover:bg-red-500 disabled:bg-gray-400">
                    {state.colors[colorNumber].price}
                </button>
            </div>
        </div>
    )
}