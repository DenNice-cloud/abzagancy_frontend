import axios from "axios";
import { Link } from "react-router-dom";

const StartPage = () => {
  const handleLogin = async () => {
    try {
      const response = await axios.get('http://localhost:3000/');
      const token = response.data.accessToken;
      localStorage.setItem('authToken', token);

      console.log('Token saved:', token);
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Link
        className="flex rounded p-3 border bg-white"
        to={"/users?page=1&count=6"}
        onClick={handleLogin}
      >
        Let's go to Main page
      </Link>
    </div>
  );
};

export default StartPage;
