// src/api/cartApi.js

const BASE_URL = 'https://fakestoreapi.com';

export const fetchAllCarts = async () => {
  const res = await fetch(`${BASE_URL}/carts`);
  if (!res.ok) throw new Error(`Failed to fetch carts: ${res.status}`);
  return res.json();
};

export const fetchAllProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
  return res.json();
};

// ⚠️ NOTE: Fake Store API does NOT persist cart data. These simulate success only.
export const createCartApi = async (cart) =>
  Promise.resolve({ id: Date.now(), ...cart });

export const updateCartApi = async (cartId, cart) =>
  Promise.resolve({ id: cartId, ...cart });

export const deleteCartApi = async (cartId) =>
  Promise.resolve({ message: `Cart ${cartId} deleted (simulated).` });
