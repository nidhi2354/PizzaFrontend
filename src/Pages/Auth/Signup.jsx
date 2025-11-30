import { Link } from "react-router-dom";
function Signup() {
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="flex flex-wrap items-center h-screen px-10 py-6 mx-auto">
          <div className="hidden pr-0 lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 md:block">
            <svg
              width="90%"
              height="90%"
              viewBox="0 0 800 600"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="bg" x1="0" x2="1">
                  <stop offset="0%" stop-color="#FFF8E0" />
                  <stop offset="100%" stop-color="#FFECB3" />
                </linearGradient>
                <linearGradient id="circle" x1="0" x2="1">
                  <stop offset="0%" stop-color="#FFD180" />
                  <stop offset="100%" stop-color="#FFB74D" />
                </linearGradient>
              </defs>

              <rect width="800" height="600" rx="40" fill="url(#bg)" />

              <circle cx="650" cy="110" r="110" fill="#FFE0B2" opacity="0.45" />
              <circle cx="150" cy="500" r="130" fill="#FFE0B2" opacity="0.45" />

              <circle cx="280" cy="270" r="150" fill="url(#circle)" />

              <g transform="translate(210,160)">
                <circle cx="80" cy="40" r="35" fill="#FFE0B2" />
                <path
                  d="M48 38c6-18 34-28 56-18 7 3 17 10 13 24-6 19-52 27-69 6z"
                  fill="#3A3A3A"
                />
                <circle cx="65" cy="42" r="3.5" fill="#2B2B2B" />
                <circle cx="95" cy="42" r="3.5" fill="#2B2B2B" />
                <path
                  d="M66 56c6 6 18 6 24 0"
                  stroke="#2B2B2B"
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                />

                <rect
                  x="40"
                  y="70"
                  width="90"
                  height="80"
                  rx="18"
                  fill="#FFD180"
                />

                <rect
                  x="30"
                  y="95"
                  width="28"
                  height="14"
                  rx="7"
                  fill="#FFE0B2"
                />
                <rect
                  x="116"
                  y="95"
                  width="28"
                  height="14"
                  rx="7"
                  fill="#FFE0B2"
                />

                <g transform="translate(20,105)">
                  <rect
                    x="0"
                    y="0"
                    width="160"
                    height="85"
                    rx="10"
                    fill="#2D2D2D"
                  />
                  <rect
                    x="22"
                    y="20"
                    width="116"
                    height="10"
                    rx="5"
                    fill="#EAF2FF"
                  />
                  <rect
                    x="22"
                    y="38"
                    width="100"
                    height="10"
                    rx="5"
                    fill="#EAF2FF"
                  />
                  <circle cx="80" cy="68" r="6" fill="#FFE0B2" />
                </g>
              </g>

              <g transform="translate(470,260) rotate(-6)">
                <rect
                  width="240"
                  height="150"
                  rx="16"
                  fill="#fff"
                  opacity="0.9"
                />
                <rect
                  x="18"
                  y="26"
                  width="200"
                  height="16"
                  rx="8"
                  fill="#FFD180"
                />
                <rect
                  x="18"
                  y="56"
                  width="160"
                  height="10"
                  rx="5"
                  fill="#FFECB3"
                />
                <rect
                  x="18"
                  y="74"
                  width="120"
                  height="10"
                  rx="5"
                  fill="#FFF3D1"
                />

                <rect
                  x="18"
                  y="98"
                  width="90"
                  height="26"
                  rx="13"
                  fill="#FFD180"
                />
              </g>

              <ellipse
                cx="280"
                cy="430"
                rx="120"
                ry="20"
                fill="#000"
                opacity="0.05"
              />
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
                htmlFor="email"
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
                htmlFor="mobileNumber"
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
              <Link to="/auth/login " className="text-yellow-500">
                Login
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}

export default Signup;
