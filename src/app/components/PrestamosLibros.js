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

  const handleDevolucion = (index) => {
    const nuevosPrestamos = [...prestamos];
    nuevosPrestamos.splice(index, 1);
    setPrestamos(nuevosPrestamos);
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

      <h2 className="text-lg font-semibold mb-4">Préstamos Actuales</h2>
      {prestamos.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Libro</th>
              <th className="px-4 py-2 border-b">Usuario</th>
              <th className="px-4 py-2 border-b">Fecha de Préstamo</th>
              <th className="px-4 py-2 border-b">Fecha de Devolución</th>
              <th className="px-4 py-2 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {prestamos.map((prestamo, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border-b">{prestamo.libro}</td>
                <td className="px-4 py-2 border-b">{prestamo.usuario}</td>
                <td className="px-4 py-2 border-b">{prestamo.fechaPrestamo}</td>
                <td className="px-4 py-2 border-b">{prestamo.fechaDevolucion}</td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleDevolucion(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                  >
                    Devolver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-700">No hay préstamos registrados.</p>
      )}
    </div>
  );
}

export default PrestamosLibros;
