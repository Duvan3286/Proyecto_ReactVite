import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable, usePagination } from 'react-table';
import * as XLSX from 'xlsx'; // Importa la biblioteca para generar archivos Excel
import './PersonList.css'; // Asegúrate de importar los estilos necesarios

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
        Header: 'Direccion',
        accessor: 'address',
      },
      {
        Header: 'Telefono',
        accessor: 'phone',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data: people,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  const exportToExcel = () => {
    const fileName = 'Personal Existente.xlsx';
    const worksheet = XLSX.utils.json_to_sheet(people);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Personal');
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div className="custom-table-container1">
      <h1>Personal Existente</h1>
      <table className="custom-table" {...getTableProps()}>
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
        <button className="export-button-excel" onClick={exportToExcel}>Exportar a Excel</button> {/* Botón para exportar a Excel */}
        <button className="custom-button-previous1" onClick={() => previousPage()} disabled={!canPreviousPage}>
          Anterior
        </button>{' '}
        <button className="custom-button-next1" onClick={() => nextPage()} disabled={!canNextPage}>
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

export default PersonList;
