"use client";
import React, { useState, useEffect } from "react";
import { axiosInstance } from "@/app/utils/axiosinstace";
import { getToken } from "../../utils/Token";

function InputUser({ formData, setFormData }) {
  const [userData, setUserData] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/auth/getUsers", {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        setUserData(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      nombreUsuario: value,
    });
    setShowUserDropdown(true);
    const filtered = userData.filter((user) =>
      user.Username.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleUserSelect = (username) => {
    setFormData({
      ...formData,
      nombreUsuario: username,
    });
    setShowUserDropdown(false);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowUserDropdown(false);
    }, 150);
  };

  return (
    <>
      <label className="block text-gray-700 font-medium mb-2">
        Nombre del Usuario
      </label>
      <input
        type="text"
        name="nombreUsuario"
        value={formData.nombreUsuario}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-full border border-gray-300 p-2 rounded"
        placeholder="Buscar usuario"
      />
      {showUserDropdown && (
        <ul className="absolute bg-white border z-50 border-gray-300 w-full mt-1 max-h-40 overflow-y-auto">
          {filteredUsers.map((user) => (
            <li
              key={user.Username}
              onClick={() => handleUserSelect(user.Username)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {user.Username} - {user.Email}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default InputUser;
