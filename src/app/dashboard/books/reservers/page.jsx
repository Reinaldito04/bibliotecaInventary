import Layout from "@/app/components/sidebar"
import TableReservas from "@/app/components/tables/TablaReservas"
import Breadcrumbs from "@/app/components/Breadcrumbs"
function page() {
  return (
    <Layout>
        <Breadcrumbs />
      <div className="flex flex-col"></div>
        <h1 className="text-3xl font-bold mb-3">Reservar Libro</h1>
        <p className="text-lg mb-8 text-gray-600">
          Bienvenido a la seccion de reservar libros.
        </p>
        <TableReservas />
    </Layout>
  )
}

export default page