import { Link } from 'react-router-dom'

export function Home(){
  return(
    <div>
      <h1>Bem vindo a página home!</h1>
      <span>Essa é minha primeira pagina com navegaçao</span>
      <br/>

      <Link to="/sobre">Sobre</Link><br/>
      <Link to="/contato">Contatos</Link>
    </div>
  )
}