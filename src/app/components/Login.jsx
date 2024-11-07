'use client'
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
      // Usar URLSearchParams para formatear los datos como 'application/x-www-form-urlencoded'
      const params = new URLSearchParams();
      params.append("username", username);
      params.append("password", password);

      // Agregar Content-Type para asegurar que se enviará en formato x-www-form-urlencoded
      const response = await axiosInstance.post("/auth/token", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });

      // Almacenar el token en el localStorage
      localStorage.setItem("access_token", response.data.access_token);

      // Almacenar el rol en el localStorage
      localStorage.setItem("role", response.data.Role);

      // Redirigir a la página correspondiente basándote en el rol o alguna otra lógica
      const userRole = response.data.Role; // Asegúrate de que el backend envíe este valor
      if (userRole === "Admin") {
        router.push("/dashboard"); // Redirige al dashboard de administrador
      } else {
        router.push("/home"); // Redirige al dashboard de usuario
      }
    } catch (error) {
      setErrorMessage("Incorrect username or password");
    }
  };

  return (
    <div className="w-full max-w-lg p-5 flex flex-col items-center justify-center text-center font-mono text-sm">
      <h1 className="text-4xl font-bold text-gray-400 mb-6">
        Login to
        <span className="text-blue-500 ml-2">Biblioteca</span>
      </h1>

      {errorMessage && (
        <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
      )}

      <section className="w-full mt-4 flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="w-full h-10 rounded-md border text-black border-gray-300 px-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full h-10 rounded-md border text-black border-gray-300 px-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full h-10 rounded-md text-sm text-pretty bg-blue-500 text-white"
          onClick={handleLogin}
        >
          Login
        </button>
        <p className="text-sm text-gray-500">
          Don't have an account? <Link href={"/register"} className="text-blue-500">Register</Link>
        </p>
      </section>
    </div>
  );
}

export default Login;
