"use client";
import React, { useState, useEffect } from "react";
import { axiosInstance } from "@/app/utils/axiosinstace";
import { getToken } from "@/app/utils/Token";

function RegistrarPrestamo() {
  const [userData, setUserData] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [formData, setFormData] = useState({
    nombreUsuario: "",
    tituloLibro: "",
    fechaPrestamo: "",
    fechaDevolucion: "",
  });
  const [showDropdown, setShowDropdown] = useState(false);

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
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "nombreUsuario") {
      if (value) {
        const filtered = userData.filter((user) =>
          user.Username.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredUsers(filtered);
        setShowDropdown(true);
      } else {
        setShowDropdown(false);
      }
    }
  };

  const handleUserSelect = (username) => {
    setFormData({ ...formData, nombreUsuario: username });
    setShowDropdown(false);
  };

  const handleBlur = () => {
    // Cierra el dropdown después de un pequeño retraso para permitir seleccionar elementos
    setTimeout(() => {
      setShowDropdown(false);
    }, 150);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del préstamo:", formData);
    alert("Préstamo registrado con éxito");
    setFormData({
      nombreUsuario: "",
      tituloLibro: "",
      fechaPrestamo: "",
      fechaDevolucion: "",
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg w-4/6 mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="mb-4 relative">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="nombreUsuario">
            Nombre del Usuario
          </label>
          <input
            type="text"
            id="nombreUsuario"
            name="nombreUsuario"
            value={formData.nombreUsuario}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Escribe para buscar un usuario..."
            required
          />
          {showDropdown && filteredUsers.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-md mt-1 max-h-40 overflow-y-auto">
              {filteredUsers.map((user, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-blue-100"
                  onMouseDown={() => handleUserSelect(user.Username)} // onMouseDown para evitar que el blur lo cierre prematuramente
                >
                  {user.Username} ({user.Email})
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Otros campos del formulario */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="tituloLibro">
            Título del Libro
          </label>
          <input
            type="text"
            id="tituloLibro"
            name="tituloLibro"
            value={formData.tituloLibro}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="fechaPrestamo">
              Fecha de Préstamo
            </label>
            <input
              type="date"
              id="fechaPrestamo"
              name="fechaPrestamo"
              value={formData.fechaPrestamo}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="fechaDevolucion">
              Fecha de Devolución
            </label>
            <input
              type="date"
              id="fechaDevolucion"
              name="fechaDevolucion"
              value={formData.fechaDevolucion}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Registrar Préstamo
        </button>
      </form>
    </div>
  );
}

export default RegistrarPrestamo;
