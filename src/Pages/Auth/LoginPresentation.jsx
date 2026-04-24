import { Link } from "react-router-dom";

function LoginPresentation({ handleFormSubmit, handleUserInput, loading }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl flex rounded-3xl shadow-2xl overflow-hidden bg-white">

        {/* Left Panel */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-orange-500 to-amber-400 flex-col items-center justify-center p-12 text-white">
          <div className="text-8xl mb-6 drop-shadow-lg">🍕</div>
          <h2 className="text-3xl font-extrabold mb-3 text-center">Welcome Back!</h2>
          <p className="text-orange-100 text-center text-sm leading-relaxed">
            Login to order your favourite pizzas, track your orders and enjoy exclusive deals.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4 text-center">
            {["🚀 Fast Delivery", "🌿 Fresh Ingredients", "💯 Best Taste"].map((f) => (
              <div key={f} className="bg-white/20 rounded-xl p-3 text-xs font-semibold backdrop-blur-sm">{f}</div>
            ))}
          </div>
        </div>

        {/* Right Panel — Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-3xl">🍕</span>
              <span className="font-extrabold text-xl text-orange-500">Pizza Palace</span>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900">Sign in to your account</h1>
            <p className="text-gray-500 text-sm mt-1">Enter your credentials to continue ordering</p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleUserInput}
                required
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent focus:bg-white transition-all duration-200"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleUserInput}
                required
                minLength={5}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent focus:bg-white transition-all duration-200"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-xl shadow-lg hover:shadow-orange-200 hover:shadow-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base"
            >
              {loading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Signing in...
                </>
              ) : (
                "Sign In →"
              )}
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-500 text-center">
            Don&apos;t have an account?{" "}
            <Link to="/auth/signup" className="text-orange-500 font-bold hover:text-orange-600 transition-colors">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPresentation;
