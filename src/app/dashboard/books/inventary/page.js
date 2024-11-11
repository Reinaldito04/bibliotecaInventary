import Layout from "@/app/components/sidebar";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import TablaLibros from "@/app/components/tables/TablaLibros";
import AgregarLibro from "@/app/components/AgregarLibro";
function page() {
  return (
    <Layout>
      <div className="flex flex-col">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-4">Inventarios de libros</h1>
        <p className="text-lg mb-6">Esta es la página de inventarios.</p>

        <TablaLibros />
        <div className="flex justify-center mt-6">
      <AgregarLibro />
        </div>
      </div>
    </Layout>
  );
}

export default page;
