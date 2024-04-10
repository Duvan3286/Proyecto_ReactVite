
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PersonList.css';

const PersonList = () => {
 
  const [people, setPeople] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/persons')
      .then(response => {
        setPeople(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Personas Registradas</h1>
      <table>
        <thead>
          <tr>
          <th>Documento</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Cargo U Oficio</th>
            <th>Direccion</th>
            <th>Telefono</th>
            <th>Email</th>
            

          </tr>
        </thead>
        <tbody>
          {people.map(person => (
            <tr key={person.id}>
              <td>{person.identification}</td>
              <td>{person.name}</td>
              <td>{person.lastname}</td>
              <td>{person.job}</td>
              <td>{person.address}</td>
              <td>{person.phone}</td>
              <td>{person.email}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PersonList;
