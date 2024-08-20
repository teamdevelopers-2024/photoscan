import { useState } from 'react'
import './App.css'
import Header from './Header/Header'
import Footer from './Footer/footer'
import CarouselHome from './components/Carousel/CarouselHome'

import OnlinePurchase from './components/onlinePurchase/OnlinePurchase'
import Login from './Login/Login'
import Register from './Register/Register'
import Layoutroutes from './routes/Layoutroutes'

function App() {

  return (
    <>

    <Layoutroutes />

    </>
  )
}

export default App
