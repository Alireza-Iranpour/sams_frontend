import React from "react";
import { BrowserRouter } from "react-router-dom";
import BaseRouter from "./routes";
import ResponsiveLayout from "./components/Layout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ResponsiveLayout>
          <BaseRouter />
        </ResponsiveLayout>
      </BrowserRouter>
    </div>
  );
}

export default App;
