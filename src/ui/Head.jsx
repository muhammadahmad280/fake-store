import React from "react";

const Head = ({ setEditingUser, setShowAddUserModal }) => {
  return (
    <>
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
    </>
  );
};

export default Head;
