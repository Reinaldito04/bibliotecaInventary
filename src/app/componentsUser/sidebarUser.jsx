"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {jwtDecode} from "jwt-decode"; // Asegúrate de tener instalada esta dependencia
import { FaHome, FaUser, FaInfo, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";

export default function UserLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const isTokenExpired = () => {
    const token = localStorage.getItem("access_token");
    if (!token) return true;

    try {
      const decodedToken = jwtDecode(token);
      const expirationTime = decodedToken.exp * 1000; // Convertir a milisegundos
      return Date.now() > expirationTime;
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return true; // Si hay un error en la decodificación, considera el token como expirado
    }
  };

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (isTokenExpired()) {
        localStorage.removeItem("access_token"); // Elimina el token expirado
        router.push("/"); // Redirige al login
      }
    };

    // Comprobación inicial al montar el componente
    checkTokenExpiration();

    // Intervalo para verificar la expiración cada minuto
    const interval = setInterval(checkTokenExpiration, 60000);

    // Limpieza del intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside className={`transition-width duration-300 bg-green-800 text-white flex flex-col p-4 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="flex justify-between items-center mb-10">
          <h2 className={`text-2xl font-bold transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>Panel</h2>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="text-white hover:bg-green-700 p-2 rounded"
          >
            {sidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        </div>
        
        <nav className="flex flex-col gap-4">
          <Link href="/home" className="flex items-center gap-4 p-2 hover:bg-green-600 rounded">
            <FaHome />
            {sidebarOpen && <span>Inicio</span>}
          </Link>
          <Link href="/home/profile" className="flex items-center gap-4 p-2 hover:bg-green-600 rounded">
            <FaUser />
            {sidebarOpen && <span>Perfil</span>}
          </Link>
          <Link href="./manual.pdf" className="flex items-center gap-4 p-2 hover:bg-green-600 rounded">
            <FaInfo />
            {sidebarOpen && <span>Información</span>}
          </Link>
        </nav>
      </aside>
      
      {/* Contenido principal */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
