'use client'
import React, { useState } from 'react';

const librosData = [
  { id: 1, titulo: 'El Principito', autor: 'Antoine de Saint-Exupéry', stockTotal: 20, prestados: 2 },
  { id: 2, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', stockTotal: 15, prestados: 3 },
  { id: 3, titulo: '1984', autor: 'George Orwell', stockTotal: 10, prestados: 1 },
  { id: 4, titulo: 'El gran Gatsby', autor: 'F. Scott Fitzgerald', stockTotal: 12, prestados: 4 },
  { id: 5, titulo: 'Moby Dick', autor: 'Herman Melville', stockTotal: 8, prestados: 0 },
  { id: 6, titulo: 'Orgullo y prejuicio', autor: 'Jane Austen', stockTotal: 5, prestados: 1 },
];

const itemsPerPage = 4;

function TablaLibros() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredBooks = librosData.filter(libro =>
    libro.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    libro.autor.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <tr key={libro.id} className="hover:bg-gray-100 transition-colors duration-200">
              <td className="py-2 px-4 border-b text-center">{libro.id}</td>
              <td className="py-2 px-4 border-b">{libro.titulo}</td>
              <td className="py-2 px-4 border-b">{libro.autor}</td>
              <td className="py-2 px-4 border-b text-center">{libro.stockTotal}</td>
              <td className="py-2 px-4 border-b text-center">{libro.prestados}</td>
              <td className="py-2 px-4 border-b text-center">{libro.stockTotal - libro.prestados}</td>
              <td className="py-2 px-4 border-b text-center">
                <button onClick={() => handleViewDetails(libro.id)} className="text-blue-500 hover:underline mr-2">Ver</button>
                <button onClick={() => handleEdit(libro.id)} className="text-yellow-500 hover:underline mr-2">Editar</button>
                <button onClick={() => handleDelete(libro.id)} className="text-red-500 hover:underline">Eliminar</button>
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
