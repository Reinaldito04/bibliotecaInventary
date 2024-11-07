import Layout from "@/app/components/sidebar";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import RegistrarPrestamo from "./RegistrarPrestamo";
export default function page() {
  return (
    <Layout>
      <Breadcrumbs />

      <div className="flex flex-col ">
        <h1 className="text-3xl font-bold mb-3">Registrar Préstamos</h1>
        <p className="text-lg mb-6 text-gray-600">
          Bienvenido a la sección de registrar préstamos de libros. Por favor,
          completa el siguiente formulario para registrar un nuevo prestatario.
        </p>
        <RegistrarPrestamo />
      </div>
    </Layout>
  );
}
