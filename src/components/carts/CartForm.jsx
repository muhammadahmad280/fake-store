// src/components/carts/CartForm.jsx
import React, { useState, useEffect } from "react";
import InputField from "./InputField"; // Adjust path if InputField is not in common
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

// Helper for deep updating state (can be a utility function if used often)
const updateNested = (setState, path, value) => {
  setState((prev) => {
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

const CartForm = ({ initialData, onSubmit, onCancel, submitButtonText, productsList }) => {
  const [formData, setFormData] = useState(initialData);

  // Update form data if initialData changes (e.g., when editing a different cart)
  useEffect(() => {
    // Ensure deep copy for products array if initialData is reused for multiple edits
    setFormData({
      ...initialData,
      products: initialData.products ? initialData.products.map(p => ({...p})) : []
    });
  }, [initialData]);

  const handleProductChange = (idx, field, value) => {
    setFormData((prev) => {
      const productsArray = [...prev.products];
      productsArray[idx] = { ...productsArray[idx], [field]: value };
      return { ...prev, products: productsArray };
    });
  };

  const handleAddProduct = () => {
    setFormData((prev) => ({
      ...prev,
      products: [...prev.products, { productId: "", quantity: 1 }],
    }));
  };

  const handleRemoveProduct = (idx) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmitInternal = (e) => {
    e.preventDefault();

    const filteredProducts = formData.products.filter((p) => p.productId);
    if (!filteredProducts.length) {
      alert("Please add at least one product to the cart!");
      return;
    }

    // Prepare payload by parsing string values to numbers as needed by API
    const payload = {
      userId: Number(formData.userId),
      date: formData.date,
      products: filteredProducts.map((p) => ({
        productId: Number(p.productId),
        quantity: Number(p.quantity),
      })),
    };

    onSubmit(payload); // Call the onSubmit prop passed from parent (CartsDashboard)
  };

  const productOptions = Object.values(productsList || {}); // Ensure productList is an array of objects

  return (
    <form onSubmit={handleSubmitInternal} className="space-y-4">
      <InputField
        label="User ID"
        type="number"
        value={formData.userId}
        onChange={(e) => updateNested(setFormData, "userId", e.target.value)}
        required
        min="1"
        
      />
      <InputField
        label="Date"
        type="date"
        value={formData.date}
        onChange={(e) => updateNested(setFormData, "date", e.target.value)}
        required
      />

      <h3 className="text-lg font-semibold mt-4 text-gray-800">Products in Cart:</h3>
      {formData.products.map((item, idx) => (
        <div key={idx} className="flex items-end gap-2 mb-2">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product:
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
              value={item.productId}
              onChange={(e) => handleProductChange(idx, "productId", e.target.value)}
              required
            >
              <option value="">Select Product</option>
              {productOptions.map((prod) => (
                <option key={prod.id} value={prod.id}>
                  {prod.title} (ID: {prod.id})
                </option>
              ))}
            </select>
          </div>
          <InputField
            label="Qty"
            type="number"
            value={item.quantity}
            onChange={(e) => handleProductChange(idx, "quantity", e.target.value)}
            required
            min="1"
            className="w-24"
          />
          {formData.products.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemoveProduct(idx)}
              className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 self-center"
              title="Remove Product"
            >
              <MinusIcon className="w-5 h-5" />
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddProduct}
        className="flex items-center justify-center px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-2"
      >
        <PlusIcon className="w-5 h-5 inline mr-1" /> Add Another Product
      </button>

      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {submitButtonText}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CartForm;