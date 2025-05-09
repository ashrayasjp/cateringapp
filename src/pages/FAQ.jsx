import React from 'react';

function FAQ() {
  const faqList = [
    {
      question: "How do I book a caterer?",
      answer: "Just browse the caterers, select your favorite, and book directly!",
    },
    {
      question: "Is there a cancellation policy?",
      answer: "Yes, cancellation is allowed up to 48 hours before your event.",
    },
    {
      question: "Can I customize my menu?",
      answer: "Absolutely! Most caterers allow customizations based on your needs.",
    },
  ];

  return (
    <div style={{ padding: '150px 50px 50px 50px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '32px', marginBottom: '40px', textAlign: 'center' }}>
        Frequently Asked Questions
      </h2>
      <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
        {faqList.map((faq, index) => (
          <li 
            key={index}
            style={{ 
              background: '#f5fff5',  // Highlight color
              padding: '20px',
              borderRadius: '8px',
              marginBottom: '20px',
              boxShadow: '0 6px 16px rgba(0, 0, 0, 0.25)' // Darker shadow
            }}
          >
            <strong style={{ fontSize: '20px', display: 'block', marginBottom: '10px' }}>
              Q: {faq.question}
            </strong>
            <p style={{ margin: 0, fontSize: '18px' }}>
              A: {faq.answer}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FAQ;
0