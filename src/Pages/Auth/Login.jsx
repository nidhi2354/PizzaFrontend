// import { useState } from "react";
// import LoginPresentation from "./LoginPresentation";
// import { useDispatch } from "react-redux";
// import { login } from "../../Redux/Slices/AuthSlice";
// import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//   });

//   function handleUserInput(e) {
//     const { name, value } = e.target;
//     setLoginData({
//       ...loginData,
//       [name]: value,
//     });
//   }

//   async function handleFormSubmit(e) {
//     e.preventDefault();
//     console.log(loginData);

//     // Add validations for the form input
//     if (!loginData.email || !loginData.password) {
//       toast.error("Missing values from the form");
//       return;
//     }

//     //check email

//     if (loginData.email.includes("0") || !loginData.email.includes(".")) {
//       toast.error("Invalid email address");
//       return;
//     }

//     const apiResponse = await dispatch(login(loginData));
//     console.log("API response is ", apiResponse);
//     if (apiResponse.payload.success) {
//       navigate("/home");
//     }

//     return (
//       <LoginPresentation
//         handleFormSubmit={handleFormSubmit}
//         handleUserInput={handleUserInput}
//       />
//     );
//   }
// }
// export default Login;

//*********************************** */

import { useState } from "react";
import LoginPresentation from "./LoginPresentation";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/Slices/AuthSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      toast.error("Missing values from the form");
      return;
    }

    if (!loginData.email.includes("@") || !loginData.email.includes(".")) {
      toast.error("Invalid email address");
      return;
    }

    const apiResponse = await dispatch(login(loginData));
    console.log("API response:", apiResponse);

    if (apiResponse.payload?.success) {
      navigate("/");
    }
  }

  return (
    <LoginPresentation
      handleFormSubmit={handleFormSubmit}
      handleUserInput={handleUserInput}
    />
  );
}

export default Login;
