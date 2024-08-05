import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import StartPage from './components/StartPage';
import AddUserPage from './pages/AddUserPage/AddUserPage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/users" element={<MainPage />} />
        <Route path="/users/adduser" element={<AddUserPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
