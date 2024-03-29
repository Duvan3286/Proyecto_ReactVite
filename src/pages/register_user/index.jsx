import React, { useState } from 'react';
import './register-user-form.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterUser() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/registro', {
        name: username,
        email: email,
        password: password
      });

      if(response.data.user){
        localStorage.setItem('user_data', JSON.stringify(response.data.user));
        navigate('/menu');
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      setError('Hubo un problema al registrar el usuario.');
    }
  };

  return (
    <div className="register-user-form">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="rs-form-group">
          <label htmlFor="username">Nombre de Usuario:</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="rs-form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="rs-form-group">
          <label htmlFor="password">Contraseña:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="rs-button">Registrarse</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default RegisterUser;
