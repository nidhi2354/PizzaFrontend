function Footer() {
  return (
    <footer className="text-gray-600 body-font">
      <div className="bg-gradient-to-r from-amber-50 to-orange-300">
        <div className="container flex flex-col flex-wrap px-5 py-10 mx-auto sm:flex-row">
          <p className="text-sm text-center text-gray-500 sm:text-left">
            &copy; 2024 Pizza App
            <a
              href="https://twitter.com/knyttneve"
              rel="noopener noreferrer"
              className="ml-1 text-gray-600"
              target="_blank"
            >
              @pizza-apps
            </a>
          </p>
          <span className="inline-flex justify-center mt-2 sm:ml-auto sm:mt-0 sm:justify-start">
            {/* Twitter */}
            <a href="#" className="text-orange-600 hover:text-[#ff8f1077]">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0016.11 3c-2.5 0-4.51 2.07-4.51 4.63v1A12.94 12.94 0 013 4s-4 9 5 13a13.06 13.06 0 01-7.03 2c9 5 20 0 20-11.5a4.72 4.72 0 00-.08-.88A7.72 7.72 0 0023 3z" />
              </svg>
            </a>

            {/* Instagram */}
            <a href="#" className="text-orange-600 hover:text-[#ff8f1077]  ">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 3a1 1 0 110 2 1 1 0 010-2zm-5 2a5 5 0 110 10 5 5 0 010-10z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </a>

            {/* Facebook */}
            <a href="#" className="text-orange-600 hover:text-[#ff8f1077]">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12a10 10 0 10-11.5 9.9v-7H8v-3h2.5V9.5A3.5 3.5 0 0114.2 6h2.3v3H14.2c-.4 0-.7.3-.7.8V12h3l-.5 3h-2.5v7A10 10 0 0022 12z" />
              </svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
