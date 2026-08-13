"use client";

import { useState } from 'react';
import './FormInput.css';

const FormInput = ({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  placeholder = '', 
  required = false,
  isTextarea = false,
  rows = 4
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className={`form-group ${isFocused ? 'focused' : ''} ${value ? 'has-value' : ''}`}>
      <label className="form-label" htmlFor={name}>
        {label} {required && <span className="required">*</span>}
      </label>
      {isTextarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          required={required}
          className="form-control"
          rows={rows}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          required={required}
          className="form-control"
        />
      )}
    </div>
  );
};

export default FormInput;
