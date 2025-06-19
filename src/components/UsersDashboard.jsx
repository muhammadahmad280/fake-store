import React, { useState } from "react";
import useUsersData from "../hooks/useUsersData";
import UserCard from "./UserCard";

// Reusable Input Component
const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  required = false,
  step = null,
  placeholder = null,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
      {label}:
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-black dark:text-white"
      required={required}
      step={step}
      placeholder={placeholder}
    />
  </div>
);

function UsersDashboard() {
  const { users, loading, error, createUser, updateUser, deleteUser } =
    useUsersData();

  // Initial user state
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

  const [newUser, setNewUser] = useState(initialUserState);
  const [editingUserId, setEditingUserId] = useState(null);
  const [currentEditUser, setCurrentEditUser] = useState(null);
  const [showAddUserForm, setShowAddUserForm] = useState(false); // New state for form visibility

  // Update nested state helper
  const updateNestedState = (setState, path, value) => {
    setState((prev) => {
      const newState = { ...prev };
      const keys = path.split(".");
      let current = newState;

      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      return newState;
    });
  };

  const handleCreateUserSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedUser = {
        ...newUser,
        address: {
          ...newUser.address,
          number: parseInt(newUser.address.number),
          geolocation: {
            lat: parseFloat(newUser.address.geolocation.lat || 0).toFixed(2),
            long: parseFloat(newUser.address.geolocation.long || 0).toFixed(2),
          },
        },
      };

      await createUser(formattedUser);
      alert("User created successfully!");
      setNewUser(initialUserState);
      setShowAddUserForm(false); // Hide form after successful creation
    } catch (err) {
      alert(`Failed to create user: ${err.message}`);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm(`Are you sure you want to delete User #${userId}?`)) {
      try {
        await deleteUser(userId);
        alert("User deleted successfully!");
      } catch (err) {
        alert(`Failed to delete user: ${err.message}`);
      }
    }
  };

  const startEditingUser = (user) => {
    setEditingUserId(user.id);
    setCurrentEditUser({ ...user });
    setShowAddUserForm(false); // Hide add form if editing starts
  };

  const handleUpdateUserSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedUser = {
        ...currentEditUser,
        address: {
          ...currentEditUser.address,
          number: parseInt(currentEditUser.address.number),
          geolocation: {
            lat: parseFloat(
              currentEditUser.address.geolocation.lat || 0
            ).toFixed(2),
            long: parseFloat(
              currentEditUser.address.geolocation.long || 0
            ).toFixed(2),
          },
        },
      };

      await updateUser(editingUserId, formattedUser);
      alert("User updated successfully!");
      setEditingUserId(null);
      setCurrentEditUser(null);
    } catch (err) {
      alert(`Failed to update user: ${err.message}`);
    }
  };

  const cancelEditingUser = () => {
    setEditingUserId(null);
    setCurrentEditUser(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          Loading users...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 p-4 rounded-lg shadow-lg">
        <p className="text-xl font-bold">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-3xl font-extrabold text-center mb-8 text-blue-700 dark:text-blue-400">
        All Users
      </h1>

      {/* Button to toggle Add New User Section */}
      {!showAddUserForm && (
        <div className="mb-6 text-center">
          <button
            onClick={() => setShowAddUserForm(true)}
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add New User
          </button>
        </div>
      )}

      {/* Add New User Section - Conditionally rendered */}
      {showAddUserForm && (
        <div className="mb-8 p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-inner bg-gray-50 dark:bg-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-400">
            Add New User
          </h2>
          <form onSubmit={handleCreateUserSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="First Name"
                value={newUser.name.firstname}
                onChange={(e) =>
                  updateNestedState(
                    setNewUser,
                    "name.firstname",
                    e.target.value
                  )
                }
                required
              />
              <InputField
                label="Last Name"
                value={newUser.name.lastname}
                onChange={(e) =>
                  updateNestedState(setNewUser, "name.lastname", e.target.value)
                }
                required
              />
              <InputField
                label="Email"
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  updateNestedState(setNewUser, "email", e.target.value)
                }
                required
              />
              <InputField
                label="Username"
                value={newUser.username}
                onChange={(e) =>
                  updateNestedState(setNewUser, "username", e.target.value)
                }
                required
              />
              <InputField
                label="Password"
                type="password"
                value={newUser.password}
                onChange={(e) =>
                  updateNestedState(setNewUser, "password", e.target.value)
                }
                required
              />
              <InputField
                label="Phone"
                type="tel"
                value={newUser.phone}
                onChange={(e) =>
                  updateNestedState(setNewUser, "phone", e.target.value)
                }
                required
              />
              <InputField
                label="City"
                value={newUser.address.city}
                onChange={(e) =>
                  updateNestedState(setNewUser, "address.city", e.target.value)
                }
                required
              />
              <InputField
                label="Street"
                value={newUser.address.street}
                onChange={(e) =>
                  updateNestedState(
                    setNewUser,
                    "address.street",
                    e.target.value
                  )
                }
                required
              />
              <InputField
                label="Street Number"
                type="number"
                value={newUser.address.number}
                onChange={(e) =>
                  updateNestedState(
                    setNewUser,
                    "address.number",
                    e.target.value
                  )
                }
                required
              />
              <InputField
                label="Zipcode"
                value={newUser.address.zipcode}
                onChange={(e) =>
                  updateNestedState(
                    setNewUser,
                    "address.zipcode",
                    e.target.value
                  )
                }
                required
              />
              <InputField
                label="Latitude"
                type="number"
                step="0.01"
                value={newUser.address.geolocation.lat}
                onChange={(e) =>
                  updateNestedState(
                    setNewUser,
                    "address.geolocation.lat",
                    e.target.value
                  )
                }
              />
              <InputField
                label="Longitude"
                type="number"
                step="0.01"
                value={newUser.address.geolocation.long}
                onChange={(e) =>
                  updateNestedState(
                    setNewUser,
                    "address.geolocation.long",
                    e.target.value
                  )
                }
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white font-bold rounded-md shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Create User
              </button>
              <button
                type="button"
                onClick={() => setShowAddUserForm(false)} // Cancel button to hide form
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <React.Fragment key={user.id}>
            {editingUserId === user.id ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-yellow-500">
                <h2 className="text-2xl font-extrabold mb-4 text-yellow-700 dark:text-yellow-400">
                  Edit User #{user.id}
                </h2>
                <form onSubmit={handleUpdateUserSubmit} className="space-y-3">
                  <InputField
                    label="First Name" // Added labels for edit form
                    placeholder="First Name"
                    value={currentEditUser.name.firstname}
                    onChange={(e) =>
                      updateNestedState(
                        setCurrentEditUser,
                        "name.firstname",
                        e.target.value
                      )
                    }
                    required
                  />
                  <InputField
                    label="Last Name"
                    placeholder="Last Name"
                    value={currentEditUser.name.lastname}
                    onChange={(e) =>
                      updateNestedState(
                        setCurrentEditUser,
                        "name.lastname",
                        e.target.value
                      )
                    }
                    required
                  />
                  <InputField
                    label="Email"
                    placeholder="Email"
                    type="email"
                    value={currentEditUser.email}
                    onChange={(e) =>
                      updateNestedState(
                        setCurrentEditUser,
                        "email",
                        e.target.value
                      )
                    }
                    required
                  />
                  <InputField
                    label="Username"
                    placeholder="Username"
                    value={currentEditUser.username}
                    onChange={(e) =>
                      updateNestedState(
                        setCurrentEditUser,
                        "username",
                        e.target.value
                      )
                    }
                    required
                  />
                  <InputField
                    label="Phone"
                    placeholder="Phone"
                    type="tel"
                    value={currentEditUser.phone}
                    onChange={(e) =>
                      updateNestedState(
                        setCurrentEditUser,
                        "phone",
                        e.target.value
                      )
                    }
                    required
                  />
                  <InputField
                    label="City"
                    placeholder="City"
                    value={currentEditUser.address.city}
                    onChange={(e) =>
                      updateNestedState(
                        setCurrentEditUser,
                        "address.city",
                        e.target.value
                      )
                    }
                    required
                  />
                  <InputField
                    label="Street"
                    placeholder="Street"
                    value={currentEditUser.address.street}
                    onChange={(e) =>
                      updateNestedState(
                        setCurrentEditUser,
                        "address.street",
                        e.target.value
                      )
                    }
                    required
                  />
                  <InputField
                    label="Street Number"
                    placeholder="Street Number"
                    type="number"
                    value={currentEditUser.address.number}
                    onChange={(e) =>
                      updateNestedState(
                        setCurrentEditUser,
                        "address.number",
                        e.target.value
                      )
                    }
                    required
                  />
                  <InputField
                    label="Zipcode"
                    placeholder="Zipcode"
                    value={currentEditUser.address.zipcode}
                    onChange={(e) =>
                      updateNestedState(
                        setCurrentEditUser,
                        "address.zipcode",
                        e.target.value
                      )
                    }
                    required
                  />
                  <InputField
                    label="Latitude"
                    placeholder="Latitude"
                    type="number"
                    step="0.01"
                    value={currentEditUser.address.geolocation.lat}
                    onChange={(e) =>
                      updateNestedState(
                        setCurrentEditUser,
                        "address.geolocation.lat",
                        e.target.value
                      )
                    }
                  />
                  <InputField
                    label="Longitude"
                    placeholder="Longitude"
                    type="number"
                    step="0.01"
                    value={currentEditUser.address.geolocation.long}
                    onChange={(e) =>
                      updateNestedState(
                        setCurrentEditUser,
                        "address.geolocation.long",
                        e.target.value
                      )
                    }
                  />

                  <div className="flex justify-end space-x-2 mt-4">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={cancelEditingUser}
                      className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <UserCard
                user={user}
                onDelete={handleDeleteUser}
                onEdit={startEditingUser}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default UsersDashboard;