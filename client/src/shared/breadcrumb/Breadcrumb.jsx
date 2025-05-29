import { Link } from "react-router-dom";
import { Rarrow } from "../../icons";

export const Breadcrumb = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="app_breadcrumb_sec" aria-label="breadcrumb">
      <ul>
        {items.map((item, idx) => (
          <li key={idx}>
            {item.path ? (
              <Link to={item.path}>{item.title}</Link>
            ) : (
              <span>{item.title}</span>
            )}
            {idx < items.length - 1 && <Rarrow />}
          </li>
        ))}
      </ul>
    </div>
  );
};
