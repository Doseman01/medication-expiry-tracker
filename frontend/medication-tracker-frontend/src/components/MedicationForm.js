import React, { useState, useEffect } from 'react';
import './MedicationForm.css'; // Import the CSS styles

function MedicationForm({ onSubmit, initialData = {}, buttonLabel = "Add Medication" }) {
  const [formData, setFormData] = useState({
    name: '',
    quantity: 0,
    expiration_date: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'quantity' ? parseInt(value, 10) || 0 : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const preparedData = {
      name: formData.name?.trim() || '',
      quantity: parseInt(formData.quantity, 10),
      expiration_date: formData.expiration_date,
    };

    if (!preparedData.name || !preparedData.expiration_date || isNaN(preparedData.quantity)) {
      alert("Please fill all fields correctly");
      return;
    }

    onSubmit(preparedData);
    setFormData({ name: '', quantity: 0, expiration_date: '' });
  };

  return (
    <form className="medication-form" onSubmit={handleSubmit}>
      <h2>📋 Medication Entry</h2>
      <div className="form-group">
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Quantity:</label>
        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Expiration Date:</label>
        <input type="date" name="expiration_date" value={formData.expiration_date} onChange={handleChange} required />
      </div>
      <button type="submit">{buttonLabel}</button>
    </form>
  );
}

export default MedicationForm;

