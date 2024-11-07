import Layout from "@/app/components/sidebar";
import Breadcrumbs from "@/app/components/Breadcrumbs";
function page() {
  return (
    <Layout>
      <Breadcrumbs />

      <div
        className="container mx-auto "
      >
        <h1 className="text-3xl font-bold mb-3">Ver Préstamos</h1>
        <p className="text-lg mb-8 text-gray-600">
          Bienvenido a la sección de ver préstamos. Selecciona una préstamo para
          ver detalles.
        </p>
      </div>
    </Layout>
  );
}

export default page;
