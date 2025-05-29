import { types } from "../../../constant/types";

export const Pagination = ({ currentPage, totalPages, dispatch }) => {
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

  return (
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
  );
};
