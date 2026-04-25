import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layouts/Layouts";
import axiosInstance from "../../Helpers/axiosInstance";
import { toast } from "react-hot-toast";
import Food from "../../assets/Images/Food.svg";

function AddProduct() {
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    productName: "",
    description: "",
    price: "",
    quantity: "",
    category: "veg",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!image) return toast.error("Please select a product image.");

    const formData = new FormData();
    formData.append("productName", form.productName);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("quantity", form.quantity);
    formData.append("category", form.category);
    formData.append("inStock", true);
    formData.append("productImage", image);

    setLoading(true);
    try {
      await toast.promise(
        axiosInstance.post("/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        }),
        {
          loading: "Adding product...",
          success: "Product added successfully!",
          error: (err) =>
            err?.response?.data?.message || "Failed to add product",
        },
      );
      setForm({
        productName: "",
        description: "",
        price: "",
        quantity: "",
        category: "veg",
      });
      setImage(null);
      setPreview(null);
      navigate("/");
    } catch {
      // toast.promise handles error display
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-10 px-4">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-transparent bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text">
          Add New Product 🍕
        </h1>

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 items-start">
          <div className="md:w-2/5 flex flex-col items-center gap-4">
            <img
              src={Food}
              alt="illustration"
              className="w-60 opacity-80"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            {preview && (
              <div className="w-full">
                <p className="text-sm text-gray-500 text-center mb-2">
                  Preview
                </p>
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-48 object-cover rounded-xl border border-orange-200 shadow"
                />
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex-1 bg-white rounded-xl shadow-sm border border-orange-100 p-8 space-y-4"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="productName"
                required
                minLength={5}
                maxLength={20}
                value={form.productName}
                onChange={handleChange}
                placeholder="e.g. Margherita Pizza"
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                name="description"
                minLength={5}
                maxLength={60}
                value={form.description}
                onChange={handleChange}
                placeholder="Short description..."
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  required
                  min={1}
                  value={form.price}
                  onChange={handleChange}
                  placeholder="e.g. 299"
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Stock Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="quantity"
                  required
                  min={0}
                  value={form.quantity}
                  onChange={handleChange}
                  placeholder="e.g. 10"
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="veg">🥦 Vegetarian</option>
                <option value="non-veg">🍖 Non-Vegetarian</option>
                <option value="drinks">🥤 Drinks</option>
                <option value="sides">🍟 Sides</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Product Image <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={handleImageChange}
                className="w-full text-sm text-gray-500 border border-gray-300 rounded-lg p-2 file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-100 file:text-orange-600 hover:file:bg-orange-200"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 disabled:opacity-60 text-white font-bold rounded-lg transition text-base"
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default AddProduct;
