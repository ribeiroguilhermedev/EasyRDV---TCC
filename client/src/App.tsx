import { useState } from 'react'
import GlobalStyle from './styles/global'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>App</div>
      <GlobalStyle/>
    </div>
  )
}

export default App
