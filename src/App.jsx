import "./index.css";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./Pages/Home.jsx";
import Signup from "./Pages/Auth/Signup.jsx";
import Login from "./Pages/Auth/Login.jsx";
import NotFound from "./Pages/Auth/NotFound.jsx";
import Denied from "./Pages/Auth/Denied.jsx";
import AddProduct from "./Pages/Admin/Addproduct.jsx";
import ProductDetails from "./Pages/Products/ProductDetail.jsx";
import Cart from "./Pages/Cart.jsx";
import Checkout from "./Pages/Checkout.jsx";
import Orders from "./Pages/Orders.jsx";

function RequireAuth({ children }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/auth/login" replace />;
}

function RequireAdmin({ children }) {
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  if (!isLoggedIn) return <Navigate to="/auth/login" replace />;
  if (role !== "ADMIN") return <Navigate to="/denied" replace />;
  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/signup" element={<Signup />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/denied" element={<Denied />} />
      <Route path="/product/:productId" element={<ProductDetails />} />

      <Route path="/cart" element={<RequireAuth><Cart /></RequireAuth>} />
      <Route path="/checkout" element={<RequireAuth><Checkout /></RequireAuth>} />
      <Route path="/orders" element={<RequireAuth><Orders /></RequireAuth>} />
      <Route path="/admin/addProduct" element={<RequireAdmin><AddProduct /></RequireAdmin>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
