'use client'; // Asegúrate de que el componente se renderice en el cliente
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Breadcrumbs = () => {
  const pathname = usePathname(); // Obtiene la ruta actual
  const pathSegments = pathname.split('/').filter(Boolean); // Dividir la URL en segmentos

  return (
    <nav className="border-b-2  border-gray-300 rounded-sm p-4 mb-6">
      <ol className="list-none flex space-x-4">
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1; // Comprobar si es el último segmento
          const href = '/' + pathSegments.slice(0, index + 1).join('/'); // Construir el enlace

          return (
            <li key={index} className="flex items-center">
              {isLast ? (
                <span className="text-gray-800 font-semibold">{segment.charAt(0).toUpperCase() + segment.slice(1)}</span> // Texto sin enlace para el último segmento
              ) : (
                <>
                  <Link href={href} className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
                    {segment.charAt(0).toUpperCase() + segment.slice(1)} 
                  </Link>
                  <span className=" text-gray-400 ml-2" >/</span> {/* Separador entre los segmentos */}
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
