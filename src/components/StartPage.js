import { Link } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";

const StartPage = () => {
    return(
      <div className="flex justify-center items-center min-h-screen">
        
        <Link className="flex rounded p-3 border bg-white" to={'/users?page=1&count=6'}>Let's go to Main page</Link>
      </div>
    )
};

export default StartPage;