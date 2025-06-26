// src/components/InputField.jsx
import React from "react";

const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  required = false,
  step = null,
  placeholder = "",
}) => (
  <div className="w-full">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}:</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-500"
      required={required}
      step={step}
      placeholder={placeholder}
    />
  </div>
);

export default InputField;