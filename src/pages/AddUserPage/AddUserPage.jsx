import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddUserPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [positionName, setPositionName] = useState("");
  const [photo, setPhoto] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !positionName || !photo) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/users/adduser",
        {
          name,
          email,
          phone,
          positionName,
          photo,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setName("");
      setEmail("");
      setPhone("");
      setPositionName("");
      setPhoto("");
      setError("");
      navigate("/users");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <button
              onClick={() => navigate("/users")}
              className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Back
            </button>

            <h1 className="text-2xl font-bold mb-4">Add New User</h1>

            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Phone:</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Position ID:</label>
                <input
                  type="text"
                  value={positionName}
                  onChange={(e) => setPositionName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Photo URL:</label>
                <input
                  type="text"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Add User
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AddUserPage;
