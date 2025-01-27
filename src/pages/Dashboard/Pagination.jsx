import { useState } from "react";

const Pagination = ({ items, itemsPerPage, renderTableRows }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  const paginatedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <table className="min-w-full table-auto">
        {renderTableRows(paginatedItems)}
      </table>
      <div className="flex justify-center items-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-indigo-500 text-white"
                : "bg-gray-200 text-gray-700"
            } hover:bg-indigo-400 transition`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
