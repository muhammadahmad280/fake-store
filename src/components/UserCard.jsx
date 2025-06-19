// src/components/UserCard.jsx
import React from "react";

const UserCard = ({ user, onDelete, onEdit }) => {
  const { firstname, lastname } = user.name || {};
  const { street, number, city, zipcode, geolocation } = user.address || {};
  const { lat, long } = geolocation || {};

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 border border-gray-200 dark:border-gray-700 relative transition hover:scale-105 overflow-hidden">
      <div className="relative z-10">
        <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-4">
          {firstname} {lastname}
        </h2>

        <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300 mb-4">
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {[
              ["Username", user.username],
              ["Email", user.email],
              ["Phone", user.phone],
              [
                "Address",
                `${street}, ${number}, ${city}, ${zipcode}` +
                  (lat && long
                    ? `\nLat: ${parseFloat(lat).toFixed(2)}, Long: ${parseFloat(
                        long
                      ).toFixed(2)}`
                    : ""),
              ],
            ].map(([label, value], i) => (
              <tr key={i}>
                <th className="py-2 pr-4 font-medium text-gray-600 dark:text-gray-400">
                  {label}:
                </th>
                <td className="py-2 whitespace-pre-line break-words">
                  {value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end space-x-2">
          <button
            onClick={() => onEdit(user)}
            className="px-4 py-1.5 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700 transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(user.id)}
            className="px-4 py-1.5 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
