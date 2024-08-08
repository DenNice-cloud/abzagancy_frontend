import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Pagination from "../../utils/Pagination";

const MainPage = () => {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCount, setCurrentCount] = useState(6);
  const [paginationLinks, setPaginationLinks] = useState({
    next_url: null,
    prev_url: null,
  });

  const navigate = useNavigate();
  const location = useLocation();

  const getUsers = async (page, count) => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.get(
        `http://localhost:3000/users?page=${page}&count=${count}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data: users, links } = response.data;
      console.log();
      
      setUserData(users);

      navigate({
        pathname: location.pathname,
        search: `?page=${page}&count=${count}`,
      });

      setPaginationLinks(links);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsers(currentPage, currentCount);
  }, [currentPage, currentCount]);

  const handleClickCount = (event) => {
    event.preventDefault();
    const newCount = currentCount + 6;
    setCurrentCount(newCount);

    navigate({
      pathname: location.pathname,
      search: `?page=${currentPage}&count=${newCount}`,
    });
  };

  return (
    <div className="overflow-hidden">
      <div className="flex flex-col p-4 items-center h-[805px] overflow-y-auto">
        <div className="w-full max-w-screen-lg pb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userData.map((data) => (
              <div
                key={data.id}
                className="rounded p-4 border shadow-md bg-white"
              >
                <div>Id: {data.id}</div>
                <div className="break-words">{data.email}</div>
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

        <button
          className="rounded-full py-2 px-4 bg-yellow-300
          hover:bg-yellow-400"
          onClick={handleClickCount}
        >
          Show more +6
        </button>
      </div>

      <div className="flex">
        <div className="fixed bottom-0 p-4 bg-white w-screen border z-10">
          <div className="flex justify-center items-center">
            <Pagination
              paginationLinks={paginationLinks}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />

            <div className="absolute right-4 flex justify-center items-center p-4">
              <Link
                to={"/users/adduser"}
                className="flex rounded border p-2 text-white bg-blue-500 
              hover:bg-blue-800"
              >
                Add new User
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
