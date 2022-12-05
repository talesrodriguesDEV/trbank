import React from 'react'

interface Transaction {
  _id: string,
  value: number,
  receiver: {
    _id: string,
    fullName: string,
  }
  donor: {
    _id: string,
    fullName: string,
  },
  date: Date,
}

export default function TransactionsTable({ title, otherPerson, transactions }: { title: string, otherPerson: string, transactions: Transaction[] }) {
  return (
    <table>
      <caption>{title}</caption>
      <thead>
        <tr>
          <th>{otherPerson}</th>
          <th>Valor</th>
          <th>Data/Hora</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(({ value, date }, index) => {
          const formattedDate = new Date(date);

          return (
            <tr key={index}>
              <td>{otherPerson}</td>
              <td>{`R$ ${value.toFixed(2)}`}</td>
              <td>{formattedDate.toLocaleString('pt-BR')}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  )
}
