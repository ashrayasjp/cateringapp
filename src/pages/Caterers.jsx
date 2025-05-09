import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const caterers = [
  { name: 'Annapurna Catering', image: 'ca1.jpg' },
  { name: 'Lumbini Food Services', image: 'ca2.jpg' },
  { name: 'Bhoj Catering', image: 'ca3.jpg' },
  { name: 'ABC Eatery', image: 'ca4.jpg' },
  { name: 'Namaste Kitchen Services', image: 'ca5.jpeg' },
  { name: 'Shubh Bhoj Sewa', image: 'ca6.jpg' },
  { name: 'Heritage Flavours', image: 'ca7.jpeg' },
  { name: 'Himalayan  Delights', image: 'ca8.jpeg' },
];

function Caterers() {
  const navigate = useNavigate();
  const userCookie = Cookies.get('user');
  const user = userCookie ? JSON.parse(userCookie) : null;

  const handleClick = (caterer) => {
    if (user && user.role === 'customer') {
      navigate(`/menu/${encodeURIComponent(caterer.name)}`);
    } else {
      alert('Please log in as a customer to view the menu.');
    }
  };

  return (
    <div
      style={{
        padding: '120px 20px',
        backgroundColor: '#f5fff5',
        minHeight: '100vh',
        textAlign: 'center',
        fontFamily: 'Manrope',
      }}
    >
      <h1 style={{ fontSize: '36px', marginBottom: '10px', color: '#222' }}>
        Caterers Available
      </h1>

      <style>{`
        @keyframes fadeInDown {
          0% { opacity: 0; transform: translateY(-30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '50px',
          marginTop: '50px',
          maxWidth: '1100px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        {caterers.map((caterer, index) => (
          <div
            key={index}
            onClick={() => handleClick(caterer)}
            style={{
              cursor: 'pointer',
              animation: 'fadeInDown 1s ease forwards',
              animationDelay: `${index * 0.2}s`,
              opacity: 0,
            }}
          >
            <div
              style={{
                height: '260px',
                width: '100%',
                borderRadius: '10px',
                overflow: 'hidden',
                backgroundColor: '#fff',
                boxShadow: '0 6px 24px rgba(160, 32, 240, 0.45)',
                border: '1px solid rgba(160, 32, 240, 0.6)',
              }}
            >
              <img
                src={caterer.image}
                alt={caterer.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit:
                    caterer.name === 'Bhoj Catering' || caterer.name === 'Lumbini Food Services'
                      ? 'contain'
                      : 'cover',
                  transition: 'transform 0.3s ease',
                }}
              />
            </div>
            <h3 style={{ marginTop: '12px', fontSize: '20px', color: '#333', fontWeight: 600 }}>
              {caterer.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Caterers;
