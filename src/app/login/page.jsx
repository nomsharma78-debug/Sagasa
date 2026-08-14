"use client";

import { useState } from 'react';
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
    <div className="grid grid-cols-1 min-h-[50vh] min-[900px]:grid-cols-[4fr_6fr] min-[900px]:h-[650px] min-[900px]:mt-0">
      
      {/* LEFT SIDE: Image & Marketing */}
      <div className="relative block bg-[var(--color-background)] overflow-hidden h-[350px] min-[900px]:mt-[20px] min-[900px]:ml-[20px] min-[900px]:rounded-[12px] min-[900px]:h-full">
        <div className="relative w-full h-full">
          <img src="/login-couple.jpg" alt="Stylish couple in denim" className="w-full h-full object-cover object-[center_20%]" />
          <div className="absolute bottom-0 left-0 right-0 py-[4rem] px-[3rem] bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-[rgba(0,0,0,0)] text-white">
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
      <div className="flex flex-col justify-center items-center py-[40px] px-[20px] bg-[var(--color-background)] relative -mt-[40px] rounded-t-[32px] rounded-b-none z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] min-[900px]:py-[20px] min-[900px]:px-[60px] min-[900px]:mt-0 min-[900px]:rounded-none min-[900px]:shadow-none">
        <div className="w-full max-w-full">
          
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
                  <h1 className="text-[1rem] font-medium mb-[0.75rem] tracking-[-0.03em]">Log in/sign up</h1>
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
                  <div className="flex gap-[0.5rem] justify-between">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <input
                        key={`otp-${index}`}
                        id={`otp-${index}`}
                        type="text"
                        className="w-[3rem] h-[3.5rem] text-center text-[1.5rem] border border-[var(--color-border)] bg-transparent text-[var(--color-foreground)] focus:outline-none focus:border-[var(--color-foreground)]"
                        maxLength="1"
                        value={otp[index]}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        required
                      />
                    ))}
                  </div>
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

          </AnimatePresence>

        </div>
      </div>
    </div>
  );
};

export default Login;
