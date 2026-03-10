import React from 'react';

const Badge = ({ children, variant = "primary", className = "" }) => {
  const variants = {
    primary: "bg-primary/10 text-primary",
    success: "bg-emerald-100 text-emerald-700",
    blue: "bg-blue-100 text-blue-700",
    slate: "bg-slate-100 text-slate-600",
  };

  return (
    <span className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-sm whitespace-nowrap ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
