import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const StartPage = () => {
  const handleLogin = async () => {
    try {
      const response = await axios.get("https://abzagancybackend-production.up.railway.app/");
      const token = await response.data.accessToken;
      localStorage.setItem("authToken", token);
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  };
  useEffect(() => {
    handleLogin();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Link
        className="flex rounded p-3 border bg-white"
        to={"/users?page=1&count=6"}
      >
        Let's go to Main page
      </Link>
    </div>
  );
};

export default StartPage;
