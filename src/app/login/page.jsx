"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ChevronLeft, CheckCircle } from 'lucide-react';

import FormInput from '@/components/FormInput';
import Button from '@/components/Button';
import './Login.css';

const MOCK_REGISTERED_USERS = ['test@example.com', '1234567890'];

const Login = () => {
  const router = useRouter();
  
  // State Machine: 'identifier' | 'password' | 'otp' | 'create_password'
  const [step, setStep] = useState('identifier');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const getIdentifierError = () => {
    if (!identifier) return '';
    if (!/^[6-9]/.test(identifier)) return 'Enter a valid number';
    if (identifier.length < 10) return 'Enter a valid mobile number';
    return '';
  };
  
  const identifierError = getIdentifierError();
  const isIdentifierValid = identifier.length === 10 && /^[6-9]/.test(identifier);

  const handleIdentifierSubmit = (e) => {
    e.preventDefault();
    if (!identifier) return;
    
    // Simulate API check
    if (MOCK_REGISTERED_USERS.includes(identifier)) {
      setStep('password');
    } else {
      setStep('otp');
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Simulate login
    localStorage.setItem('isAuthenticated', 'true');
    router.push('/profile');
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      setStep('create_password');
    }
  };

  const handleCreatePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword && password.length > 0) {
      // Simulate registration
      localStorage.setItem('isAuthenticated', 'true');
      router.push('/profile');
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <div className="login-split-container">
      
      {/* LEFT SIDE: Image & Marketing */}
      <div className="login-image-side">
        <div className="login-image-wrapper">
          <img src="/login-couple.jpg" alt="Stylish couple in denim" />
          <div className="login-image-overlay">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2>The Sagasa Standard</h2>
              <ul className="login-features-list">
                <li><CheckCircle size={20} /> Premium 100% Cotton Denim</li>
                <li><CheckCircle size={20} /> Tailored, Modern Fits</li>
                <li><CheckCircle size={20} /> Sustainably Crafted</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Auth Flow */}
      <div className="login-form-side">
        <div className="login-form-container">
          
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="login-promo-banner"
          >
            <span>NEW</span> Get 10% off on your first login or registration!
          </motion.div>

          <AnimatePresence mode="wait">
            
            {/* STEP 1: IDENTIFIER */}
            {step === 'identifier' && (
              <motion.div
                key="step-identifier"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="login-form-header">
                  <h1 className="login-header-large">Log in/sign up</h1>
                </div>

                <form onSubmit={handleIdentifierSubmit} className="login-step-form" noValidate>
                  <div className="mobile-input-container">
                    <div className="mobile-input-prefix">
                      <span className="flag-icon" style={{ display: 'flex', alignItems: 'center' }}>
                        <svg viewBox="0 0 100 100" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
                          <clipPath id="circleView">
                            <circle cx="50" cy="50" r="50" />
                          </clipPath>
                          <g clipPath="url(#circleView)">
                            <rect width="100" height="33.33" y="0" fill="#FF9933"/>
                            <rect width="100" height="33.33" y="33.33" fill="#FFFFFF"/>
                            <rect width="100" height="33.34" y="66.66" fill="#138808"/>
                            <circle cx="50" cy="50" r="10" fill="none" stroke="#000080" strokeWidth="2"/>
                            <circle cx="50" cy="50" r="2" fill="#000080"/>
                          </g>
                        </svg>
                      </span>
                      <span className="country-code">+91</span>
                    </div>
                    <input 
                      type="tel"
                      name="identifier" 
                      className="mobile-input-field"
                      placeholder="MOBILE NUMBER" 
                      value={identifier}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(/\D/g, '');
                        if (numericValue.length <= 10) {
                          setIdentifier(numericValue);
                        }
                      }}
                      maxLength={10}
                    />
                  </div>
                  {identifierError && <p className="validation-error">{identifierError}</p>}

                  <button 
                    type="submit" 
                    className="login-continue-btn"
                    disabled={!isIdentifierValid}
                  >
                    Continue <span>&rarr;</span>
                  </button>
                  <p className="login-legal-text">
                    By continuing, you agree to the <a href="/terms-of-service">Terms of Service</a> and <a href="/privacy-policy">Privacy Policy</a>
                  </p>
                </form>
              </motion.div>
            )}

            {/* STEP 2A: PASSWORD (LOGIN) */}
            {step === 'password' && (
              <motion.div
                key="step-password"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <button type="button" className="back-btn" onClick={() => setStep('identifier')}>
                  <ChevronLeft size={16} /> Back
                </button>
                <div className="login-form-header">
                  <h1>Welcome back</h1>
                  <p>Please enter your password to continue.</p>
                </div>
                
                <div className="input-read-only">
                  <span>{identifier}</span>
                  <button type="button" onClick={() => setStep('identifier')}>Edit</button>
                </div>

                <form onSubmit={handlePasswordSubmit} className="login-step-form">
                  <FormInput 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button type="button" className="forgot-password-link">Forgot password?</button>
                  <div className="form-actions">
                    <Button type="submit" fullWidth>Log In</Button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* STEP 2B: OTP (REGISTER) */}
            {step === 'otp' && (
              <motion.div
                key="step-otp"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <button type="button" className="back-btn" onClick={() => setStep('identifier')}>
                  <ChevronLeft size={16} /> Back
                </button>
                <div className="login-form-header">
                  <h1>Verify your account</h1>
                  <p>We've sent a 6-digit code to {identifier}.</p>
                </div>

                <form onSubmit={handleOtpSubmit} className="login-step-form">
                  <div className="otp-inputs">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <input
                        key={`otp-${index}`}
                        id={`otp-${index}`}
                        type="text"
                        className="otp-input"
                        maxLength="1"
                        value={otp[index]}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        required
                      />
                    ))}
                  </div>
                  <div className="form-actions">
                    <Button type="submit" fullWidth>Verify Code</Button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* STEP 2C: CREATE PASSWORD (REGISTER) */}
            {step === 'create_password' && (
              <motion.div
                key="step-create-password"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="login-form-header">
                  <h1>Create Password</h1>
                  <p>Secure your new account with a strong password.</p>
                </div>

                <form onSubmit={handleCreatePasswordSubmit} className="login-step-form">
                  <FormInput 
                    type="password" 
                    name="password" 
                    placeholder="New Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <FormInput 
                    type="password" 
                    name="confirmPassword" 
                    placeholder="Confirm Password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <div className="form-actions">
                    <Button type="submit" fullWidth>Create Account</Button>
                  </div>
                </form>
              </motion.div>
            )}

          </AnimatePresence>

        </div>
      </div>
    </div>
  );
};

export default Login;
