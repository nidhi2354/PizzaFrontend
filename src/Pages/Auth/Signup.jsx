import { useState } from "react";
import toast from "react-hot-toast";
import SignUpPresentation from "./SignupPresentation";
import { useDispatch } from "react-redux";
import { createAccount } from "../../Redux/Slices/AuthSlice";
import { useNavigate } from "react-router-dom";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [signUpState, setSignUpState] = useState({
    firstName: "",
    email: "",
    mobileNumber: "",
    password: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setSignUpState((prev) => ({ ...prev, [name]: value }));
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    const { firstName, email, mobileNumber, password } = signUpState;

    if (!firstName || !email || !mobileNumber || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (firstName.length < 5 || firstName.length > 20) {
      toast.error("First name must be 5–20 characters");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      toast.error("Invalid email address");
      return;
    }
    if (mobileNumber.length < 10 || mobileNumber.length > 12) {
      toast.error("Mobile number must be 10–12 digits");
      return;
    }

    setLoading(true);
    const res = await dispatch(createAccount(signUpState));
    setLoading(false);
    if (res.payload?.success) navigate("/auth/login");
  }

  return (
    <SignUpPresentation
      handleFormSubmit={handleFormSubmit}
      handleUserInput={handleUserInput}
      loading={loading}
    />
  );
}

export default Signup;
