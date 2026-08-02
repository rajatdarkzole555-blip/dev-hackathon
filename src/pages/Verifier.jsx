import { useState } from "react";
import BadgeCard from "../components/BadgeCard";
import { mockBadges } from "../mockBadges";

export default function Verifier() {
  const [inputAddress, setInputAddress] = useState("");
  const [checkedAddress, setCheckedAddress] = useState(null);

  const handleCheck = () => {
    setCheckedAddress(inputAddress);
    // TODO: replace with real contract read using checkedAddress
  };

  const badges = checkedAddress ? mockBadges : [];

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

      {checkedAddress && (
        badges.length === 0 ? (
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