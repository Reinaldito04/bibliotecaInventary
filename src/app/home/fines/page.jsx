import UserLayout from "@/app/componentsUser/sidebarUser";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import TableMultas from "@/app/components/tables/TableMultas";
function page() {
  return (
    <UserLayout>
      <Breadcrumbs />
      <div className="container mx-auto px-6 py-8 bg-gray-50 ">
        <h1 className="text-3xl font-bold mb-6 text-black-600">
          Multas
        </h1>
        <TableMultas />
      </div>
      
    </UserLayout>
  );
}

export default page;
