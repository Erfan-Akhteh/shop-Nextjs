import React, { useReducer, createContext,useEffect, useRef } from "react";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)




const initialState = {
  selectedItems: [],
  itemsCounter: 0,
  total: 0,
  checkout: false,
};

const sumItems = (items) => {
  const itemsCounter = items.reduce(
    (total, product) => total + product.quantity,
    0
  );
  let total = items
    .reduce((total, product) => total + product.price * product.quantity, 0)
    .toFixed(2);
  return { itemsCounter, total };
};


const cartReducer = (state, action) => {
  console.log(action.type);
  switch (action.type) {
    case "ADD_ITEM":
      if (!state.selectedItems.find((item) => item.id === action.payload.id)) {
        state.selectedItems.push({
          ...action.payload,
          quantity: 1,
          
        });
      }
     

      return {
        ...state,
        selectedItems: [...state.selectedItems],
        ...sumItems(state.selectedItems),
        checkout: false,
        ...MySwal.fire({
          title: 'success!',
          text: 'Added successfully',
          icon: 'success',
          confirmButtonText: 'Cool',
          timer: 3000,
          position: 'top-end',
          toast: true,
          showConfirmButton: false,
          timerProgressBar: true,
          didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
      };
    case "REMOVE_ITEM":
      const newSelectedItems = state.selectedItems.filter(
        (item) => item.id !== action.payload.id
      );

      return {
        ...state,
        selectedItems: [...newSelectedItems],
        ...sumItems(newSelectedItems),
        ...MySwal.fire({
          title: 'info!',
          text: 'Deleted successfully',
          icon: 'info',
          confirmButtonText: 'Cool',
          timer: 3000,
          position: 'top-end',
          toast: true,
          showConfirmButton: false,
          timerProgressBar: true,
          didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
      };
    case "INCREASE":
      const indexI = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.selectedItems[indexI].quantity++;

      return {
        ...state,
        ...sumItems(state.selectedItems),
      };
    case "DECREASE":
      const indexD = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.selectedItems[indexD].quantity--;

      return {
        ...state,
        ...sumItems(state.selectedItems),
      };
    case "CHECKOUT":
      return {
        selectedItems: [],
        itemsCounter: 0,
        total: 0,
        checkout: true,
      };
    case "CLEAR":
      return {
        selectedItems: [],
        itemsCounter: 0,
        total: 0,
        checkout: false,
      };
      case "INI":
        return action.payload;
  
    default:
      return state;
  }
};

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
 
  const [state, dispatch] = useReducer(cartReducer, initialState);

  
   useEffect(()=>{
    const rawData=localStorage.getItem('my-cart')
    const data=JSON.parse(rawData)
    dispatch({type:"INI",payload:data})
  
},[]);

const isFirstRender=useRef(true)
useEffect(()=>{
  if (isFirstRender.current === true) {
    isFirstRender.current=false
    return;
    
  }
  localStorage.setItem("my-cart",JSON.stringify(state))
},[state]);
 


 


  return (
    <CartContext.Provider value={{state,dispatch}}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
