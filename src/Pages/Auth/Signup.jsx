function Signup() {
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="flex flex-wrap items-center h-screen px-10 py-6 mx-auto">
          <div className="hidden pr-0 lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 md:block">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 500 400"
              xmlns="http://www.w3.org/2000/svg"
              className="max-w-md mx-auto"
            >
              <ellipse cx="250" cy="350" rx="200" ry="30" fill="#E3F2FD" />
              <circle cx="420" cy="80" r="40" fill="#E0F7FA" opacity="0.6" />
              <circle cx="80" cy="100" r="50" fill="#BBDEFB" opacity="0.4" />

              <rect
                x="120"
                y="180"
                width="260"
                height="140"
                rx="12"
                fill="#2196F3"
              />
              <rect
                x="135"
                y="195"
                width="230"
                height="95"
                rx="10"
                fill="white"
              />
              <rect
                x="200"
                y="300"
                width="100"
                height="14"
                rx="7"
                fill="#1E88E5"
              />

              <rect
                x="155"
                y="215"
                width="120"
                height="14"
                rx="7"
                fill="#90CAF9"
              />
              <rect
                x="155"
                y="240"
                width="160"
                height="14"
                rx="7"
                fill="#BBDEFB"
              />
              <rect
                x="155"
                y="265"
                width="100"
                height="14"
                rx="7"
                fill="#90CAF9"
              />

              <rect
                x="285"
                y="115"
                width="140"
                height="45"
                rx="20"
                fill="#42A5F5"
              />
              <text
                x="300"
                y="145"
                fill="white"
                font-size="18"
                font-family="sans-serif"
              >
                SIGN UP
              </text>

              <g transform="translate(60,120)">
                <rect
                  x="300"
                  y="100"
                  width="60"
                  height="80"
                  rx="20"
                  fill="#FFCA28"
                />

                <circle cx="330" cy="85" r="30" fill="#FDD6B3" />

                <path d="M305 75c10-25 50-28 55 0" fill="#3E2723" />

                <path
                  d="M292 125c0 20 12 25 22 25l22-8"
                  stroke="#FDD6B3"
                  stroke-width="10"
                  stroke-linecap="round"
                />

                <rect
                  x="330"
                  y="145"
                  width="40"
                  height="10"
                  rx="4"
                  fill="#EF6C00"
                />
              </g>
            </svg>
          </div>
          <form className="flex flex-col w-full p-8 mt-10 bg-gray-100 rounded-lg lg:w-2/6 md:w-1/2 md:ml-auto md:mt-0">
            <h2
              className="mb-5 
               text-lg font-medium
             text-gray-900
              title-font"
            >
              Sign up
            </h2>

            <div className="relative mb-4">
              <label
                htmlFor="firstName"
                className="text-sm leading-7 
                 text-gray-600"
              >
                First Name
              </label>

              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                minLength={5}
                placeholder="john"
                className="w-full
                 px-4 
                 py-2 
                 mt-2 
                 text-base leading-8
                  text-gray-700 
                  transition-color duration-200 ease-in-out
                 border border-gray-300 
                  rounded outline-none
                 focus:border-yellow-500
                  focus:ring-2
                 focus:ring-yellow-200"
              ></input>
            </div>

            <div className="relative mb-4">
              <label
                htmlFor="firstName"
                className="text-sm leading-7 
                 text-gray-600"
              >
                Email
                <span className="text-red-500">*</span>
              </label>

              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="john@example.com"
                className="w-full
                 px-4 
                 py-2 
                 mt-2 
                 text-base leading-8
                  text-gray-700 
                  transition-color duration-200 ease-in-out
                 border border-gray-300 
                  rounded outline-none
                 focus:border-yellow-500
                  focus:ring-2
                 focus:ring-yellow-200"
              ></input>
            </div>

            <div className="relative mb-4">
              <label
                htmlFor="firstName"
                className="text-sm leading-7 
                 text-gray-600"
              >
                Mobile Number
              </label>

              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                required
                placeholder="Enter 10 digit mobile number"
                maxLength={12}
                className="w-full
                 px-4 
                 py-2 
                 mt-2 
                 text-base leading-8
                  text-gray-700 
                  transition-color duration-200 ease-in-out
                 border border-gray-300 
                  rounded outline-none
                 focus:border-yellow-500
                  focus:ring-2
                 focus:ring-yellow-200"
              ></input>
            </div>

            <div className="relative mb-4">
              <label
                htmlFor="firstName"
                className="text-sm leading-7 
                 text-gray-600"
              >
                Password
              </label>

              <input
                type="password"
                id="password"
                name="password"
                required
                minLength={5}
                placeholder="Enter your password"
                className="w-full
                 px-4 
                 py-2 
                 mt-2 
                 text-base leading-8
                  text-gray-700 
                  transition-color duration-200 ease-in-out
                 border border-gray-300 
                  rounded outline-none
                 focus:border-yellow-500
                  focus:ring-2
                 focus:ring-yellow-200"
              ></input>
            </div>

            <button
              className="w-full
             px-8 
             py-2 
             text-lg
             text-white
             bg-yellow-500
              border-0 rounded 
              focus:outline-none
              hover:bg-yellow-600
              "
            >
              Create Account
            </button>

            <p className="mt-3 text-x5 text-gray-500">
              Already have an account?{" "}
              <a href="/login" className="text-yellow-500">
                Login
              </a>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}

export default Signup;
