import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layouts/Layouts";
import {
  addProductToCart,
  removeProductFromCart,
  getCartDetails,
} from "../Redux/Slices/CartSlice";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartData, loading } = useSelector((state) => state.cart);
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) dispatch(getCartDetails());
  }, []);

  if (!isLoggedIn) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-32">
          <p className="text-5xl mb-4">🛒</p>
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Please login to view your cart</h2>
          <Link to="/auth/login" className="mt-4 px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 font-semibold">
            Login
          </Link>
        </div>
      </Layout>
    );
  }

  const items = cartData?.items || [];
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const deliveryFee = items.length > 0 ? 40 : 0;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-10 px-4">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-transparent bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text">
          Your Cart 🛒
        </h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-400 border-t-transparent"></div>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center py-24">
            <p className="text-6xl mb-4">🍕</p>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty!</h2>
            <p className="text-gray-500 mb-6">Add some delicious pizzas to your cart.</p>
            <Link
              to="/"
              className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1 space-y-4">
              {items.map((item) => (
                <div
                  key={item.product._id}
                  className="bg-white rounded-xl shadow-sm border border-orange-100 p-4 flex items-center gap-4"
                >
                  <img
                    src={item.product.productImage}
                    alt={item.product.productName}
                    className="w-20 h-20 object-cover rounded-lg bg-orange-50"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div className="hidden w-20 h-20 rounded-lg bg-orange-100 items-center justify-center text-3xl">
                    🍕
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-lg">{item.product.productName}</h3>
                    <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full capitalize font-medium">
                      {item.product.category}
                    </span>
                    <p className="text-orange-500 font-bold mt-1">
                      ₹{item.product.price} × {item.quantity} = ₹{item.product.price * item.quantity}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => dispatch(removeProductFromCart(item.product._id))}
                      className="w-8 h-8 rounded-full bg-orange-100 hover:bg-orange-200 text-orange-700 font-bold text-lg flex items-center justify-center transition"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-bold text-gray-800 text-lg">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => dispatch(addProductToCart(item.product._id))}
                      className="w-8 h-8 rounded-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold text-lg flex items-center justify-center transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:w-80">
              <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6 sticky top-6">
                <h2 className="text-xl font-extrabold text-gray-800 mb-4">Order Summary</h2>

                <div className="space-y-3 text-gray-600 text-sm mb-4">
                  {items.map((item) => (
                    <div key={item.product._id} className="flex justify-between">
                      <span>{item.product.productName} × {item.quantity}</span>
                      <span className="font-medium">₹{item.product.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-orange-100 pt-3 space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>₹{deliveryFee}</span>
                  </div>
                  <div className="flex justify-between font-extrabold text-gray-900 text-base border-t border-orange-100 pt-2">
                    <span>Total</span>
                    <span className="text-orange-500">₹{total + deliveryFee}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full mt-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-lg transition text-base"
                >
                  Proceed to Checkout →
                </button>
                <Link
                  to="/"
                  className="block text-center mt-3 text-orange-500 hover:text-orange-600 text-sm font-medium"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Cart;
