import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable, usePagination } from 'react-table';
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

  const columns = React.useMemo(
    () => [
      {
        Header: 'Documento',
        accessor: 'identification',
      },
      {
        Header: 'Nombre',
        accessor: 'name',
      },
      {
        Header: 'Apellido',
        accessor: 'lastname',
      },
      {
        Header: 'Cargo U Oficio',
        accessor: 'job',
      },
      {
        Header: 'Fecha y hora de ingreso',
        accessor: 'fecha_hora_ingreso',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data: access,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  return (
    <div>
      <h1>Registro de entradas</h1>
      <table {...getTableProps()} className="access-table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
      <button className="custom-button-previous" onClick={() => previousPage()} disabled={!canPreviousPage}>
  Anterior
</button>{' '}
<button className="custom-button-next" onClick={() => nextPage()} disabled={!canNextPage}>
  Siguiente
</button>{' '}

        <span>
          Página{' '}
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>{' '}
        </span>
      </div>
    </div>
  );
};

export default AccessList;
