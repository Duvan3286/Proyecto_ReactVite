import React, { useState, useEffect } from 'react'; // Importamos React y los hooks useState y useEffect
import './MainMenu.css'; // Importamos los estilos CSS si los tienes
import Dropzone from 'react-dropzone'; // Importamos Dropzone para manejar la carga de archivos
import logo from '../../assets/logo_davo.jpg'; // Importamos el logo desde la carpeta de activos

function MainMenu() {
  // Definimos el estado para la fecha y hora actual
  const [dateTime, setDateTime] = useState(new Date());
  // Definimos el estado para los archivos seleccionados
  const [files, setFiles] = useState([]);
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('user_data')));

 

  // useEffect para actualizar la fecha y hora cada segundo
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Función para manejar la caída de archivos en Dropzone
  const handleDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };

  return (
    // Contenedor principal del menú
    <React.Fragment>
    <h1>Bienvenido {userData.name}</h1>
    <div className="mm-container">
      
      {/* Columna izquierda del menú */}
      <div className="mm-column">
        <form action="/busqueda" method="get"> {/* Formulario para buscar */}
          <input type="text" name="q" placeholder=" Identificación" required /> {/* Campo de búsqueda */}
          <button type="submit">Buscar</button> {/* Botón de búsqueda */}
        </form>

        <br />
        <h2>Datos de ingreso</h2>
        {/* Formulario para ingresar datos */}
        <form action="procesar.php" method="post">
          <div className="mm-form-group">
            {/* Campos para ingresar datos personales */}
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required /><br />

            <label htmlFor="apellido">Apellido:</label>
            <input type="text" id="apellido" name="apellido" required /><br />

            <label htmlFor="person">Tipo de persona:</label>
            <input type="text" id="person" name="person" required /><br />

            <label htmlFor="job">Cargo u Oficio:</label>
            <input type="text" id="job" name="job" required /><br />

            <label htmlFor="destination">Destino:</label>
            <input type="text" id="destination" name="destination" required /><br /><br /><br />

            {/* Campo para ingresar motivo */}
            <label htmlFor="reason">Motivo:</label>
            <textarea id="reason" name="reason" rows="5" cols="55" required></textarea><br /><br />
          </div>
        </form>
      </div>

      {/* Columna derecha del menú */}
      <div className="mm-column-2">
        <div className="mm-container-2">
          {/* Subcolumna izquierda */}
          <div className="mm-sub-column">
            {/* Botones de entrada y salida */}
            <button type="submit" className="mm-button-2">Entrada</button><br /><br />
            <button type="submit" className="mm-button-2">Salida  </button>
          </div>

          {/* Subcolumna central */}
          <div className="mm-sub-column">
            {/* Componente Dropzone para cargar archivos */}
            <Dropzone onDrop={handleDrop}>
              {({getRootProps, getInputProps}) => (
                <div {...getRootProps()} className="mm-sub-column">
                  <input {...getInputProps()} id="type_file_hidden" style={{ display: 'none' }} />
                  <button type="mm-button" className="mm-button-3" id="foto-perfil">Foto De Perfil</button>
                </div>
              )}
            </Dropzone>
            {/* Mostrar imágenes seleccionadas */}
            <div>
              {files.map(file => (
                <img key={file.name} src={URL.createObjectURL(file)} alt={file.name} />
              ))}
            </div>
          </div>

          {/* Subcolumna derecha */}
          <div className="mm-sub-column">
            {/* Mostrar el logo */}
            <img src={logo} alt="logo de marca" width="120" height="145" style={{ borderRadius: '10px' }} />
          </div>
        </div>

        {/* Contenedor para mostrar la fecha y hora */}
        <div className="mm-container-3" style={{ flexDirection: 'mm-column' }}>
          <h2>Fecha y hora de ingreso</h2>
          <div id="reloj">{dateTime.toLocaleString()}</div>
        </div>

        {/* Contenedor para los botones de crear reportes */}
        <div className="mm-container-4">
          {/* Formulario para crear reporte de novedad */}
          <form action="crear-reporte-novedad.html" method="post">
            <div className="mm-sub-column">
              <button type="submit" className="mm-button-4"><i className="fas fa-exclamation-triangle fa-3x"></i><br /><br />Crear reporte de novedad</button><br /><br />
            </div>
          </form>

          {/* Formulario para modificar/crear datos de persona */}
          <form action="modificar-crear-personas.html" method="post">
            <div className="mm-sub-column">
              <button type="submit" className="mm-button-4"><i className="fas fa-address-card fa-3x"></i><br /><br />Modificar/crear datos de persona</button><br /><br />
            </div>
          </form>

          {/* Formulario para mostrar personal registrado */}
          <form action="personal-registrado.html" method="post">
            <div className="mm-sub-column">
              <button type="submit" className="mm-button-4"><i className="fas fa-users fa-3x"></i><br /><br />Personal registrado</button><br /><br />
            </div>
          </form>
        </div>

        {/* Contenedor para los botones de historial y administrador */}
        <div className="mm-container-5">
          {/* Formulario para ver historial de registros */}
          <div className="mm-sub-column">
            <form action="historial-registros.html" method="post">
              <button type="submit" className="mm-button-5">Historial de registros</button>
            </form>
          </div>
          {/* Formulario para ingresar como administrador */}
          <div className="mm-sub-column">
            <form action="administrador.html" method="post">
              <button type="submit" className="mm-button-5">Ingreso administrador</button>
            </form>
          </div>
        </div>
      </div>
    </div>
   </React.Fragment>
  );
}

export default MainMenu; // Exportamos el componente MainMenu
