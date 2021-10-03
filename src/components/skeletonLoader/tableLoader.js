import React from "react";
import Skeleton from "react-loading-skeleton";
import { numberToArrays } from "./utils/numberToArrays";

function TableLoader({ rows, columns, style }) {
  var numRows = numberToArrays(parseInt(rows));
  console.log(numRows, "numR");
  var numCols = numberToArrays(parseInt(columns));

  return (
    <div style={style}>
      <table class="table">
        <thead>
          <tr>
            {numCols?.map((item) => {
              return (
                <th>
                  <Skeleton height="25" width="30" />
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {numRows?.map((item) => {
            return (
              <tr>
                {numCols?.map((item) => {
                  return (
                    <td>
                      <Skeleton height="25" width="30" />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TableLoader;
