"use client";
import React, { useState } from "react";

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
  });

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del libro:", formData);
    toggleModal();
  };

  return (
    <div className="p-6">
      <button
        onClick={toggleModal}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Agregar Libro
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={toggleModal}
          ></div>
          <div className="bg-white rounded-lg overflow-hidden shadow-lg z-10 max-w-screen-sm w-full mx-auto">
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-4">Agregar Nuevo Libro</h2>
              <div className="max-h-[80vh] overflow-y-auto"> {/* Scroll habilitado */}
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium  text-gray-700 
                       "
                      htmlFor="title"
                    >
                      Título
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="mt-1 block w-full border 
                      border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 
                      focus:ring-opacity-50 p-1"
                      placeholder="Ingrese el título del libro"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="author"
                    >
                      Autor
                    </label>
                    <input
                      type="text"
                      id="author"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      className="mt-1 block w-full border 
                      border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 
                      focus:ring-opacity-50 p-1"
                      placeholder="Ingrese el autor del libro"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="category"
                    >
                      Categoría
                    </label>
                    <input
                      type="text"
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="mt-1 block w-full border 
                      border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 
                      focus:ring-opacity-50 p-1"
                      placeholder="Ingrese la categoría del libro"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="editorial"
                    >
                      Editorial
                    </label>
                    <input
                      type="text"
                      id="editorial"
                      name="editorial"
                      value={formData.editorial}
                      onChange={handleChange}
                      className="mt-1 block w-full border 
                      border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 
                      focus:ring-opacity-50 p-1"
                      placeholder="Ingrese la editorial del libro"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="year"
                    >
                      Año de publicacion
                    </label>
                    <input
                      type="text"
                      id="year"
                      name="year"
                      value={formData.editorial}
                      onChange={handleChange}
                      className="mt-1 block w-full border 
                      border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 
                      focus:ring-opacity-50 p-1"
                      placeholder="Ingrese el Año de publicacion del libro"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="stock"
                    >
                      Stock
                    </label>
                    <input
                      type="number"
                      id="stock"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      className="mt-1 block w-full border 
                      border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 
                      focus:ring-opacity-50 p-1"
                      placeholder="Ingrese el stock del libro"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="description"
                    >
                      Descripción
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="mt-1 block w-full border 
                      border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 
                      focus:ring-opacity-50 p-1"
                      placeholder="Ingrese una descripción del libro"
                    ></textarea>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      type="button"
                      onClick={toggleModal}
                      className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition mr-2"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                      Guardar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AgregarLibro;
