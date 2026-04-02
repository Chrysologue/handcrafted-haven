'use client';

import React, { useState } from "react";

interface InputFormProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function InputForm(props: InputFormProps) {
  const [value, setValue] = useState("");

  return (
    <div className="flex flex-col w-full">
    <label htmlFor={props.name}>{props.name}</label>
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="p-2 my-4 bg-gray-900 rounded" 
      />
    </div>
  );
}