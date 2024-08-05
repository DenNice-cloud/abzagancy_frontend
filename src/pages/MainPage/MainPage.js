import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Pagination from "../../utils/Pagination";

const MainPage = () => {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCount, setCurrentCount] = useState(6);

  // const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const pageParam = queryParams.get("page");
    const countParam = queryParams.get("count");

    const page = pageParam ? parseInt(pageParam, 10) : 1;
    const count = countParam ? parseInt(countParam, 10) : 6;

    setCurrentPage(page);
    setCurrentCount(count);

    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        const startFrom = (currentPage - 1) * currentCount;
        const endTo = currentPage * currentCount;
        const users = response.data;

        setUserData(users.slice(startFrom, endTo));
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [currentPage]);

  return (
    <div className="flex flex-col p-4 items-center">
      {/* min-h-screen */}
      <div className="flex-grow w-full max-w-screen-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {userData.map((data) => (
            <div
              key={data.id}
              className="rounded p-4 border shadow-md bg-white"
            >
              <div>Id: {data.id}</div>
              <div>{data.email}</div>
              <div>{data.name}</div>
              <div>{data.phone}</div>
              <img
                src={data.photo}
                alt={data.name}
                className="w-[70px] h-[70px] rounded"
              />
              <div>positionId: {data.positionId}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 p-4">
        <div className="flex justify-center items-center">
          <div className="flex">
            <Pagination
              currentCount={currentCount}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>

          <div
            className="h-[50px] px-3 py-2"
          >
            <Link
              to={"/users/adduser"}
              className="flex rounded border px-3 py-2 hover:bg-gray-100"
            >
              Add new User
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
