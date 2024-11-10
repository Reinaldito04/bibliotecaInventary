"use client";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "@/app/utils/axiosinstace";
import { getToken } from "@/app/utils/Token";
function TablaView() {
  const itemsPerPage = 4;
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [librosData, setLibrosData] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState("");
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
      (libros) => !libros.DateReal || libros.DateReal ==='No entregado aún'
     );
      
      setLibrosData(filtrosLibros);
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
    }
  };
  const handleEntregaClick = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleDateChange = (e) => {
    setDeliveryDate(e.target.value);
  };
  const handleSubmit = async () => {
    try {
      await axiosInstance
        .put(
          `leans/update/${selectedBook.LeanID}`,
          {
            DateReal: deliveryDate,
          },
          {
            headers: { Authorization: `Bearer ${getToken()}` },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            alert("Libro entregado correctamente");
            setIsModalOpen(false);
            setSelectedBook(null);
            setDeliveryDate("");
            fetchBooks();
          } else {
            alert("Error al entregar el libro: " + response.data.error);
          }
        });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al entregar el libro:", error);
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
              <th className="py-3 px-4 border-b">Acciones</th>
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
                  {libro.DateReal === "No entregado aún" ? (
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleEntregaClick(libro)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                      >
                        Marcar como entregado
                      </button>
                    </td>
                  ) : (
                    <td className="py-2 px-4 border-b">
                      <button
                        disabled
                        className="bg-green-400 text-white px-4 py-2 rounded-lg"
                      >
                        Ya fue entregado
                      </button>
                    </td>
                  )}
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Entrega del libro</h2>
            <p className="text-gray-600 text-balance text-center break-words whitespace-normal  ">
              Ingrese la fecha de entrega del libro por el usuario{" "}
              {selectedBook.Username}
            </p>
            <input
              type="date"
              value={deliveryDate}
              onChange={handleDateChange}
              className="mt-2 p-2 border border-gray-300 rounded-md w-[100%] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Confirmar
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-600 px-4 py-2 rounded-md"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TablaView;
