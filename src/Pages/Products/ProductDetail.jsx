import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getproductDetails } from "../../Redux/Slices/ProductSlice";
import {
  addProductToCart,
  removeProductFromCart,
  getCartDetails,
} from "../../Redux/Slices/CartSlice";
import Layout from "../../Layouts/Layouts";
import { FaStar } from "react-icons/fa";

const CATEGORY_ICONS = { veg: "🥦", "non-veg": "🍖", drinks: "🥤", sides: "🍟" };
const CATEGORY_COLORS = {
  veg: "bg-green-100 text-green-700",
  "non-veg": "bg-red-100 text-red-700",
  drinks: "bg-blue-100 text-blue-700",
  sides: "bg-yellow-100 text-yellow-700",
};

function ProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [error, setError] = useState(null);

  const { cartData } = useSelector((state) => state.cart);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const isInCart = cartData?.items?.some(
    (item) => item.product?._id === productId || item.product === productId
  );
  const cartQty = cartData?.items?.find(
    (item) => item.product?._id === productId || item.product === productId
  )?.quantity || 0;

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      const res = await dispatch(getproductDetails(productId));
      if (res?.payload) {
        setProduct(res.payload);
      } else {
        setError("Product not found");
      }
      setLoading(false);
    }
    load();
    if (isLoggedIn) dispatch(getCartDetails());
  }, [productId]);

  async function handleAddToCart() {
    setCartLoading(true);
    await dispatch(addProductToCart(productId));
    await dispatch(getCartDetails());
    setCartLoading(false);
  }

  async function handleRemoveFromCart() {
    setCartLoading(true);
    await dispatch(removeProductFromCart(productId));
    await dispatch(getCartDetails());
    setCartLoading(false);
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-orange-200 rounded-full animate-spin border-t-orange-500"></div>
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl">🍕</span>
          </div>
          <p className="mt-5 text-gray-500 font-medium">Loading product...</p>
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <p className="text-6xl mb-4">😕</p>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">{error || "Product not found"}</h2>
          <Link to="/" className="mt-4 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl shadow hover:shadow-lg transition-all">
            ← Back to Menu
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">{product.productName}</span>
          </div>

          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Image */}
              <div className="lg:w-1/2 relative">
                {product.productImage ? (
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    className="w-full h-72 lg:h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-72 lg:h-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center text-9xl">
                    {CATEGORY_ICONS[product.category] || "🍕"}
                  </div>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-red-500 text-white font-bold px-5 py-2 rounded-full text-lg">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="lg:w-1/2 p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full capitalize mb-4 ${CATEGORY_COLORS[product.category] || "bg-gray-100 text-gray-600"}`}>
                    {CATEGORY_ICONS[product.category]} {product.category}
                  </span>

                  <h1 className="text-3xl font-extrabold text-gray-900 mb-3">{product.productName}</h1>

                  <p className="text-gray-600 leading-relaxed mb-5">
                    {product.description || "A delicious pizza made with the finest ingredients."}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < 4 ? "text-amber-400 text-lg" : "text-gray-200 text-lg"} />
                    ))}
                    <span className="text-gray-500 text-sm ml-1 font-medium">(4.0) · 120 reviews</span>
                  </div>

                  {/* Stock badge */}
                  <div className="flex items-center gap-2 mb-6">
                    <span className={`w-2 h-2 rounded-full ${product.inStock !== false ? "bg-green-500" : "bg-red-500"}`}></span>
                    <span className={`text-sm font-semibold ${product.inStock !== false ? "text-green-600" : "text-red-600"}`}>
                      {product.inStock !== false ? "In Stock" : "Out of Stock"}
                    </span>
                    {product.quantity > 0 && (
                      <span className="text-gray-400 text-xs">({product.quantity} left)</span>
                    )}
                  </div>
                </div>

                {/* Price + Cart */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Price</p>
                      <p className="text-4xl font-extrabold text-orange-500">₹{product.price}</p>
                    </div>
                    {isInCart && (
                      <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-2 text-center">
                        <p className="text-xs text-gray-400">In cart</p>
                        <p className="text-xl font-extrabold text-orange-500">{cartQty}</p>
                      </div>
                    )}
                  </div>

                  {!isLoggedIn ? (
                    <Link
                      to="/auth/login"
                      className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-orange-200 hover:shadow-xl transition-all duration-200 text-base"
                    >
                      Login to Add to Cart
                    </Link>
                  ) : product.inStock === false ? (
                    <button disabled className="w-full py-4 bg-gray-100 text-gray-400 font-bold rounded-2xl cursor-not-allowed text-base">
                      Out of Stock
                    </button>
                  ) : (
                    <div className="flex gap-3">
                      {isInCart && (
                        <button
                          onClick={handleRemoveFromCart}
                          disabled={cartLoading}
                          className="flex-1 py-4 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 font-bold rounded-2xl transition-all duration-200 disabled:opacity-50 text-base"
                        >
                          {cartLoading ? "..." : "− Remove"}
                        </button>
                      )}
                      <button
                        onClick={handleAddToCart}
                        disabled={cartLoading}
                        className="flex-1 py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-orange-200 hover:shadow-xl transition-all duration-200 disabled:opacity-50 text-base flex items-center justify-center gap-2"
                      >
                        {cartLoading ? (
                          <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        ) : (
                          isInCart ? "+ Add More" : "🛒 Add to Cart"
                        )}
                      </button>
                    </div>
                  )}

                  {isInCart && (
                    <Link
                      to="/cart"
                      className="mt-3 w-full flex items-center justify-center gap-2 py-3.5 bg-white border-2 border-orange-300 text-orange-600 font-bold rounded-2xl hover:bg-orange-50 transition-all duration-200 text-sm"
                    >
                      View Cart →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductDetails;
