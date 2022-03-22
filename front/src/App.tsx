import React from "react";
import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";

import Navbar from "./components/Navbar";
import { RoutesBase } from "./constants";
import Home from "./views/Home";
import Manage from "./components/Manage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CreateRoute />
      </BrowserRouter>
    </div>
  );
}

function CreateRoute() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* add routes with layouts */}
        <Route path={RoutesBase.HOME} element={<Home />} />
        <Route path={RoutesBase.MANAGE} element={<Manage />} />

        {/* add redirect for first page */}
        <Route path="*" element={<Navigate to={RoutesBase.HOME} replace />} />
      </Routes>
    </>
  );
}

export default App;
