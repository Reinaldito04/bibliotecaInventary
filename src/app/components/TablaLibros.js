"use client";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axiosinstace";

const itemsPerPage = 4;

function TablaLibros() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [librosData, setLibrosData] = useState([]);
  const [error, setError] = useState(null);
  const [modalState, setModalState] = useState({ isOpen: false, isView: false, book: null });
  const token = localStorage.getItem("access_token");

  // Filtrar libros por título o autor
  const filteredBooks = librosData.filter(
    (libro) =>
      libro.Titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      libro.Autor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Efecto para obtener los libros desde el backend
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get("/books/books", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLibrosData(response.data);
      } catch (error) {
        setError(error.response ? error.response.data : error.message);
      }
    };
    fetchBooks();
  }, [token]);

  // Paginación
  const indexOfLastBook = currentPage * itemsPerPage;
  const indexOfFirstBook = indexOfLastBook - itemsPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  // Cambio de página
  const handlePageChange = (page) => setCurrentPage(page);

  // Funciones de apertura de modales
  const handleEdit = (id) => {
    const bookToEdit = librosData.find((libro) => libro.ID === id);
    setModalState({ isOpen: true, isView: false, book: bookToEdit });
  };

  const handleView = (id) => {
    const bookToView = librosData.find((libro) => libro.ID === id);
    setModalState({ isOpen: true, isView: true, book: bookToView });
  };

  const handleDelete = (id) => {
    console.log(`Eliminando el libro con ID: ${id}`);
    // Añadir lógica para eliminar
  };

  const handleModalClose = () => setModalState({ isOpen: false, isView: false, book: null });

  // Actualización de libro
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convertir los valores numéricos a string (si es necesario)
      const updatedBook = {
        ...modalState.book,
        cantidad_total: String(modalState.book.cantidad_total),
      };

      // Enviar la solicitud de actualización
      await axiosInstance.put(`/books/edit/${modalState.book.ID}`, updatedBook, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Libro actualizado correctamente");
      handleModalClose();

      // Recargar lista de libros
      const response = await axiosInstance.get("/books/books", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLibrosData(response.data);
    } catch (error) {
      console.error("Error al actualizar el libro:", error);
    }
  };


  return (
    <div className="overflow-x-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Buscar por título o autor"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Tabla */}
      <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-3 px-4 border-b">ID</th>
            <th className="py-3 px-4 border-b">Título</th>
            <th className="py-3 px-4 border-b">Autor</th>
            <th className="py-3 px-4 border-b">Stock Total</th>
            <th className="py-3 px-4 border-b">Prestados</th>
            <th className="py-3 px-4 border-b">Disponibles</th>
            <th className="py-3 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {currentBooks.map((libro) => (
            <tr key={libro.ID} className="hover:bg-gray-100 transition-colors duration-200">
              <td className="py-2 px-4 border-b text-center">{libro.ID}</td>
              <td className="py-2 px-4 border-b">{libro.Titulo}</td>
              <td className="py-2 px-4 border-b">{libro.Autor}</td>
              <td className="py-2 px-4 border-b text-center">{libro.cantidad_total}</td>
              <td className="py-2 px-4 border-b text-center">{libro.cantidad_total - libro.cantidad_disponible}</td>
              <td className="py-2 px-4 border-b text-center">{libro.cantidad_disponible}</td>
              <td className="py-2 px-4 border-b text-center">
                <button onClick={() => handleView(libro.ID)} className="text-blue-500 hover:underline mr-2">Ver</button>
                <button onClick={() => handleEdit(libro.ID)} className="text-yellow-500 hover:underline mr-2">Editar</button>
                <button onClick={() => handleDelete(libro.ID)} className="text-red-500 hover:underline">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-300 transition-all duration-200 hover:bg-blue-600"
        >
          Anterior
        </button>
        <span className="text-gray-600 font-semibold">Página {currentPage} de {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-300 transition-all duration-200 hover:bg-blue-600"
        >
          Siguiente
        </button>
      </div>

      {/* Modal View */}
      {modalState.isOpen && modalState.isView && modalState.book && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96 max-w-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{modalState.book.Titulo}</h2>
            <p className="text-gray-600 text-lg mb-4">Autor: <span className="font-semibold text-gray-700">{modalState.book.Autor}</span></p>
            <p className="text-gray-600 text-lg mb-4">Género: <span className="font-semibold text-gray-700">{modalState.book.genero}</span></p>
            <p className="text-gray-600 mb-4">Descripcion : {modalState.book.Descripcion}</p>
            <p className="text-gray-600 mb-4 font-semibold">Stock Total: <span className="text-gray-800">{modalState.book.cantidad_total}</span></p>
            <p className="text-gray-600 mb-4 font-semibold">Disponibles: <span className="text-gray-800">{modalState.book.cantidad_disponible}</span></p>
            <p className="text-gray-600 mb-4 font-semibold">Páginas: <span className="text-gray-800">{modalState.book.Paginas}</span></p>
            <p className="text-gray-600 mb-4 font-semibold">Año de publicación: <span className="text-gray-800">{modalState.book.anio_publicacion}</span></p>
            <p className="text-gray-600 mb-4 font-semibold">Ubicacion: <span className="text-gray-800">{modalState.book.Ubicacion}</span></p>
            <button onClick={handleModalClose} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600">Cerrar</button>
          </div>
        </div>
      )}

      {/* Modal Edit */}
      {modalState.isOpen && !modalState.isView && modalState.book && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96 max-w-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Editar libro</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="titulo">Título</label>
                <input
                  type="text"
                  id="titulo"
                  value={modalState.book.Titulo}
                  onChange={(e) => setModalState({ ...modalState, book: { ...modalState.book, Titulo: e.target.value } })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="autor">Autor</label>
                <input
                  type="text"
                  id="autor"
                  value={modalState.book.Autor}
                  onChange={(e) => setModalState({ ...modalState, book: { ...modalState.book, Autor: e.target.value } })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="autor">Genero</label>
                <input
                  type="text"
                  id="genero"
                  value={modalState.book.genero}
                  onChange={(e) => setModalState({ ...modalState, book: { ...modalState.book, genero: e.target.value } })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="cantidad_total">Stock Total</label>
                <input
                  type="number"
                  id="cantidad_total"
                  value={modalState.book.cantidad_total}
                  onChange={(e) => setModalState({ ...modalState, book: { ...modalState.book, cantidad_total: e.target.value } })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Actualizar</button>
              <button
                type="button"
                onClick={handleModalClose}
                className="bg-gray-500 text-white px-4 py-2 rounded-md mt-4 ml-4 hover:bg-gray-600"
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TablaLibros;
