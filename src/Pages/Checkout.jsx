import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../Layouts/Layouts";
import { createOrder } from "../Redux/Slices/OrderSlice";
import { clearCartLocal, getCartDetails } from "../Redux/Slices/CartSlice";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartData } = useSelector((state) => state.cart);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) { navigate("/auth/login"); return; }
    if (!cartData) dispatch(getCartDetails());
  }, []);

  const items = cartData?.items || [];
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const deliveryFee = items.length > 0 ? 40 : 0;

  async function handlePlaceOrder(e) {
    e.preventDefault();
    if (!address.trim() || address.trim().length < 10) {
      return alert("Please enter a valid address (at least 10 characters).");
    }
    if (items.length === 0) return alert("Your cart is empty.");

    setLoading(true);
    const result = await dispatch(createOrder({ paymentMethod, address: address.trim() }));
    setLoading(false);

    if (result.meta.requestStatus === "fulfilled") {
      dispatch(clearCartLocal());
      navigate("/orders");
    }
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-10 px-4">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-transparent bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text">
          Checkout 📋
        </h1>

        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* Form */}
          <form onSubmit={handlePlaceOrder} className="flex-1 space-y-6">
            {/* Delivery Address */}
            <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
              <h2 className="text-lg font-extrabold text-gray-800 mb-4">🏠 Delivery Address</h2>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={4}
                required
                minLength={10}
                placeholder="Enter your full delivery address (house no., street, city, pincode)..."
                className="w-full border border-orange-200 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none text-sm"
              />
              <p className="text-xs text-gray-400 mt-1">Minimum 10 characters required</p>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
              <h2 className="text-lg font-extrabold text-gray-800 mb-4">💳 Payment Method</h2>
              <div className="space-y-3">
                <label className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition ${paymentMethod === "CASH" ? "border-orange-400 bg-orange-50" : "border-gray-200 hover:border-orange-200"}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="CASH"
                    checked={paymentMethod === "CASH"}
                    onChange={() => setPaymentMethod("CASH")}
                    className="accent-orange-500 w-4 h-4"
                  />
                  <div>
                    <p className="font-bold text-gray-800">💵 Cash on Delivery</p>
                    <p className="text-xs text-gray-500">Pay when your order arrives</p>
                  </div>
                </label>

                <label className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition ${paymentMethod === "ONLINE" ? "border-orange-400 bg-orange-50" : "border-gray-200 hover:border-orange-200"}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="ONLINE"
                    checked={paymentMethod === "ONLINE"}
                    onChange={() => setPaymentMethod("ONLINE")}
                    className="accent-orange-500 w-4 h-4"
                  />
                  <div>
                    <p className="font-bold text-gray-800">💳 Online Payment</p>
                    <p className="text-xs text-gray-500">UPI, Card, Net Banking</p>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || items.length === 0}
              className="w-full py-4 bg-yellow-500 hover:bg-yellow-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-extrabold rounded-xl text-lg transition"
            >
              {loading ? "Placing Order..." : `Place Order · ₹${total + deliveryFee}`}
            </button>
          </form>

          {/* Order Summary */}
          <div className="lg:w-80">
            <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6 sticky top-6">
              <h2 className="text-xl font-extrabold text-gray-800 mb-4">Order Summary</h2>

              {items.length === 0 ? (
                <p className="text-gray-500 text-sm">Cart is empty. Go back and add items.</p>
              ) : (
                <>
                  <div className="space-y-3 mb-4">
                    {items.map((item) => (
                      <div key={item.product._id} className="flex items-center gap-3">
                        <img
                          src={item.product.productImage}
                          alt={item.product.productName}
                          className="w-12 h-12 object-cover rounded-lg bg-orange-50"
                          onError={(e) => { e.target.src = ""; }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-gray-800 truncate">{item.product.productName}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-bold text-orange-500 text-sm">₹{item.product.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-orange-100 pt-3 space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between"><span>Subtotal</span><span>₹{total}</span></div>
                    <div className="flex justify-between"><span>Delivery</span><span>₹{deliveryFee}</span></div>
                    <div className="flex justify-between font-extrabold text-gray-900 text-base border-t border-orange-100 pt-2">
                      <span>Total</span>
                      <span className="text-orange-500">₹{total + deliveryFee}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Checkout;
