// src/components/users/UserForm.jsx
import React, { useState, useEffect } from "react";
import InputField from "./InputField"; // Adjust path as needed

// Helper for updating nested state (can be a global utility if used frequently)
const updateNestedState = (setState, path, value) => {
  setState((prev) => {
    const newState = { ...prev };
    const keys = path.split(".");
    let current = newState;
    for (let i = 0; i < keys.length - 1; i++) {
      current[keys[i]] = { ...current[keys[i]] }; // Ensure immutable update for nested objects
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value; // Update the final property
    return newState;
  });
};

const UserForm = ({ initialData, onSubmit, onCancel, submitButtonText }) => {
  const [formData, setFormData] = useState(initialData);

  // Update form data when initialData prop changes (e.g., when editing a different user)
  useEffect(() => {
    // Deep clone initialData to avoid direct mutation of props
    setFormData(JSON.parse(JSON.stringify(initialData)));
  }, [initialData]);

  const handleSubmitInternal = (e) => {
    e.preventDefault();

    // Format data before submitting (parsing numbers, etc.)
    const formattedUser = {
      ...formData,
      address: {
        ...formData.address,
        number: parseInt(formData.address.number || 0, 10), // Ensure number is parsed
        geolocation: {
          lat: parseFloat(formData.address.geolocation.lat || 0).toFixed(2),
          long: parseFloat(formData.address.geolocation.long || 0).toFixed(2),
        },
      },
    };
    onSubmit(formattedUser); // Call the onSubmit prop with formatted data
  };

  return (
    <form onSubmit={handleSubmitInternal} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="First Name"
          value={formData.name.firstname}
          onChange={(e) => updateNestedState(setFormData, "name.firstname", e.target.value)}
          required
        />
        <InputField
          label="Last Name"
          value={formData.name.lastname}
          onChange={(e) => updateNestedState(setFormData, "name.lastname", e.target.value)}
          required
        />
        <InputField
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => updateNestedState(setFormData, "email", e.target.value)}
          required
        />
        <InputField
          label="Username"
          value={formData.username}
          onChange={(e) => updateNestedState(setFormData, "username", e.target.value)}
          required
        />
        <InputField
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => updateNestedState(setFormData, "password", e.target.value)}
          required
        />
        <InputField
          label="Phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => updateNestedState(setFormData, "phone", e.target.value)}
          required
        />
        <InputField
          label="City"
          value={formData.address.city}
          onChange={(e) => updateNestedState(setFormData, "address.city", e.target.value)}
          required
        />
        <InputField
          label="Street"
          value={formData.address.street}
          onChange={(e) => updateNestedState(setFormData, "address.street", e.target.value)}
          required
        />
        <InputField
          label="Street Number"
          type="number"
          value={formData.address.number}
          onChange={(e) => updateNestedState(setFormData, "address.number", e.target.value)}
          required
          min="0"
        />
        <InputField
          label="Zipcode"
          value={formData.address.zipcode}
          onChange={(e) => updateNestedState(setFormData, "address.zipcode", e.target.value)}
          required
        />
        <InputField
          label="Latitude"
          type="number"
          step="0.01"
          value={formData.address.geolocation.lat}
          onChange={(e) =>
            updateNestedState(setFormData, "address.geolocation.lat", e.target.value)
          }
        />
        <InputField
          label="Longitude"
          type="number"
          step="0.01"
          value={formData.address.geolocation.long}
          onChange={(e) =>
            updateNestedState(setFormData, "address.geolocation.long", e.target.value)
          }
        />
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md font-semibold text-white shadow"
        >
          {submitButtonText}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md font-semibold text-white shadow"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UserForm;