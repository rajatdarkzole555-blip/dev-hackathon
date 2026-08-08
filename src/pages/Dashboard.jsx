import { useAccount, useReadContract } from 'wagmi';
import BadgeCard from '../components/BadgeCard';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../contract';

export default function Dashboard() {
  const { address, isConnected } = useAccount();

  const { data: badges, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getBadges',
    args: [address],
    query: {
      enabled: !!address, // only run this when a wallet is actually connected
    },
  });

  if (!isConnected) {
    return <p className="empty-state">Please connect your wallet to view your badges.</p>;
  }

  if (isLoading) {
    return <p className="empty-state">Loading badges...</p>;
  }

  if (error) {
    return <p className="empty-state">Error loading badges: {error.shortMessage || error.message}</p>;
  }

  return (
    <div>
      <h2 className="page-title">My badges</h2>
      <div className="wallet-line">
        <span className="wallet-dot"></span>
        {address}
      </div>
      {!badges || badges.length === 0 ? (
        <p className="empty-state">No badges yet.</p>
      ) : (
        <div className="badge-grid">
          {badges.map((b, i) => <BadgeCard key={i} badge={b} index={i} />)}
        </div>
      )}
    </div>
  );
}