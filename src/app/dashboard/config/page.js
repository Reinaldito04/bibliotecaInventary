import Layout from "@/app/components/sidebar"
import Breadcrumbs from "@/app/components/Breadcrumbs"
function page() {
  return (
    <Layout>
    <Breadcrumbs />

    <h2 className="text-2xl font-semibold">
      Welcome to Config Page
    </h2>
    </Layout>
  )
}

export default page