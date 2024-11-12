"use client";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "@/app/utils/axiosinstace";
import { getToken } from "@/app/utils/Token";

function TablaPrestados() {
  const itemsPerPage = 4;
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [librosData, setLibrosData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const username = localStorage.getItem("username");
      const response = await axiosInstance.get(`/leans/username/${username}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setLibrosData(response.data);
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
    }
  };

  // Filtrar libros basados en la búsqueda
  const filteredBooks = librosData.filter(
    (libro) =>
      libro.Titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      libro.Autor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      libro.Username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginación
  const indexOfLastBook = currentPage * itemsPerPage;
  const indexOfFirstBook = indexOfLastBook - itemsPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="overflow-x-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Buscar por título, autor o usuario"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Tabla */}
      <table className="min-w-full bg-white border border-gray-300 rounded-md">
        <thead>
          <tr>
            <th className="p-3 border-b">Título</th>
            <th className="p-3 border-b">Autor</th>
            <th className="p-3 border-b">Usuario</th>
            <th className="p-3 border-b">Fecha de Préstamo</th>
            <th className="p-3 border-b">Fecha de Devolución</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.length > 0 ? (
            currentBooks.map((libro, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="p-3 border-b">{libro.Titulo}</td>
                <td className="p-3 border-b">{libro.Autor}</td>
                <td className="p-3 border-b">{libro.Username}</td>
                <td className="p-3 border-b">{libro.DateStart}</td>
                <td className="p-3 border-b">{libro.DateEnd}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-3 text-center text-gray-500">
                No se encontraron resultados
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
          >
            Anterior
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white'}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}

export default TablaPrestados;
