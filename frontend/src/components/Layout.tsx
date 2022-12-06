import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const headerCSS = location.pathname !== '/client' ? 'py-10 border-b border-white w-full text-center' : 'py-3 border-b border-white w-full text-center';

  return (
    <div className='min-h-screen flex flex-col justify-between items-center bg-amber-500 text-white font-bold text-4xl'>
      <header className={headerCSS}>
        <h1 className='text-8xl'>TR Bank</h1>
        {location.pathname !== '/' && <Link to='/'>Voltar à Home</Link>}
      </header>
      <div className='w-full flex flex-col items-center'>{children}</div>
      <footer className='py-2 border-t border-white w-full text-center'>
        Tales Rodrigues DEV
      </footer>
    </div>
  )
}
