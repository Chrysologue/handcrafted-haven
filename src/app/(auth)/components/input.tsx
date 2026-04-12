'use client';

import React from "react";

interface InputFormProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export default function InputForm({ name, icon, ...props }: InputFormProps) {
  return (
    <div className="w-full mb-4 relative">

      {/* Icon */}
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}

      {/* Input */}
      <input
        id={name}
        name={name}
        {...props}
        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      />
    </div>
  );
}