import React from "react";
import Layout from "@/app/components/sidebar";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import PrestamosLibros from "@/app/components/PrestamosLibros";
import Link from "next/link";

function Page() {
  const sections = [
    {
      id: 1,
      title: "Registrar Préstamos",
      description: "Registra nuevos préstamos de libros.",
      page: "loansRegister",
    },
    {
      id: 2,
      title: "Ver Préstamos",
      description: "Consulta los préstamos realizados por los usuarios.",
      page: "loansView",
    },
  ];

  return (
    <Layout>
      <Breadcrumbs />

      <div className="">
        <h1 className="text-3xl font-bold mb-3">
          Gestión de Préstamos de Libros
        </h1>
        <p className="text-lg mb-8 text-gray-600">
          Bienvenido a la sección de gestión de préstamos. Selecciona una opción
          para proceder.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {sections.map((section) => (
            <div
              key={section.id}
              className="bg-white shadow-md rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              <h2 className="text-2xl font-semibold mb-3 text-black-700">
                {section.title}
              </h2>
              <p className="text-gray-700 mb-5">{section.description}</p>
              <div className="flex justify-end">
                <Link
                  href={`/dashboard/books/loans/${section.page}`}
                  className="bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800 transition-colors"
                >
                  Ir a {section.title}
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
