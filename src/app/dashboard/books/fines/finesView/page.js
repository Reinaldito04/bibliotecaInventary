import Layout from "@/app/components/sidebar"
import Breadcrumbs from "@/app/components/Breadcrumbs"
import RegistrarMultas from "@/app/components/RegistrarMultas"
import TableMultas from "@/app/components/tables/TableMultas"
function page() {
  return (
    <Layout>
        <Breadcrumbs/>
        <div className="">
        <h1 className="text-3xl font-bold mb-3">Ver Multas</h1>
        <p className="text-lg mb-8 text-gray-600">
          Bienvenido a la sección de ver multas.

        </p>
        <TableMultas/>
      </div>
    </Layout>
  )
}

export default page