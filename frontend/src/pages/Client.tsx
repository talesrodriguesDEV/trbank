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
    const receiverId = (clients.find(({ CPF }) => CPF === receiverCPF) || { _id: '' })._id;

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
    <>
      <h1>Olá, {name}</h1>
      <div>Saldo: R$ {balance.toFixed(2)}</div>
      <input onChange={({ target }) => setValue(Number(target.value))} type='number' min={1} />
      <button onClick={() => handleSoloTransaction(true)}>Sacar</button>
      <button onClick={() => handleSoloTransaction(false)}>Depositar</button>
      <button onClick={() => setReceiverInput(!receiverInput)}>Transferir</button>
      {receiverInput && (
        <div>
          <input id="receiverCPF" onChange={handleCPF} />
          <button onClick={grantMoney}>Confirmar</button>
        </div>
      )}
      <button onClick={() => setTransactions(!transactions)}>Exibir transações</button>
      {transactions && (
        <div>
          <TransactionsTable title={'Débito'} otherPerson={'Pessoa Recebedora'} transactions={debitTransactions} />
          <TransactionsTable title={'Cŕedito'} otherPerson={'Pessoa Doadora'} transactions={creditTransactions} />
        </div>
      )}
    </>
  );
}
