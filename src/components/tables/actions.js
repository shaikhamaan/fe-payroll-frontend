import React from "react";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import tableTypes from "./types";

const Actions = ({ row, type }) => {
  return (
    <td className="d-flex flex-row align-items-center">
      {type === tableTypes?.organizationList ? (
        <Link data-tip="Edit" to={`/organizations/edit/${row?.values?._id}`}>
          <i class="fas fa-user-edit"></i>
        </Link>
      ) : null}
      {type === tableTypes?.employeesList ? (
        <Link data-tip="Edit" to={`/employees/edit/${row?.values?._id}`}>
          <i class="fas fa-user-edit"></i>
        </Link>
      ) : null}
      {type === tableTypes?.organizationList ? (
        <Link
          className="ml-2"
          data-tip="View employees"
          to={`/employees/list/${row?.values?._id}`}
        >
          <i class="fas fa-users"></i>
          <ReactTooltip />
        </Link>
      ) : null}
      {type === tableTypes?.leaves ? (
        <Link
          className="ml-2"
          data-tip="Edit Leave"
        // to={`/employees/list/${row?.values?._id}`}
        >
          <i class="fas fa-user"></i>
          <ReactTooltip />
        </Link>
      ) : null}
    </td>
  );
};

export default Actions;
