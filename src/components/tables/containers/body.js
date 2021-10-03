import React from "react";
import Actions from "../actions";

const TableBodyComponent = ({
  actions,
  getTableBodyProps,
  page,
  prepareRow,
  type,
}) => {
  return (
    <tbody {...getTableBodyProps()}>
      {page.map((row, i) => {
        prepareRow(row);
        return (
          <tr {...row.getRowProps()}>
            {console.log(row, "row")}
            {row.cells.map((cell) => {
              return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
            })}
            {actions ? <Actions row={row} type={type} /> : <th></th>}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBodyComponent;
