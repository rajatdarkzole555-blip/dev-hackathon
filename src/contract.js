export const CONTRACT_ADDRESS = '0xF84D2Cd7a7f8B615bB59f5dAe8C3B3a0A6475E57';

export const CONTRACT_ABI = [
  {
    "inputs": [{ "internalType": "address[]", "name": "issuers", "type": "address[]" }],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "studentAddress", "type": "address" },
      { "internalType": "string", "name": "badgeName", "type": "string" },
      { "internalType": "string", "name": "issuerName", "type": "string" }
    ],
    "name": "issueBadge",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "studentAddress", "type": "address" }],
    "name": "getBadges",
    "outputs": [
      {
        "components": [
          { "internalType": "string", "name": "badgeName", "type": "string" },
          { "internalType": "string", "name": "issuerName", "type": "string" },
          { "internalType": "address", "name": "issuer", "type": "address" },
          { "internalType": "uint256", "name": "issuedAt", "type": "uint256" }
        ],
        "internalType": "struct CredentialWallet.Badge[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "isApprovedIssuer",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  }
];