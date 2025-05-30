export const TableHeader = ({ headers, isAllSelected, onSelectAll }) => (
  <tr>
    <th>
      <input type="checkbox" checked={isAllSelected} onChange={onSelectAll} />
    </th>
    {headers.map((header) => (
      <th key={header}>{header.replace(/_/g, " ")}</th>
    ))}
    <th>Action</th>
  </tr>
);
