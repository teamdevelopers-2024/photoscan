import { useState } from 'react'
import './App.css'
import Header from './Header/Header'
import Footer from './Footer/footer'
import Carousel from './components/Carousel/Carousel'
import OnlinePurchase from './components/onlinePurchase/OnlinePurchase'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Carousel />
      <OnlinePurchase/>
      <Footer/>
    </>
  )
}

export default App
