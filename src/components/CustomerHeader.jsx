import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

function CustomerHeader({ user, onSignUpClick, onSignOut }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const dropdownRef = useRef(null);

  const handleUsernameClick = () => {
    setDropdownVisible((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className="division"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
      }}
    >
      <div className="dancing-font">
        <h1>Ahaar</h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <ul
          style={{
            display: 'flex',
            listStyle: 'none',
            gap: '20px',
            margin: 0,
            padding: 0,
            alignItems: 'center',
          }}
        >
          <li>
            <Link
              to="/"
              style={{
                textDecoration: 'none',
                color: 'green',
                fontSize: '30px',
                lineHeight: '42px',
              }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/caterers"
              style={{
                textDecoration: 'none',
                color: 'green',
                fontSize: '30px',
                lineHeight: '42px',
              }}
            >
              Caterers
            </Link>
          </li>

          {user && (
            <li>
              <Link to="/customer-dashboard">
                <img
                  src="dash.png"
                  alt="Dashboard"
                  style={{
                    height: '42px',
                    width: '42px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                />
              </Link>
            </li>
          )}

          {!user && (
            <li
              style={{ position: 'relative' }}
              onMouseEnter={() => setShowLogin(true)}
              onMouseLeave={() => setShowLogin(false)}
            >
              <span
                onClick={onSignUpClick}
                style={{
                  textDecoration: 'none',
                  color: 'green',
                  cursor: 'pointer',
                  fontSize: '30px',
                  lineHeight: '42px',
                }}
              >
                Sign Up
              </span>

            </li>
          )}
        </ul>

        {user && (
          <div
            ref={dropdownRef}
            style={{ position: 'relative' }}
          >
            <span
              onClick={handleUsernameClick}
              style={{
                cursor: 'pointer',
                color: 'green',
                fontSize: '30px',
                padding: '0 10px',
              }}
            >
              {user.name || user.email || 'User'}
            </span>

            {dropdownVisible && (
              <div
                style={{
                  position: 'absolute',
                  top: '120%',
                  right: 0,
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  padding: '10px',
                  borderRadius: '4px',
                  boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
                  zIndex: 1000,
                }}
              >
                <button
                  onClick={onSignOut}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'green',
                    cursor: 'pointer',
                    fontSize: '16px',
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerHeader;
