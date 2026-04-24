import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Layout from "../Layouts/Layouts.jsx";
import { getAllProducts } from "../Redux/Slices/ProductSlice.js";
import { addProductToCart, getCartDetails } from "../Redux/Slices/CartSlice.js";
import pizza from "../assets/Images/Pizza.png";
import CookingImage from "../assets/Images/CookingImage.png";
import OrderFood from "../assets/Images/OrderFood.png";
import PickupFood from "../assets/Images/PickupFood.png";
import EnjoyFood from "../assets/Images/EnjoyFood.png";
import { PatchCheck } from "../Components/Icons/PatchCheck.jsx";

const CATEGORY_ICONS = { veg: "🥦", "non-veg": "🍖", drinks: "🥤", sides: "🍟" };
const CATEGORY_COLORS = {
  veg: "bg-green-100 text-green-700",
  "non-veg": "bg-red-100 text-red-700",
  drinks: "bg-blue-100 text-blue-700",
  sides: "bg-yellow-100 text-yellow-700",
};

function LoadingSkeleton() {
  return (
    <div className="p-4 md:w-1/3 w-full">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-orange-50 animate-pulse">
        <div className="h-48 bg-orange-100"></div>
        <div className="p-5 space-y-3">
          <div className="h-3 bg-gray-100 rounded w-1/4"></div>
          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-100 rounded w-full"></div>
          <div className="flex justify-between items-center pt-1">
            <div className="h-6 bg-orange-100 rounded w-1/4"></div>
            <div className="h-9 bg-orange-200 rounded-xl w-1/3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ item, isLoggedIn, cartData, onAddToCart }) {
  const inCart = cartData?.items?.some(
    (ci) => ci.product?._id === item._id || ci.product === item._id
  );

  return (
    <div className="p-4 md:w-1/3 w-full">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-orange-50 hover:border-orange-200 transition-all duration-300 group">
        <Link to={`/product/${item._id}`}>
          <div className="relative h-48 bg-gradient-to-br from-orange-50 to-amber-50 overflow-hidden">
            {item.productImage ? (
              <img
                src={item.productImage}
                alt={item.productName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl">
                {CATEGORY_ICONS[item.category] || "🍕"}
              </div>
            )}
            {!item.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">Out of Stock</span>
              </div>
            )}
          </div>
        </Link>

        <div className="p-5">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full capitalize ${CATEGORY_COLORS[item.category] || "bg-gray-100 text-gray-600"}`}>
            {CATEGORY_ICONS[item.category]} {item.category}
          </span>

          <Link to={`/product/${item._id}`}>
            <h3 className="mt-2 font-bold text-gray-900 text-lg leading-tight hover:text-orange-500 transition-colors line-clamp-1">
              {item.productName}
            </h3>
          </Link>

          <p className="text-gray-500 text-sm mt-1 line-clamp-2 leading-relaxed">
            {item.description || "Freshly made with the finest ingredients."}
          </p>

          <div className="flex items-center justify-between mt-4">
            <span className="text-xl font-extrabold text-orange-500">₹{item.price}</span>
            {item.inStock !== false && (
              inCart ? (
                <Link
                  to="/cart"
                  className="flex items-center gap-1.5 px-4 py-2 bg-green-50 border border-green-200 text-green-700 text-sm font-bold rounded-xl hover:bg-green-100 transition-colors"
                >
                  ✓ In Cart
                </Link>
              ) : (
                <button
                  onClick={() => onAddToCart(item._id)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-sm font-bold rounded-xl shadow hover:shadow-lg transition-all duration-200 active:scale-95"
                >
                  + Add
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productsData } = useSelector((state) => state.product);
  const { cartData } = useSelector((state) => state.cart);
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllProducts());
    if (isLoggedIn) dispatch(getCartDetails());
  }, []);

  async function handleAddToCart(productId) {
    if (!isLoggedIn) {
      navigate("/auth/login");
      return;
    }
    await dispatch(addProductToCart(productId));
  }

  const inStockItems = productsData?.filter((p) => p.inStock !== false) || [];
  const isLoading = !productsData;

  return (
    <Layout>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-r from-amber-50 to-orange-200 py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-10">
          <div className="md:w-1/2 text-center md:text-left">
            <span className="inline-block bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
              🔥 Hot & Fresh Every Day
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Enjoy the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">
                Perfect Slice 😋
              </span>
            </h1>
            <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed max-w-md mx-auto md:mx-0">
              Order your favourite pizza from the comfort of home. Fresh ingredients, quick delivery, unforgettable taste.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center md:justify-start">
              <button
                onClick={() => document.getElementById("menu-section").scrollIntoView({ behavior: "smooth" })}
                className="px-7 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-orange-200 hover:shadow-xl transition-all duration-200 text-base"
              >
                Order Now 🍕
              </button>
              {isLoggedIn && (
                <Link
                  to="/orders"
                  className="px-7 py-3.5 bg-white border-2 border-orange-300 text-orange-600 font-bold rounded-2xl hover:bg-orange-50 transition-all duration-200 text-base"
                >
                  My Orders
                </Link>
              )}
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src={pizza}
              alt="Pizza"
              className="w-72 md:w-96 drop-shadow-2xl animate-[bounce_3s_ease-in-out_infinite]"
            />
          </div>
        </div>
      </section>

      {/* ── Why Us ── */}
      <section className="bg-white py-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-2/5">
              <img src={CookingImage} className="rounded-3xl shadow-xl w-full object-cover" alt="Cooking" />
            </div>
            <div className="md:w-3/5">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
                Cooked by the world's{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">
                  best chefs
                </span>
              </h2>
              <p className="text-gray-500 mb-6 leading-relaxed">
                Every pizza is crafted with love, using the freshest ingredients sourced locally.
              </p>
              <div className="space-y-3 mb-8">
                {["Perfect taste, every single time", "Prepared in under 20 minutes", "Food hygiene guaranteed"].map((t) => (
                  <div key={t} className="flex items-center gap-3">
                    <PatchCheck className="text-orange-500 w-6 h-6 shrink-0" />
                    <span className="font-semibold text-gray-800">{t}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { img: OrderFood, title: "Order Food", desc: "Select & order in seconds" },
                  { img: PickupFood, title: "Pickup / Deliver", desc: "Choose your preference" },
                  { img: EnjoyFood, title: "Enjoy Food", desc: "Hot, fresh & delicious" },
                ].map((s) => (
                  <div key={s.title} className="text-center p-3 bg-orange-50 rounded-2xl hover:bg-orange-100 transition-colors">
                    <img src={s.img} className="w-12 h-12 mx-auto mb-2 object-contain" alt={s.title} />
                    <p className="font-bold text-sm text-gray-800">{s.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Products ── */}
      <section id="menu-section" className="py-14 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">
                Menu
              </span>
            </h2>
            <p className="text-gray-500 mt-2">Handcrafted with the finest ingredients</p>
          </div>

          <div className="flex flex-wrap -mx-4">
            {isLoading
              ? Array(6).fill(0).map((_, i) => <LoadingSkeleton key={i} />)
              : inStockItems.length === 0
              ? (
                <div className="w-full text-center py-20">
                  <p className="text-5xl mb-4">🍽️</p>
                  <p className="text-gray-500 text-lg font-medium">No items available right now.</p>
                </div>
              )
              : inStockItems.map((item) => (
                  <ProductCard
                    key={item._id}
                    item={item}
                    isLoggedIn={isLoggedIn}
                    cartData={cartData}
                    onAddToCart={handleAddToCart}
                  />
                ))
            }
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-gradient-to-r from-orange-500 to-amber-400 py-14 text-white text-center px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Ready to order? 🎉</h2>
        <p className="text-orange-100 mb-7 text-lg">Fresh pizza, delivered to your doorstep in minutes.</p>
        {!isLoggedIn ? (
          <Link
            to="/auth/signup"
            className="inline-block px-8 py-3.5 bg-white text-orange-600 font-extrabold rounded-2xl hover:bg-orange-50 shadow-xl transition-all duration-200 text-base"
          >
            Get Started →
          </Link>
        ) : (
          <Link
            to="/cart"
            className="inline-block px-8 py-3.5 bg-white text-orange-600 font-extrabold rounded-2xl hover:bg-orange-50 shadow-xl transition-all duration-200 text-base"
          >
            View Cart 🛒
          </Link>
        )}
      </section>
    </Layout>
  );
}

export default Home;
