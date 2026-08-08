function formatDate(timestamp) {
  if (!timestamp) return '';
  const date = new Date(Number(timestamp) * 1000);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function shortenAddress(address) {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default function BadgeCard({ badge, index }) {
  const { badgeName, issuerName, issuer, issuedAt } = badge;

  return (
    <div className="sticker-wrap">
      <div className="sticker-shadow"></div>
      <div className="sticker-card">
        <div className="sticker-seal">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="sticker-issuer">{issuerName}</p>
        <h3 className="sticker-title">{badgeName}</h3>
        <p className="sticker-date">{formatDate(issuedAt)}</p>
        <p className="sticker-desc">Issuer wallet: {shortenAddress(issuer)}</p>
      </div>
    </div>
  );
}