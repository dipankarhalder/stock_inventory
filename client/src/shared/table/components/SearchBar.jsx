export const SearchBar = ({
  searchQuery,
  dispatch,
  selectedRows,
  onDelete,
  onExport,
}) => (
  <div style={{ marginBottom: "12px", textAlign: "right" }}>
    <input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={(e) => dispatch({ type: "SET_SEARCH", query: e.target.value })}
      style={{ padding: "6px 10px", width: "200px" }}
    />
    {selectedRows.length > 0 && (
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "10px",
          justifyContent: "flex-end",
        }}
      >
        <button onClick={onDelete}>Delete Selected</button>
        <button onClick={onExport}>Export CSV</button>
      </div>
    )}
  </div>
);
