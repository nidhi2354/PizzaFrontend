import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-3xl">🍕</span>
              <span className="text-white font-extrabold text-xl">Pizza Palace</span>
            </div>
            <p className="text-sm leading-relaxed">
              Delivering happiness, one slice at a time. Fresh ingredients, expert chefs, fast delivery.
            </p>
            <div className="flex gap-4 mt-5">
              {/* Twitter */}
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors duration-200">
                <svg className="w-4 h-4 text-gray-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0016.11 3c-2.5 0-4.51 2.07-4.51 4.63v1A12.94 12.94 0 013 4s-4 9 5 13a13.06 13.06 0 01-7 2c9 5 20 0 20-11.5a4.72 4.72 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 3a1 1 0 110 2 1 1 0 010-2zm-5 2a5 5 0 110 10A5 5 0 0112 7zm0 2a3 3 0 100 6 3 3 0 000-6z" />
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12a10 10 0 10-11.5 9.9v-7H8v-3h2.5V9.5A3.5 3.5 0 0114.2 6h2.3v3H14.2c-.4 0-.7.3-.7.8V12h3l-.5 3h-2.5v7A10 10 0 0022 12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { to: "/", label: "Home" },
                { to: "/auth/login", label: "Login" },
                { to: "/auth/signup", label: "Sign Up" },
                { to: "/cart", label: "Cart" },
                { to: "/orders", label: "My Orders" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-orange-400 transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-base mb-4">Contact Us</h3>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-start gap-2">
                <span>📍</span> 123 Pizza Street, Food City, IN 400001
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span> +91 98765 43210
              </li>
              <li className="flex items-center gap-2">
                <span>📧</span> hello@pizzapalace.in
              </li>
              <li className="flex items-center gap-2">
                <span>🕐</span> Mon – Sun: 10 AM – 11 PM
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>© {new Date().getFullYear()} Pizza Palace. All rights reserved.</p>
          <p className="text-gray-600">Made with ❤️ for pizza lovers</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
