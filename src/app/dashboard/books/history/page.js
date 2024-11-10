import React from "react";
import Layout from "@/app/components/sidebar";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import PrestamosLibros from "@/app/components/PrestamosLibros";
import Link from "next/link";
import TableHistory from "../../../components/TableHistory";
function Page() {
  

  return (
    <Layout>
      <Breadcrumbs />

      <div className="">
        <h1 className="text-3xl font-bold mb-3">
        Historial de Prestamos 
        </h1>
        <p className="text-lg mb-8 text-gray-600">
          Bievenido al historial de prestamos. 
        </p>
        <TableHistory />
      
      </div>
    </Layout>
  );
}

export default Page;
