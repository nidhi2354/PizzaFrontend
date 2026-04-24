import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getproductDetails } from "../../Redux/Slices/ProductSlice";
import {
  addProductToCart,
  removeProductFromCart,
  getCartDetails,
} from "../../Redux/Slices/CartSlice";
import Layout from "../../Layouts/Layouts";
import { FaStar, FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

function ProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const [productDetails, setProductDetails] = useState(null);
  const [isInCart, setIsInCart] = useState(false);

  const { cartData } = useSelector((state) => state.cart);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchProductDetails() {
    try {
      setLoading(true);
      setError(null);

      const res = await dispatch(getproductDetails(productId));

      if (res?.payload) {
        setProductDetails(res.payload);
      } else {
        setError("Product not found");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  // ✅ Check cart status
  useEffect(() => {
    if (cartData?.items?.some((item) => item.productId === productId)) {
      setIsInCart(true);
    } else {
      setIsInCart(false);
    }
  }, [cartData, productId]);

  async function handleCart() {
    await dispatch(addProductToCart(productId));
    dispatch(getCartDetails());
  }

  async function handleRemove() {
    const response = await dispatch(removeProductFromCart(productId));

    if (response?.payload?.data?.success) {
      dispatch(getCartDetails());
    }
  }

  if (loading) return <h2 className="text-center mt-10">Loading...</h2>;
  if (error) return <h2 className="text-center mt-10 text-red-500">{error}</h2>;
  if (!productDetails) return null;

  return (
    <Layout>
      <section className="overflow-hidden text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap mx-auto lg:w-4/5">
            <img
              alt="product"
              className="object-cover object-center w-full rounded lg:w-1/2"
              src={productDetails.productImage || "/default.png"}
            />

            <div className="w-full mt-6 lg:w-1/2 lg:pl-10 lg:mt-0">
              <h2 className="text-sm tracking-widest text-gray-500">
                {productDetails.category}
              </h2>

              <h1 className="mb-4 text-3xl font-medium text-gray-900">
                {productDetails.productName}
              </h1>

              <p className="mb-4 leading-relaxed">
                {productDetails.description}
              </p>

              {/* Social Icons */}
              <div className="flex gap-4 mb-3">
                <FaInstagram />
                <FaFacebook />
                <FaTwitter />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < 4 ? "text-yellow-400" : "text-gray-300"}
                  />
                ))}
                <span className="ml-2">(4.0)</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-2xl font-medium">
                  ₹ {productDetails.price}
                </span>

                {isInCart ? (
                  <button
                    className="px-6 py-2 text-white bg-red-500 rounded"
                    onClick={handleRemove}
                  >
                    Remove from Cart
                  </button>
                ) : (
                  <button
                    className="px-6 py-2 text-white bg-yellow-500 rounded"
                    onClick={handleCart}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default ProductDetails;
