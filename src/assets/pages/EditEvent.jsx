import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// refactored with the help of GPT
const EditEvent = () => {
  const { id: eventId } = useParams();
  const navigate = useNavigate();  

  const [formData, setFormData] = useState({
    type: '',
    date: '',
    time: '',
    name: '',
    location: '',
    description: '',
    price: ''
  });

  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://win24ventixe-eventservice-chadcqb0ftbregb8.swedencentral-01.azurewebsites.net/api/Events/${eventId}`);
        if (!res.ok) throw new Error('Failed to fetch event.');
        const data = await res.json();

        const event = data.result;
        if (!event) throw new Error('Event not found.');

        const dt = new Date(event.eventDate);
        setFormData({
          type: event.type || '',
          date: dt.toISOString().split('T')[0],
          time: dt.toTimeString().slice(0, 5),
          name: event.title || '',
          location: event.location || '',
          description: event.description || '',
          price: event.price !== null && event.price !== undefined ? event.price.toString() : ''
        });
      } catch (err) {
        setErrors([`Failed to load event: ${err.message}`]);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) fetchEvent();
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = [];
    if (!formData.type.trim()) newErrors.push('Type is required.');
    if (!formData.date) newErrors.push('Date is required.');
    if (!formData.time) newErrors.push('Time is required.');
    if (!formData.name.trim()) newErrors.push('Name is required.');
    if (!formData.location.trim()) newErrors.push('Location is required.');
    if (!formData.price || isNaN(formData.price)) newErrors.push('Valid price is required.');
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const dt = new Date(`${formData.date}T${formData.time}`);
    dt.setHours(dt.getHours() + 2); // Add 2 hours to fix timezone shift that happens implicitly
    const dateTimeString = dt.toISOString();

    const payload = {
      type: formData.type,
      title: formData.name,
      eventDate: dateTimeString,
      location: formData.location,
      description: formData.description,
      price: parseFloat(formData.price)
    };

    try {
      const res = await fetch(`https://win24ventixe-eventservice-chadcqb0ftbregb8.swedencentral-01.azurewebsites.net/api/Events/${eventId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to update event.');
      setSuccess('Event updated successfully!');
      setErrors([]);

      navigate(`/events/${eventId}`);  // redirect on success
    } catch (err) {
      setErrors([err.message]);
      setSuccess(null);
    }
  };

  if (loading) return <div>Loading event data...</div>;

  return (
    <div id="edit-event">
      {errors.length > 0 && (
        <div className="error-message">
          <ul>{errors.map((err, i) => <li key={i}>{err}</li>)}</ul>
        </div>
      )}
      {success && <div className="success-message">{success}</div>}

      <form className="form" onSubmit={handleSubmit}>
        {['type', 'date', 'time', 'name', 'location', 'price'].map(field => (
          <div className="form-group" key={field}>
            <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type={field === 'price' ? 'number' : field === 'date' ? 'date' : field === 'time' ? 'time' : 'text'}
              id={field}
              name={field}
              className="form-input"
              value={formData[field]}
              onChange={handleChange}
              step={field === 'price' ? '0.01' : undefined}
            />
          </div>
        ))}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-input"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-button">
          <span className="submit-button-text">Update Event</span>
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
