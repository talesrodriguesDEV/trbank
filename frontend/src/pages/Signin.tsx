import React, { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signin() {
  const [fullName, setName] = useState('');
  const [CPF, setCPF] = useState('');
  const [password, setPassword] = useState('');
  const [balance, setBalance] = useState(0);

  const navigate = useNavigate();

  const addNewClient = (e: FormEvent) => {
    e.preventDefault();

    fetch('http://localhost:3001/clients/new',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, CPF, password, balance }),
      });

    navigate('/');
  }

  const handleCPF = ({ target }: { target: HTMLInputElement }) => {
    if (target.value.length === 11) {
      target.type = 'text';

      const cpf = target.value.split('').reduce((string, character, index) => {
        if (index === 2 || index === 5) return string + `${character}.`
        if (index === 8) return string + `${character}-`
        return string + character;
      }, '');

      target.value = cpf;
      target.disabled = true;
      setCPF(cpf);
    }
  }

  return (
    <form className='flex flex-col justify-center' onSubmit={addNewClient}>
      <label>
        Nome completo:
      </label>
      <input onChange={({ target }) => setName(target.value)} required minLength={10} />
      <label>
        CPF:
      </label>
      <input onChange={handleCPF} type='number' maxLength={11} />
      <label>
        Senha:
      </label>
      <input onChange={({ target }) => setPassword(target.value)} type='password' minLength={5} />
      <label>
        Depósito inicial (min R$ 100,00):
      </label>
      <input onChange={({ target }) => setBalance(Number(target.value))} type='number' min="100" />
      <button type='submit'>Finalizar</button>
    </form>
  )
}
