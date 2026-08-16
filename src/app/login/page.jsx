"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Leaf, Shirt, Recycle, ShieldCheck, Truck, RefreshCw, 
  Tag, User, Mail, MapPin, Building, Hash, Lock, ChevronDown, ArrowRight, ChevronLeft
} from 'lucide-react';

// Custom Form Input Component matching the screenshot
const IconInput = ({ icon: Icon, placeholder, type = "text", ...props }) => (
  <div className="relative w-full">
    {Icon && (
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A0A0A0]">
        <Icon size={18} strokeWidth={1.5} />
      </div>
    )}
    <input 
      type={type}
      placeholder={placeholder}
      className={`w-full ${Icon ? 'pl-11' : 'pl-4'} pr-4 py-3.5 rounded-lg border border-[#EAEAEA] text-[#333] text-[0.95rem] focus:outline-none focus:border-[#A6937A] transition-colors placeholder:text-[#A0A0A0]`}
      {...props}
    />
  </div>
);

const Login = () => {
  const router = useRouter();
  const [step, setStep] = useState('identifier');
  const [identifier, setIdentifier] = useState('');
  const [identifierError, setIdentifierError] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [deliveryDetails, setDeliveryDetails] = useState({
    fullName: '', email: '', address1: '', address2: '', city: '', state: '', pincode: ''
  });

  // Handle 3-second delay error for incomplete valid numbers
  useEffect(() => {
    const timer = setTimeout(() => {
      if (step === 'identifier' && identifier.length > 0 && identifier.length < 10) {
        if (/^[6-9]/.test(identifier)) {
          setIdentifierError('Please enter correct number');
        }
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [identifier, step]);

  const handleDeliveryChange = (e) => {
    setDeliveryDetails(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleIdentifierSubmit = (e) => {
    e.preventDefault();
    if (identifier.length >= 10) setStep('otp');
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
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
        document.getElementById('otp-0')?.focus();
      }
    } else {
      setOtpError('Please enter complete OTP.');
    }
  };

  const handleDeliverySubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('isAuthenticated', 'true');
    router.push('/profile');
  };

  return (
    <div className="h-screen bg-[#FCFBF8] flex flex-col overflow-hidden">
      {/* Main Content Area filling exact remaining viewport */}
      <div className="flex-1 w-full flex items-center justify-center p-4 lg:p-8 min-h-0">
        <div className="w-full h-full max-h-[720px] max-w-[1400px] grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6 lg:gap-8">
          
          {/* LEFT CARD (Marketing) */}
          <div className="hidden lg:flex flex-col bg-[#F3F1ED] rounded-[24px] overflow-hidden shadow-sm h-full">
            {/* Top Image Section */}
            <div className="relative h-[88%] w-full">
              <Image src="/login-couple.jpg" alt="Sagasa Standard" fill priority className="object-cover object-[center_30%]" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent pointer-events-none"></div>
              
              <div className="absolute top-1/2 left-10 -translate-y-1/2 text-white z-10">
                <h1 className="text-[3.5rem] xl:text-[4rem] leading-[1.05] font-medium font-[family-name:var(--font-display)] mb-8 text-white/95">
                  The<br/>Sagasa<br/>Standard
                </h1>
                
                <div className="flex flex-col gap-4 xl:gap-5">
                  {[
                    { icon: Leaf, text: "Premium 100%<br/>Cotton Denim" },
                    { icon: Shirt, text: "Tailored,<br/>Modern Fits" },
                    { icon: Recycle, text: "Sustainably<br/>Crafted" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-[40px] h-[40px] xl:w-[45px] xl:h-[45px] rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                        <item.icon size={18} className="text-white" strokeWidth={1.5} />
                      </div>
                      <span className="font-medium text-[0.95rem] xl:text-[1rem] text-white/90 leading-tight" dangerouslySetInnerHTML={{ __html: item.text }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="h-[12%] w-full flex items-center justify-around px-4 xl:px-6 bg-[#F3F1ED]">
              {[
                { icon: ShieldCheck, title: "Secure Checkout", desc: "Your data is protected" },
                { icon: Truck, title: "Fast Delivery", desc: "Across India" },
                { icon: RefreshCw, title: "Easy Returns", desc: "Hassle free" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 xl:gap-3">
                  <item.icon size={22} className="text-[#333] shrink-0" strokeWidth={1.5} />
                  <div className="flex flex-col">
                    <span className="text-[0.75rem] xl:text-[0.8rem] font-bold text-[#333] leading-tight">{item.title}</span>
                    <span className="text-[0.65rem] xl:text-[0.7rem] text-[#888]">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT CARD (Form Flow) */}
          <div className="bg-white rounded-[24px] shadow-sm border border-[#EAEAEA] p-6 sm:p-8 lg:p-10 h-full overflow-y-auto">
            {/* Promo Banner */}
            <div className="w-full bg-[#F5F3EF] rounded-lg p-3.5 flex items-center gap-3 mb-8 border border-[#EAEAEA] shrink-0">
              <Tag size={18} className="text-[#A6937A]" />
              <span className="font-bold text-[#333] tracking-wide uppercase text-xs shrink-0">NEW</span>
              <span className="text-[#666] text-[0.85rem]">Get 10% off on your first login or registration!</span>
            </div>
          
          <AnimatePresence mode="wait">
            
            {/* STEP 1: IDENTIFIER */}
            {step === 'identifier' && (
              <motion.div
                key="step-identifier"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-[2.2rem] font-medium font-[family-name:var(--font-display)] text-[#222] mb-1">Welcome</h2>
                <p className="text-[#888] text-[0.95rem] mb-10">Please enter your details to continue</p>

                <form onSubmit={handleIdentifierSubmit} className="flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <User size={16} className="text-[#A0A0A0]" strokeWidth={2} />
                    <span className="text-[0.75rem] font-bold text-[#888] tracking-widest uppercase">Login or Register</span>
                    <div className="flex-1 h-[1px] bg-[#EAEAEA]"></div>
                  </div>

                  <div className="flex flex-col gap-1 w-full">
                    <div className={`flex items-center w-full h-[52px] rounded-lg border ${identifierError ? 'border-red-500 bg-red-50/30' : 'border-[#EAEAEA] bg-white focus-within:border-[#A6937A]'} overflow-hidden transition-colors`}>
                      <div className={`flex items-center gap-2 px-4 h-full ${identifierError ? 'bg-red-50' : 'bg-[#F9F9F9]'} border-r ${identifierError ? 'border-red-200' : 'border-[#EAEAEA]'}`}>
                        <span className="flex items-center">
                          <svg viewBox="0 0 100 100" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
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
                        <span className={`font-medium text-[0.95rem] ${identifierError ? 'text-red-700' : 'text-[#333]'}`}>+91</span>
                      </div>
                      <input 
                        type="tel"
                        className={`flex-1 px-4 py-3.5 bg-transparent text-[0.95rem] focus:outline-none placeholder:text-[#A0A0A0] ${identifierError ? 'text-red-700' : 'text-[#333]'}`}
                        placeholder="Mobile Number" 
                        value={identifier}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(/\D/g, '');
                          if (numericValue.length <= 10) {
                            setIdentifier(numericValue);
                            setIdentifierError('');
                            
                            if (numericValue.length > 0 && !/^[6-9]/.test(numericValue[0])) {
                              setIdentifierError('Invalid number');
                            }
                          }
                        }}
                        maxLength={10}
                        required
                      />
                    </div>
                    {identifierError && (
                      <span className="text-red-500 text-xs font-medium pl-1 mt-0.5">{identifierError}</span>
                    )}
                  </div>

                  <button 
                    type="submit" 
                    disabled={identifier.length < 10}
                    className="w-full bg-[#222] text-white py-4 rounded-lg mt-2 font-medium text-[0.95rem] flex items-center justify-center gap-2 transition-colors hover:bg-[#333] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue <ArrowRight size={18} />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[#A0A0A0] mt-2">
                    <Lock size={14} />
                    <span className="text-[0.75rem]">Your information is safe and secure.</span>
                  </div>
                </form>
              </motion.div>
            )}

            {/* STEP 2: OTP */}
            {step === 'otp' && (
              <motion.div
                key="step-otp"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <button type="button" onClick={() => setStep('identifier')} className="flex items-center gap-1 text-[#888] hover:text-[#222] mb-6 text-sm transition-colors">
                  <ChevronLeft size={16}/> Back
                </button>
                <h2 className="text-[2.2rem] font-medium font-[family-name:var(--font-display)] text-[#222] mb-1">Verify OTP</h2>
                <p className="text-[#888] text-[0.95rem] mb-10">We've sent a 6-digit code to <span className="font-medium text-[#333]">{identifier}</span></p>

                <form onSubmit={handleOtpSubmit} className="flex flex-col gap-8">
                  <div className="flex gap-3 justify-center">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <input
                        key={`otp-${index}`}
                        id={`otp-${index}`}
                        type="text"
                        className="w-[3rem] h-[3.5rem] rounded-lg text-center text-[1.25rem] border border-[#EAEAEA] bg-[#FCFBF8] text-[#333] focus:outline-none focus:border-[#A6937A] transition-colors"
                        maxLength="1"
                        value={otp[index]}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        required
                      />
                    ))}
                  </div>
                  
                  {otpError && <p className="text-[#ef4444] text-[0.85rem] font-medium text-center">{otpError}</p>}
                  
                  <button type="submit" className="w-full bg-[#222] text-white py-4 rounded-lg font-medium text-[0.95rem] flex items-center justify-center gap-2 transition-colors hover:bg-[#333]">
                    Verify Code <ArrowRight size={18} />
                  </button>
                </form>
              </motion.div>
            )}

            {/* STEP 3: DELIVERY DETAILS */}
            {step === 'delivery_details' && (
              <motion.div
                key="step-delivery-details"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-[2.2rem] font-medium font-[family-name:var(--font-display)] text-[#222] mb-1">Delivery Details</h2>
                <p className="text-[#888] text-[0.95rem] mb-10">Where should we send your orders?</p>
                
                <form className="flex flex-col gap-6" onSubmit={handleDeliverySubmit}>
                  {/* Contact Info Divider */}
                  <div className="flex items-center gap-3">
                    <User size={16} className="text-[#A0A0A0]" strokeWidth={2} />
                    <span className="text-[0.75rem] font-bold text-[#888] tracking-widest uppercase">Contact Information</span>
                    <div className="flex-1 h-[1px] bg-[#EAEAEA]"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <IconInput icon={User} placeholder="Full Name" name="fullName" value={deliveryDetails.fullName} onChange={handleDeliveryChange} required />
                    <IconInput icon={Mail} placeholder="Email Address" name="email" type="email" value={deliveryDetails.email} onChange={handleDeliveryChange} required />
                  </div>

                  {/* Shipping Address Divider */}
                  <div className="flex items-center gap-3 mt-4">
                    <MapPin size={16} className="text-[#A0A0A0]" strokeWidth={2} />
                    <span className="text-[0.75rem] font-bold text-[#888] tracking-widest uppercase">Shipping Address</span>
                    <div className="flex-1 h-[1px] bg-[#EAEAEA]"></div>
                  </div>
                  
                  <IconInput icon={MapPin} placeholder="Address Line 1" name="address1" value={deliveryDetails.address1} onChange={handleDeliveryChange} required />
                  <IconInput placeholder="Address Line 2 (Optional)" name="address2" value={deliveryDetails.address2} onChange={handleDeliveryChange} />
                  
                  <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-4">
                    <IconInput icon={Building} placeholder="City" name="city" value={deliveryDetails.city} onChange={handleDeliveryChange} required />
                    <div className="relative w-full">
                      <select 
                        name="state" 
                        value={deliveryDetails.state} 
                        onChange={handleDeliveryChange} 
                        required 
                        className={`w-full pl-4 pr-11 py-3.5 rounded-lg border border-[#EAEAEA] text-[0.95rem] focus:outline-none focus:border-[#A6937A] appearance-none bg-transparent relative z-10 cursor-pointer ${deliveryDetails.state ? 'text-[#333]' : 'text-[#A0A0A0]'}`}
                      >
                        <option value="" disabled>State</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>
                        <option disabled>--- Union Territories ---</option>
                        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                        <option value="Ladakh">Ladakh</option>
                        <option value="Lakshadweep">Lakshadweep</option>
                        <option value="Puducherry">Puducherry</option>
                      </select>
                      <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A0A0A0] z-0" />
                    </div>
                    <IconInput icon={Hash} placeholder="PIN Code" name="pincode" value={deliveryDetails.pincode} onChange={handleDeliveryChange} required />
                  </div>

                  <button type="submit" className="w-full bg-[#222] text-white py-4 rounded-lg mt-6 font-medium text-[0.95rem] flex items-center justify-center gap-2 transition-colors hover:bg-[#333]">
                    Save Address <ArrowRight size={18} />
                  </button>
                  
                  <div className="flex items-center justify-center gap-2 text-[#A0A0A0] mt-2">
                    <Lock size={14} />
                    <span className="text-[0.75rem]">Your information is safe and secure.</span>
                  </div>
                </form>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Login;
