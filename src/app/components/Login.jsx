"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "../utils/axiosinstace";
import Link from "next/link";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const params = new URLSearchParams();
      params.append("username", username);
      params.append("password", password);

      const response = await axiosInstance.post("/auth/token", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("username", username);
      localStorage.setItem("role", response.data.Role);

      const userRole = response.data.Role;
      if (userRole === "Admin") {
        router.push("/dashboard");
      } else {
        router.push("/home");
      }
    } catch (error) {
      setErrorMessage("Incorrect username or password");
    }
  };

  return (
    <div className=" flex items-center justify-center bg-gray-50 rounded-lg">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
        {/* Logo */}
        <div className="mb-6">
          <img
            src="/logo.png"
            alt="Logo Biblioteca"
            className="w-20 h-20 object-contain"
          />
        </div>

        {/* Título */}
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
          Bienvenido a <span className="text-blue-500">Biblioteca</span>
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Ingresa tus credenciales para acceder a tu cuenta.
        </p>

        {/* Mensaje de error */}
        {errorMessage && (
          <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
        )}

        {/* Formulario */}
        <section className="w-full">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full h-12 rounded-md border border-gray-400 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full h-12 rounded-md border border-gray-400 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center w-full">
            <button
              className="w-[80%] h-12 rounded-md text-sm font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </section>

        {/* Enlace a registro */}
        <p className="text-sm text-gray-600 mt-4">
          ¿No tienes una cuenta?{" "}
          <Link href={"/register"} className="text-blue-500 font-semibold">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
