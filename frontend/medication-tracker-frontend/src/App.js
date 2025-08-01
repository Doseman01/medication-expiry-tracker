import React from 'react';
import MedicationList from './components/MedicationList';
import NearExpiryDrugs from './components/NearExpiryDrugs';

function App() {
  return (
    <div className="App">
      <h1>Medication Tracker</h1>
      <MedicationList />
      <NearExpiryDrugs />
    </div>
  );
}

export default App;

