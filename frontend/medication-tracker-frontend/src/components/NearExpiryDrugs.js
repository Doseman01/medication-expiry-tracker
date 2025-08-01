import React, { useEffect, useState } from 'react';
import { getNearExpiryMedications } from '../services/api'; // or getNearExpiryMedications if using backend filter

function isNearExpiry(dateStr) {
  const today = new Date();
  const expiration = new Date(dateStr);
  const diffDays = (expiration - today) / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= 30;
}

function NearExpiryDrugs() {
  const [drugs, setDrugs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getNearExpiryMedications(); // or getNearExpiryMedications()
      const filtered = data.filter(drug => isNearExpiry(drug.expiration_date));
      setDrugs(filtered);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2>Drugs Expiring Soon (Next 30 Days)</h2>
      {drugs.length === 0 ? (
        <p>No drugs nearing expiration.</p>
      ) : (
        <ul>
          {drugs.map(drug => (
            <li key={drug.id}>
              {drug.name} - Qty: {drug.quantity} - Exp: {drug.expiration_date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NearExpiryDrugs;

