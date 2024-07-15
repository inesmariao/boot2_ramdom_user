import { useEffect, useState } from 'react';

export const RandomUserFetch = () => {
  // Declarar una variable de estado para almacenar los datos del usuario
  const [user, setUser] = useState(null);

  // Utilizar useEffect para ejecutar la función fetchData al montar el componente
  useEffect(() => {
    // Definir una función asíncrona para la petición a la API
    const fetchData = async () => {
      try {
        // Realizar la petición a la API utilizando fetch
        const response = await fetch("https://api.randomuser.me");

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // Convertir la respuesta a JSON
        const data = await response.json();

        // Formatear los datos a mostrar
        const userData = {
          name: data.results[0].name,
          email: data.results[0].email,
          phone: data.results[0].phone,
          city: data.results[0].location.city,
          state: data.results[0].location.state,
          country: data.results[0].location.country,
          picture: data.results[0].picture.large
        };

        // Actualizar la variable de estado con los datos recibidos de la API pero formateados
        setUser(userData);

      } catch (error) {
        // Manejar errores en la petición
        console.error("Error al consultar los datos de la API: ", error);
      }
    };

    // Ejecutar la función fetchData
    fetchData();

    // Establecer un intervalo para actualizar los datos cada 2 segundos
    const intervalId = setInterval(fetchData, 2000);

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, []); // Array de dependencias vacío para que useEffect se ejecute una vez

  // Renderizar los datos del usuario en una tarjeta
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='col-lg-4'>
        <div className="card text-center">
          <div className='card-header'>
            <img src={user?.picture} alt="" />
          </div>
          <div className="card-body">
            <h4 className='card-title'>{user?.name.first}</h4>
            <h4 className='card-title'>{user?.name.last}</h4>
            <p className="card-text">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
