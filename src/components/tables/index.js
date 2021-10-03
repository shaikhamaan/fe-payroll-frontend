import React, { useState } from "react";
import styled from "styled-components";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
} from "react-table";
import makeData from "./makeData";
import {
  GlobalFilter,
  DefaultColumnFilter,
  SelectColumnFilter,
  NumberRangeColumnFilter,
  SliderColumnFilter,
  fuzzyTextFilterFn,
} from "./filters";
import TablePagination from "./pagination";
// import "bootstrap/dist/css/bootstrap.min.css";
import BTable from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Actions from "./actions";
import TableHeaderComponent from "./containers/header";
import TableBodyComponent from "./containers/body";
import useQuery from "src/customHooks/useQuery";

const Styles = styled.div`
  padding: 1rem;
  table {
    border-spacing: 0;
    border: 1px solid lightgrey;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 0px solid black;
      border-right: 0px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }
`;

fuzzyTextFilterFn.autoRemove = (val) => !val;
var hello = 10;

const Table = ({ columns, data, actions, type, totalPages, sortMethod }) => {
  console.log(totalPages, "totaa");
  const query = useQuery();
  const [borderColor, setBorderColor] = useState("#808080");
  const filterTypes = React.useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    page,

    //for pagination
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      autoResetFilters: false,
      autoResetSortBy: false,
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
      initialState: {
        pageIndex: query?.get("page") ? parseInt(query?.get("page") - 1) : 0,
        pageSize: 10,
        hiddenColumns: columns.map((column) => {
          if (column.show === false) return column.accessor || column.id;
        }),
      },
      manualPagination: totalPages > 0 ? true : 0,
      pageCount: totalPages,
    },

    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    useSortBy,
    usePagination // Pagination
  );

  return (
    <div>
      <BTable responsive hover size="sm" {...getTableProps()}>
        <thead>
          <tr>
            <th
              colSpan={visibleColumns.length + 3}
              id="table-global-filter"
              style={{
                textAlign: "left",
                border: `1px solid ${borderColor}`,
              }}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
                onFocus={() => {
                  setBorderColor("#2f20d2");
                }}
                onBlur={() => {
                  setBorderColor("#808080");
                }}
              />
            </th>
          </tr>
          {headerGroups.map((headerGroup) => (
            <TableHeaderComponent headerGroup={headerGroup} actions={actions} />
          ))}
        </thead>
        <TableBodyComponent
          getTableBodyProps={getTableBodyProps}
          page={page}
          prepareRow={prepareRow}
          type={type}
          actions={actions}
        />
      </BTable>

      <br />
      <TablePagination
        gotoPage={gotoPage}
        previousPage={previousPage}
        nextPage={nextPage}
        canPreviousPage={
          totalPages > 1
            ? parseInt(query?.get("page") - 1) !== 0
            : canPreviousPage
        }
        canNextPage={
          totalPages > 1
            ? parseInt(query?.get("page") - 1) !== totalPages - 1
            : canNextPage
        }
        pageIndex={
          totalPages > 1
            ? query?.get("page")
              ? parseInt(query?.get("page") - 1)
              : 0
            : pageIndex
        }
        pageSize={pageSize}
        setPageSize={setPageSize}
        pageCount={pageCount}
        pageOptions={pageOptions}
      />
    </div>
  );
};

function filterGreaterThan(rows, id, filterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
}

filterGreaterThan.autoRemove = (val) => typeof val !== "number";

const CustomTable = ({
  columns = [],
  data = [],
  actions,
  type,
  totalPages,
  sortMethod,
}) => {
  console.log(totalPages, "totaa2");
  return (
    <Styles>
      <Table
        columns={columns}
        data={data}
        actions={actions}
        type={type}
        totalPages={totalPages}
        sortMethod={sortMethod}
      />
    </Styles>
  );
};

export default CustomTable;

// const columns = React.useMemo(
//   () => [
//     {
//       Header: "Name",
//       columns: [
//         {
//           Header: "First Name",
//           accessor: "firstName",
//         },
//         {
//           Header: "Last Name",
//           accessor: "lastName",
//           // Use our custom `fuzzyText` filter on this column
//           filter: "fuzzyText",
//         },
//       ],
//     },
//     {
//       Header: "Info",
//       columns: [
//         {
//           Header: "Age",
//           accessor: "age",
//           Filter: SliderColumnFilter,
//           filter: "equals",
//         },
//         {
//           Header: "Visits",
//           accessor: "visits",
//           Filter: NumberRangeColumnFilter,
//           filter: "between",
//         },
//         {
//           Header: "Status",
//           accessor: "status",
//           Filter: SelectColumnFilter,
//           filter: "includes",
//         },
//         {
//           Header: "Profile Progress",
//           accessor: "progress",
//           Filter: SliderColumnFilter,
//           filter: filterGreaterThan,
//         },
//       ],
//     },
//   ],
//   []
// );

// const data = React.useMemo(() => makeData(100000), []);
