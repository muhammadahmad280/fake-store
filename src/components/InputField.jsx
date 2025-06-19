// src/components/InputField.jsx
import React from "react";

const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  required = false,
  step,
  placeholder,
  min,
  max,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      step={step}
      placeholder={placeholder}
      min={min}
      max={max}
      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-black dark:text-white"
    />
  </div>
);

export default InputField;
