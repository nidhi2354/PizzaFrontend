import { Link } from "react-router-dom";
function Login() {
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="flex flex-wrap items-center h-screen px-10 py-6 mx-auto">
          <div className="hidden pr-0 lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 md:block">
            <svg
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 800 600"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="bgGrad" x1="0" x2="1">
                  <stop offset="0%" stop-color="#FFF7ED" />
                  <stop offset="100%" stop-color="#FFECD1" />
                </linearGradient>

                <linearGradient id="circleGrad" x1="0" x2="1">
                  <stop offset="0%" stop-color="#FFD58A" />
                  <stop offset="100%" stop-color="#FFB86B" />
                </linearGradient>

                <linearGradient id="accentGrad" x1="0" x2="1">
                  <stop offset="0%" stop-color="#60A5FA" />
                  <stop offset="100%" stop-color="#3B82F6" />
                </linearGradient>
              </defs>

              <rect
                x="40"
                y="30"
                rx="28"
                ry="28"
                width="720"
                height="540"
                fill="url(#bgGrad)"
                stroke="#F9DCC2"
                stroke-width="2"
              />
              <ellipse cx="600" cy="110" rx="110" ry="60" fill="#FFF3E0" />
              <ellipse cx="160" cy="480" rx="130" ry="50" fill="#FFF3E0" />
              <circle cx="250" cy="240" r="120" fill="url(#circleGrad)" />

              <g transform="translate(220,170)">
                <circle cx="80" cy="40" r="36" fill="#FDEBD0" />
                <path
                  d="M46 40c6-18 36-28 60-18 8 3 18 10 14 24-6 20-56 28-76 6z"
                  fill="#3E3E3E"
                />
                <circle cx="65" cy="42" r="3.6" fill="#3E3E3E" />
                <circle cx="95" cy="42" r="3.6" fill="#3E3E3E" />
                <path
                  d="M66 56c6 6 20 6 26 0"
                  stroke="#4B4B4B"
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                />
              </g>

              <g transform="translate(190,260)">
                <rect
                  x="40"
                  y="0"
                  rx="12"
                  ry="12"
                  width="150"
                  height="110"
                  fill="#fff"
                  opacity="0.9"
                />
                <rect
                  x="62"
                  y="16"
                  width="116"
                  height="18"
                  rx="8"
                  fill="#3B82F6"
                />
                <rect
                  x="62"
                  y="44"
                  width="90"
                  height="12"
                  rx="6"
                  fill="#93C5FD"
                />
                <rect
                  x="62"
                  y="64"
                  width="48"
                  height="10"
                  rx="5"
                  fill="#BFDBFE"
                />
              </g>

              <g transform="translate(380,340) rotate(-8)">
                <rect
                  x="0"
                  y="0"
                  rx="10"
                  ry="10"
                  width="240"
                  height="150"
                  fill="#0f172a"
                  opacity="0.9"
                />
                <rect
                  x="12"
                  y="12"
                  rx="6"
                  ry="6"
                  width="216"
                  height="96"
                  fill="#0b1220"
                />
                <rect
                  x="28"
                  y="26"
                  width="180"
                  height="18"
                  rx="6"
                  fill="#EAF2FF"
                />
                <rect
                  x="28"
                  y="56"
                  width="180"
                  height="18"
                  rx="6"
                  fill="#EAF2FF"
                />
                <rect
                  x="28"
                  y="92"
                  width="120"
                  height="22"
                  rx="10"
                  fill="#3B82F6"
                />
              </g>

              <g transform="translate(480,120)">
                <rect
                  x="0"
                  y="0"
                  rx="14"
                  ry="14"
                  width="220"
                  height="120"
                  fill="#fff"
                  stroke="#F1E0D0"
                />
                <circle cx="28" cy="30" r="18" fill="#FFEDD5" />
                <rect
                  x="60"
                  y="18"
                  width="140"
                  height="14"
                  rx="7"
                  fill="#FEEBC8"
                />
                <rect
                  x="60"
                  y="44"
                  width="110"
                  height="10"
                  rx="5"
                  fill="#FFF3E0"
                />
                <rect
                  x="60"
                  y="64"
                  width="160"
                  height="18"
                  rx="9"
                  fill="#FFD08A"
                />
              </g>

              <ellipse
                cx="250"
                cy="380"
                rx="95"
                ry="18"
                fill="#000"
                opacity="0.06"
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
              Login
            </h2>

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
                htmlFor="password"
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
              Sign In
            </button>

            <p className="mt-3 text-x5 text-gray-500">
              Do not have an account{" "}
              <Link to="/auth/signup " className="text-yellow-500">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
