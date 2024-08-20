import { useState } from 'react'
import './App.css'
import Header from './Header/Header'
import Footer from './Footer/footer'
import OnlinePurchase from './components/onlinePurchase/OnlinePurchase'
import Login from './Login/Login'
import Register from './Register/Register'
import Layoutroutes from './routes/Layoutroutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Layoutroutes />
    </>
  )
}

export default App
