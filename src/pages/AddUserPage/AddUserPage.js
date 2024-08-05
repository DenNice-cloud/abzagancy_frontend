import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddUserPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [positionId, setPositionId] = useState("");
  const [photo, setPhoto] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !positionId || !photo) {
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
          positionId,
          photo
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("User added successfully:", response.data);
      setName("");
      setEmail("");
      setPhone("");
      setPositionId("");
      setPhoto("");
      setError("");
      navigate('/users');
    } catch (error) {
      console.error("There was an error!", error);
      setError("An error occurred while adding the user.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
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
            value={positionId}
            onChange={(e) => setPositionId(e.target.value)}
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
    </div>
  );
};

export default AddUserPage;
