"use client";
import React from "react";
import { useState } from "react";
import { axiosInstance } from "../utils/axiosinstace";
function Registrar() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      // Agregar Content-Type para asegurar que se enviará en formato x-www-form-urlencoded
      const response = await axiosInstance.post("/auth/register", {
        username,
        email,
        password,
        role : "User"
      });

      // Almacenar el token en el localStorag
      // Redirigir a la página correspondiente
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-full max-w-lg p-5 flex flex-col bg-white shadow-lg rounded-lg mx-auto mt-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Register User
      </h1>

      <section className="w-full flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 text-lg font-medium" htmlFor="name">
            Name
          </label>
          <input
            className="border border-gray-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-black"
            type="text"
            name="name"
            id="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-700 text-lg font-medium" htmlFor="email">
            Email
          </label>
          <input
            className="border border-gray-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-black"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            placeholder="Enter your email"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="text-gray-700 text-lg font-medium"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="border border-gray-800 text-black p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            placeholder="Enter your password"
          />
        </div>

        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
          type="submit"
          onClick={handleRegister}
        >
          Register
        </button>
      </section>
    </div>
  );
}

export default Registrar;
