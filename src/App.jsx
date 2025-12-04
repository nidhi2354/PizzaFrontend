import { useState } from "react";
import "./index.css";

import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Signup from "./Pages/Auth/Signup.jsx";
import Login from "./Pages/Auth/Login.jsx";
import NotFound from "./Pages/Auth/NotFound.jsx";

import Denied from "./Pages/Auth/Denied.jsx";
import AddProduct from "./Pages/Admin/Addproduct.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/denied" element={<Denied />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/admin/addProduct" element={<AddProduct />} />
      </Routes>
    </>
  );
}

export default App;
