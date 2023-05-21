import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/homePage";
import PageNotFound from "./features/utils/PageNotFound";

const BaseRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default BaseRouter;
