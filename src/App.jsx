import { useState } from "react";
import "./index.css";

import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Signup from "./Pages/Auth/Signup.jsx";
import Login from "./Pages/Auth/Login.jsx";
import NotFound from "./Pages/Auth/NotFound.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
