import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Dashboard from './pages/Dashboard';
import Verifier from './pages/Verifier';
import IssueForm from './pages/IssueForm';
import './App.css';

function App() {
  const [view, setView] = useState('dashboard');

  return (
    <div className="page">
      <div style={{ padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Proof of You</h1>
        <ConnectButton />
      </div>

      <nav className="nav">
        <button
          className={`nav-tab ${view === 'dashboard' ? 'active' : ''}`}
          onClick={() => setView('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`nav-tab ${view === 'verifier' ? 'active' : ''}`}
          onClick={() => setView('verifier')}
        >
          Verifier
        </button>
        <button
          className={`nav-tab ${view === 'issue' ? 'active' : ''}`}
          onClick={() => setView('issue')}
        >
          Issue Badge
        </button>
      </nav>

      {view === 'dashboard' && <Dashboard />}
      {view === 'verifier' && <Verifier />}
      {view === 'issue' && <IssueForm />}
    </div>
  );
}

export default App;