// src/components/ProductForm.jsx
import React from "react";
import InputField from "./InputField";

const ProductForm = ({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  isEdit = false,
}) => {
  const updateNestedState = (path, value) => {
    setFormData((prev) => {
      const updated = { ...prev };
      const keys = path.split(".");
      let current = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      current[keys.at(-1)] = value;
      return updated;
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Title"
          value={formData.title}
          onChange={(e) => updateNestedState("title", e.target.value)}
          required
        />
        <InputField
          label="Price"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={(e) => updateNestedState("price", e.target.value)}
          required
        />
        <InputField
          label="Category"
          value={formData.category}
          onChange={(e) => updateNestedState("category", e.target.value)}
          required
        />
        <InputField
          label="Image URL"
          value={formData.image}
          onChange={(e) => updateNestedState("image", e.target.value)}
          required
        />
        <InputField
          label="Rating Rate"
          type="number"
          step="0.1"
          value={formData.rating.rate}
          onChange={(e) => updateNestedState("rating.rate", e.target.value)}
        />
        <InputField
          label="Rating Count"
          type="number"
          value={formData.rating.count}
          onChange={(e) => updateNestedState("rating.count", e.target.value)}
        />
      </div>
      <InputField
        label="Description"
        value={formData.description}
        onChange={(e) => updateNestedState("description", e.target.value)}
        required
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {isEdit ? "Update" : "Create"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
