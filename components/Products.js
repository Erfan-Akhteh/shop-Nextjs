import React from 'react'
import Product from './Product'
import styles from '../styles/Product.module.css'

const Products = ({products}) => {

    return (
       <div className={`grid grid-cols-4 gap-4  ${styles.continer}`}>
        {
            products.map(product=><Product key={product.id} product={product}/>)
        }
       </div>
  )
}

export default Products