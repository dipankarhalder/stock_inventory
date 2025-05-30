import { useRef, useState, useEffect } from "react";
import { Dotver, View, Edit, Delete } from "../../../icons";

export const TableRow = ({
  row,
  headers,
  isSelected,
  onToggleSelect,
  onAction,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const rowRef = useRef(null);

  const handleClickOutside = (event) => {
    if (rowRef.current && !rowRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <tr ref={rowRef}>
      <td>
        <input type="checkbox" checked={isSelected} onChange={onToggleSelect} />
      </td>
      {headers.map((key) => (
        <td key={key}>
          {row[key] !== null && row[key] !== undefined
            ? row[key].toString()
            : ""}
        </td>
      ))}
      <td>
        <div className="app_table_action_cover">
          <div
            className="app_table_dots"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            <Dotver />
          </div>

          {isDropdownOpen && (
            <div className="app_dots_item_cover">
              <ul>
                <li className="app_view_btn">
                  <button onClick={() => onAction("view", row)}>
                    <View />
                    View
                  </button>
                </li>
                <li className="app_edit_btn">
                  <button onClick={() => onAction("edit", row)}>
                    <Edit />
                    Edit
                  </button>
                </li>
                <li className="app_delete_btn">
                  <button onClick={() => onAction("delete", row)}>
                    <Delete />
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};
