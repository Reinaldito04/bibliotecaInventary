"use client";
import React, { useState } from "react";

function PrestamosLibros() {
  const [prestamos, setPrestamos] = useState([]);
  const [formData, setFormData] = useState({
    libro: "",
    usuario: "",
    fechaPrestamo: "",
    fechaDevolucion: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePrestamo = (e) => {
    e.preventDefault();
    setPrestamos([...prestamos, formData]);
    setFormData({
      libro: "",
      usuario: "",
      fechaPrestamo: "",
      fechaDevolucion: "",
    });
  };

 
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Registrar Préstamo de Libro</h2>
      <form onSubmit={handlePrestamo} className="bg-white p-4 rounded shadow-md mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Libro</label>
          <input
            type="text"
            name="libro"
            value={formData.libro}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-1"
            placeholder="Ingrese el título del libro"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Usuario</label>
          <input
            type="text"
            name="usuario"
            value={formData.usuario}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-1"
            placeholder="Ingrese el nombre del usuario"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 ">Fecha de Préstamo</label>
          <input
            type="date"
            name="fechaPrestamo"
            value={formData.fechaPrestamo}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Fecha de Devolución</label>
          <input
            type="date"
            name="fechaDevolucion"
            value={formData.fechaDevolucion}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-1"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Registrar Préstamo
        </button>
      </form>

     
    </div>
  );
}

export default PrestamosLibros;
