import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "pages/MainPage";
import StartPage from "components/StartPage";
import AddUserPage from "pages/AddUserPage";
import CurrentUser from "pages/CurrentUser";

const AppRoutes = () => {
  console.log('====================================');
  console.log('test2');
  console.log('====================================');
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
          path="/users/addUser"
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
