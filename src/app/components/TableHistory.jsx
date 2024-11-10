"use client";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "@/app/utils/axiosinstace";
import { getToken } from "@/app/utils/Token";
function TableHistory() {
  const itemsPerPage = 4;
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [librosData, setLibrosData] = useState([]);
  const [error, setError] = useState(null);

  const filteredBooks = librosData.filter(
    (libro) =>
      libro.Titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      libro.Autor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      libro.Username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axiosInstance.get("/leans/", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const filtrosLibros = response.data.filter(
        (libros) => !libros.DateReal || libros.DateReal !== "No entregado aún"
      );

      setLibrosData(filtrosLibros);
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
    }
  };
 

  // Paginación
  const indexOfLastBook = currentPage * itemsPerPage;
  const indexOfFirstBook = indexOfLastBook - itemsPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  // Cambio de página
  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <>
      <div className="overflow-x-auto p-6 bg-gray-50 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Buscar por título ,autor o usuario"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Tabla */}
        <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 border-b">ID Prestamo</th>
              <th className="py-3 px-4 border-b">Título</th>
              <th className="py-3 px-4 border-b">Autor</th>
              <th className="py-3 px-4 border-b">Fecha de préstamo</th>
              <th className="py-3 px-4 border-b">Fecha de devolución</th>
              <th className="py-3 px-4 border-b">Usuario</th>
              <th className="py-3 px-4 border-b">Entregado</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {currentBooks.map((libro) => (
              <tr
                key={libro.LeanID}
                className="hover:bg-gray-100 transition-colors duration-200"
              >
                <td className="py-2 px-4 border-b text-center">
                  {libro.LeanID}
                </td>
                <td className="py-2 px-4 border-b">{libro.Titulo}</td>
                <td className="py-2 px-4 border-b">{libro.Autor}</td>
                <td className="py-2 px-4 border-b">{libro.DateStart}</td>
                <td className="py-2 px-4 border-b">{libro.DateEnd}</td>
                <td className="py-2 px-4 border-b">{libro.Username}</td>
                <td className="py-2 px-4 border-b">{libro.DateReal}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginación */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() =>
              handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
            }
            disabled={currentPage === 1}
            className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-300 transition-all duration-200 hover:bg-blue-600"
          >
            Anterior
          </button>
          <span className="text-gray-600 font-semibold">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() =>
              handlePageChange(
                currentPage < totalPages ? currentPage + 1 : totalPages
              )
            }
            disabled={currentPage === totalPages}
            className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-300 transition-all duration-200 hover:bg-blue-600"
          >
            Siguiente
          </button>
        </div>
      </div>

    </>
  );
}

export default TableHistory;
