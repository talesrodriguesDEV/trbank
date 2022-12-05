import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import BankProvider from './context/BankProvider';
import Client from './pages/Client';
import Home from './pages/Home';
import Login from './pages/Login';
import Signin from './pages/Signin';

function App() {
  return (
    <BankProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/login' element={<Login />} />
          <Route path='/client' element={<Client />} />
        </Routes>
      </BrowserRouter>
    </BankProvider>
  );
}

export default App;
