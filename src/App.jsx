import React, { useState } from 'react';
import './style.css';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [label, setLabel] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleAddTransaction = () => {
    const newTransaction = {
      label,
      amount: parseFloat(amount),
      date: new Date(date)
    };
    setTransactions([...transactions, newTransaction].sort((a, b) => a.date - b.date));
    setLabel('');
    setAmount('');
    setDate('');
    setShowModal(false);
  };

  const total = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalIncome = transactions.filter(t => t.amount > 0).reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalExpense = transactions.filter(t => t.amount < 0).reduce((acc, transaction) => acc + transaction.amount, 0);

  return (
    <div className="app">
      <h1>Gestione Saldo Spese</h1>
      <div className="content">
        <div className="transactions">
          <div className="transactions-header">
            <h2>Riepilogo Movimenti</h2>
            <button className="add-button" onClick={() => setShowModal(true)}>+</button>
          </div>
          <ul>
            {transactions.map((transaction, index) => (
              <li key={index}>
                {transaction.label} {transaction.amount}€ {transaction.date.toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>

        <div className="totals">
          <h3>Totale Movimenti: {total}€</h3>
          <h4>Totale Entrate: {totalIncome}€</h4>
          <h4>Totale Uscite: {totalExpense}€</h4>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Aggiungi</h2>
            <h4>Etichette</h4>
            <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} />
            <h4>Importo</h4>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <h4>Data</h4>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <button onClick={handleAddTransaction}>Aggiungi</button>
            <button onClick={() => setShowModal(false)}>Chiudi</button> {/* Aggiungiamo il pulsante Chiudi */}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;







