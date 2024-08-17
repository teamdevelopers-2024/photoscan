import { useState } from 'react'
import './App.css'
import Layoutroutes from './routes/Layoutroutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="main-page">
    <Layoutroutes/>
    </div>
      
    </>
  )
}

export default App




