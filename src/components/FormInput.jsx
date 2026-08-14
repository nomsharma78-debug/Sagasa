"use client";

import { useState } from 'react';

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

  const baseInputClass = "w-full p-4 [font-family:var(--font-body)] text-base text-[var(--color-foreground)] bg-transparent border border-[var(--color-border)] rounded transition-all duration-200 outline-none focus:border-[var(--color-accent)] focus:shadow-[0_0_0_1px_var(--color-accent)] placeholder:text-[var(--color-text-muted)] placeholder:opacity-60";

  return (
    <div className={`flex flex-col gap-2 mb-6 w-full ${isFocused ? 'focused' : ''} ${value ? 'has-value' : ''}`}>
      <label className={`[font-family:var(--font-body)] text-sm font-medium transition-colors duration-200 ease-in-out ${isFocused ? 'text-[var(--color-accent)]' : 'text-[var(--color-foreground)]'}`} htmlFor={name}>
        {label} {required && <span className="text-[#d32f2f]">*</span>}
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
          className={`${baseInputClass} resize-y min-h-[100px]`}
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
          className={baseInputClass}
        />
      )}
    </div>
  );
};

export default FormInput;
