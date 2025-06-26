// src/components/common/InputField.jsx
import React from "react";

const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  required = false,
  step = null,
  placeholder = null,
  className = "",
  min = null, // Added for number inputs
  max = null, // Added for number inputs
}) => {
  const inputId = label.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-input"; // Sanitize ID

  return (
    <div className="w-full">
      <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
        {label}:
      </label>
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-500 ${className}`}
        required={required}
        step={step}
        placeholder={placeholder}
        min={min}
        max={max}
      />
    </div>
  );
};

export default InputField;