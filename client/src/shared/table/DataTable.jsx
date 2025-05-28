import { useReducer, useEffect, useState, useMemo } from "react";
import { types } from "../../constant/types";

const useDebounce = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
};

const initialState = {
  currentPage: 1,
  searchQuery: "",
};

function reducer(state, action) {
  switch (action.type) {
    case types.GOTOPAGE:
      return { ...state, currentPage: action.page };
    case types.NEXTPAGE:
      return { ...state, currentPage: state.currentPage + 1 };
    case types.PREVPAGE:
      return { ...state, currentPage: state.currentPage - 1 };
    case types.SETSEARCH:
      return { ...state, searchQuery: action.query, currentPage: 1 };
    default:
      return state;
  }
}

export const DataTable = ({ data, pageSize = 10, onAction }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { currentPage, searchQuery } = state;

  const debouncedSearch = useDebounce(searchQuery, 300);
  const headers = useMemo(
    () => (data.length > 0 ? Object.keys(data[0]) : []),
    [data]
  );

  const filteredData = useMemo(() => {
    if (!debouncedSearch) return data;
    return data.filter((item) =>
      Object.values(item).some((val) =>
        val?.toString().toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    );
  }, [debouncedSearch, data]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const getCurrentPageData = () => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  };

  const generatePageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= Math.min(3, totalPages); i++) pages.push(i);

    if (currentPage > 5) pages.push("...");
    const start = Math.max(4, currentPage - 1);
    const end = Math.min(totalPages - 3, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPages - 4) pages.push("...");
    for (let i = Math.max(totalPages - 2, 4); i <= totalPages; i++) {
      if (!pages.includes(i)) pages.push(i);
    }
    return pages;
  };

  const handleAction = (actionType, rowData) => {
    if (onAction && typeof onAction === "function") {
      onAction(actionType, rowData);
    }
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <div style={{ marginBottom: "12px", textAlign: "right" }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) =>
            dispatch({ type: types.SETSEARCH, query: e.target.value })
          }
          style={{ padding: "6px 10px", width: "200px" }}
        />
      </div>

      <table
        border="1"
        cellPadding="10"
        cellSpacing="0"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} style={{ textTransform: "capitalize" }}>
                {header.replace(/_/g, " ")}
              </th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {getCurrentPageData().map((row, idx) => (
            <tr key={idx}>
              {headers.map((key) => (
                <td key={key}>
                  {row[key] !== null && row[key] !== undefined
                    ? row[key].toString()
                    : ""}
                </td>
              ))}
              <td>
                <button onClick={() => handleAction("view", row)}>View</button>{" "}
                <button onClick={() => handleAction("edit", row)}>Edit</button>{" "}
                <button onClick={() => handleAction("delete", row)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredData.length > pageSize && (
        <div style={{ marginTop: "16px", textAlign: "center" }}>
          <button
            onClick={() => dispatch({ type: types.PREVPAGE })}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {generatePageNumbers().map((page, idx) =>
            page === "..." ? (
              <span key={`ellipsis-${idx}`} style={{ margin: "0 5px" }}>
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => dispatch({ type: types.GOTOPAGE, page })}
                style={{
                  fontWeight: page === currentPage ? "bold" : "normal",
                  margin: "0 4px",
                }}
              >
                {page}
              </button>
            )
          )}
          <button
            onClick={() => dispatch({ type: types.NEXTPAGE })}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
