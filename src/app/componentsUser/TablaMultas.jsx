"use client";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "@/app/utils/axiosinstace";
import { getToken } from "@/app/utils/Token";

function TablaMultas() {
  const itemsPerPage = 4;
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [finesData, setFinesData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFines();
  }, []);

  const fetchFines = async () => {
    try {
      const username = localStorage.getItem("username");
      const response = await axiosInstance.get(`/fines/getFines/${username}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setFinesData(response.data);
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
    }
  };

  // Filtrar multas basadas en la búsqueda
  const filteredFines = finesData.filter(
    (fine) =>
      fine.Titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fine.Autor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fine.Username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginación
  const indexOfLastFine = currentPage * itemsPerPage;
  const indexOfFirstFine = indexOfLastFine - itemsPerPage;
  const currentFines = filteredFines.slice(indexOfFirstFine, indexOfLastFine);
  const totalPages = Math.ceil(filteredFines.length / itemsPerPage);

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

      {/* Tabla de multas */}
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="py-3 px-4 text-left">ID</th>
            <th className="py-3 px-4 text-left">Estado</th>
            <th className="py-3 px-4 text-left">Monto Multa</th>
            <th className="py-3 px-4 text-left">Fecha Inicio</th>
            <th className="py-3 px-4 text-left">Fecha Fin</th>
            <th className="py-3 px-4 text-left">Título</th>
            <th className="py-3 px-4 text-left">Autor</th>
            <th className="py-3 px-4 text-left">Días de Retraso</th>
          </tr>
        </thead>
        <tbody>
          {currentFines.length > 0 ? (
            currentFines.map((fine) => (
              <tr key={fine.ID} className="border-t hover:bg-gray-100">
                <td className="py-3 px-4">{fine.ID}</td>
                <td className="py-3 px-4">{fine.Estado}</td>
                <td className="py-3 px-4">${fine.MontoMulta.toFixed(2)}</td>
                <td className="py-3 px-4">{fine.DateStart}</td>
                <td className="py-3 px-4">{fine.DateEnd}</td>
                <td className="py-3 px-4">{fine.Titulo}</td>
                <td className="py-3 px-4">{fine.Autor}</td>
                <td className="py-3 px-4">{fine.DiasRetraso}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="py-4 text-center text-gray-500">
                No se encontraron resultados.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={`px-4 py-2 mr-2 rounded-lg ${
            currentPage > 1 ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={currentPage <= 1}
        >
          Anterior
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={`px-4 py-2 ml-2 rounded-lg ${
            currentPage < totalPages ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={currentPage >= totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default TablaMultas;
