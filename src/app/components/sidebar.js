"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import {
  FaHome,
  FaUser,
  FaCog,
  FaChartBar,
  FaBell,
  FaChevronLeft,
  FaChevronRight,
  FaBook,
} from "react-icons/fa";
import Link from "next/link";
import { CiLogout } from "react-icons/ci";
export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const isTokenExpired = () => {
    const token = localStorage.getItem("access_token");
    if (!token) return true;

    try {
      const decodedToken = jwtDecode(token);
      const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
      const isExpired = Date.now() > expirationTime;
      // Verifica si el rol del usuario es 'admin'
      const userRole = decodedToken.Role; // Asegúrate de que el token tenga esta estructura
      const isAdmin = userRole === "Admin";
      return isExpired || !isAdmin;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true; // If there's an error decoding, consider token as expired
    }
  };

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (isTokenExpired()) {
        localStorage.removeItem("access_token"); // Remove expired token
        router.push("/"); // Redirect to login
      }
    };

    // Initial check when component mounts
    checkTokenExpiration();

    // Set interval to check expiration every minute
    const interval = setInterval(checkTokenExpiration, 60000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside
        className={`transition-width duration-300 bg-blue-900 text-white flex flex-col p-4 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex justify-between items-center mb-10">
          <h2
            className={`text-2xl font-bold transition-opacity duration-300 ${
              sidebarOpen ? "opacity-100" : "opacity-0 hidden"
            }`}
          >
            Biblioteca
          </h2>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:bg-blue-700 p-2 rounded"
          >
            {sidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        </div>

        <nav className="flex flex-col gap-4 flex-grow">
          <Link
            href="/dashboard"
            className="flex items-center gap-4 p-2 hover:bg-blue-700 rounded transition-all"
          >
            <FaHome className="text-lg" />
            <span className={`${sidebarOpen ? "block" : "hidden"}`}>Home</span>
          </Link>
          <Link
            href="/dashboard/books"
            className="flex items-center gap-4 p-2 hover:bg-blue-700 rounded transition-all"
          >
            <FaBook className="text-lg" />
            <span className={`${sidebarOpen ? "block" : "hidden"}`}>
              Libros
            </span>
          </Link>
          <Link
            href="/dashboard/config"
            className="flex items-center gap-4 p-2 hover:bg-blue-700 rounded transition-all"
          >
            <FaCog className="text-lg" />
            <span className={`${sidebarOpen ? "block" : "hidden"}`}>
              Settings
            </span>
          </Link>

          {/* Logout button at the bottom */}
          <div className="mt-auto ">
            <button
              className="flex items-center gap-4 p-2 hover:bg-blue-700 rounded transition-all"
              onClick={() => {
                localStorage.removeItem("access_token");
                window.location.href = "/";
              }}
            >
              <CiLogout className="text-lg" size={30}></CiLogout>
              <span className={`${sidebarOpen ? "block" : "hidden"}`}>
                Logout
              </span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Logo" className="h-10" />
            <h1 className="text-xl font-semibold">Biblioteca</h1>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 flex-grow bg-white shadow-lg rounded-lg m-4 overflow-auto max-h-[calc(100vh-7rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}
