export const TableRow = ({
  row,
  headers,
  isSelected,
  onToggleSelect,
  onAction,
}) => (
  <tr>
    <td>
      <input type="checkbox" checked={isSelected} onChange={onToggleSelect} />
    </td>
    {headers.map((key) => (
      <td key={key}>
        {row[key] !== null && row[key] !== undefined ? row[key].toString() : ""}
      </td>
    ))}
    <td>
      <button onClick={() => onAction("view", row)}>View</button>{" "}
      <button onClick={() => onAction("edit", row)}>Edit</button>{" "}
      <button onClick={() => onAction("delete", row)}>Delete</button>
    </td>
  </tr>
);
