import { useState } from 'react'
import './App.css'
import Layoutroutes from './routes/Layoutroutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Layoutroutes/>
    </>
  )
}

export default App
