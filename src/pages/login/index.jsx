import React from 'react'; // Importamos React
import './LoginForm.css'; // Importamos los estilos CSS
import logo from '../../assets/logo-softcoinp.jpg'; // Importamos el logo desde la carpeta de activos

// Definimos el componente LoginForm
function LoginForm() {
  return (
    // Contenedor principal del formulario de inicio de sesión
    <div className="login-container">
      <div className="centrado"> {/* Div centrado */}
        <img src={logo} alt="imagen logo softcoinp" width="250" height="250" /> {/* Mostramos el logo */}
      </div>
      <form action="/menu"> {/* Formulario de inicio de sesión con acción "/menu" */}
        <div className="form-group"> {/* Grupo de formulario */}
          <label htmlFor="username">Nombre de Usuario:</label> {/* Etiqueta para el campo de nombre de usuario */}
          <input type="text" id="username" name="username" required /> {/* Campo de entrada para el nombre de usuario */}
        </div>
        <div className="form-group"> {/* Grupo de formulario */}
          <label htmlFor="password">Contraseña:</label> {/* Etiqueta para el campo de contraseña */}
          <input type="password" id="password" name="password" required /> {/* Campo de entrada para la contraseña */}
        </div>
        <div className="form-group"> {/* Grupo de formulario */}
          <input type="submit" value="Iniciar Sesión" /> {/* Botón de enviar para iniciar sesión */}
        </div>
        <div className="form-group"> {/* Grupo de formulario */}
          <a href="/recuperar-contrasena">¿Olvidaste tu contraseña?</a>  {/* Enlace para recuperar la contraseña */}
        </div>
      </form>
    </div>
  );
}

export default LoginForm; // Exportamos el componente LoginForm
