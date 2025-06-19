// src/hooks/useCartsData.js
import { useState, useEffect, useCallback } from "react";
import {
  fetchAllCarts,
  fetchAllProducts,
  createCartApi,
  updateCartApi,
  deleteCartApi,
} from "../api/cartApi";

const LOCAL_CARTS_KEY = "myAppCarts";
const LOCAL_PRODUCTS_KEY = "myAppProductsCache";

function useCartsData() {
  const [carts, setCarts] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const enrichCart = (cart, productMap) => ({
    ...cart,
    products: cart.products.map((item) => ({
      ...item,
      title: productMap[item.productId]?.title || "Unknown Product",
      price: productMap[item.productId]?.price || 0,
      image:
        productMap[item.productId]?.image ||
        "https://placehold.co/50x50/cccccc/ffffff?text=No+Image",
    })),
  });

  const saveCarts = (rawCarts) => {
    const data = rawCarts.map((cart) => ({
      id: cart.id,
      userId: cart.userId,
      date: cart.date,
      products: cart.products.map((p) => ({
        productId: p.productId,
        quantity: p.quantity,
      })),
    }));
    localStorage.setItem(LOCAL_CARTS_KEY, JSON.stringify(data));
  };

  const fetchAndLoadCarts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let productMap = {};

      const productCache = localStorage.getItem(LOCAL_PRODUCTS_KEY);
      if (productCache) {
        productMap = JSON.parse(productCache);
        setProducts(productMap);
      } else {
        const productsData = await fetchAllProducts();
        productMap = productsData.reduce((acc, p) => {
          acc[p.id] = p;
          return acc;
        }, {});
        setProducts(productMap);
        localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(productMap));
      }

      const cartCache = localStorage.getItem(LOCAL_CARTS_KEY);
      if (cartCache) {
        const parsed = JSON.parse(cartCache);
        setCarts(parsed.map((cart) => enrichCart(cart, productMap)));
      } else {
        const fetchedCarts = await fetchAllCarts();
        setCarts(fetchedCarts.map((cart) => enrichCart(cart, productMap)));
        saveCarts(fetchedCarts);
      }
    } catch (e) {
      setError(e.message);
      setCarts([]);
      setProducts({});
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAndLoadCarts();
  }, [fetchAndLoadCarts]);

  const createCart = async (cartData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await createCartApi(cartData);
      const newId = res.id || Math.max(0, ...carts.map((c) => c.id)) + 1;
      const newCart = { ...cartData, id: newId };

      setCarts((prev) => {
        const updated = [...prev, enrichCart(newCart, products)];
        saveCarts(updated);
        return updated;
      });

      return newCart;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCart = async (cartId, updatedData) => {
    setLoading(true);
    setError(null);
    try {
      await updateCartApi(cartId, updatedData);
      setCarts((prev) => {
        const updated = prev.map((cart) =>
          cart.id === cartId
            ? enrichCart({ ...cart, ...updatedData }, products)
            : cart
        );
        saveCarts(updated);
        return updated;
      });
      return { id: cartId, ...updatedData };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteCart = async (cartId) => {
    setLoading(true);
    setError(null);
    try {
      await deleteCartApi(cartId);
      setCarts((prev) => {
        const updated = prev.filter((cart) => cart.id !== cartId);
        saveCarts(updated);
        return updated;
      });
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    carts,
    products,
    loading,
    error,
    createCart,
    updateCart,
    deleteCart,
  };
}

export default useCartsData;
