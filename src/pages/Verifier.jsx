import { useState } from 'react';
import { useReadContract } from 'wagmi';
import BadgeCard from '../components/BadgeCard';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../contract';

function isValidAddress(address) {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export default function Verifier() {
  const [inputAddress, setInputAddress] = useState('');
  const [checkedAddress, setCheckedAddress] = useState(null);
  const [inputError, setInputError] = useState('');

  const { data: badges, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getBadges',
    args: [checkedAddress],
    query: {
      enabled: !!checkedAddress && isValidAddress(checkedAddress),
    },
  });

  const handleCheck = () => {
    if (!isValidAddress(inputAddress.trim())) {
      setInputError('Please enter a valid Ethereum address (0x followed by 40 characters)');
      return;
    }
    setInputError('');
    setCheckedAddress(inputAddress.trim());
  };

  return (
    <div>
      <h2 className="page-title">Verify a badge holder</h2>
      <div className="verify-row">
        <input
          className="verify-input"
          value={inputAddress}
          onChange={(e) => setInputAddress(e.target.value)}
          placeholder="0x..."
        />
        <button className="verify-btn" onClick={handleCheck}>Check</button>
      </div>

      {inputError && <p className="empty-state">{inputError}</p>}

      {checkedAddress && !inputError && (
        isLoading ? (
          <p className="empty-state">Checking...</p>
        ) : error ? (
          <p className="empty-state">Error: {error.shortMessage || error.message}</p>
        ) : !badges || badges.length === 0 ? (
          <p className="empty-state">No badges found for this address.</p>
        ) : (
          <div className="badge-grid">
            {badges.map((b, i) => <BadgeCard key={i} badge={b} index={i} />)}
          </div>
        )
      )}
    </div>
  );
}