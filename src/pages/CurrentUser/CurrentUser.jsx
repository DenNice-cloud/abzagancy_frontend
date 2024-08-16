import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPositions } from "utils/fetchPositions";

const CurrentUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [positions, setPositions] = useState({});

  const fetchUserData = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`http://localhost:3000/users/${id}`);

      setUserData(response.data);
    } catch (error) {
      setError("Error fetching user data.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchPositions(setPositions);
  }, [id]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Back
        </button>

        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          userData && (
            <>
              <div className="mb-2 text-gray-700">
                <strong>Id:</strong> {userData.id}
              </div>
              <div className="mb-2 text-gray-700 break-words">
                <strong>E-mail:</strong> {userData.email}
              </div>
              <div className="mb-2 text-gray-700">
                <strong>User name:</strong> {userData.name}
              </div>
              <div className="mb-2 text-gray-700">
                <strong>Telephone:</strong> {userData.phone}
              </div>
              <div className="mb-2 text-gray-700">
                <strong>Position name:</strong> {positions[userData.positionId]}
              </div>
              <img
                src={userData.photo}
                alt={userData.name}
                className="w-24 h-24 rounded-md mt-4 mx-auto"
              />
            </>
          )
        )}
      </div>
    </div>
  );
};

export default CurrentUser;
