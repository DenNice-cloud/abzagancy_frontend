const Pagination = ({ paginationLinks, currentPage, setCurrentPage }) => {

  const handlePageChange = (value) => {
    setCurrentPage(value);
  };

  return (
    <div className="flex flex-row p-4 items-center">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={!paginationLinks.prev_url}
        className={`rounded border px-3 py-2 ${
          !paginationLinks.prev_url
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-gray-100"
        }`}
      >
        {`<`}
      </button>

      <span className="p-3">Page {currentPage}</span>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!paginationLinks.next_url}
        className={`rounded border px-3 py-2 ${
          !paginationLinks.next_url
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-gray-100"
        }`}
      >
        {`>`}
      </button>
    </div>
  );
};

export default Pagination;
