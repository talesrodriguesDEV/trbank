import React, { useEffect, useState } from 'react'
import TransactionsTable from '../components/TransactionsTable';

interface IClient {
  _id: string,
  fullName: string,
  CPF: string,
  password: string,
  balance: number,
}

export default function Client() {
  const [clients, setClients] = useState([]);
  const [name, setName] = useState('');
  const [balance, setBalance] = useState(0);
  const [debitTransactions, setDebitTransactions] = useState([]);
  const [creditTransactions, setCreditTransactions] = useState([]);
  const [transactions, setTransactions] = useState(false);
  const [value, setValue] = useState(0);
  const [clientId, setClientId] = useState('');
  const [token, setToken] = useState('');
  const [receiverInput, setReceiverInput] = useState(false);
  const [receiverCPF, setReceiverCPF] = useState('');

  useEffect(() => {
    const cpf = localStorage.getItem('cpf');
    const localToken = localStorage.getItem('token');
    setToken(localToken as string);

    fetch('http://localhost:3001/clients').then(response => response.json()).then(json => {
      setClients(json);

      const loggedClient: IClient = json.find(({ CPF }: { CPF: string }) => CPF === cpf);
      setName(loggedClient.fullName);
      setBalance(loggedClient.balance);
      setClientId(loggedClient._id);

      fetch(`http://localhost:3001/transactions/${loggedClient._id}/debit`,
        {
          headers: { 'Authorization': localToken as string },
        }).then(response => response.json()).then(json => setDebitTransactions(json));

      fetch(`http://localhost:3001/transactions/${loggedClient._id}/credit`,
        {
          headers: { 'Authorization': localToken as string },
        }).then(response => response.json()).then(json => setCreditTransactions(json));
    });
  }, []);

  const handleSoloTransaction = (withdraw: boolean) => {
    const newBalance = withdraw ? balance - value : balance + value;

    fetch(`http://localhost:3001/clients/update/${clientId}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ balance: newBalance }),
      });

    setBalance(newBalance);
  };

  const grantMoney = () => {
    const receiverId = (clients.find(({ CPF }) => CPF === receiverCPF) || { _id: '1' })._id;

    fetch('http://localhost:3001/transactions/new',
      {
        method: 'POST',
        headers: { 'Authorization': token as string, 'Content-Type': 'application/json' },
        body: JSON.stringify({ value, receiver: receiverId, donor: clientId }),
      }).then(response => response.json()).then(json => window.alert(json.message));

    window.location.reload();
  };

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
      setReceiverCPF(cpf);
    }
  }

  return (
    <div className='text-3xl px-4 flex flex-col'>
      <h1 className='text-4xl mt-4'>Olá, {name}!</h1>
      <div>Saldo: <span className='text-amber-700'>R$ {balance.toFixed(2)}</span></div>
      <div className='border my-3 py-3 px-2 rounded-lg border-white text-center'>
        <label className='text-2xl'>Escolha o valor de sua próxima transação: </label>
        <input className='input mb-0' onChange={({ target }) => setValue(Number(target.value))} type='number' min={1} />
      </div>
      <button className='button' onClick={() => handleSoloTransaction(true)}>Sacar</button>
      <button className='button' onClick={() => handleSoloTransaction(false)}>Depositar</button>
      <button className='button' onClick={() => setReceiverInput(!receiverInput)}>Transferir</button>
      {receiverInput && (
        <div className='border flex flex-col mt-3 mb-1 py-2 px-2 rounded-lg'>
          <input type='number' placeholder='Pessoa Recebedora' className='input mb-0 placeholder-amber-700 placeholder-opacity-60' id="receiverCPF" onChange={handleCPF} />
          <button className='button' onClick={grantMoney}>Confirmar</button>
        </div>
      )}
      <button className='button' onClick={() => setTransactions(!transactions)}>Transações</button>
      {transactions && (
        <div className='flex flex-col'>
          <TransactionsTable title={'Débito'} otherPerson={'Receb.'} transactions={debitTransactions} debit />
          <TransactionsTable title={'Crédito'} otherPerson={'Doadora'} transactions={creditTransactions} debit={false} />
        </div>
      )}
    </div>
  );
}
