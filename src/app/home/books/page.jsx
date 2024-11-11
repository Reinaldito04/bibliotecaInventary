"use client";
import UserLayout from "@/app/componentsUser/sidebarUser";
import { useState, useEffect } from "react";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { axiosInstance } from "@/app/utils/axiosinstace";
import { getToken } from "@/app/utils/Token";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
function BookSearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const MySwal = withReactContent(Swal);

  // Obtener los resultados de la API
  const handleSearch = async () => {
    try {
      const response = await axiosInstance.get(`/books/books`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setSearchResults(response.data);
      setFilteredResults(response.data); // Inicializamos con todos los resultados
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);
  const handleSubmit = async (book) => {
    MySwal.fire({
      title: `¿Estás seguro de agregar el libro? ${book.Titulo}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, agregar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
       
        try {
          // Enviar la solicitud POST correctamente
          const response = await axiosInstance.post(
            "/reserves/agg", 
            {
              IDBook: book.ID,
              Estado: 'Reservado'
            }, 
            {
              headers: {
                Authorization: `Bearer ${getToken()}`,
              },
            }
          );
  
          // Mostrar éxito después de agregar el libro
          MySwal.fire("Agregado!", "El libro ha sido agregado.", "success");
        } catch (error) {
          console.error(error);
          MySwal.fire("Error", "No se pudo agregar el libro.", "error");
        }
      }
    });
  };
  

  // Filtrar los resultados basados en el término de búsqueda
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredResults(searchResults); // Si no hay término, mostrar todos los resultados
    } else {
      setFilteredResults(
        searchResults.filter(
          (book) =>
            book.Titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.Autor.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, searchResults]);

  return (
    <UserLayout>
      <Breadcrumbs />
      <div className="container mx-auto px-6 py-8 bg-gray-50 ">
        <h1 className="text-3xl font-bold mb-6 text-black-600">
          Búsqueda de Libros
        </h1>
        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="Buscar por título o autor"
          />
        </div>
        <div className="max-h-80 overflow-y-auto">
          {filteredResults.length > 0 ? (
            <ul className="space-y-6">
              {filteredResults.map((book, index) => (
                <div
                  key={index}
                  className="p-6 bg-white rounded-lg shadow-md hover:bg-gray-50 transition duration-300"
                >
                  <div className="flex flex-col gap-2 ">
                    <h3 className="text-2xl font-semibold text-blue-600">
                      {book.Titulo}
                    </h3>
                    <p className="text-gray-700 text-lg">Autor: {book.Autor}</p>
                    <p className="text-gray-600">Editorial: {book.Editorial}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600">
                      Cantidad disponible: {book.cantidad_disponible}
                    </p>
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md transition-all
                    duration-300
                    ease-in-out
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    "
                    onClick={() => handleSubmit(book)}
                    >
                      Reservar
                    </button>
                  </div>
                </div>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-center">
              No se encontraron resultados.
            </p>
          )}
        </div>
      </div>
    </UserLayout>
  );
}

export default BookSearchPage;
