import { Link } from "react-router-dom";

function SignUpPresentation({ handleUserInput, handleFormSubmit, loading }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl flex rounded-3xl shadow-2xl overflow-hidden bg-white">

        {/* Left Panel */}
        <div className="hidden md:flex md:w-2/5 bg-gradient-to-br from-amber-400 to-orange-500 flex-col items-center justify-center p-10 text-white">
          <div className="text-7xl mb-5 drop-shadow-lg">🍕</div>
          <h2 className="text-2xl font-extrabold mb-3 text-center">Join Pizza Palace!</h2>
          <p className="text-amber-100 text-center text-sm leading-relaxed">
            Create your account and start ordering the best pizzas in town.
          </p>
          <div className="mt-8 space-y-3 w-full">
            {[
              { icon: "🎁", text: "Exclusive member deals" },
              { icon: "📦", text: "Real-time order tracking" },
              { icon: "⭐", text: "Save your favourites" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 bg-white/20 rounded-xl px-4 py-2.5 backdrop-blur-sm">
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-semibold">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel — Form */}
        <div className="w-full md:w-3/5 p-10 flex flex-col justify-center">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-5">
              <span className="text-3xl">🍕</span>
              <span className="font-extrabold text-xl text-orange-500">Pizza Palace</span>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900">Create your account</h1>
            <p className="text-gray-500 text-sm mt-1">Fill in your details to get started</p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  minLength={3}
                  onChange={handleUserInput}
                  placeholder="John"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent focus:bg-white transition-all duration-200"
                />
              </div>
              <div>
                <label htmlFor="mobileNumber" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="mobileNumber"
                  name="mobileNumber"
                  required
                  maxLength={10}
                  onChange={handleUserInput}
                  placeholder="10 digit number"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent focus:bg-white transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                onChange={handleUserInput}
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
                required
                minLength={5}
                onChange={handleUserInput}
                placeholder="Min. 6 characters"
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
                  Creating account...
                </>
              ) : (
                "Create Account →"
              )}
            </button>
          </form>

          <p className="mt-5 text-sm text-gray-500 text-center">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-orange-500 font-bold hover:text-orange-600 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpPresentation;
