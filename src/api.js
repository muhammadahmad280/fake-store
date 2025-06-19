// src/api.js

const BASE_URL = 'https://fakestoreapi.com';

export const fetchAllUsers = async () => {
    const response = await fetch(`${BASE_URL}/users`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
};

export const createUserApi = async (userData) => {
    const response = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
};

export const updateUserApi = async (userId, userData) => {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
};

export const deleteUserApi = async (userId) => {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
};