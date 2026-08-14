"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ChevronLeft, CheckCircle } from 'lucide-react';

import FormInput from '@/components/FormInput';
import Button from '@/components/Button';

const MOCK_REGISTERED_USERS = ['test@example.com', '1234567890'];

const Login = () => {
  const router = useRouter();
  
  // State Machine: 'identifier' | 'password' | 'otp' | 'create_password'
  const [step, setStep] = useState('identifier');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [showIncompleteError, setShowIncompleteError] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState({
    fullName: '',
    email: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    pincode: ''
  });

  const handleDeliveryChange = (e) => {
    setDeliveryDetails(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleDeliverySubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('isAuthenticated', 'true');
    router.push('/profile');
  };

  useEffect(() => {
    setShowIncompleteError(false);
    
    if (identifier && /^[6-9]/.test(identifier) && identifier.length < 10) {
      const timer = setTimeout(() => {
        setShowIncompleteError(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [identifier]);

  const getIdentifierError = () => {
    if (!identifier) return '';
    if (!/^[6-9]/.test(identifier)) return 'Enter a valid number';
    if (identifier.length < 10 && showIncompleteError) return 'Enter your complete number';
    return '';
  };
  
  const identifierError = getIdentifierError();
  const isIdentifierValid = identifier.length === 10 && /^[6-9]/.test(identifier);

  const handleIdentifierSubmit = (e) => {
    e.preventDefault();
    if (!isIdentifierValid) return;
    
    setStep('otp');
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

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      if (otpValue === '123456') {
        setOtpError('');
        setStep('delivery_details');
      } else {
        setOtpError('Invalid OTP. Please try again.');
        setOtp(['', '', '', '', '', '']);
        const firstInput = document.getElementById('otp-0');
        if (firstInput) firstInput.focus();
      }
    } else {
      setOtpError('Please enter a complete 6-digit OTP.');
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
    <div className="grid grid-cols-1 min-h-[50vh] min-[900px]:grid-cols-[4fr_6fr] min-[900px]:h-screen min-[900px]:pt-[var(--header-height)] min-[900px]:overflow-hidden">
      
      {/* LEFT SIDE: Image & Marketing */}
      <div className="relative block bg-[var(--color-background)] overflow-hidden h-[45vh] min-[900px]:my-[20px] min-[900px]:ml-[20px] min-[900px]:rounded-[12px] min-[900px]:h-[calc(100%-40px)]">
        <div className="relative w-full h-full">
          <img src="/login-couple.jpg" alt="Stylish couple in denim" className="w-full h-full object-cover object-[center_20%]" />
          <div className="absolute bottom-0 left-0 right-0 pt-[4rem] pb-[60px] px-[3rem] bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-[rgba(0,0,0,0)] text-white min-[900px]:pb-[4rem]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-[2.5rem] mb-[1rem] font-normal tracking-[-0.02em]">The Sagasa Standard</h2>
              <ul className="list-none p-0 m-0 flex flex-col gap-[0.75rem]">
                <li className="flex items-center gap-[0.75rem] text-[1.125rem] opacity-90"><CheckCircle size={20} /> Premium 100% Cotton Denim</li>
                <li className="flex items-center gap-[0.75rem] text-[1.125rem] opacity-90"><CheckCircle size={20} /> Tailored, Modern Fits</li>
                <li className="flex items-center gap-[0.75rem] text-[1.125rem] opacity-90"><CheckCircle size={20} /> Sustainably Crafted</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Auth Flow */}
      <div className="flex flex-col items-center py-[40px] px-[20px] bg-[var(--color-background)] relative -mt-[40px] rounded-t-[32px] rounded-b-none z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] min-[900px]:py-[40px] min-[900px]:px-[60px] min-[900px]:mt-0 min-[900px]:rounded-none min-[900px]:shadow-none min-[900px]:overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="w-full max-w-full m-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[var(--color-surface)] text-[var(--color-foreground)] py-[0.75rem] px-[1rem] rounded-[4px] text-center font-medium text-[0.875rem] mx-auto mb-[2.5rem] mt-0 border border-[var(--color-border)] flex items-center justify-center gap-[0.5rem] max-w-[80%] w-full"
          >
            <span className="bg-[var(--color-foreground)] text-[var(--color-background)] py-[0.125rem] px-[0.375rem] rounded-[2px] text-[0.75rem] font-semibold tracking-[0.05em] uppercase">NEW</span> Get 10% off on your first login or registration!
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
                <div className="mb-[2.5rem] text-center">
                  <h1 className="text-[1.25rem] font-medium mb-[0.75rem] tracking-[-0.03em]">ʟᴏɢɪɴ/ꜱɪɢɴᴜᴘ</h1>
                </div>

                <form onSubmit={handleIdentifierSubmit} className="flex flex-col gap-[1.5rem] w-full" noValidate>
                  <div className="flex items-center border border-[var(--color-border)] rounded-[4px] bg-transparent overflow-hidden h-[54px] max-w-[80%] mx-auto w-full">
                    <div className="flex items-center gap-[0.5rem] px-[1rem] py-0 border-r border-[var(--color-border)] bg-[var(--color-surface)] h-full">
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
                      <span className="font-medium text-[var(--color-foreground)] text-[1rem]">+91</span>
                    </div>
                    <input 
                      type="tel"
                      name="identifier" 
                      className="flex-1 border-none bg-transparent px-[1rem] py-0 text-[1rem] text-[var(--color-foreground)] h-full focus:outline-none"
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
                  {identifierError && <p className="text-[#ef4444] text-[0.85rem] -mt-[0.75rem] mb-[0.5rem] font-medium animate-[fadeIn_0.2s_ease-in] max-w-[80%] mx-auto w-full">{identifierError}</p>}

                  <button 
                    type="submit" 
                    className="bg-[var(--color-foreground)] text-[var(--color-background)] py-[1rem] px-[1.5rem] font-medium text-[1rem] border-none rounded-[4px] flex items-center justify-center gap-[0.75rem] w-full max-w-[80%] mx-auto mt-[2.5rem] mb-0 cursor-pointer transition-[opacity,transform] duration-200 ease-in hover:not(:disabled):opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                    disabled={!isIdentifierValid}
                  >
                    Continue <span>&rarr;</span>
                  </button>
                  <p className="text-[0.75rem] text-[var(--color-text-muted)] text-center mt-[1.25rem] leading-[1.5]">
                    By continuing, you agree to the <a href="/terms-of-service" className="text-[var(--color-foreground)] underline underline-offset-2">Terms of Service</a> and <a href="/privacy-policy" className="text-[var(--color-foreground)] underline underline-offset-2">Privacy Policy</a>
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
                <button type="button" className="bg-none border-none p-0 text-[var(--color-text-muted)] text-[0.875rem] cursor-pointer flex items-center gap-[0.5rem] mb-[2rem] transition-colors duration-200 ease-in hover:text-[var(--color-foreground)]" onClick={() => setStep('identifier')}>
                  <ChevronLeft size={16} /> Back
                </button>
                <div className="mb-[2.5rem] text-center">
                  <h1 className="text-[1.5rem] font-medium mb-[0.5rem] tracking-[-0.02em]">Welcome back</h1>
                  <p className="text-[var(--color-text-muted)] text-[1rem]">Please enter your password to continue.</p>
                </div>
                
                <div className="p-[1rem] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-none flex justify-between items-center mb-[1.5rem]">
                  <span className="font-medium">{identifier}</span>
                  <button type="button" className="bg-none border-none text-[var(--color-text-muted)] text-[0.875rem] underline cursor-pointer" onClick={() => setStep('identifier')}>Edit</button>
                </div>

                <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-[1.5rem] w-full">
                  <FormInput 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button type="button" className="text-[var(--color-text-muted)] text-[0.875rem] underline underline-offset-4 bg-none border-none p-0 cursor-pointer text-left transition-colors duration-200 ease-in hover:text-[var(--color-foreground)]">Forgot password?</button>
                  <div className="flex flex-col gap-[1rem] mt-[1rem]">
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
                <button type="button" className="bg-none border-none p-0 text-[var(--color-text-muted)] text-[0.875rem] cursor-pointer flex items-center gap-[0.5rem] mb-[2rem] transition-colors duration-200 ease-in hover:text-[var(--color-foreground)]" onClick={() => setStep('identifier')}>
                  <ChevronLeft size={16} /> Back
                </button>
                <div className="mb-[2.5rem] text-center">
                  <h1 className="text-[1.5rem] font-medium mb-[0.5rem] tracking-[-0.02em]">Verify your account</h1>
                  <p className="text-[var(--color-text-muted)] text-[1rem]">We've sent a 6-digit code to {identifier}.</p>
                </div>

                <form onSubmit={handleOtpSubmit} className="flex flex-col gap-[1.5rem] w-full">
                  <div className="flex gap-[0.5rem] justify-center">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <input
                        key={`otp-${index}`}
                        id={`otp-${index}`}
                        type="text"
                        className="w-[3rem] h-[3.5rem] text-center text-[1.5rem] border border-[var(--color-border)] bg-transparent text-[var(--color-foreground)] focus:outline-none focus:border-[var(--color-foreground)]"
                        maxLength="1"
                        value={otp[index]}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        required
                      />
                    ))}
                  </div>
                  {otpError && <p className="text-[#ef4444] text-[0.85rem] mt-[0.5rem] mb-[0.5rem] font-medium text-center animate-[fadeIn_0.2s_ease-in]">{otpError}</p>}
                  <div className="flex flex-col gap-[1rem] mt-[1rem]">
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
                <div className="mb-[2.5rem] text-center">
                  <h1 className="text-[1.5rem] font-medium mb-[0.5rem] tracking-[-0.02em]">Create Password</h1>
                  <p className="text-[var(--color-text-muted)] text-[1rem]">Secure your new account with a strong password.</p>
                </div>

                <form onSubmit={handleCreatePasswordSubmit} className="flex flex-col gap-[1.5rem] w-full">
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
                  <div className="flex flex-col gap-[1rem] mt-[1rem]">
                    <Button type="submit" fullWidth>Create Account</Button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* STEP 3: DELIVERY DETAILS */}
            {step === 'delivery_details' && (
              <motion.div
                key="step-delivery-details"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-[2.5rem] text-center">
                  <h1 className="text-[1.5rem] font-medium mb-[0.5rem] tracking-[-0.02em]">Delivery Details</h1>
                  <p className="text-[var(--color-text-muted)] text-[1rem]">Where should we send your orders?</p>
                </div>

                <form onSubmit={handleDeliverySubmit} className="flex flex-col gap-[2rem] w-full mt-[1rem]">
                  
                  {/* Contact Section */}
                  <div className="flex flex-col gap-[1.5rem]">
                    <div className="flex items-center gap-4">
                      <div className="h-[1px] flex-1 bg-[var(--color-border)]"></div>
                      <span className="text-[0.75rem] uppercase tracking-[0.1em] text-[var(--color-text-muted)] font-medium">Contact Info</span>
                      <div className="h-[1px] flex-1 bg-[var(--color-border)]"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.5rem]">
                      <FormInput type="text" name="fullName" placeholder="Full Name" value={deliveryDetails.fullName} onChange={handleDeliveryChange} required />
                      <FormInput type="email" name="email" placeholder="Email Address" value={deliveryDetails.email} onChange={handleDeliveryChange} required />
                    </div>
                  </div>

                  {/* Shipping Section */}
                  <div className="flex flex-col gap-[1.5rem]">
                    <div className="flex items-center gap-4">
                      <div className="h-[1px] flex-1 bg-[var(--color-border)]"></div>
                      <span className="text-[0.75rem] uppercase tracking-[0.1em] text-[var(--color-text-muted)] font-medium">Shipping Address</span>
                      <div className="h-[1px] flex-1 bg-[var(--color-border)]"></div>
                    </div>
                    <FormInput type="text" name="address1" placeholder="Address Line 1" value={deliveryDetails.address1} onChange={handleDeliveryChange} required />
                    <FormInput type="text" name="address2" placeholder="Address Line 2 (Optional)" value={deliveryDetails.address2} onChange={handleDeliveryChange} />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-[1.5rem]">
                      <FormInput type="text" name="city" placeholder="City" value={deliveryDetails.city} onChange={handleDeliveryChange} required />
                      <FormInput type="text" name="state" placeholder="State" value={deliveryDetails.state} onChange={handleDeliveryChange} required />
                      <FormInput type="text" name="pincode" placeholder="PIN Code" value={deliveryDetails.pincode} onChange={handleDeliveryChange} required />
                    </div>
                  </div>

                  <div className="flex flex-col gap-[1rem] mt-[0.5rem]">
                    <Button type="submit" fullWidth>Save & Continue</Button>
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
