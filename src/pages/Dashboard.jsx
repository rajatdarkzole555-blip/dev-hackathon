import BadgeCard from "../components/BadgeCard";
import { mockBadges } from "../mockBadges";

export default function Dashboard() {
  const isConnected = true; // TODO: replace with real useAccount() from wagmi
  const address = "0xMockStudentAddress123"; // TODO: replace with real address

  if (!isConnected) return <p className="empty-state">Please connect your wallet to view your badges.</p>;

  const badges = mockBadges;

  return (
    <div>
      <h2 className="page-title">My badges</h2>
      <div className="wallet-line">
        <span className="wallet-dot"></span>
        {address}
      </div>
      {badges.length === 0 ? (
        <p className="empty-state">No badges yet.</p>
      ) : (
        <div className="badge-grid">
          {badges.map((b, i) => <BadgeCard key={i} badge={b} index={i} />)}
        </div>
      )}
    </div>
  );
}