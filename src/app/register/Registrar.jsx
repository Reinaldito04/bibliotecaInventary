"use client";

import React, { useState } from "react";
import { axiosInstance } from "../utils/axiosinstace";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Registrar() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password) {
      toast.error("Todos los campos son obligatorios.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post("/auth/register", {
        username,
        email,
        password,
        role: "User",
      });

      toast.success("Usuario registrado con éxito.", {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (error) {
      toast.error("Error al registrar el usuario. Intente nuevamente.", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg p-6 flex flex-col bg-white shadow-md rounded-lg mx-auto mt-10">
      <ToastContainer />
      <h1 className="text-4xl font-semibold text-gray-800 mb-6 text-center">
        Registrar Usuario
      </h1>
      <section className="w-full flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label
            className="text-gray-700 text-lg font-medium"
            htmlFor="username"
          >
            Nombre
          </label>
          <input
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-black"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingrese su nombre"
            aria-label="Nombre de usuario"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-700 text-lg font-medium" htmlFor="email">
            Email
          </label>
          <input
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-black"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingrese su correo electrónico"
            aria-label="Correo electrónico"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="text-gray-700 text-lg font-medium"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-black"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingrese su contraseña"
            aria-label="Contraseña"
          />
        </div>

        <button
          className={`w-full py-3 rounded-lg text-white ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } transition duration-200`}
          type="submit"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Registrando..." : "Registrar"}
        </button>
      </section>
    </div>
  );
}

export default Registrar;
