import Layout from "@/app/components/sidebar"
import Breadcrumbs from "@/app/components/Breadcrumbs"
import RegistrarMultas from "@/app/components/RegistrarMultas"
function page() {
  return (
    <Layout>
        <Breadcrumbs/>
        <div className="">
        <h1 className="text-3xl font-bold mb-3">Registrar Multas</h1>
        <p className="text-lg mb-8 text-gray-600">
          Bienvenido a la sección de registrar multas de libros. Por favor,
          completa el siguiente formulario para registrar una nueva multa.
        </p>
       <RegistrarMultas/>
      </div>
    </Layout>
  )
}

export default page