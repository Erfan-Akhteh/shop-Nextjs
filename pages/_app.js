import Layout from '@/components/Layout'
import Nav from '@/components/Nav'
import '@/styles/globals.css'
import CartContextProvider from '@/context/CartContextProvider'
import Aos from 'aos'
import "aos/dist/aos.css";
import { useEffect } from 'react'
import Footer from '@/components/Footer'


export default function App({ Component, pageProps }) {
  useEffect(() => {
    Aos.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, []);
  return (


      <CartContextProvider>
      <Nav/>
      <Layout>
      <Component {...pageProps} />
      </Layout>
      <Footer/>
      </CartContextProvider>
      
   
  )
}
