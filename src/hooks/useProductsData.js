// src/hooks/useProductsData.js
import { useState, useEffect, useCallback } from "react";

const PRODUCTS_API_BASE_URL = "https://fakestoreapi.com/products";

const useProductsData = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(PRODUCTS_API_BASE_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError(
        err.message || "An unexpected error occurred while fetching products."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const createProduct = async (productData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(PRODUCTS_API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const newProduct = await response.json();
     
      setProducts((prevProducts) => [newProduct, ...prevProducts]); // Add to the beginning for visibility
      setLoading(false);
      return newProduct;
    } catch (err) {
      console.error("Failed to create product:", err);
      setError(
        err.message || "An unexpected error occurred while creating product."
      );
      setLoading(false);
      throw err;
    }
  };

  const updateProduct = async (productId, updatedData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${PRODUCTS_API_BASE_URL}/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedProductResponse = await response.json();
      // Simulate update in frontend state
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId
            ? { ...product, ...updatedData, id: productId }
            : product
        )
      );
      setLoading(false);
      return updatedProductResponse; // This will be the mock response from FakeStoreAPI
    } catch (err) {
      console.error("Failed to update product:", err);
      setError(
        err.message || "An unexpected error occurred while updating product."
      );
      setLoading(false);
      throw err;
    }
  };

  const deleteProduct = async (productId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${PRODUCTS_API_BASE_URL}/${productId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
      setLoading(false);
      return { success: true };
    } catch (err) {
      console.error("Failed to delete product:", err);
      setError(
        err.message || "An unexpected error occurred while deleting product."
      );
      setLoading(false);
      throw err;
    }
  };

  return {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    fetchProducts,
  };
};

export default useProductsData;
