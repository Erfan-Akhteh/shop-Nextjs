import React, { useContext } from 'react'
import styles from '../styles/Nav.module.css'
import Link from 'next/link';
import shop from '../assets/icons/shop.svg'
import Image from 'next/image';
import {CartContext} from '../context/CartContextProvider';
import Type from "../components/Type"
const Nav = () => {
const {state}=useContext(CartContext)
  return (
    <div>
    <nav className={styles.nav}>
        <ul>
            <li>
                <Link href='/'>Home</Link>
            </li>
            <li>
                <Link href='/about'>About</Link>
            </li>
            <li>
              
            </li>
            
        </ul>
        <div className={styles.type}>
          <Type/>
        </div>
                   <div className={styles.iconContainer}>
                   <Link href='/cart'> <Image src={shop} alt='shop' /></Link>
                    <span>{state.itemsCounter}</span>
                </div>
        

    </nav>
    </div>
  )
}

export default Nav