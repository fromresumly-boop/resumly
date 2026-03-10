import React, { useState } from 'react';

const Input = ({ label, type = "text", value, onChange, error, name, required }) => {
  const [isFocused, setIsFocused] = useState(false);

  // Label should float up if focused OR if there's a value
  const isFloating = isFocused || (value && value.toString().length > 0);

  return (
    <div className="w-full">
      <div className="relative">
        <input
          name={name}
          type={type}
          value={value}
          required={required}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            const trimmed = e.target.value.trim();
            if (onChange) {
               onChange({ target: { value: trimmed } });
            }
          }}
          className={`w-full pt-6 pb-2 px-4 rounded-xl border bg-white outline-none transition-all duration-200
            ${error ? 'border-red-500 ring-2 ring-red-500/10' : 'border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20'}
          `}
        />
        <label
          className={`absolute left-4 transition-all duration-200 pointer-events-none
            ${isFloating 
              ? 'top-1.5 text-xs text-primary font-medium' 
              : 'top-1/2 -translate-y-1/2 text-sm text-slate-400'
            }
          `}
        >
          {label}
        </label>
      </div>
      {error && <p className="text-red-500 text-xs mt-1.5 ml-1">{error}</p>}
    </div>
  );
};

export default Input;
