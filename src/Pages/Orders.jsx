import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../Layouts/Layouts";
import { getOrders, cancelOrder } from "../Redux/Slices/OrderSlice";

const STATUS_STYLES = {
  ORDERED: "bg-blue-100 text-blue-700",
  PROCESSING: "bg-yellow-100 text-yellow-700",
  OUT_FOR_DELIVERY: "bg-purple-100 text-purple-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const STATUS_LABELS = {
  ORDERED: "🕐 Ordered",
  PROCESSING: "🍕 Processing",
  OUT_FOR_DELIVERY: "🛵 Out for Delivery",
  DELIVERED: "✅ Delivered",
  CANCELLED: "❌ Cancelled",
};

function Orders() {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order);
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) dispatch(getOrders());
  }, []);

  function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-10 px-4">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-transparent bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text">
          My Orders 📦
        </h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-400 border-t-transparent"></div>
          </div>
        ) : !isLoggedIn ? (
          <div className="flex flex-col items-center py-24">
            <p className="text-5xl mb-4">🔐</p>
            <p className="text-gray-600 mb-4">Please login to view your orders.</p>
            <Link to="/auth/login" className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 font-semibold">Login</Link>
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center py-24">
            <p className="text-6xl mb-4">📭</p>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">No orders yet!</h2>
            <p className="text-gray-500 mb-6">Place your first order to see it here.</p>
            <Link to="/" className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition">
              Order Now
            </Link>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">
            {[...orders].reverse().map((order) => (
              <div key={order._id} className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
                {/* Order Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div>
                    <p className="text-xs text-gray-400 font-mono">Order ID: #{order._id.slice(-8).toUpperCase()}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${STATUS_STYLES[order.status] || "bg-gray-100 text-gray-600"}`}>
                      {STATUS_LABELS[order.status] || order.status}
                    </span>
                    {order.status === "ORDERED" && (
                      <button
                        onClick={() => dispatch(cancelOrder(order._id))}
                        className="px-3 py-1 text-xs bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-full border border-red-200 transition"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-2 mb-4">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        {item.product?.productImage && (
                          <img
                            src={item.product.productImage}
                            alt=""
                            className="w-8 h-8 rounded object-cover"
                          />
                        )}
                        <span className="text-gray-700 font-medium">
                          {item.product?.productName || "Pizza"}
                        </span>
                      </div>
                      <span className="text-gray-500">× {item.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="border-t border-orange-100 pt-3 flex flex-wrap justify-between items-center gap-2">
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">Payment:</span>{" "}
                    <span className={order.paymentMethod === "ONLINE" ? "text-blue-600" : "text-green-600"}>
                      {order.paymentMethod === "ONLINE" ? "💳 Online" : "💵 Cash on Delivery"}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Total Amount</p>
                    <p className="text-lg font-extrabold text-orange-500">₹{order.totalPrice}</p>
                  </div>
                </div>

                {order.address && (
                  <p className="text-xs text-gray-400 mt-2">📍 {order.address}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Orders;
