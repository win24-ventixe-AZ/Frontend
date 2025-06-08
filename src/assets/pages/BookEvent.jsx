import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Refactored using chat GPT
const BookEvent = () => {
  const { id: eventId } = useParams(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    streetName: '',
    postalCode: '',
    city: '',
    ticketQuantity: 1
  });

  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'ticketQuantity' ? parseInt(value, 10) || 1 : value
    }));
  };

  const validateForm = () => {
  const newErrors = [];

  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const postalCodeRegex = /^[0-9]{3}\s?[0-9]{2}$/; 
  
  if (!formData.firstName.trim()) newErrors.push('First name is required.');
  else if (!nameRegex.test(formData.firstName)) newErrors.push('First name should contain only letters.');

  if (!formData.lastName.trim()) newErrors.push('Last name is required.');
  else if (!nameRegex.test(formData.lastName)) newErrors.push('Last name should contain only letters.');

  if (!formData.email.trim()) newErrors.push('Email is required.');
  else if (!emailRegex.test(formData.email)) newErrors.push('Email is not valid.');

  if (!formData.streetName.trim()) newErrors.push('Street name is required.');

  if (!formData.postalCode.trim()) newErrors.push('Postal code is required.');
  else if (!postalCodeRegex.test(formData.postalCode)) newErrors.push('Postal code is not valid.');

  if (!formData.city.trim()) newErrors.push('City is required.');
  else if (!nameRegex.test(formData.city)) newErrors.push('City should only contain letters.');

  if (!formData.ticketQuantity || isNaN(formData.ticketQuantity)) {
    newErrors.push('Ticket quantity must be a number.');
  } else if (formData.ticketQuantity < 1) {
    newErrors.push('At least 1 ticket must be booked.');
  }

  setErrors(newErrors);
  return newErrors.length === 0;
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      eventId,
      ...formData,
      bookingOwnerId: null 
    };

    try {
      const response = await fetch('https://win24ventixe-bookingservice-gcaghxbsbnd8cgg4.swedencentral-01.azurewebsites.net/api/Bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to create booking');

      setSuccess('Booking created successfully!');
      setErrors([]);
      navigate('/bookings');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        streetName: '',
        postalCode: '',
        city: '',
        ticketQuantity: 1
      });
    } catch (err) {
      setErrors([err.message]);
      setSuccess(null);
    }
  };

  return (
    <div id="book-event">
      {errors.length > 0 && (
        <div className="error-message">
          <ul>{errors.map((err, i) => <li key={i}>{err}</li>)}</ul>
        </div>
      )}
      {success && <div className="success-message">{success}</div>}

      <form className="form" onSubmit={handleSubmit}>
        {['firstName', 'lastName', 'email', 'streetName', 'postalCode', 'city'].map(field => (
          <div className="form-group" key={field}>
            <label htmlFor={field}>{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
            <input
              type="text"
              id={field}
              name={field}
              className="form-input"
              value={formData[field]}
              onChange={handleChange}
            />
          </div>
        ))}

        <div className="form-group">
          <label htmlFor="ticketQuantity">Ticket Quantity</label>
          <input
            type="number"
            id="ticketQuantity"
            name="ticketQuantity"
            className="form-input"
            value={formData.ticketQuantity}
            onChange={handleChange}
            min="1"
          />
        </div>

        <button type="submit" className="submit-button">
          <span className="submit-button-text">Book Event</span>
        </button>
      </form>
    </div>
  );
};

export default BookEvent;
