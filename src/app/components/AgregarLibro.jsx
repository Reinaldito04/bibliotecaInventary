"use client";
import React, { useState } from "react";
import { FaBook, FaSave, FaTimes } from "react-icons/fa";
import { axiosInstance } from "../utils/axiosinstace";
import { getToken } from "../utils/Token";
function AgregarLibro() {

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    stock: "",
    description: "",
    editorial: "",
    year: "",
    pages: "",
    ubicacion: "",
  });

  const clearInputs = () => {
    setFormData({
      title: "",
      author: "",
      category: "",
      stock: "",
      description: "",
      editorial: "",
      year: "",
      pages: "",
      ubicacion: "",
    });
  }
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos del libro:", formData);
  
    const libro = {
      Titulo: formData.title,
      Autor: formData.author,
      genero: formData.category,
      cantidad_total: formData.stock,
      cantidad_disponible: formData.stock,
      Descripcion: formData.description,
      Editorial: formData.editorial,
      anio_publicacion: formData.year,
      Paginas: formData.pages,
      Ubicacion: formData.ubicacion,
    };
    console.log("Libro:", libro);
  
    try {
      await axiosInstance.post("/books/agg", libro, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });
      alert("Libro agregado con éxito");
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un código de error (por ejemplo, 400)
        alert("Error al agregar el libro: " + error.response.data.detail);
      } else {
        // Error de red u otro problema inesperado
        console.error("Error al agregar el libro:", error);
        alert("Error al agregar el libro: " + error.message);
      }
    }

    clearInputs();
  
    toggleModal();
  };
  

  return (
    <div className="p-6">
      <button
        onClick={toggleModal}
        className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition flex items-center gap-2"
      >
        <FaBook />
        Agregar Libro
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={toggleModal}
          ></div>
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden z-10 max-w-screen-md w-full mx-auto p-6 relative transform transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Agregar Nuevo Libro</h2>
            <div className="max-h-[80vh] overflow-y-auto p-4 bg-gray-50 rounded-lg"> {/* Scroll habilitado */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { label: "Título", id: "title", placeholder: "Ingrese el título del libro" },
                  { label: "Autor", id: "author", placeholder: "Ingrese el autor del libro" },
                  { label: "Categoría", id: "category", placeholder: "Ingrese la categoría del libro" },
                  { label: "Editorial", id: "editorial", placeholder: "Ingrese la editorial del libro" },
                  { label: "Año de publicación", id: "year", placeholder: "Ingrese el año de publicación del libro" },
                  { label: "Stock", id: "stock", placeholder: "Ingrese el stock del libro", type: "number" },
                  { label: "Páginas", id: "pages", placeholder: "Ingrese la cantidad de páginas", type: "number" },
                  { label: "Ubicación", id: "ubicacion", placeholder: "Ingrese la ubicación del libro" },
                ].map((input) => (
                  <div key={input.id} className="flex flex-col">
                    <label className="text-gray-700 font-medium" htmlFor={input.id}>
                      {input.label}
                    </label>
                    <input
                      type={input.type || "text"}
                      id={input.id}
                      name={input.id}
                      value={formData[input.id]}
                      onChange={handleChange}
                      className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
                      placeholder={input.placeholder}
                      required
                    />
                  </div>
                ))}

                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium" htmlFor="description">
                    Descripción
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
                    placeholder="Ingrese una descripción del libro"
                    rows="3"
                  ></textarea>
                </div>

                <div className="flex justify-end mt-6 gap-4">
                  <button
                    type="button"
                    onClick={toggleModal}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition flex items-center gap-2"
                  >
                    <FaTimes />
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition flex items-center gap-2"
                  >
                    <FaSave />
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AgregarLibro;
