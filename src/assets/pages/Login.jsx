import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = [];
    if (!email.trim()) {
      validationErrors.push('Email is required.');
    }
    if (!password) {
      validationErrors.push('Password is required.');
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);

    // Replace with real API
    const apiUrl = 'https://your-api-url.com/login'; 

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        // Redirect or save auth token here
      } else {
        setErrors([data.message || 'Login failed. Please check your credentials.']);
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
          <button type="submit" className='submit-button'>
            <div className='submit-button-text'>Login</div>
          </button>
        </form>
      </div>

      <div className='redirect-text'>
        <p>Don't have an account?</p> 
        <Link className='link' to="/signup">Sign up!</Link>
      </div>
    </div>
  );
};

export default Login;
