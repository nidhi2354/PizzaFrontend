import Pizzalogo from "../assets/Images/Pizzalogo.png";
import Footer from "../Components/footer.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../Redux/Slices/AuthSlice";
import { useEffect } from "react";
import { getCartDetails } from "../Redux/Slices/CartSlice";

function Layout({ children }) {
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  const { cartData } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartCount =
    cartData?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  useEffect(() => {
    if (isLoggedIn) dispatch(getCartDetails());
  }, [isLoggedIn]);

  async function handleLogout(e) {
    e.preventDefault();
    await dispatch(logout());
    navigate("/");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-between px-6 md:px-10 h-16 bg-white shadow-md sticky top-0 z-50">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={Pizzalogo} alt="Pizza logo" className="h-10 w-10 object-contain" />
          <span className="font-extrabold text-lg text-orange-500 hidden sm:block">
            Pizza Palace
          </span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-600">
          <Link to="/" className="hover:text-orange-500 transition">Home</Link>
          {isLoggedIn && (
            <Link to="/orders" className="hover:text-orange-500 transition">My Orders</Link>
          )}
          {isLoggedIn && role === "ADMIN" && (
            <Link
              to="/admin/addProduct"
              className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full hover:bg-orange-200 transition"
            >
              Admin Panel
            </Link>
          )}
        </div>

        {/* Right: Cart + Auth */}
        <div className="flex items-center gap-4">
          {isLoggedIn && (
            <Link to="/cart" className="relative p-2">
              <span className="text-2xl">🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>
          )}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-bold rounded-lg transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/auth/login"
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-bold rounded-lg transition"
            >
              Login
            </Link>
          )}
        </div>
      </nav>

      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
