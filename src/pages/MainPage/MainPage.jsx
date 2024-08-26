import axios from "axios";
import Loader from "components/Loader";
import UserShortInfo from "components/UserShortInfo";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Pagination from "utils/Pagination";

const MainPage = () => {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCount, setCurrentCount] = useState(6);
  const [paginationLinks, setPaginationLinks] = useState({
    next_url: null,
    prev_url: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const addMoreUsers = 6;
  const navigate = useNavigate();
  const location = useLocation();

  const getUsersWithPositions = async (
    page,
    count,
    setUserData,
    setPaginationLinks
  ) => {
    const token = localStorage.getItem("authToken");
    const apiPositionUrl =
      "https://frontend-test-assignment-api.abz.agency/api/v1/positions";

    try {
      const positionsResponse = await axios.get(apiPositionUrl);
      const { positions } = positionsResponse.data;

      const positionsMap = positions.reduce((acc, position) => {
        acc[position.id] = position.name;
        return acc;
      }, {});

      const usersResponse = await axios.get(
        `https://abzagancybackend-production.up.railway.app/users?page=${page}&count=${count}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data: users, links } = usersResponse.data;

      const updatedUsers = users.map((user) => ({
        ...user,
        position: positionsMap[user.positionId],
      }));

      setUserData(updatedUsers);
      setPaginationLinks(links);

      navigate({
        pathname: location.pathname,
        search: `?page=${page}&count=${count}`,
      });
    } catch (error) {
      console.error("Error fetching users or positions:", error);
    } finally {
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getUsersWithPositions(
      currentPage,
      currentCount,
      setUserData,
      setPaginationLinks
    );
    setIsLoading(false);
  }, [currentPage, currentCount]);

  const handleClickCount = (event) => {
    event.preventDefault();
    let newCount = currentCount + addMoreUsers;

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
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-col p-4 items-center h-[805px] overflow-y-auto">
            <div className="w-full max-w-screen-lg pb-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {userData.map((data) => (
                  <UserShortInfo
                    key={data.id}
                    data={data}
                  />
                ))}
              </div>
            </div>

            <button
              className="rounded-full py-2 px-4 bg-yellow-300
              hover:bg-yellow-400"
              onClick={handleClickCount}
            >
              {`Show more +${addMoreUsers}`}
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
                    to={"/users/addUser"}
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
