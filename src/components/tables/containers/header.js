import React from "react";

const TableGeaderComponent = ({ headerGroup, actions }) => {
  return (
    <>
      <tr {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map((column) => (
          <th
            className="flex-row align-items-center justify-content-between"
            {...column.getHeaderProps(column.getSortByToggleProps())}
          >
            {column.render("Header")}
            <span>
              {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : " 🔼"}
            </span>
          </th>
        ))}

        {actions ? <th>Actions</th> : null}
      </tr>
      <tr {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map((column) => (
          <>
            <th {...column.getHeaderProps()}>
              <div>{column.canFilter ? column.render("Filter") : null}</div>
            </th>
          </>
        ))}
        <th></th>
      </tr>
    </>
  );
};

export default TableGeaderComponent;
