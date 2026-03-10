import React from 'react';

const Button = ({ children, variant = "primary", size = "md", onClick, className = "", type = "button" }) => {
  const variants = {
    primary: "bg-primary text-white hover:opacity-90 shadow-lg shadow-primary/20",
    outline: "bg-white border-2 border-primary text-primary hover:bg-primary/5",
    ghost: "text-slate-600 hover:text-primary",
  };

  const sizes = {
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-full font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
