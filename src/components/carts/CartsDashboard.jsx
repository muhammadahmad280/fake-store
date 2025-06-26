// src/components/carts/CartsDashboard.jsx
import React, { useState } from "react";
import useCartsData from "../../hooks/useCartsData";
import Modal from "./Modal"; // Adjust path if Modal is not in common
import CartForm from "./CartForm"; // Import the new CartForm component
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";

function CartsDashboard() {
  const {
    carts,
    products, // Ensure this `products` object/map is structured { productId: { ...productData } }
    loading,
    error,
    createCart,
    updateCart,
    deleteCart,
  } = useCartsData();

  const initialCartState = {
    userId: 1,
    date: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
    products: [{ productId: "", quantity: 1 }],
  };

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCart, setEditingCart] = useState(null); // Holds the cart object being edited

  const handleCreateCart = async (cartData) => {
    try {
      await createCart(cartData);
      alert("Cart created successfully!");
      setShowCreateModal(false);
    } catch (err) {
      alert(`Failed to create cart: ${err.message}`);
      console.error("Create cart error:", err);
    }
  };

  const handleUpdateCart = async (cartData) => {
    if (!editingCart || !editingCart.id) return; // Should not happen
    try {
      await updateCart(editingCart.id, cartData);
      alert("Cart updated successfully!");
      setEditingCart(null); // Close modal
    } catch (err) {
      alert(`Failed to update cart: ${err.message}`);
      console.error("Update cart error:", err);
    }
  };

  const handleDeleteCart = async (id) => {
    if (confirm("Are you sure you want to delete this cart?")) {
      try {
        await deleteCart(id);
        alert("Cart deleted successfully.");
      } catch (err) {
        alert(`Error deleting cart: ${err.message}`);
        console.error("Delete cart error:", err);
      }
    }
  };

  const startEditing = (cart) => {
    // Deep clone and format data for the CartForm
    setEditingCart({
      ...cart,
      date: new Date(cart.date).toISOString().slice(0, 10), // Format for input type="date"
      products: cart.products.map((p) => ({
        productId: String(p.productId), // Convert to string for <select> value
        quantity: String(p.quantity), // Convert to string for <input type="number"> value
      })),
    });
    setShowCreateModal(false); // Close create modal if it was open
  };

  const cancelEditing = () => {
    setEditingCart(null);
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-red-600 text-center mt-10">Error: {error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">🛒 All Carts</h1>
        <button
          onClick={() => {
            setEditingCart(null); // Clear any active editing state
            setShowCreateModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <PlusIcon className="w-5 h-5 inline mr-1" /> Add Cart
        </button>
      </div>

      {/* Add New Cart Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Add New Cart"
      >
        <CartForm
          initialData={initialCartState}
          onSubmit={handleCreateCart}
          onCancel={() => setShowCreateModal(false)}
          submitButtonText="Create Cart"
          productsList={products} // Pass the products data to the form
        />
      </Modal>

      {/* Edit Cart Modal */}
      {editingCart && ( // Only render if a cart is being edited
        <Modal
          isOpen={!!editingCart}
          onClose={cancelEditing}
          title={`Edit Cart #${editingCart.id}`}
        >
          <CartForm
            initialData={editingCart}
            onSubmit={handleUpdateCart}
            onCancel={cancelEditing}
            submitButtonText="Update Cart"
            productsList={products} // Pass the products data to the form
          />
        </Modal>
      )}

      {/* Carts Table */}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-black">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">User</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Images</th>
              <th className="px-6 py-3 text-left">Titles</th>
              <th className="px-6 py-3 text-left">Qty</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {carts.map((cart) => (
              <tr key={cart.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold text-blue-600">
                  #{cart.id}
                </td>
                <td className="text-black px-6 py-4">{cart.userId}</td>
                <td className="text-black px-6 py-4">
                  {new Date(cart.date).toLocaleDateString()}
                </td>
                <td className="text-black px-6 py-4">
                  <div className="flex gap-1">
                    {cart.products.map((p, i) => (
                      <img
                        key={i}
                        src={products[p.productId]?.image}
                        alt={products[p.productId]?.title || "Product image"}
                        className="w-10 h-10 object-contain border rounded"
                      />
                    ))}
                  </div>
                </td>
                <td className="text-black px-6 py-4">
                  {cart.products.map((p, i) => (
                    <div key={i}>{products[p.productId]?.title}</div>
                  ))}
                </td>
                <td className="text-black px-6 py-4">
                  {cart.products.map((p, i) => (
                    <div key={i}>x{p.quantity}</div>
                  ))}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => startEditing(cart)}
                      className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full"
                      title="Edit Cart"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteCart(cart.id)}
                      className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full"
                      title="Delete Cart"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CartsDashboard;
