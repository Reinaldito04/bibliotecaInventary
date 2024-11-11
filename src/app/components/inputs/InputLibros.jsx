"use client";
import React, { useState, useEffect } from "react";

function InputBook({ formData, setFormData, bookData }) {
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showBookDropdown, setShowBookDropdown] = useState(false);

  const handleChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      tituloLibro: value,
    });
    setShowBookDropdown(true);

    // Mostrar todos los libros si el campo está vacío
    const filtered = value
      ? bookData.filter((book) =>
          book.Titulo.toLowerCase().includes(value.toLowerCase())
        )
      : bookData;

    setFilteredBooks(filtered);
  };

  const handleBookSelect = (book) => {
    setFormData({
      ...formData,
      idLibro: book.ID, // Asegúrate de que este campo sea correcto
      tituloLibro: book.Titulo, // Usa 'Titulo' para que coincida con el campo
    });
    setShowBookDropdown(false);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowBookDropdown(false);
    }, 150);
  };

  return (
    <>
      <label className="block text-gray-700 font-medium mb-2">Título del Libro</label>
      <input
        type="text"
        value={formData.tituloLibro}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-full border border-gray-300 p-2 rounded"
        placeholder="Buscar libro"
      />
      {showBookDropdown && filteredBooks.length > 0 && (
        <ul className="absolute bg-white border z-50 border-gray-300 w-full mt-1 max-h-40 overflow-y-auto">
          {filteredBooks.map((book) => (
            <li
              key={book.ID}
              onClick={() => handleBookSelect(book)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {book.Titulo} - {book.Autor}
            </li>
          ))}
        </ul>
      )}
      {showBookDropdown && filteredBooks.length === 0 && (
        <div className="absolute bg-white border z-50 border-gray-300 w-full mt-1 p-2">
          No se encontraron libros
        </div>
      )}
    </>
  );
}

export default InputBook;
