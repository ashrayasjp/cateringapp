import React, { useState, useEffect, useRef } from 'react';
import '../index.css';

function Intro() {
  const [isTitleComplete, setIsTitleComplete] = useState(false);
  const [isDescriptionComplete, setIsDescriptionComplete] = useState(false);
  const imageSectionRef = useRef(null);

  const title = 'Welcome To Ahaar';
  const description =
    'Discover a world of delicious possibilities with Ahaar, your go-to platform for effortless and customized catering services for every occasion.';

  useEffect(() => {
    const imageTimer = setTimeout(() => {
      if (imageSectionRef.current) {
        imageSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, title.length * 100 + description.length * 50);

    return () => clearTimeout(imageTimer);
  }, []);

  // CSS animation state updates after title is typed
  useEffect(() => {
    if (isTitleComplete) {
      setIsDescriptionComplete(true);  // Start typing description when title is complete
    }
  }, [isTitleComplete]);

  return (
    <>
      <style>{`
        @keyframes typingEffect {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

      
        .typing-animation {
          display: inline-block;
          white-space: nowrap;
          overflow: hidden;
          border-right: 2px solid black;
          font-family: 'Dancing Script';
          font-size: 40px;
          font-weight: bold;
          width: 0;
          animation: typingEffect ${title.length * 0.2}s steps(${title.length}) 1s forwards, blinkCaret 0.75s step-end infinite;
        }

        .typing-complete {
          animation: none;
          border-right: none;
        }

        /* Faster animation for description */
        .description-animation {
          display: inline-block;
          white-space: nowrap;
          overflow: hidden;
          font-family: 'Luminari', sans-serif;
          font-size: 30px;
         
          width: 0;
          animation: typingEffect ${description.length * 0.08}s steps(${description.length}) 1s forwards, blinkCaret 0.75s step-end infinite;
        }

        @keyframes blinkCaret {
          50% {
            border-color: transparent;
          }
        }

        .image-caption {
          font-family: 'Gill Sans';
          font-size: 24px;
          color: #333;
          font-weight: 500;
          text-align: center;
          margin-top: 10px;
        }
      `}</style>

      <section style={{ textAlign: 'center', padding: '140px 20px 60px' }}>
        {/* Title Text */}
        <h1 className={`typing-animation ${isTitleComplete ? 'typing-complete' : ''}`} 
            onAnimationEnd={() => setIsTitleComplete(true)} 
            style={{ animationDuration: `${title.length * 0.2}s` }}>
          {title}
        </h1>

        {/* Wait for 5 seconds after title completion, then start typing description */}
        {isTitleComplete && (
          <h1 className={`description-animation ${isDescriptionComplete ? 'typing-complete' : ''}`} style={{ marginTop: '20px' }}>
            {description}
          </h1>
        )}
      </section>

      <div
        ref={imageSectionRef}
        style={{
          transition: 'all 0.5s ease',
          padding: '30px 30px',
          backgroundColor: '#f5fff5',
          zIndex: 0,
        }}
      >
        <h3 className="dancing-font" style={{ textAlign: 'center', marginBottom: '10px', fontSize: '32px' }}>
          Explore Our Delicious Offerings
        </h3>

        <div className="image-grid">
          {[
            { src: 'c1.jpg', alt: 'Wedding', caption: 'Wedding Celebrations' },
            { src: 'c3.jpg', alt: 'Birthday', caption: 'Birthday Parties' },
            { src: 'c4.jpg', alt: 'Meetings', caption: 'Official Meetings' },
          ].map((item, index) => (
            <div className="image-card" key={index}>
              <img src={item.src} alt={item.alt} />
              <p className="image-caption">{item.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Intro;
