import AdminLogin from '@admin/pages/AdminLogin/AdminLogin';
import UserLogin from '@user/pages/Login/UserLogin';
import UserRegistration from '@user/pages/Registration/UserRegistration';
import ForgotPassword from '@user/pages/ForgotPassword/ForgotPassword';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const NonAuthRoutes = () => {
  return (
    <Routes>
      <Route
        path="/admin/*"
        element={
          <Routes>
            <Route path="/" element={<AdminLogin />} />
            <Route path="/*" element={<Navigate to="/auth/admin" />} />
          </Routes>
        }
      />
      <Route
        path="/user/*"
        element={
          <Routes>
            <Route path="/login" element={<UserLogin />} />
            <Route path="/registration" element={<UserRegistration />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/*" element={<Navigate to="/auth/user/login" />} />
          </Routes>
        }
      />
      <Route path="/*" element={<Navigate to="/auth/user/login" />} />
    </Routes>
  );
};

export default NonAuthRoutes;
