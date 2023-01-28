// import Head from 'next/head'
// import Image from 'next/image'
// import { Inter } from '@next/font/google'
// import styles from '@/styles/Home.module.css'
import Products from "@/components/Products"


export default function Home({products}) {
  return (
    
    <div >
   
      <Products products={products}/>
   
    </div>
  )
}

export const getStaticProps=async ()=>{
  const response=await fetch(`https://fakestoreapi.com/products`)
  const products=await response.json()

  return{
    props:{
      products
    }
  }
  
}