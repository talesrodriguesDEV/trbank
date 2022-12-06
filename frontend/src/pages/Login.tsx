import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login () {
  const [CPF, setCPF] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

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

  const doLogin = (e: FormEvent) => {
    e.preventDefault();

    fetch('http://localhost:3001/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ CPF, password }),
      }).then(response => response.json()).then(json => {
        if (json.message) window.alert(json.message);
        else {
          localStorage.setItem('token', json.token);
          localStorage.setItem('cpf', CPF);
  
          navigate('/client');
        }
      });
  }

  return (
    <form className='flex flex-col justify-center text-3xl px-2' onSubmit={doLogin}>
      <label>
        CPF:
      </label>
      <input className='input' onChange={handleCPF} type='number' maxLength={11} />
      <label>
        Senha:
      </label>
      <input className='input' onChange={({ target }) => setPassword(target.value)} type='password' minLength={5} />
      <button className='button' type='submit'>Finalizar</button>
    </form>
  )
}
