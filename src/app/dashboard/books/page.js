'use client'
import Layout from "@/app/components/sidebar";
import { FaBookOpen } from "react-icons/fa";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import Link from "next/link";
function Page() {
  const Sections = [
    { id: 1, title: "Inventarios", description: "Un inventario de libros",page:"inventary" },
    { id: 2, title: "Préstamos", description: "Préstamos de libros por los usuarios",page:"loans" },
    { id: 3, title: "Devoluciones", description: "Manejo de devoluciones de libros" },
    { id: 4, title: "Reservas", description: "Reservas de libros por los usuarios" },
    { id: 5, title: "Historial de Préstamos", description: "Registro de todos los préstamos" },
    { id: 6, title: "Multas", description: "Registro de multas por los usuarios" },

 
  ];

  return (
    <Layout>
      <div className="flex flex-col   ">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-4">Página de Libros</h1>
        <p className="text-lg mb-6">Esta es la página de libros.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Sections.map((section) => (
            <div key={section.id} className="bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105">
              <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
              <p className="text-gray-700 mb-4">{section.description}</p>
              <div className="flex justify-end ">
                <Link href={`/dashboard/books/${section.page}`}>
                <button className="flex items-center text-blue-500 hover:text-blue-700">
                  <FaBookOpen className="mr-1" /> Ver
                </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Page;
