import React from 'react'
import Layout from '@/app/components/sidebar'
import Breadcrumbs from '@/app/components/Breadcrumbs'
import PrestamosLibros from '@/app/components/PrestamosLibros'
function page() {
  return (
    <Layout>
         <div className="flex flex-col">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-4">Prestamos de libros</h1>
        <p className="text-lg mb-6">Esta es la página de Prestamos.</p>
        <div>
          <PrestamosLibros />
        </div>
       
      </div>
    </Layout>
  )
}

export default page