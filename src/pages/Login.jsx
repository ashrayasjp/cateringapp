import React, { useState } from 'react';

const Login = ({ onSuccess, onClose }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');  // Clear any previous error when the user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');  // Reset error message before starting the request
    setProcessing(true);  // Start processing

    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        // Successful login
        alert('Login successful!');
        localStorage.setItem('email', data.user.email);
        localStorage.setItem('role', data.user.role); // Store role in localStorage
        onSuccess(data.user.email, data.user.role);  // Return email and role to the parent component
        onClose();  // Close the login modal after successful login
      } else {
        // Display specific error message from the server response
        setError(data.error || 'Invalid login credentials. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Login error. Please try again.');  // Generic error message if the request fails
    } finally {
      setProcessing(false);  // Stop processing
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3 style={{ fontFamily: 'Inter', fontSize: '24px', textAlign: 'center' }}>Login</h3>
        {processing && (
          <p style={{ fontFamily: 'Inter', fontSize: '18px', color: 'green', textAlign: 'center' }}>
            Processing your login...
          </p>
        )}
        {error && (
          <p style={{ fontFamily: 'Inter', fontSize: '18px', color: 'red', textAlign: 'center' }}>
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <button
            type="submit"
            style={buttonStyle}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#005f3d')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#007950')}
          >
            Login
          </button>
        </form>
        <button
          onClick={onClose}
          style={{
            marginTop: '12px',
            fontFamily: 'Inter',
            fontSize: '16px',
            color: 'white',
            background: '#f44336',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

// Shared styles
const inputStyle = {
  padding: '10px',
  fontSize: '16px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  width: '100%',
  maxWidth: '400px',
  fontFamily: 'Inter',
};

const buttonStyle = {
  padding: '10px 24px',
  backgroundColor: '#007950',
  color: 'white',
  fontSize: '18px',
  fontFamily: 'Inter',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
};

const modalStyle = {
  backgroundColor: '#fff',
  padding: '30px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  width: '90%',
  maxWidth: '480px',
};

export default Login;
