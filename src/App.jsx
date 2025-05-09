import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CatererHeader from './components/CatererHeader';
import CustomerHeader from './components/CustomerHeader';
import Footer from './components/Footer';
import Intro from './components/Intro';
import Caterers from './pages/Caterers';
import SignUp from './pages/SignUp';
import CatererDashboard from './pages/CatererDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import Login from './pages/Login';
import About from './pages/About.jsx';
import FAQ from './pages/FAQ.jsx';
import Cookies from 'js-cookie';

function App() {
  const [user, setUser] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = Cookies.get('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const toggleSignUp = () => setShowSignUp(!showSignUp);

  const handleSignUpSuccess = (email, role) => {
    const newUser = { email, role };
    setUser(newUser);
    Cookies.set('user', JSON.stringify(newUser));
    setShowSignUp(false);
  };

  const handleSignOut = () => {
    setUser(null);
    Cookies.remove('user');
  };

  return (
    <Router>
      {!loading && (
        <>
          {user ? (
            user.role === 'caterer' ? (
              <CatererHeader user={user} onSignOut={handleSignOut} />
            ) : (
              <CustomerHeader user={user} onSignOut={handleSignOut} />
            )
          ) : (
            <CustomerHeader user={null} onSignUpClick={toggleSignUp} onSignOut={handleSignOut} />
          )}

          <div style={{ paddingBottom: '120px' }}>
            <Routes>
              <Route path="/" element={<Intro />} />
              <Route path="/caterers" element={<Caterers />} />
              <Route path="/caterer-dashboard" element={<CatererDashboard />} />
              <Route path="/customer-dashboard" element={<CustomerDashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
            </Routes>
          </div>

          {/* SignUp Popup */}
          {showSignUp && (
            <div
              className="signup-popup"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
              }}
            >
              <div
                className="signup-form"
                style={{
                  backgroundColor: 'white',
                  padding: '20px',
                  borderRadius: '8px',
                  width: '320px',
                }}
              >
                <h3 style={{ textAlign: 'center' }}>Sign Up</h3>
                <SignUp onSuccess={handleSignUpSuccess} />
                <button
                  type="button"
                  onClick={toggleSignUp}
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginTop: '10px',
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          <Footer />
        </>
      )}
    </Router>
  );
}
 
export default App;
