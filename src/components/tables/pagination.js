import _ from "lodash";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import useQuery from "src/customHooks/useQuery";

const TablePagination = ({
  gotoPage,
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
  pageIndex,
  pageSize,
  setPageSize,
  pageCount,
  pageOptions,
}) => {
  const history = useHistory();
  const query = useQuery();
  useEffect(() => {
    if (pageIndex + 1 > pageOptions?.length) {
      gotoPage(0);
    }
  }, []);
  return (
    <div
      className="pagination flex-row justify-content-between align-items-center d-flex"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-end">
          <li
            className={`page-item ${!canPreviousPage ? "disabled" : ""}`}
            onClick={() =>
              canPreviousPage
                ? history.push({
                    path: window.location.href.split("?")[0],
                    search: `?page=${parseInt(query?.get("page")) - 1}`,
                  })
                : null
            }
            disabled={!canPreviousPage}
          >
            <a class="page-link" href="javascript:void(0)" tabindex="-1">
              Previous
            </a>
          </li>

          {_.times(pageOptions.length, (index) => {
            return (
              <li
                className={`page-item ${
                  pageIndex === index ? "disabled pagination-item" : ""
                }`}
                onClick={() =>
                  history.push({
                    path: window.location.href.split("?")[0],
                    search: `?page=${index + 1}`,
                  })
                }
              >
                <a
                  class={`page-link ${
                    pageIndex === index ? "pagination-item" : ""
                  }`}
                  href="javascript:void(0)"
                >
                  {index + 1}
                </a>
              </li>
            );
          })}

          <li
            className={`page-item ${!canNextPage ? "disabled" : ""}`}
            onClick={() =>
              canNextPage
                ? history.push({
                    path: window.location.href.split("?")[0],
                    search: query?.get("page")
                      ? `?page=${parseInt(query?.get("page")) + 1}`
                      : `?page=2`,
                  })
                : null
            }
          >
            <a class="page-link" href="javascript:void(0)">
              Next
            </a>
          </li>
        </ul>
      </nav>

      {/* <select
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
        }}
        class="form-select"
        aria-label="Default select example"
      >
        {[5, 10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select> */}
    </div>
  );
};

export default TablePagination;
