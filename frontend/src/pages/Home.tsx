import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <h1>Seja bem-vinda(o) ao TR Bank!</h1>
      <p>Já tem uma conta?</p>
      <Link to={'/login'}>Entrar</Link>
      <p>Ainda não?</p>
      <Link to={'/signin'}>Criar conta</Link>
    </>
  )
}
