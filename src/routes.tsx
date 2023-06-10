import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/homePage";
import PageNotFound from "./features/utils/PageNotFound";
import LoginPage from "./features/authentication/loginPage";
import ProfilePage from "./features/userProfile/profilePage";
import PrivateRoutes from "./features/utils/PrivateRoutes";
import LoggedInRoutes from "./features/utils/LoggedInRoutes";
import DashboardPage from "./features/agencyManagement/dashboardPage";
import AddMemberPage from "./features/agencyManagement/addMemberPage";
import SettingsPage from "./features/userProfile/settingsPage";
import SessionEventsPage from "./features/agencyManagement/attendance/sessionEventsPage";

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
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/attendance" element={<SessionEventsPage />} />
          <Route path="/add-member" element={<AddMemberPage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default BaseRouter;
