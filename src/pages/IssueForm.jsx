import { useState } from 'react';
import { useAccount } from 'wagmi';

function isValidAddress(address) {
  // Basic Ethereum address check: starts with 0x, followed by 40 hex characters
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

function IssueForm() {
  const { isConnected } = useAccount();

  const [studentAddress, setStudentAddress] = useState('');
  const [badgeName, setBadgeName] = useState('');
  const [issuerName, setIssuerName] = useState('');
  const [addressError, setAddressError] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | success

  const isFormComplete =
    studentAddress.trim() !== '' &&
    badgeName.trim() !== '' &&
    issuerName.trim() !== '';

  const handleAddressChange = (e) => {
    const value = e.target.value;
    setStudentAddress(value);

    if (value.trim() === '') {
      setAddressError('');
    } else if (!isValidAddress(value.trim())) {
      setAddressError('This doesn\'t look like a valid Ethereum address (should be 0x followed by 40 characters)');
    } else {
      setAddressError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidAddress(studentAddress.trim())) {
      setAddressError('Please enter a valid Ethereum address before submitting');
      return;
    }

    setStatus('submitting');
    console.log('Issuing badge:', { studentAddress, badgeName, issuerName });

    // TODO: replace this simulated delay with a real contract call
    // once the contract address + ABI are available (useWriteContract)
    setTimeout(() => {
      setStatus('success');
      setStudentAddress('');
      setBadgeName('');
      setIssuerName('');

      // reset the success message after a few seconds
      setTimeout(() => setStatus('idle'), 3000);
    }, 1200);
  };

  if (!isConnected) {
    return (
      <div style={styles.container}>
        <p style={styles.notice}>Please connect your wallet to issue a badge.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label style={styles.label}>Student Wallet Address</label>
          <input
            type="text"
            value={studentAddress}
            onChange={handleAddressChange}
            placeholder="0x..."
            style={{
              ...styles.input,
              borderColor: addressError ? '#e5484d' : '#ccc',
            }}
            required
          />
          {addressError && <p style={styles.errorText}>{addressError}</p>}
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Badge Name</label>
          <input
            type="text"
            value={badgeName}
            onChange={(e) => setBadgeName(e.target.value)}
            placeholder="e.g. Hackathon Winner"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Issuer Name</label>
          <input
            type="text"
            value={issuerName}
            onChange={(e) => setIssuerName(e.target.value)}
            placeholder="e.g. Blockchain Society"
            style={styles.input}
            required
          />
        </div>

        <button
          type="submit"
          disabled={!isFormComplete || status === 'submitting'}
          style={{
            ...styles.button,
            opacity: !isFormComplete || status === 'submitting' ? 0.6 : 1,
            cursor: !isFormComplete || status === 'submitting' ? 'not-allowed' : 'pointer',
          }}
        >
          {status === 'submitting' ? 'Issuing...' : 'Issue Badge'}
        </button>

        {status === 'success' && (
          <p style={styles.successText}>✅ Badge issued successfully!</p>
        )}
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
  },
  notice: {
    color: '#555',
  },
  form: {
    maxWidth: '480px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  field: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.35rem',
    fontWeight: 600,
    fontSize: '0.9rem',
  },
  input: {
    width: '100%',
    padding: '0.6rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '0.95rem',
    boxSizing: 'border-box',
  },
  errorText: {
    color: '#e5484d',
    fontSize: '0.8rem',
    marginTop: '0.3rem',
  },
  successText: {
    color: '#1a7f37',
    fontWeight: 600,
    marginTop: '0.8rem',
  },
  button: {
    padding: '0.7rem 1.4rem',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#5c67f2',
    color: 'white',
    fontWeight: 600,
    fontSize: '0.95rem',
    marginTop: '0.5rem',
  },
};

export default IssueForm;