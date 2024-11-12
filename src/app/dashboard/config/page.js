"use client";

import Layout from "@/app/components/sidebar";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/app/utils/axiosinstace";
import { getToken } from "@/app/utils/Token";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Page() {
  const myswal = withReactContent(Swal);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(3);

  useEffect(() => {
    loadUsers();
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
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmitRegisterAdmin = async (e) => {
    e.preventDefault();

    // Validaciones de los campos
    if (!userData.name || userData.name.length < 3) {
      myswal.fire({
        icon: "warning",
        title: "El nombre debe contener al menos 3 caracteres",
        showConfirmButton: true,
      });
      return;
    }

    if (!userData.email || !userData.email.includes("@")) {
      myswal.fire({
        icon: "warning",
        title: "Ingrese un correo electrónico válido",
        showConfirmButton: true,
      });
      return;
    }

    if (!userData.password || userData.password.length < 6) {
      myswal.fire({
        icon: "warning",
        title: "La contraseña debe tener al menos 6 caracteres",
        showConfirmButton: true,
      });
      return;
    }

    const data = {
      username: userData.name,
      email: userData.email,
      password: userData.password,
      role: 'Admin',
    };

    try {
      const response = await axiosInstance.post("/auth/register", data, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      console.log(response.data);
      myswal.fire({
        icon: "success",
        title: "Administrador registrado exitosamente",
        showConfirmButton: false,
        timer: 1500,
      });
      setUserData({
        name: "",
        email: "",
        password: "",
      });
      loadUsers();
    } catch (error) {
      console.error("Error al registrar el administrador:", error);
      myswal.fire({
        icon: "error",
        title: "Error al registrar el administrador",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  // Lógica para la paginación
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Layout>
      <Breadcrumbs />

      <h2 className="text-2xl font-semibold mb-4">Welcome to Config Page</h2>

      <div className="config-section space-y-8">
        {/* Usuarios registrados */}
        <section className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-medium mb-2">Usuarios Registrados</h3>
          <ul className="list-disc pl-5 space-y-2">
            {currentUsers.map((user, index) => (
              <li key={index}>
                {user.Username} - {user.Email} - {user.Role}
              </li>
            ))}
          </ul>

          {/* Paginación */}
          <div className="mt-4 flex justify-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </section>

        {/* Formulario de registro de administrador */}
        <section className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-medium mb-2">Registrar Administradores</h3>
          <form onSubmit={handleSubmitRegisterAdmin} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-600 mb-1">Nombre</label>
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
              <label htmlFor="email" className="block text-gray-600 mb-1">Correo Electrónico</label>
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
              <label htmlFor="password" className="block text-gray-600 mb-1">Contraseña</label>
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
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Registrar Administrador
            </button>
          </form>
        </section>
      </div>
    </Layout>
  );
}

export default Page;
