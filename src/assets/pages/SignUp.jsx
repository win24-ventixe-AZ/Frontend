import { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = [];

    if (!firstName.trim()) validationErrors.push('First name is required.');
    if (!lastName.trim()) validationErrors.push('Last name is required.');
    if (!email.trim()) {
      validationErrors.push('Email is required.');
    } else if (!validateEmail(email)) {
      validationErrors.push('Invalid email format.');
    }
    if (!password) {
      validationErrors.push('Password is required.');
    } else if (password.length < 8) {
      validationErrors.push('Password must be at least 8 characters.');
    }
    if (password !== confirmPassword) {
      validationErrors.push('Passwords do not match.');
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]); // Clear errors if all validations pass

    // To be replaced with real API
    const apiUrl = 'https://your-api-url.com/signup';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Registration successful:', data);
        // Redirect to auth -> show success message here
      } else {
        setErrors([data.message || 'Registration failed.']);
      }
    } catch (error) {
      console.error('Network error:', error);
      setErrors(['Network error. Please try again later.']);
    }
  };

  return (
    <div id='login'>
      <div className='logo'> 
        <img src="\images\logos\Ventixe-Logo.svg" alt="Logo" /> 
        <p className='logo-text'>Ventixe</p>
      </div>

      <h6>Create an Account</h6>

      <div>
        <form onSubmit={handleSubmit} className='form' noValidate>
          {errors.length > 0 && (
            <div className='error-message'>
              <ul>
                {errors.map((err, index) => (
                  <li key={index}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          <div className='form-group'>
            <label>First Name</label>
            <input
              className='form-input'
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label>Last Name</label>
            <input
              className='form-input'
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label>Email</label>
            <input
              className='form-input'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input
              className='form-input'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label>Confirm Password</label>
            <input
              className='form-input'
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button className='submit-button' type="submit">
            <div className='submit-button-text'>Register</div>
          </button>
        </form>
      </div>

      <div className='redirect-text'>
        <p>Already have an account?</p>
        <Link className='link' to="/login">Log in</Link>
      </div>
    </div>
  );
};

export default SignUp;
