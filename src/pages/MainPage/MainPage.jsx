import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Pagination from "../../utils/Pagination";
import { fetchPositions } from "../../utils/fetchPositions";

const MainPage = () => {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCount, setCurrentCount] = useState(6);
  const [paginationLinks, setPaginationLinks] = useState({
    next_url: null,
    prev_url: null,
  });
  const [positions, setPositions] = useState({});
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    try {
      fetchPositions(setPositions);
      getUsers(currentPage, currentCount);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, currentCount]);

  const handleClickCount = (event) => {
    event.preventDefault();
    let newCount = currentCount + 6;

    if (currentCount > userData.length) {
      newCount = userData.length;
      setCurrentCount(userData.length);
    } else {
      setCurrentCount(newCount);
    }

    navigate({
      pathname: location.pathname,
      search: `?page=${currentPage}&count=${newCount}`,
    });
  };

  return (
    <div className="overflow-hidden bg-gray-100">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <div>Loading...</div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col p-4 items-center h-[805px] overflow-y-auto">
            <div className="w-full max-w-screen-lg pb-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {userData.map((data) => (
                  <Link
                    key={data.id}
                    to={`http://localhost:3001/users/${data.id}`}
                    className="rounded p-4 border shadow-md bg-white"
                  >
                    <div className="mb-2 text-gray-700">
                      <strong>Id:</strong> {data.id}
                    </div>
                    <div className="mb-2 text-gray-700 break-words">
                      <strong>E-mail:</strong> {data.email}
                    </div>
                    <div className="mb-2 text-gray-700">
                      <strong>User name:</strong> {data.name}
                    </div>
                    <div className="mb-2 text-gray-700">
                      <strong>Telephone:</strong> {data.phone}
                    </div>
                    <div className="mb-2 text-gray-700">
                      <strong>Position name:</strong> {positions[data.positionId]}
                    </div>
                    <img
                      src={data.photo}
                      alt={data.name}
                      className="w-[70px] h-[70px] rounded-md mt-4 mx-auto"
                    />
                  </Link>
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
        </>
      )}
    </div>
  );
};

export default MainPage;
