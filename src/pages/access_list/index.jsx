
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './access_list.css';

const AccessList = () => {
 
  const [access, setAccess] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/access')
      .then(response => {
        setAccess(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  console.log(access);
  return (
    <div>
      <h1>Registro de entradas</h1>
      <table>
        <thead>
          <tr>
          <th>Documento</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Cargo U Oficio</th>
            <th>Fecha y hora de ingreso</th>
            

          </tr>
        </thead>
        <tbody>
          {access.map(x => (
            <tr key={x.id}>
              <td>{x.identification}</td>
              <td>{x.name}</td>
              <td>{x.lastname}</td>
              <td>{x.job}</td>
              <td>{x.fecha_hora_ingreso}</td>
              
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccessList;
