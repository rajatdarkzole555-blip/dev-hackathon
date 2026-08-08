import { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../contract';

function isValidAddress(address) {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

function IssueForm() {
  const { isConnected } = useAccount();

  const [studentAddress, setStudentAddress] = useState('');
  const [badgeName, setBadgeName] = useState('');
  const [issuerName, setIssuerName] = useState('');
  const [addressError, setAddressError] = useState('');

  const { writeContract, data: hash, isPending, error: writeError } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const isFormComplete =
    studentAddress.trim() !== '' && badgeName.trim() !== '' && issuerName.trim() !== '';

  const handleAddressChange = (e) => {
    const value = e.target.value;
    setStudentAddress(value);

    if (value.trim() === '') {
      setAddressError('');
    } else if (!isValidAddress(value.trim())) {
      setAddressError("This doesn't look like a valid Ethereum address (should be 0x followed by 40 characters)");
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

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'issueBadge',
      args: [studentAddress.trim(), badgeName.trim(), issuerName.trim()],
    });
  };

  useEffect(() => {
    if (isConfirmed) {
      setStudentAddress('');
      setBadgeName('');
      setIssuerName('');
    }
  }, [isConfirmed]);

  const isBusy = isPending || isConfirming;

  if (!isConnected) {
    return (
      <div>
        <h2 className="page-title">Issue a Badge</h2>
        <p className="empty-state">Please connect your wallet to issue a badge.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="page-title">Issue a Badge</h2>

      <div className="form-wrap">
        <div className="form-shadow"></div>
        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Student Wallet Address</label>
              <input
                type="text"
                className="verify-input"
                value={studentAddress}
                onChange={handleAddressChange}
                placeholder="0x..."
                style={addressError ? { borderColor: '#e5484d' } : undefined}
                required
              />
              {addressError && <p className="empty-state" style={{ color: '#e5484d', padding: '6px 0' }}>{addressError}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Badge Name</label>
              <input
                type="text"
                className="verify-input"
                value={badgeName}
                onChange={(e) => setBadgeName(e.target.value)}
                placeholder="e.g. Hackathon Winner"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Issuer Name</label>
              <input
                type="text"
                className="verify-input"
                value={issuerName}
                onChange={(e) => setIssuerName(e.target.value)}
                placeholder="e.g. Blockchain Society"
                required
              />
            </div>

            <button
              type="submit"
              className="verify-btn form-submit"
              disabled={!isFormComplete || isBusy}
              style={{ opacity: !isFormComplete || isBusy ? 0.6 : 1, cursor: !isFormComplete || isBusy ? 'not-allowed' : 'pointer' }}
            >
              {isPending ? 'Confirm in wallet...' : isConfirming ? 'Issuing...' : 'Issue Badge'}
            </button>

            {isConfirmed && (
              <p className="empty-state" style={{ color: '#1a7f37', fontWeight: 600, padding: '10px 0 0' }}>
                ✅ Badge issued successfully!
              </p>
            )}

            {writeError && (
              <p className="empty-state" style={{ color: '#e5484d', padding: '10px 0 0' }}>
                {writeError.message?.includes('gas limit too high') || writeError.message?.includes('reverted')
                  ? 'This wallet is not an approved issuer, so it cannot issue badges.'
                  : writeError.shortMessage || 'Something went wrong. Please try again.'}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default IssueForm;