import { useReducer, useEffect, useState, useMemo } from "react";
import { types } from "../../constant/types";
import { useDebounce } from "../../hooks/useDebounce";
import { SearchBar } from "./components/SearchBar";
import { TableHeader } from "./components/TableHeader";
import { TableRow } from "./components/TableRow";
import { Pagination } from "./components/Pagination";

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

export const DataTable = ({
  data,
  pageSize = 10,
  onAction,
  onSelectionChange,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { currentPage, searchQuery } = state;

  const [selectedRows, setSelectedRows] = useState([]);
  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    if (onSelectionChange) onSelectionChange(selectedRows);
  }, [selectedRows, onSelectionChange]);

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
  const start = (currentPage - 1) * pageSize;
  const currentPageData = filteredData.slice(start, start + pageSize);

  const isRowSelected = (row) =>
    selectedRows.some((r) => JSON.stringify(r) === JSON.stringify(row));

  const toggleRowSelection = (row) => {
    setSelectedRows((prev) =>
      isRowSelected(row)
        ? prev.filter((r) => JSON.stringify(r) !== JSON.stringify(row))
        : [...prev, row]
    );
  };

  const isAllPageSelected = currentPageData.every(isRowSelected);

  const toggleSelectAllCurrentPage = () => {
    if (isAllPageSelected) {
      setSelectedRows((prev) =>
        prev.filter(
          (row) =>
            !currentPageData.some(
              (r) => JSON.stringify(r) === JSON.stringify(row)
            )
        )
      );
    } else {
      const newSelections = currentPageData.filter(
        (row) => !isRowSelected(row)
      );
      setSelectedRows((prev) => [...prev, ...newSelections]);
    }
  };

  const handleAction = (actionType, rowData) => {
    if (onAction && typeof onAction === "function") {
      onAction(actionType, rowData);
    }
  };

  const handleDeleteSelected = () => {
    onAction?.("deleteSelected", selectedRows);
    setSelectedRows([]);
  };

  const handleExportCSV = () => {
    const csvHeaders = Object.keys(selectedRows[0] || {});
    const csvRows = [
      csvHeaders.join(","),
      ...selectedRows.map((row) =>
        csvHeaders.map((field) => `"${row[field] ?? ""}"`).join(",")
      ),
    ];
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "export.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <SearchBar
        searchQuery={searchQuery}
        dispatch={dispatch}
        selectedRows={selectedRows}
        onDelete={handleDeleteSelected}
        onExport={handleExportCSV}
      />

      <table
        border="1"
        cellPadding="10"
        cellSpacing="0"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <TableHeader
            headers={headers}
            isAllSelected={isAllPageSelected}
            onSelectAll={toggleSelectAllCurrentPage}
          />
        </thead>
        <tbody>
          {currentPageData.map((row, idx) => (
            <TableRow
              key={idx}
              row={row}
              headers={headers}
              isSelected={isRowSelected(row)}
              onToggleSelect={() => toggleRowSelection(row)}
              onAction={handleAction}
            />
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "12px" }}>
        <strong>
          {selectedRows.length} of {filteredData.length} row(s) selected
        </strong>
      </div>

      {filteredData.length > pageSize && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          dispatch={dispatch}
        />
      )}
    </div>
  );
};
