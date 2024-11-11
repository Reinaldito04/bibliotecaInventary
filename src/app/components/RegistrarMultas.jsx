'use client';
import React, { useState, useEffect } from 'react';
import InputUser from './inputs/InputUser';
import InputBook from './inputs/InputLibros';
import { getToken } from '../utils/Token';
import { axiosInstance } from '../utils/axiosinstace';

function RegistrarMultas() {
  const [bookData, setBookData] = useState([]);
  const [userLeans, setUserLeans] = useState([]);
  const [selectedLean, setSelectedLean] = useState(null);
  const [formData, setFormData] = useState({
    nombreUsuario: '',
    idLibro: '',
    tituloLibro: '',
    fechaPrestamo: '',
    fechaDevolucion: '',
    montoMulta: '',
    estadoMulta: 'No pagada',
    diasRetraso: 0,
    idLean : ''
  });
  const [showModal, setShowModal] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    // Cuando el nombre de usuario o el título del libro cambian, se espera 500ms antes de mostrar el modal
    if (formData.nombreUsuario && formData.tituloLibro) {
      if (typingTimeout) {
        clearTimeout(typingTimeout); // Limpiar el temporizador anterior
      }
      setTypingTimeout(
        setTimeout(() => {
          setShowModal(true);
          fetchUserLeans(formData.nombreUsuario);
        }, 800) // Retraso de 500ms
      );
    } else {
      setShowModal(false);
    }
  }, [formData.nombreUsuario, formData.tituloLibro]);
  const fetchBooks = async () => {
    try {
      const response = await axiosInstance.get("/books/books", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setBookData(response.data);
    } catch (error) {
      console.error("Error al obtener los libros:", error);
    }
  };

  const fetchUserLeans = async (userId) => {
    try {
      const response = await axiosInstance.get(`/leans/username/${userId}/${formData.tituloLibro}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setUserLeans(response.data);
    } catch (error) {
      console.error("Error al obtener los préstamos del usuario:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectLoan = (loan) => {
    setSelectedLean(loan);
    setFormData((prevData) => ({
      ...prevData,
      fechaPrestamo: loan.DateStart,
      fechaDevolucion: loan.DateEnd,
      tituloLibro: loan.Titulo,
      idLibro: loan.IDBook,
      idLean : loan.LeanID
    }));
    setShowModal(false);
  };

  const calcularDiasRetraso = () => {
    if (formData.fechaDevolucion) {
      const fechaDevolucion = new Date(formData.fechaDevolucion);
      const fechaActual = new Date();
      const diferenciaTiempo = fechaActual - fechaDevolucion;
      const diasRetraso = Math.floor(diferenciaTiempo / (1000 * 3600 * 24));
      return diasRetraso > 0 ? diasRetraso : 0;
    }
    return 0;
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      diasRetraso: calcularDiasRetraso(),
    }));
  }, [formData.fechaDevolucion]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Datos de la multa:', formData);
        if(formData.diasRetraso == 0){
            alert('No se puede registrar una multa sin retraso')
            return
        }
      const response = await axiosInstance.post('/fines/agg', {
        Username: formData.nombreUsuario,
        IDLibro: formData.idLibro,
        IDLean:formData.idLean,
        MontoMulta: formData.montoMulta,
        Estado: formData.estadoMulta,
      }, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (response.status === 200) {
        alert('Multa registrada con éxito');
      } else {
        alert('Error al registrar la multa: ' + response.data.error);
      }
      handleClear();
   
    } catch (error) {
      console.errr("Error al registrar multa:", error);
    }
  };

  const handleClear = () => {
    setSelectedLean(null);
    setFormData({
      nombreUsuario: '',
      idLibro: '',
      tituloLibro: '',
      fechaPrestamo: '',
      fechaDevolucion: '',
      montoMulta: '',
      estadoMulta: 'No pagada',
      diasRetraso: 0,
      idLean : ''
    });
    setShowModal(false);
  };

  return (
    <div className="max-w-[80%] mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg ">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <InputUser formData={formData} setFormData={setFormData} fetchUserLeans={fetchUserLeans} />
        </div>
        <div className="relative">
          <InputBook formData={formData} setFormData={setFormData} bookData={bookData} />
        </div>

        <div>
          <label htmlFor="fechaPrestamo" className="block text-gray-700 font-medium mb-2">Fecha de préstamo:</label>
          <input
            id="fechaPrestamo"
            type="date"
            name="fechaPrestamo"
            readOnly
            value={formData.fechaPrestamo}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="fechaDevolucion" className="block text-gray-700 font-medium mb-2">Fecha de devolución:</label>
          <input
            id="fechaDevolucion"
            type="date"
            readOnly
            name="fechaDevolucion"
            value={formData.fechaDevolucion}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="diasRetraso" className="block text-gray-700 font-medium mb-2">Días de retraso:</label>
          <input
            id="diasRetraso"
            type="number"
            name="diasRetraso"
            value={formData.diasRetraso}
            readOnly
            

            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500  "
          />
        </div>
        <div>
          <label htmlFor="montoMulta" className="block text-gray-700 font-medium mb-2">Monto de la multa ($):</label>
          <input
            id="montoMulta"
            type="number"
            step="0.01"
            name="montoMulta"
            value={formData.montoMulta}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-between gap-2">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Registrar Multa
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="w-full bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition duration-200"
          >
            Limpiar Formulario
          </button>
        </div>
      </form>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Seleccionar un préstamo</h2>
            <ul className="space-y-2">
              {userLeans.map((loan) => (
                <li key={loan.LeanID}>
                  <button
                    onClick={() => handleSelectLoan(loan)}
                    className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                  >
                    {loan.Titulo} - {loan.DateStart} a {loan.DateEnd}
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full bg-gray-500 text-white font-semibold py-2 rounded-lg hover:bg-gray-600 transition duration-200"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegistrarMultas;
