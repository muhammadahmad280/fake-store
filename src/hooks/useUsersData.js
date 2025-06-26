import { useState, useEffect, useCallback } from "react";
import {
  fetchAllUsers,
  createUserApi,
  updateUserApi,
  deleteUserApi,
} from "../service/api";

const LOCAL_STORAGE_KEY = "myAppUsers"; // Key for storing user data in local storage

function useUsersData() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Try to load from local storage first
      const storedUsers = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedUsers) {
        const parsedUsers = JSON.parse(storedUsers);
        setUsers(parsedUsers);
        console.log("Users loaded from local storage.");
      } else {
        // If no data in local storage, fetch from API
        console.log("No users in local storage, fetching from API...");
        const data = await fetchAllUsers();
        setUsers(data);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data)); // Save initial fetch to local storage
        console.log("Users fetched from API and saved to local storage.");
      }
    } catch (err) {
      setError(err.message);
      setUsers([]); // Clear users on error
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  }, []); // Dependency array is empty because fetchAllUsers is stable

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]); // Re-run effect if fetchUsers changes (which it won't due to useCallback)

  const createUser = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      // Fake Store API does not actually persist data or assign new unique IDs on POST.
      // We simulate adding the user to our local state with a generated ID.
      const createdData = await createUserApi(userData); // API might return the sent data

      // Generate a unique ID for the new user in the client-side state
      const newId =
        users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
      const newUser = { ...userData, id: newId };

      setUsers((prevUsers) => {
        const updatedUsers = [...prevUsers, newUser];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedUsers)); // Save to local storage
        return updatedUsers;
      });
      console.log("User created and saved to local storage:", newUser);
      return newUser;
    } catch (err) {
      setError(err.message);
      console.error("Error creating user:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userId, userData) => {
    setLoading(true);
    setError(null);
    try {
      // The fake store API usually returns the data you sent for PUT/PATCH.
      // We'll update the user in our local state.
      const updatedData = await updateUserApi(userId, userData);

      setUsers((prevUsers) => {
        const updatedUsers = prevUsers.map((user) =>
          user.id === userId
            ? { ...user, ...updatedData, id: userId } // Ensure ID is preserved
            : user
        );
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedUsers)); // Save to local storage
        return updatedUsers;
      });
      console.log(`User ${userId} updated and saved to local storage.`);
      return updatedData;
    } catch (err) {
      setError(err.message);
      console.error(`Error updating user ${userId}:`, err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      await deleteUserApi(userId); // Send delete request (won't persist on fake API)
      setUsers((prevUsers) => {
        const updatedUsers = prevUsers.filter((user) => user.id !== userId);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedUsers)); // Save to local storage
        return updatedUsers;
      });
      console.log(`User ${userId} deleted and state updated in local storage.`);
    } catch (err) {
      setError(err.message);
      console.error(`Error deleting user ${userId}:`, err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
    fetchUsers,
  };
}

export default useUsersData;
