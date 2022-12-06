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

export default function TransactionsTable({ title, otherPerson, transactions, debit }: { title: string, otherPerson: string, transactions: Transaction[], debit: boolean }) {
  return (
    <table className='border border-white my-4'>
      <caption className='text-4xl mb-1'>{title}</caption>
      <thead className='border-b-2 border-white'>
        <tr>
          <th>{otherPerson}</th>
          <th className='px-4'>Valor</th>
          <th>Data/Hora</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(({ value, date, receiver, donor }, index) => {
          const formattedDate = new Date(date);

          return (
            <tr className='border-b border-white' key={index}>
              <td className='text-center'>{debit ? receiver.fullName : donor.fullName}</td>
              <td className='text-center border border-white px-4'>
                <span className='text-amber-700'>{`R$ ${value.toFixed(2)}`}</span>
              </td>
              <td className='text-center'>{formattedDate.toLocaleString('pt-BR')}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  )
}
