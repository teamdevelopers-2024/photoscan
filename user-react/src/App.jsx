import { useState } from 'react'
import './App.css'
import Header from './Header/Header'
import Footer from './Footer/footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Footer/>
    </>
  )
}

export default App
