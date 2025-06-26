// src/pages/ProductsDashboard.jsx
import React, { useState } from "react";
import useProductsData from "../../hooks/useProductsData";
import Modal from "./Modal";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import ProductForm from "./ProductForm";

const initialProductState = {
  title: "",
  price: "",
  description: "",
  category: "",
  image: "",
  rating: { rate: "", count: "" },
};

function ProductsDashboard() {
  const {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProductsData();

  const [newProduct, setNewProduct] = useState(initialProductState);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const formatted = {
        ...newProduct,
        price: parseFloat(newProduct.price),
        rating: {
          rate: parseFloat(newProduct.rating.rate),
          count: parseInt(newProduct.rating.count, 10),
        },
      };
      await createProduct(formatted);
      setNewProduct(initialProductState);
      setShowAddModal(false);
      alert("Product created successfully!");
    } catch (err) {
      alert("Create failed: " + err.message);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const formatted = {
        ...editProduct,
        price: parseFloat(editProduct.price),
        rating: {
          rate: parseFloat(editProduct.rating.rate),
          count: parseInt(editProduct.rating.count, 10),
        },
      };
      await updateProduct(editingProductId, formatted);
      setEditProduct(null);
      setEditingProductId(null);
      alert("Product updated successfully!");
    } catch (err) {
      alert("Update failed: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        alert("Product deleted successfully!");
      } catch (err) {
        alert("Delete failed: " + err.message);
      }
    }
  };

  const startEdit = (product) => {
    setEditingProductId(product.id);
    setEditProduct({
      ...product,
      price: product.price.toString(),
      rating: {
        rate: product.rating?.rate?.toString() || "",
        count: product.rating?.count?.toString() || "",
      },
    });
  };

  const cancelEdit = () => {
    setEditingProductId(null);
    setEditProduct(null);
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold text-blue-600">📦 All Products</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Product
        </button>
      </div> 

      {/* Add Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)}>
        <h2 className="text-xl font-bold mb-4">Add New Product</h2>
        <ProductForm
          formData={newProduct}
          setFormData={setNewProduct}
          onSubmit={handleCreate}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={!!editProduct} onClose={cancelEdit}>
        <h2 className="text-xl font-bold mb-4">
          Edit Product #{editingProductId}
        </h2>
        <ProductForm
          formData={editProduct}
          setFormData={setEditProduct}
          onSubmit={handleEdit}
          onCancel={cancelEdit}
          isEdit
        />
      </Modal>

      <div className="overflow-x-auto">
       <table className="min-w-full border border-gray-300">
  <thead className="bg-gray-50 text-black">
    <tr>
      <th className=" px-4 py-5 text-left">ID</th>
      <th className=" px-4 py-5 text-left">Image</th>
      <th className=" px-4 py-5 text-left">Title</th>
      <th className=" px-4 py-5 text-left">Price</th>
      <th className=" px-4 py-5 text-left">Category</th>
      <th className=" px-4 py-5 text-left">Rating</th>
      <th className=" px-4 py-5 text-left">Actions</th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-100">
    {products.map((product) => (
      <tr key={product.id} className="hover:bg-gray-50">
        <td className="px-4 py-2  font-semibold text-blue-600">
          #{product.id}
        </td>
        <td className="px-4 py-2 ">
          <img
            src={product.image}
            alt="img"
            className="w-10 h-10 object-contain"
          />
        </td>
        <td className="px-4 py-2  text-black">
          {product.title}
        </td>
        <td className="px-4 py-2  text-black">
          ${parseFloat(product.price).toFixed(2)}
        </td>
        <td className="px-4 py-2  text-black">
          {product.category}
        </td>
        <td className="px-4 py-2  text-black">
          {product.rating?.rate} ⭐ ({product.rating?.count})
        </td>
        <td className="px-4 py-2 ">
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => startEdit(product)}
              className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full"
            >
              <PencilIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete(product.id)}
              className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full"
            >
              <TrashIcon className="w-4 h-4" />
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
export default ProductsDashboard;
