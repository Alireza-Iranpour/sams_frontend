import React from "react";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "./features/utils/PageNotFound";

const BaseRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<div></div>} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default BaseRouter;
