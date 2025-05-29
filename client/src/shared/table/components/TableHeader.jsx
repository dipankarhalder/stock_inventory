export const TableHeader = ({ headers, isAllSelected, onSelectAll }) => (
  <tr>
    <th>
      <input type="checkbox" checked={isAllSelected} onChange={onSelectAll} />
    </th>
    {headers.map((header) => (
      <th key={header} style={{ textTransform: "capitalize" }}>
        {header.replace(/_/g, " ")}
      </th>
    ))}
    <th>Action</th>
  </tr>
);
