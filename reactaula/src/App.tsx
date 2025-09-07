import { useState } from 'react'
import './App.css'

function App() {
  const [signed, setSigned] = useState(false);

  return (
    <div>
       <button onClick={ () => setSigned(true)}>Entrar</button>
      

      {signed && (
        <div>
          <h1>Bem vindo Cesar Augusto</h1>
          <p>Usuario online!</p>
          <button onClick={ () => setSigned(false) }>Sair</button>
        </div>
      ) }
    </div>
  )
}

export default App
