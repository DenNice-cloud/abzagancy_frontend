import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import StartPage from "./components/StartPage";
import AddUserPage from "./pages/AddUserPage/AddUserPage";
import CurrentUser from "./pages/CurrentUser/CurrentUser";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<StartPage />}
        />
        <Route
          path="/users"
          element={<MainPage />}
        />
        <Route
          path="/users/adduser"
          element={<AddUserPage />}
        />
        <Route
          path="/users/:id"
          element={<CurrentUser />}
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
