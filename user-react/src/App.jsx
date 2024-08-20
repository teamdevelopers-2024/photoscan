import { useState } from 'react'
import './App.css'
import Header from './Header/Header'
import Footer from './Footer/footer'
import CarouselHome from './components/Carousel/CarouselHome'
import OnlinePurchase from './components/onlinePurchase/OnlinePurchase'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <CarouselHome />
      <OnlinePurchase/>
      <Footer/>
    </>
  )
}

export default App
