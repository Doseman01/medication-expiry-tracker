import React, { useEffect, useState } from 'react';
import { getMedications, addMedication } from '../services/api';
import MedicationForm from './MedicationForm';

function MedicationList() {
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    fetchMedications();
  }, []);

  async function fetchMedications() {
    const data = await getMedications();
    setMedications(data);
  }

  const handleAddMedication = async (med) => {
    await addMedication(med);
    fetchMedications(); // refresh list
  };

  return (
    <div>
      <h2>Medications</h2>
      <MedicationForm onSubmit={handleAddMedication} />
      <ul>
        {medications.map((med) => (
          <li key={med.id}>
            {med.name} — Qty: {med.quantity} — Exp: {med.expiration_date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MedicationList;

