"use client";
import React, { useState, useEffect } from "react";
import { axiosInstance } from "@/app/utils/axiosinstace";
import { getToken } from "@/app/utils/Token";
import InputUser from "./inputs/InputUser";
import InputBook from "./inputs/InputLibros";

function RegistrarPrestamo() {
  const [bookData, setBookData] = useState([]);

  const [formData, setFormData] = useState({
    nombreUsuario: "",
    idLibro: "",
    tituloLibro: "",
    fechaPrestamo: "",
    fechaDevolucion: "",
  });


  useEffect(() => {
   
    fetchBooks();
  }, []);
  const fetchBooks = async () => {
    try {
      const response = await axiosInstance.get("/books/books", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setBookData(response.data);
    } catch (error) {
      console.error("Error al obtener los libros:", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "nombreUsuario") {
      if (value) {
        const filtered = userData.filter((user) =>
          user.Username.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredUsers(filtered);
        setShowUserDropdown(true);
      } else {
        setShowUserDropdown(false);
      }
    }

    if (name === "tituloLibro") {
      if (value) {
        const filtered = bookData.filter((book) =>
          book.Titulo.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredBooks(filtered);
        setShowBookDropdown(true);
      } else {
        setShowBookDropdown(false);
      }
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos del préstamo:", formData);
  
    try {
      // Esperar la respuesta de la API
      const response = await axiosInstance.post(
        "/leans/agg",
        {
          Username: formData.nombreUsuario,
          IDBook: formData.idLibro,
          DateStart: formData.fechaPrestamo,
          DateEnd: formData.fechaDevolucion,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
  
      // Comprobar si la respuesta tiene el código de éxito (200)
      if (response.status === 200) {
        alert("Préstamo registrado con éxito");
      } else {
        alert("Error al registrar el préstamo: " + response.data.error);
      }
    } catch (error) {
      // Manejar error si no se pudo realizar la solicitud
      if (error.response) {
        // El servidor respondió con un código de error (ej. 400, 500)
        alert("Error al registrar el préstamo: " + error.response.data.error);
      } else {
        // Error de red o error en la solicitud
        alert("Error al registrar el préstamo: " + error.message);
      }
    } finally {
      // Limpiar los campos del formulario después de la solicitud
      setFormData({
        nombreUsuario: "",
        idLibro: "",
        tituloLibro: "",
        fechaPrestamo: "",
        fechaDevolucion: "",
      });
      // Rehacer la solicitud para obtener los libros después de registrar el préstamo
      fetchBooks();
    }
  };
  

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg w-4/6 mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="mb-4 relative">
        <InputUser formData={formData} setFormData={setFormData} />

        </div>

        <div className="mb-4 relative">
         <InputBook formData={formData} setFormData={setFormData} bookData={bookData}/>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Fecha de Préstamo
          </label>
          <input
            type="date"
            name="fechaPrestamo"
            value={formData.fechaPrestamo}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Fecha de Devolución
          </label>
          <input
            type="date"
            name="fechaDevolucion"
            value={formData.fechaDevolucion}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Registrar Préstamo
        </button>
      </form>
    </div>
  );
}

export default RegistrarPrestamo;
