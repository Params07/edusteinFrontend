import React from 'react';

const DynamicTable = ({ data, component, action }) => {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const columns = Object.keys(data[0]);
  const allColumns = ['Action', ...columns];

  return (
    <div className='overflow-x-auto px-4'>
      <table className="min-w-full border border-collapse border-gray-200">
        <thead className='bg-gray-100 border-b'>
          <tr>
            {allColumns.map((column) => (
              <th className='py-2 px-4 border-b text-center' key={column}>
                {column === 'Action' ? action : column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr className='py-2 px-4 border-b text-center' key={rowIndex}>
              {allColumns.map((column) => {
                if (column === 'Action') {
                  return (
                    <td className='py-2 px-4 border-b text-center' key={column}>
                      {component(row)}
                    </td>
                  );
                } else {
                  return (
                    <td className='py-2 px-4 border-b text-center' key={column}>
                      {row[column]}
                    </td>
                  );
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
