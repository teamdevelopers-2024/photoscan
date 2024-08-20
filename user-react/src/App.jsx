import { useState } from 'react'
import './App.css'
import Header from './Header/Header'
import Footer from './Footer/footer'
import OnlinePurchase from './components/onlinePurchase/OnlinePurchase'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <OnlinePurchase/>
      <Footer/>
    </>
  )
}

export default App
