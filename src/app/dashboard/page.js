// pages/dashboard/page.js
'use client'
import Layout from "../components/sidebar";
import Username from "../componentsUser/Username";
import CardInformations from "../components/CardInformations";
function DashboardPage() {
 

  return (
    <Layout>
      <h2 className="text-2xl font-semibold mb-4">Bienvenido al panel de administración, <Username /></h2>
      <CardInformations />
    </Layout>
  );
}

export default DashboardPage;
