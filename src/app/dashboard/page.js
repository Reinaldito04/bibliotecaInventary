// pages/dashboard/page.js
import Layout from "../components/sidebar";
function DashboardPage() {
  return (
    <Layout>
      <h2 className="text-2xl font-semibold mb-4">Welcome to the Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card Example */}
        <div className="bg-white p-6 rounded-lg shadow 
        ">
          <h3 className="text-lg font-semibold">Card Title 1</h3>
          <p className="text-gray-600">Some description about this card.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Card Title 2</h3>
          <p className="text-gray-600">Some description about this card.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Card Title 3</h3>
          <p className="text-gray-600">Some description about this card.</p>
        </div>
      </div>
    </Layout>
  );
}

export default DashboardPage;
