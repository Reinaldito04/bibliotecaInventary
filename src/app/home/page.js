// app/home/page.js
import React from "react";
import UserLayout from "../componentsUser/sidebarUser";
import Username from "../componentsUser/Username";
import Link from "next/link";

export default async function Page() {
  return (
    <UserLayout>
      <div className="container mx-auto px-6 py-6">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Bienvenido, <Username />
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link href="/home/books">
            <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white p-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-300 cursor-pointer">
              <h3 className="text-2xl font-semibold mb-3">Búsqueda de libros</h3>
              <p className="text-white/90">Busca libros por título o autor.</p>
            </div>
          </Link>

          <Link href="/home/leans">
            <div className="bg-gradient-to-r from-green-500 to-green-400 text-white p-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-300 cursor-pointer">
              <h3 className="text-2xl font-semibold mb-3">Libros prestados para mí</h3>
              <p className="text-white/90">Ver libros que tienes prestados.</p>
            </div>
          </Link>

          <Link href="/home/fines">
            <div className="bg-gradient-to-r from-red-500 to-red-400 text-white p-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-300 cursor-pointer">
              <h3 className="text-2xl font-semibold mb-3">Multas de libros</h3>
              <p className="text-white/90">Consulta las multas vinculadas a tu cuenta.</p>
            </div>
          </Link>
        </div>
      </div>
    </UserLayout>
  );
}
