import React, { useContext } from "react";
import styles from "../styles/Product.module.css";
import { CartContext } from "@/context/CartContextProvider";
import trast from "../assets/icons/trash.svg";
import { shorten, isInCart, quantityCount } from "@/helper/functions";
import Link from "next/link";
import Image from "next/image";

const Product = ({ product }) => {
  const { state, dispatch } = useContext(CartContext);
 
  return (
    <div>
      <div
        data-aos="fade-right"
        className={`w-80 ml-4 bg-white shadow rounded mt-20 mb-20 ${styles.card}`}
      >
        <div
          data-aos="fade-right"
          className="h-64 w-full bg-white-200 flex flex-col justify-between p-4 bg-cover bg-center  "
        >
          <img
            suppressHydrationWarning={true}
            className={styles.img}
            src={product.image}
            alt="image"
          />

          <div>
            <span className="uppercase text-xs bg-green-50 p-0.5 border-green-500 border rounded text-green-700 font-medium select-none">
              available
            </span>
          </div>
        </div>
        <div className="p-4 flex flex-col items-center">
          <p className="text-gray-400 font-light text-xs text-center">
            {product.id}
          </p>
          <h1 className="text-gray-800 text-center mt-1">
            {shorten(product.title)}
          </h1>
          <p className="text-center text-gray-800 mt-1">{product.price}$</p>

          <div className="inline-flex items-center mt-2">
            {quantityCount(state, product.id) === 1 && (
              <button
                className="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
                onClick={() =>
                  dispatch({ type: "REMOVE_ITEM", payload: product })
                }
              >
                <Image src={trast} alt="trash" />
              </button>
            )}

            {quantityCount(state, product.id) > 1 && (
              <button
                className="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
                onClick={() => dispatch({ type: "DECREASE", payload: product })}
              >
                -
              </button>
            )}

            {quantityCount(state, product.id) > 0 && (
              <div className="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none">
                {quantityCount(state, product.id)}
              </div>
            )}
            {isInCart(state, product.id) ? (
              <button
                className="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
                onClick={() => dispatch({ type: "INCREASE", payload: product })}
              >
                +
              </button>
            ) : (
              <button
                className={`py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 active:bg-blue-700 disabled:opacity-50 mt-4 w-full flex items-center justify-center ${styles.but} `}
                onClick={() => dispatch({ type: "ADD_ITEM", payload: product })}
              >
                Add to order
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </button>
            )}
          </div>

          <Link
            href="/product/[id]"
            as={`/product/${product.id}`}
            className={`py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 mt-4 w-full flex items-center justify-center ${styles.butt}`}
          >
            <button>Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
