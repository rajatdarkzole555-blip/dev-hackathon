import { useState } from 'react';
import { useAccount } from 'wagmi';

function IssueForm() {
  const { isConnected } = useAccount();

  const [studentAddress, setStudentAddress] = useState('');
  const [badgeName, setBadgeName] = useState('');
  const [issuerName, setIssuerName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Issuing badge:', { studentAddress, badgeName, issuerName });
    // TODO: replace this with real contract call once contract is ready
    alert(`Badge "${badgeName}" would be issued to ${studentAddress}`);
  };

  if (!isConnected) {
    return <p>Please connect your wallet to issue a badge.</p>;
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
      <div style={{ marginBottom: '1rem' }}>
        <label>Student Wallet Address</label><br />
        <input
          type="text"
          value={studentAddress}
          onChange={(e) => setStudentAddress(e.target.value)}
          placeholder="0x..."
          style={{ width: '100%', padding: '0.5rem' }}
          required
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Badge Name</label><br />
        <input
          type="text"
          value={badgeName}
          onChange={(e) => setBadgeName(e.target.value)}
          placeholder="e.g. Hackathon Winner"
          style={{ width: '100%', padding: '0.5rem' }}
          required
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Issuer Name</label><br />
        <input
          type="text"
          value={issuerName}
          onChange={(e) => setIssuerName(e.target.value)}
          placeholder="e.g. Blockchain Society"
          style={{ width: '100%', padding: '0.5rem' }}
          required
        />
      </div>

      <button type="submit" style={{ padding: '0.5rem 1rem' }}>
        Issue Badge
      </button>
    </form>
  );
}

export default IssueForm;