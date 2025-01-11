"use client";

import Layout from "@/app/components/sidebar";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/app/utils/axiosinstace";
import { getToken } from "@/app/utils/Token";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Page() {
  const myswal = withReactContent(Swal);
  const [users, setUsers] = useState([]);
  const [dataHistory, setDataHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(3);
  const [activeTab, setActiveTab] = useState("usuarios");

  useEffect(() => {
    loadUsers();
    getDataHistory();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await axiosInstance.get("/auth/getUsers", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error al obtener la lista de usuarios:", error);
    }
  };

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmitRegisterAdmin = async (e) => {
    e.preventDefault();

    if (!userData.name || userData.name.length < 3) {
      myswal.fire({
        icon: "warning",
        title: "El nombre debe contener al menos 3 caracteres",
      });
      return;
    }

    if (!userData.email || !userData.email.includes("@")) {
      myswal.fire({
        icon: "warning",
        title: "Ingrese un correo electrónico válido",
      });
      return;
    }

    if (!userData.password || userData.password.length < 6) {
      myswal.fire({
        icon: "warning",
        title: "La contraseña debe tener al menos 6 caracteres",
      });
      return;
    }

    const data = {
      username: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role,
    };

    try {
      await axiosInstance.post("/auth/register", data, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      await axiosInstance.post(
        "/registerData/add",
        {
          text: `Se ha registrado al usuario ${userData.name}`,
          time: new Date(),
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      myswal.fire({
        icon: "success",
        title: "Usuario registrado exitosamente",
        timer: 1500,
      });
      setUserData({ name: "", email: "", password: "", role: "" });
      loadUsers();
    } catch (error) {
      myswal.fire({
        icon: "error",
        title: "Error al registrar al usuario",
        timer: 1500,
      });
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  async function getDataHistory() {
    try {
      const response = await axiosInstance.get('/registerData/get', {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setDataHistory(response.data);
      console.log('Respuesta de la solicitud GET:', response.data);
    } catch (error) {
      console.error('Error en la solicitud GET:', error);
    }
  }
  
  async function downloadDatabase() {
    try {
      // Realizar la solicitud GET para descargar el archivo de respaldo
      const response = await axiosInstance.get('/information/backup', {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        timeout: 1000000, // 1000 segundos
      });
  
      // Verificar el estado de la respuesta
      if (response.status === 200) {
        console.log('Respuesta recibida correctamente:', response);
  
        // Crear un blob a partir de la respuesta
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'database_backup.db'); // nombre del archivo
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
  
        console.log('Archivo descargado correctamente.');
      } else {
        console.error('Error en la respuesta:', response.status, response.statusText);
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.error('Solicitud cancelada:', error.message);
      } else if (error.code === 'ECONNABORTED') {
        console.error('Error: La solicitud se agotó (tiempo de espera excedido)');
      } else {
        console.error('Error al descargar el respaldo:', error);
      }
    }
  }

  return (
    <Layout>
      <Breadcrumbs />

      <h2 className="text-2xl font-semibold mb-4">Gestión de Usuarios</h2>

      {/* Tabs */}
      <div className="tabs flex space-x-4 border-b mb-4">
        <button
          className={`py-2 px-4 ${
            activeTab === "usuarios"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500 hover:text-blue-500"
          }`}
          onClick={() => setActiveTab("usuarios")}
        >
          Usuarios Registrados
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === "registrar"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500 hover:text-blue-500"
          }`}
          onClick={() => setActiveTab("registrar")}
        >
          Registrar Usuario
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === "historial"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500 hover:text-blue-500"
          }`}
          onClick={() => setActiveTab("historial")}
        >
         Historial de cambios
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === "otros"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500 hover:text-blue-500"
          }`}
          onClick={() => setActiveTab("otros")}
        >
         Otros
        </button>
      </div>

      {/* Contenido de Tabs */}

      {activeTab === "historial" && (
  <section className="bg-white p-6 rounded shadow">
    <h3 className="text-xl font-medium mb-2">Historial de Cambios</h3>
    <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-3 px-4 border-b text-left">Usuario</th>
          <th className="py-3 px-4 border-b text-left">Acción</th>
          <th className="py-3 px-4 border-b text-left">Fecha</th>
        </tr>
      </thead>
      <tbody className="text-gray-700">
        {dataHistory.map((data, index) => (
          <tr key={index} className="hover:bg-gray-100">
            <td className="py-2 px-4 border-b">{data.Username}</td>
            <td className="py-2 px-4 border-b">{data.text}</td>
            <td className="py-2 px-4 border-b">
              {data.time.replace("T", " ").replace("Z", "")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
)}

{activeTab === "usuarios" && (
  <section className="bg-white p-6 rounded shadow">
    <h3 className="text-xl font-medium mb-2">Usuarios Registrados</h3>
    <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-3 px-4 border-b text-left">Usuario</th>
          <th className="py-3 px-4 border-b text-left">Email</th>
          <th className="py-3 px-4 border-b text-left">Rol</th>
        </tr>
      </thead>
      <tbody className="text-gray-700">
        {currentUsers.map((user, index) => (
          <tr key={index} className="hover:bg-gray-100">
            <td className="py-2 px-4 border-b">{user.Username}</td>
            <td className="py-2 px-4 border-b">{user.Email}</td>
            <td className="py-2 px-4 border-b">{user.Role}</td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* Paginación */}
    <div className="mt-4 flex justify-center space-x-2">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => handlePageChange(i + 1)}
          className={`px-3 py-1 rounded ${
            currentPage === i + 1
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-blue-100"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  </section>
)}


      {activeTab === "registrar" && (
        <section className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-medium mb-2">Registrar Usuarios</h3>
          <form onSubmit={handleSubmitRegisterAdmin} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-600 mb-1">
                Nombre
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={userData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-600 mb-1">
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={userData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-600 mb-1">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={userData.password}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-gray-600 mb-1">
                Tipo de Usuario
              </label>
              <select
                id="role"
                name="role"
                value={userData.role}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              >
                <option value="" disabled>
                  Seleccione un rol
                </option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Registrar Administrador
            </button>
          </form>
        </section>
      )}
    

      {activeTab === "otros" && (
        <section className="bg-white p-6 rounded shadow">
          <h3 className="text-2xl font-medium mb-2">Otros</h3>
          <p>Respaldo de bases de datos.</p>
          <form onSubmit={downloadDatabase}>
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Realizar Respaldo
            </button>
          </form>
        </section>)}
    </Layout>
  );
}

export default Page;
