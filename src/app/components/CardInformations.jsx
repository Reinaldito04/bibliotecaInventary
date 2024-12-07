  "use client";
  import { useEffect, useState } from "react";
  import { axiosInstance } from "../utils/axiosinstace";
  import { getToken } from "../utils/Token";
  import { FaBook, FaMoneyBillWave, FaCalendarCheck, FaBookOpen, FaUser } from "react-icons/fa";

  const endpointConfig = [
    { key: "cantidadLibros", url: "/information/getBooksCantity", title: "Libros", icon: <FaBook />, description: "Libros en el sistema" },
    { key: "cantidadMultas", url: "/information/getFinesCantity", title: "Multas ", icon: <FaMoneyBillWave />, description: "Multas activas" },
    { key: "cantidadReservas", url: "/information/getReservesCantity", title: "Reservas", icon: <FaCalendarCheck />, description: "Reservas totales" },
    { key: "cantidadPrestamos", url: "/information/getLeans", title: "Préstamos ", icon: <FaBookOpen />, description: "Préstamos en curso" },
    { key: "cantidadStockLibros", url: "/information/getBooksStock", title: "Stock de Libros", icon: <FaBook />, description: "Stock total de libros" },
    { key: "cantidadUsers", url: "/information/getCantityUsers", title: "Usuarios ", icon: <FaUser />, description: "Usuarios totales" },
  ];

  function CardInformations() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const responses = await Promise.all(
            endpointConfig.map(({ url }) =>
              axiosInstance.get(url, {
                headers: { Authorization: `Bearer ${getToken()}` },
              })
            )
          );

          const newData = responses.reduce((acc, response, index) => {
            acc[endpointConfig[index].key] = response.data.cantity || response.data.stock_total || 0;
            return acc;
          }, {});

          setData(newData);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, []);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {endpointConfig.map(({ key, title, icon, description }) => (
        <div key={key} className="bg-gradient-to-b from-gray-100 to-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform p-6 flex flex-col items-center text-center space-y-4">
        <div className="text-5xl mb-4 text-blue-500 transition-all duration-300 transform hover:scale-110 hover:-translate-y-2">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      
        
        ))}
      </div>
    );
  }

  export default CardInformations;
