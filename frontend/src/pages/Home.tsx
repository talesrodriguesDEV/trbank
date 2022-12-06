import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <p>Já tem uma conta?</p>
      <Link className='button' to={'/login'}>Entrar</Link>
      <br />
      <p>Ainda não?</p>
      <Link className='button' to={'/signin'}>Criar conta</Link>
    </>
  )
}
