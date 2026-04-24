import { useState } from "react";
import LoginPresentation from "./LoginPresentation";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/Slices/AuthSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    const res = await dispatch(login(loginData));
    setLoading(false);
    if (res.payload?.success) navigate("/");
  }

  return (
    <LoginPresentation
      handleFormSubmit={handleFormSubmit}
      handleUserInput={handleUserInput}
      loading={loading}
    />
  );
}

export default Login;
