// app/home/page.js
import React from "react";
import UserLayout from "../componentsUser/sidebarUser";
import Username from "../componentsUser/Username";
import Link from "next/link";
export default async function Page() {
  return (
    <UserLayout>
      <div className="container mx-auto px-4 py-2">
        <h1 className="text-4xl font-bold mb-6">Bienvenido <Username /></h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href={'/home/books'}> <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2">Búsqueda de libros</h3>
            <p className="text-gray-700">Busca libros por título o autor.</p>
          </div>
            </Link>
         
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2">Libros prestados para mí</h3>
            <p className="text-gray-700">Ver libros prestados.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2">Multas de libros</h3>
            <p className="text-gray-700">Ver multas vinculadas a mi cuenta.</p>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
