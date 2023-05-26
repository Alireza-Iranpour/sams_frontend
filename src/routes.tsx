import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/homePage";
import PageNotFound from "./features/utils/PageNotFound";
import LoginPage from "./features/authentication/loginPage";
import ProfilePage from "./features/userProfile/profilePage";
import PrivateRoutes from "./features/utils/PrivateRoutes";
import LoggedInRoutes from "./features/utils/LoggedInRoutes";

const BaseRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<LoggedInRoutes />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default BaseRouter;
