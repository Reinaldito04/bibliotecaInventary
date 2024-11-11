"use client";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "@/app/utils/axiosinstace";
import { getToken } from "@/app/utils/Token";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
function TableReservas() {
  
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
  const mySwal  = withReactContent(Swal);
  const fetchBooks = async () => {
    try {
      const response = await axiosInstance.get("/reserves/get", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (response.data){
        setLibrosData(response.data.reserves);

      }
      else{
        setError("Error al obtener los datos");
        setLibrosData([])
      }
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
    setLibrosData([])
    }
  };
 

  // Paginación
  const indexOfLastBook = currentPage * itemsPerPage;
  const indexOfFirstBook = indexOfLastBook - itemsPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  // Cambio de página
  const handlePageChange = (page) => setCurrentPage(page);

  const handleSubmit = async (book)=>{
    if (book.Estado === "Entregado") {
      mySwal.fire({
        title: 'Error',
        text: 'El libro ya ha sido entregado',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;
    }
    mySwal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas cambiar el estado de la reserva a entregado?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',

      cancelButtonText: 'Cancelar',

      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
        const response = await axiosInstance.put(`/reserves/update/${book.ID}`, {
          Estado: 'Entregado'
        }, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        mySwal.fire("Reservado!", "El estado ha sido cambiado a entregado.", "success");  
        fetchBooks();
      } catch (error) {
        setError(error.response ? error.response.data : error.message);
        }
      }
      }
    )
  }

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
              <th className="py-3 px-4 border-b">ID Reserva</th>
              <th className="py-3 px-4 border-b">Título</th>
              <th className="py-3 px-4 border-b">Autor</th>
    
              <th className="py-3 px-4 border-b">Usuario</th>
              <th className="py-3 px-4 border-b">Email</th>
              <th className="py-3 px-4 border-b">Estado</th>
              <th className="py-3 px-4 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {currentBooks.map((libro) => (
              <tr
                key={libro.ID}
                className="hover:bg-gray-100 transition-colors duration-200"
              >
                <td className="py-2 px-4 border-b text-center">
                  {libro.ID}
                </td>
                
                <td className="py-2 px-4 border-b">{libro.Titulo}</td>
                <td className="py-2 px-4 border-b">{libro.Autor}</td>
            
                <td className="py-2 px-4 border-b">{libro.Username}</td>
                <td className="py-2 px-4 border-b">{libro.Email}</td>
                <td className="py-2 px-4 border-b">{libro.Estado}</td>
                <td className="py-2 px-4 border-b text-center">
                    <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px
                    -4 rounded"
                    onClick={() => handleSubmit(libro)}
                    >
                        Cambiar Estado
                    </button>
                </td>
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

export default TableReservas;
