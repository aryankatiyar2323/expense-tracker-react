import { useState } from "react";
import { login } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { Wallet } from "lucide-react";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const[loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    
    setError("");

    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    
    setLoading(true);

    try {
      await login(formData.email, formData.password);

      toast.success("Login successful");

      navigate("/dashboard");

    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong. Please try again.");
    }
    finally{
      setLoading(false);
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

        {error && <p className="auth-error">{error}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            className="auth-input"
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            disabled={loading}
          />

          <input
            className="auth-input"
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            disabled={loading}
          />

          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
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
