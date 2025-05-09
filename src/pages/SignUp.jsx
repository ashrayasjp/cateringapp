import React, { useState } from 'react';
import Login from './Login';

function SignUp({ onSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
    additionalField: '',
    licenseFile: null,
  });

  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(true);
  const [error, setError] = useState('');
  const [hoveredRole, setHoveredRole] = useState('');
  const [errors, setErrors] = useState({});

  const toggleLogin = () => {
    setShowSignUp(false);
    setShowLogin(true);
  };

  const closeLogin = () => {
    setShowLogin(false);
    setShowSignUp(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, licenseFile: e.target.files[0] });
  };

  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role, additionalField: '', licenseFile: null });
    setError('');
  };

  const isRoleSelected = (role) => formData.role === role;

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!formData.role) {
      setError('Please choose your role.');
      return;
    }

    if (!formData.additionalField) {
      setError(formData.role === 'customer' ? 'Please enter a username.' : 'Please enter your company name.');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!validatePassword(formData.password)) {
      setError('Password must be at least 8 characters, include one uppercase letter and one special symbol.');
      return;
    }

    if (formData.role === 'caterer' && !formData.licenseFile) {
      setErrors((prevErrors) => ({ ...prevErrors, licenseFile: 'Please upload your catering license.' }));
      return;
    }

    const form = new FormData();
    form.append('email', formData.email);
    form.append('password', formData.password);
    form.append('companyName', formData.additionalField);
    if (formData.role === 'caterer') {
      form.append('licenseFile', formData.licenseFile);
    }

    try {
      let response;
      if (formData.role === 'customer') {
        response = await fetch('http://localhost:5000/api/customer-signup', {
          method: 'POST',
          body: form,
        });
      } else if (formData.role === 'caterer') {
        response = await fetch('http://localhost:5000/api/caterer-request', {
          method: 'POST',
          body: form,
        });
      }

      const data = await response.json();

      if (response.ok) {
        if (formData.role === 'customer') {
          alert('Signup successful! Please log in.');
          setShowSignUp(false);
          setShowLogin(true);
        } else {
          alert('Thank you! Your request is under verification. We will notify you once approved.');
          setShowSignUp(false);
        }
      } else {
        setError(data.error || 'Submission failed. Please try again.');
      }
    } catch (err) {
      console.error('Error during sign-up:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      {showSignUp && (
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', justifyContent: 'center' }}>
            {['customer', 'caterer'].map((role) => {
              const isSelected = isRoleSelected(role);
              const isHovered = hoveredRole === role;

              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleRoleSelect(role)}
                  onMouseEnter={() => setHoveredRole(role)}
                  onMouseLeave={() => setHoveredRole('')}
                  style={{
                    padding: '15px 30px',
                    backgroundColor: isSelected || isHovered ? '#007950' : '#f0f0f0',
                    color: isSelected || isHovered ? 'white' : '#333',
                    border: '2px solid #007950',
                    borderRadius: '8px',
                    fontSize: '18px',
                    cursor: 'pointer',
                    fontFamily: 'Arial, sans-serif',
                    boxShadow: isSelected ? '0 4px 10px rgba(0, 0, 0, 0.1)' : 'none',
                    transition: 'background-color 0.3s, color 0.3s',
                  }}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
              );
            })}
          </div>

          {error && <p style={{ color: 'red', fontFamily: 'Inter', fontSize: '20px', textAlign: 'center' }}>{error}</p>}

          {formData.role && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <input
                type="text"
                name="additionalField"
                value={formData.additionalField}
                onChange={handleChange}
                placeholder={formData.role === 'customer' ? 'Enter username' : 'Enter company name'}
                required
                style={{ fontFamily: 'Inter', fontSize: '18px', padding: '10px', width: '250px' }}
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                required
                style={{ fontFamily: 'Inter', fontSize: '18px', padding: '10px', width: '250px' }}
              />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                style={{ fontFamily: 'Inter', fontSize: '18px', padding: '10px', width: '250px' }}
              />

              {formData.role === 'caterer' && (
                <div>
                  <p style={{ fontFamily: 'Inter', fontSize: '16px', margin: '4px 0 4px 0', color: '#333' }}>
                    Catering License
                  </p>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.pdf"
                    onChange={handleFileChange}
                    required
                    title="Upload Catering License"
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '16px',
                      padding: '6px',
                      width: '250px',
                    }}
                  />
                  {errors.licenseFile && (
                    <p style={{ color: 'red', fontFamily: 'Inter', fontSize: '16px' }}>{errors.licenseFile}</p>
                  )}
                </div>
              )}

              <button
                type="submit"
                style={{
                  marginTop: '12px',
                  padding: '10px 24px',
                  backgroundColor: '#007950',
                  color: 'white',
                  fontSize: '18px',
                  fontFamily: 'Inter',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#005f3d')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#007950')}
              >
                Sign Up
              </button>
            </div>
          )}
        </form>
      )}

      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <p style={{ fontFamily: 'Inter', fontSize: '20px', margin: 0 }}>
          Already have an account?
        </p>
        <span
          style={{
            color: 'green',
            cursor: 'pointer',
            textDecoration: 'underline',
            fontFamily: 'Inter',
            fontSize: '20px',
          }}
          onClick={toggleLogin}
        >
          Login
        </span>
      </div>

      {showLogin && <Login onSuccess={onSuccess} onClose={closeLogin} />}
    </>
  );
}

export default SignUp;
