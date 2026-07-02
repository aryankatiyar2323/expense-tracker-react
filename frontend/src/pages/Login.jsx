import { useState } from "react";
import { login } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { Wallet } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await login(formData.email, formData.password);

      navigate("/dashboard");

      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <Wallet size={38} />
        </div>

        <h1 className="auth-title">Expense Tracker</h1>

        <p className="auth-subtitle">Welcome back! Login to continue.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            className="auth-input"
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
          />

          <input
            className="auth-input"
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
          />

          <button className="auth-btn" type="submit">
            Login
          </button>
        </form>

        <p className="auth-link">
          Don't have an account?
          <Link to="/register"> Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
