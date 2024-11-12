"use client";
import { axiosInstance } from "@/app/utils/axiosinstace";
import UserLayout from "@/app/componentsUser/sidebarUser";
// Datos de ejemplo (en un caso real, estos vendrían de una API o del estado global)
import { useState,useEffect } from "react";
import { getToken } from "@/app/utils/Token";

function ProfilePage() {
    const [user, setUser] = useState({
        name: localStorage.getItem("username"),
        email :' '

    });

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await axiosInstance.get("/information/getUserInfo", {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          console.error("Error al obtener el usuario:", error);
        }
      };
      fetchUser();
    }, []);
  return (
    <UserLayout>
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          Perfil de Usuario
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-500 mb-2">
            Información Personal
          </h2>
          <p className="text-lg text-gray-700">
            <strong>Nombre:</strong> {user.username}
          </p>
          <p className="text-lg text-gray-700">
            <strong>Correo electrónico:</strong> {user.email}
          </p>
        </section>

        {/* Botón para editar el perfil */}
      </div>
    </UserLayout>
  );
}

export default ProfilePage;
