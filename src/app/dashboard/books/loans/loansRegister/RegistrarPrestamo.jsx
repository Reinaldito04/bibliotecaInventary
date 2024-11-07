"use client";
import React, { useState, useEffect } from "react";
import { axiosInstance } from "@/app/utils/axiosinstace";
import { getToken } from "@/app/utils/Token";

function RegistrarPrestamo() {
  const [userData, setUserData] = useState([]);
  const [bookData, setBookData] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  const [formData, setFormData] = useState({
    nombreUsuario: "",
    idLibro: "",
    tituloLibro: "",
    fechaPrestamo: "",
    fechaDevolucion: "",
  });
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showBookDropdown, setShowBookDropdown] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/auth/getUsers", {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        setUserData(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };
    fetchUsers();
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
      setFilteredBooks(response.data);
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

  const handleUserSelect = (username) => {
    setFormData({ ...formData, nombreUsuario: username });
    setShowUserDropdown(false);
  };

  const handleBookSelect = (book) => {
    setFormData({ ...formData, idLibro: book.ID, tituloLibro: book.Titulo });
    setShowBookDropdown(false);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowUserDropdown(false);
      setShowBookDropdown(false);
    }, 150);
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
          <label className="block text-gray-700 font-medium mb-2">
            Nombre del Usuario
          </label>
          <input
            type="text"
            name="nombreUsuario"
            value={formData.nombreUsuario}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Buscar usuario"
          />
          {showUserDropdown && (
            <ul className="absolute bg-white border z-50 border-gray-300 w-full mt-1 max-h-40 overflow-y-auto">
              {filteredUsers.map((user) => (
                <li
                  key={user.Username}
                  onClick={() => handleUserSelect(user.Username)}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {user.Username} - {user.Email}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mb-4 relative">
          <label className="block text-gray-700 font-medium mb-2">
            Título del Libro
          </label>
          <input
            type="text"
            name="tituloLibro"
            value={formData.tituloLibro}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Buscar libro"
          />
          {showBookDropdown && (
            <ul className="absolute bg-white z-50 border border-gray-300 w-full mt-1 max-h-40 overflow-y-auto">
              {filteredBooks.map((book) => (
                <li
                  key={book.ID}
                  onClick={() => handleBookSelect(book)}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {book.Titulo} - {book.Autor} - Disponible :{" "}
                  {book.cantidad_disponible}
                </li>
              ))}
            </ul>
          )}
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
