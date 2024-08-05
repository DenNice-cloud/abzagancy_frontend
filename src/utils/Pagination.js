import axios from "axios";
import { useEffect, useState } from "react";

const Pagination = ({ currentCount, currentPage, setCurrentPage }) => {
  const handlePageChange = (value) => {
    setCurrentPage(value);
    window.history.pushState(null, "", `?page=${value}&count=${currentCount}`);
  };
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/users").then((response) => {
      setUserData(response.data);
    });
  }, []);

  const lastPage = Math.ceil(userData.length / currentCount);

  return (
    <div className="flex flex-row p-4 items-center">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`rounded border px-3 py-2 ${
          currentPage <= 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-gray-100"
        }`}
      >
        {`<`}
      </button>

      <span className="p-3">Page {currentPage}</span>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= lastPage}
        className={`rounded border px-3 py-2 ${
          currentPage >= lastPage
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
