// src/components/CartsDashboard.jsx
import React, { useState } from "react";
import useCartsData from "../hooks/useCartsData";
import CartCard from "./CartCard";
import InputField from "./InputField";

function CartsDashboard() {
  const {
    carts,
    products,
    loading,
    error,
    createCart,
    updateCart,
    deleteCart,
  } = useCartsData();

  const initialNewCartState = {
    userId: 1,
    date: new Date().toISOString().slice(0, 10),
    products: [{ productId: "", quantity: 1 }],
  };

  const [newCart, setNewCart] = useState(initialNewCartState);
  const [editingCartId, setEditingCartId] = useState(null);
  const [currentEditCart, setCurrentEditCart] = useState(null);
  const [showAddCartForm, setShowAddCartForm] = useState(false);

  const updateNestedState = (setState, path, value) => {
    setState((prev) => {
      const updated = { ...prev };
      const keys = path.split(".");
      let ref = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        ref[keys[i]] = { ...ref[keys[i]] };
        ref = ref[keys[i]];
      }
      ref[keys.at(-1)] = value;
      return updated;
    });
  };

  const handleProductChange = (setForm, form, index, field, value) => {
    setForm((prev) => {
      const products = [...prev.products];
      products[index] = { ...products[index], [field]: value };
      return { ...prev, products };
    });
  };

  const handleAddProduct = (setForm) => {
    setForm((prev) => ({
      ...prev,
      products: [...prev.products, { productId: "", quantity: 1 }],
    }));
  };

  const handleRemoveProduct = (setForm, index) => {
    setForm((prev) => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index),
    }));
  };

  const submitCart = async (form, mode) => {
    const productsToSubmit = form.products
      .filter((p) => p.productId)
      .map((p) => ({
        productId: +p.productId,
        quantity: +p.quantity,
      }));

    if (!productsToSubmit.length) {
      alert("Please add at least one product.");
      return;
    }

    const payload = {
      userId: +form.userId,
      date: form.date,
      products: productsToSubmit,
    };

    try {
      if (mode === "create") {
        await createCart(payload);
        setNewCart(initialNewCartState);
        setShowAddCartForm(false);
        alert("Cart created successfully!");
      } else {
        await updateCart(editingCartId, payload);
        setEditingCartId(null);
        setCurrentEditCart(null);
        alert("Cart updated successfully!");
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleDeleteCart = async (cartId) => {
    if (window.confirm(`Delete Cart #${cartId}?`)) {
      try {
        await deleteCart(cartId);
        alert("Cart deleted.");
      } catch (err) {
        alert(`Error: ${err.message}`);
      }
    }
  };

  const startEditingCart = (cart) => {
    setEditingCartId(cart.id);
    setCurrentEditCart({
      ...JSON.parse(JSON.stringify(cart)),
      date: new Date(cart.date).toISOString().slice(0, 10),
    });
    setShowAddCartForm(false);
  };

  const cancelEditing = () => {
    setEditingCartId(null);
    setCurrentEditCart(null);
  };

  const availableProductIds = Object.keys(products)
    .map(Number)
    .sort((a, b) => a - b);

  if (loading)
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          Loading carts...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-full bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 p-4 rounded-lg shadow-lg">
        <p className="text-xl font-bold">Error: {error}</p>
      </div>
    );

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-3xl font-extrabold text-center mb-8 text-blue-700 dark:text-blue-400">
        All Shopping Carts
      </h1>

      {!showAddCartForm && (
        <div className="mb-6 text-center">
          <button
            onClick={() => {
              setShowAddCartForm(true);
              cancelEditing();
            }}
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-md shadow-lg hover:bg-blue-700"
          >
            Add New Cart
          </button>
        </div>
      )}

      {showAddCartForm && (
        <CartForm
          title="Add New Cart"
          form={newCart}
          setForm={setNewCart}
          onSubmit={() => submitCart(newCart, "create")}
          onCancel={() => setShowAddCartForm(false)}
          availableProductIds={availableProductIds}
          products={products}
          updateNestedState={updateNestedState}
          handleAddProduct={handleAddProduct}
          handleRemoveProduct={handleRemoveProduct}
          handleProductChange={handleProductChange}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {carts.map((cart) =>
          editingCartId === cart.id ? (
            <CartForm
              key={cart.id}
              title={`Edit Cart #${cart.id}`}
              form={currentEditCart}
              setForm={setCurrentEditCart}
              onSubmit={() => submitCart(currentEditCart, "edit")}
              onCancel={cancelEditing}
              availableProductIds={availableProductIds}
              products={products}
              updateNestedState={updateNestedState}
              handleAddProduct={handleAddProduct}
              handleRemoveProduct={handleRemoveProduct}
              handleProductChange={handleProductChange}
              isEdit
            />
          ) : (
            <CartCard
              key={cart.id}
              cart={cart}
              onDelete={handleDeleteCart}
              onEdit={startEditingCart}
            />
          )
        )}
      </div>
    </div>
  );
}

function CartForm({
  title,
  form,
  setForm,
  onSubmit,
  onCancel,
  availableProductIds,
  products,
  updateNestedState,
  handleAddProduct,
  handleRemoveProduct,
  handleProductChange,
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300">
        {title}
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="space-y-4"
      >
        <InputField
          label="User ID"
          type="number"
          value={form.userId}
          onChange={(e) => updateNestedState(setForm, "userId", e.target.value)}
          required
          min="1"
        />
        <InputField
          label="Cart Date"
          type="date"
          value={form.date}
          onChange={(e) => updateNestedState(setForm, "date", e.target.value)}
          required
        />

        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Products:
        </h3>
        <div className="space-y-3 border p-3 rounded-md border-gray-200 dark:border-gray-600">
          {form.products.map((item, index) => (
            <div key={index} className="flex space-x-2 items-end">
              <div className="flex-grow">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Product:
                </label>
                <select
                  value={item.productId}
                  onChange={(e) =>
                    handleProductChange(
                      setForm,
                      form,
                      index,
                      "productId",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                  required
                >
                  <option value="">Select Product</option>
                  {availableProductIds.map((pId) => (
                    <option key={pId} value={pId}>
                      {products[pId]?.title || `Product ${pId}`}
                    </option>
                  ))}
                </select>
              </div>
              <InputField
                label="Quantity"
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  handleProductChange(
                    setForm,
                    form,
                    index,
                    "quantity",
                    e.target.value
                  )
                }
                required
                min="1"
              />
              {form.products.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveProduct(setForm, index)}
                  className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 self-center"
                  title="Remove Product"
                >
                  &times;
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddProduct(setForm)}
            className="mt-2 px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Product
          </button>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CartsDashboard;
