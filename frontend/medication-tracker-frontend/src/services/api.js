const API_URL = 'http://127.0.0.1:8000/medications/api/'; // adjust if needed

export async function getMedications() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch medications');
  }
  return response.json();
}



export async function getNearExpiryMedications() {
  const response = await fetch('http://127.0.0.1:8000/medications/api/near-expiry/');
  if (!response.ok) {
    throw new Error('Failed to fetch near-expiry medications');
  }
  return response.json();
}

// Add new medication
export async function addMedication(medication) {
  console.log("📦 Final payload to backend:", medication); // 🧠 Add this
  const response = await fetch('http://127.0.0.1:8000/medications/api/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(medication),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('❌ Backend error:', data);
    throw new Error(data.detail || 'Failed to add medication');
  }

  return data;
}



// Update existing medication
export async function updateMedication(id, medication) {
  const response = await fetch(`http://127.0.0.1:8000/medications/api/${id}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(medication),
  });
  if (!response.ok) {
    throw new Error('Failed to update medication');
  }
  return response.json();
}

