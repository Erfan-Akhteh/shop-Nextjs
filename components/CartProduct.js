import React, { useContext } from 'react'

import { CartContext } from '@/context/CartContextProvider'
import { shorten } from '@/helper/functions';
import trash from '../assets/icons/trash.svg';
import Image from 'next/image';

const CartProduct = (props) => {
    const {dispatch}=useContext(CartContext)

    const {image, title, price, quantity} = props.data;

  return (
    <div> <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
    <img src={image} alt="product-image" className="w-full rounded-lg sm:w-40" />
    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
      <div className="mt-5 sm:mt-0">
        <h2 className="text-lg font-bold text-gray-900">{shorten(title)}</h2>
        <p className="mt-1 text-xs text-gray-700">36EU - 4US</p>
      </div>
      <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
        <div className="flex items-center border-gray-100">
            {
                quantity>1? <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => dispatch({type: "DECREASE", payload: props.data})}> - </span>:
                <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => dispatch({type: "REMOVE_ITEM", payload: props.data})} ><Image src={trash} alt='trash'/></span>

            }
         
          <input  className="h-8 w-8 border bg-white text-center text-xs outline-none" type="text" value={quantity} min="1" />
          <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => dispatch({type: "INCREASE", payload: props.data})}> + </span>
        </div>
        <div className="flex items-center space-x-4">
          <p className="text-sm">{price}</p>
       
        </div>
      </div>
    </div>
  </div></div>
  )
}

export default CartProduct