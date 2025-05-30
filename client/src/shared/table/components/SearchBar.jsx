import { types } from "../../../constant/types";
import { Delete, Exports } from "../../../icons";

export const SearchBar = ({
  searchQuery,
  dispatch,
  selectedRows,
  onDelete,
  onExport,
}) => (
  <div className="app_table_search">
    <input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={(e) =>
        dispatch({ type: types.SETSEARCH, query: e.target.value })
      }
    />
    {selectedRows.length > 0 && (
      <div className="app_table_top_btn">
        <button onClick={onExport} className="app_table_download">
          <Exports />
          Export CSV
        </button>
        <button onClick={onDelete} className="app_table_delete">
          <Delete /> Delete
        </button>
      </div>
    )}
  </div>
);
