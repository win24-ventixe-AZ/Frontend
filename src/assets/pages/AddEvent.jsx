import { useState } from 'react'

// Form was refactored with the help of GPT 
const AddEvent = () => {
  const [formData, setFormData] = useState({
    type: '',
    date: '',
    time: '',
    name: '',
    location: '',
    description: '',
    price: ''
  })

  const [errors, setErrors] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    const newErrors = []

    if (!formData.type.trim()) newErrors.push('The event must be of a type (e.g. Theatre, Concert, etc.).')
    if (!formData.date) newErrors.push('The event must have a date.')
    if (!formData.time) newErrors.push('The event must have a starting time.')
    if (!formData.name.trim()) newErrors.push('The event must have a name.')
    if (!formData.location.trim()) newErrors.push('Event location must be given.')
    if (!formData.price || isNaN(formData.price)) newErrors.push('The price must be a number.')

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return

    // TODO: Connect to your API here
    console.log('Submitting event:', formData)
  }

  return (
    <div id="create-event">
      {errors.length > 0 && (
        <div className="error-message">
          <ul>
            {errors.map((err, i) => <li key={i}>{err}</li>)}
          </ul>
        </div>
      )}

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="type">Event Type</label>
          <input
            type="text"
            id="type"
            name="type"
            className="form-input"
            value={formData.type}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date of Event</label>
          <input
            type="date"
            id="date"
            name="date"
            className="form-input"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Time of Event</label>
          <input
            type="time"
            id="time"
            name="time"
            className="form-input"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Event Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Event description</label>
          <textarea
            id="description"
            name="description"
            className="form-input"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location of Event</label>
          <input
            type="text"
            id="location"
            name="location"
            className="form-input"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price of admission</label>
          <input
            type="number"
            id="price"
            name="price"
            step="0.01"
            className="form-input"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-button">
          <span className="submit-button-text">Create Event</span>
        </button>
      </form>
    </div>
  )
}

export default AddEvent
