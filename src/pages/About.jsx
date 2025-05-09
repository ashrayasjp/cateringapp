import React from 'react';

function About() {
  return (
    <div style={{ padding: '175px 50px 50px 50px', maxWidth: '800px', margin: '0 auto' }}>
      <div 
        style={{ 
          background: '#f5fff5',    // Soft background to match FAQ
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.25)' // Darker shadow
        }}
      >
        <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>About Ahaar</h2>
        <p style={{ fontSize: '18px', marginBottom: '16px', lineHeight: '1.6' }}>
          Ahaar is your go-to platform for finding and booking professional caterers for any event — weddings, birthdays, corporate functions, and more.
        </p>
        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
          We are passionate about food and service. Our mission is to make catering easy, transparent, and accessible to everyone.
        </p>
      </div>
    </div>
  );
}

export default About;
