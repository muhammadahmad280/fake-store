// src/components/users/UsersDashboard.jsx
import React, { useState } from "react";
import useUsersData from "../../hooks/useUsersData";
import Modal from "./Modal"; // Adjust path as needed
 
import UserForm from "./UserForm"; // Import the new UserForm component
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

function UsersDashboard() {
  const { users, loading, error, createUser, updateUser, deleteUser } =
    useUsersData();

  const initialUserState = {
    name: { firstname: "", lastname: "" },
    email: "",
    username: "",
    password: "",
    phone: "",
    address: {
      city: "",
      street: "",
      number: "",
      zipcode: "",
      geolocation: { lat: "", long: "" },
    },
  };

  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // Holds the user object being edited

  // State for custom alert/confirmation messages
  const [message, setMessage] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null); // Callback for confirm action
  const [confirmMessage, setConfirmMessage] = useState("");

  // Function to show a custom alert message
  const showAlert = (msg, type = "success") => {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(null), 3000); // Hide after 3 seconds
  };

  // Function to show a custom confirmation modal
  const showConfirmation = (msg, actionCallback) => {
    setConfirmMessage(msg);
    setConfirmAction(() => actionCallback); // Store the callback
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    if (confirmAction) {
      confirmAction();
    }
    setShowConfirm(false);
    setConfirmAction(null);
  };

  const handleCancelConfirm = () => {
    setShowConfirm(false);
    setConfirmAction(null);
  };

  const handleCreateUser = async (userData) => {
    try {
      await createUser(userData);
      showAlert("User created successfully!");
      setShowAddUserModal(false);
    } catch (err) {
      showAlert(`Failed to create user: ${err.message}`, "error");
      console.error("Create user error:", err);
    }
  };

  const handleDeleteUser = async (userId) => {
    showConfirmation(`Are you sure you want to delete User #${userId}?`, async () => {
      try {
        await deleteUser(userId);
        showAlert("User deleted successfully!");
      } catch (err) {
        showAlert(`Failed to delete user: ${err.message}`, "error");
        console.error("Delete user error:", err);
      }
    });
  };

  const startEditingUser = (user) => {
    // Clone and format data for the UserForm
    setEditingUser({
      ...user,
      address: {
        ...user.address,
        number: String(user.address.number), // Convert to string for InputField
        geolocation: {
          lat: String(user.address.geolocation.lat),
          long: String(user.address.geolocation.long),
        },
      },
    });
    setShowAddUserModal(false); // Close add modal if open
  };

  const handleUpdateUser = async (userData) => {
    if (!editingUser || !editingUser.id) return;
    try {
      await updateUser(editingUser.id, userData);
      showAlert("User updated successfully!");
      setEditingUser(null); // Close modal
    } catch (err) {
      showAlert(`Failed to update user: ${err.message}`, "error");
      console.error("Update user error:", err);
    }
  };

  const cancelEditingUser = () => {
    setEditingUser(null);
  };

  if (loading)
    return <p className="text-gray-900 text-center mt-10">Loading users...</p>;
  if (error)
    return (
      <div className="text-red-500 bg-red-100 p-4 rounded text-center">
        Error: {error.message || "An unknown error occurred"}
      </div>
    );

  return (
    <div className="p-6 min-h-screen text-gray-900">
      {/* Custom Alert Message */}
      {message && (
        <div
          className={`absolute top-4 right-4 p-3 rounded-md shadow-lg z-50 transition-opacity duration-300 ${
            message.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Custom Confirmation Modal */}
      <Modal isOpen={showConfirm} onClose={handleCancelConfirm} title="Confirmation">
        <p className="text-lg text-gray-800 mb-4">{confirmMessage}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Confirm
          </button>
          <button
            onClick={handleCancelConfirm}
            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </Modal>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-extrabold text-blue-600">👥 All Users</h1>
        <button
          onClick={() => {
            setEditingUser(null); // Clear any active editing state
            setShowAddUserModal(true);
          }}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md"
        >
          ➕ Add New User
        </button>
      </div>

      {/* Add User Modal */}
      <Modal isOpen={showAddUserModal} onClose={() => setShowAddUserModal(false)} title="Add New User">
        <UserForm
          initialData={initialUserState}
          onSubmit={handleCreateUser}
          onCancel={() => setShowAddUserModal(false)}
          submitButtonText="Create User"
        />
      </Modal>

      {/* Edit User Modal */}
      {editingUser && ( // Only render if a user is being edited
        <Modal isOpen={!!editingUser} onClose={cancelEditingUser} title={`Edit User #${editingUser.id}`}>
          <UserForm
            initialData={editingUser}
            onSubmit={handleUpdateUser}
            onCancel={cancelEditingUser}
            submitButtonText="Update User"
          />
        </Modal>
      )}

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-black">
            <tr className="text-black font-bold">
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email / Phone</th>
              <th className="px-4 py-3 text-left">Username</th>
              <th className="px-4 py-3 text-left">Address</th>
              <th className="px-4 py-3 text-left">Geolocation</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100 text-gray-800">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-all">
                <td className="px-4 py-3 font-bold text-blue-600">
                  #{user.id}
                </td>
                <td className="px-4 py-3 font-semibold">
                  {user.name.firstname} {user.name.lastname}
                </td>
                <td className="px-4 py-3">
                  <p>📧 {user.email}</p>
                  <p>📞 {user.phone}</p>
                </td>
                <td className="px-4 py-3 text-green-600">@{user.username}</td>
                <td className="px-4 py-3">
                  <p>
                    {user.address.street}, {user.address.number}
                  </p>
                  <p>
                    {user.address.city}, {user.address.zipcode}
                  </p>
                </td>
                <td className="px-4 py-3 text-xs text-gray-500">
                  {user.address.geolocation.lat &&
                  user.address.geolocation.long ? (
                    <>
                      Lat: {parseFloat(user.address.geolocation.lat).toFixed(2)}
                      , Long:{" "}
                      {parseFloat(user.address.geolocation.long).toFixed(2)}
                    </>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => startEditingUser(user)}
                      className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow"
                      title="Edit User"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow"
                      title="Delete User"
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

export default UsersDashboard;