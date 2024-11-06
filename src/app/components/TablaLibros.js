'use client'
import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../utils/axiosinstace';

const itemsPerPage = 4;

function TablaLibros() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [librosData, setLibrosData] = useState([]);
  const [error, setError] = useState(null);
  
  const filteredBooks = librosData.filter(libro =>
    libro.Titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    libro.Autor.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const token = localStorage.getItem("access_token"); // O cualquier otro método para obtener el token

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get('/books/books', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        console.log(response.data);
        setLibrosData(response.data);
      } catch (error) {
        console.error("Error al obtener los libros:", error.response ? error.response.data : error.message);
        setError(error);
      }
    };

    fetchBooks();
  }, []);

  const indexOfLastBook = currentPage * itemsPerPage;
  const indexOfFirstBook = indexOfLastBook - itemsPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (id) => {
    console.log(`Editando el libro con ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Eliminando el libro con ID: ${id}`);
  };

  const handleViewDetails = (id) => {
    console.log(`Viendo detalles del libro con ID: ${id}`);
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
          {currentBooks.map(libro => (
            <tr key={libro.ID} className="hover:bg-gray-100 transition-colors duration-200">
              <td className="py-2 px-4 border-b text-center">{libro.ID}</td>
              <td className="py-2 px-4 border-b">{libro.Titulo}</td>
              <td className="py-2 px-4 border-b">{libro.Autor}</td>
              <td className="py-2 px-4 border-b text-center">{libro.cantidad_total}</td>
              <td className="py-2 px-4 border-b text-center">{libro.cantidad_total - libro.cantidad_disponible}</td>
              <td className="py-2 px-4 border-b text-center">{libro.cantidad_disponible}</td>
              <td className="py-2 px-4 border-b text-center">
                <button onClick={() => handleViewDetails(libro.ID)} className="text-blue-500 hover:underline mr-2">Ver</button>
                <button onClick={() => handleEdit(libro.ID)} className="text-yellow-500 hover:underline mr-2">Editar</button>
                <button onClick={() => handleDelete(libro.ID)} className="text-red-500 hover:underline">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-300 transition-all duration-200 hover:bg-blue-600"
        >
          Anterior
        </button>
        <span className="text-gray-600 font-semibold">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-300 transition-all duration-200 hover:bg-blue-600"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default TablaLibros;
