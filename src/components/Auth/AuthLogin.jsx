import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import "./AuthLogin.css";

const AuthLogin = () => {
  const dispatch = useDispatch();
  const { user, token, isSuccess, message, isError } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login({ email: form.email, password: form.password }));
  };

  useEffect(() => {
    if (isSuccess) {
      notification.success({
        message: "Success",
        description: message,
      });
    }
    if (isError) {
      notification.error({
        message: "Error",
        description: message,
      });
    }
    dispatch(reset());
  }, [isSuccess, isError, message, dispatch]);

  // Redirección si ya está logueado
  if (user && token) {
    if (user.role === "mentor") {
      navigate("/mentors/dashboard", { replace: true });
    } else if (user.role === "startup") {
      navigate("/startups/dashboard", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
    return null;
  }

  return (
    <div className="auth-login-bg">
      <form className="auth-login-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        <div>
          <label>Correo Electrónico:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        {isError && <div className="error-message">{message}</div>}
        <button type="submit">Entrar</button>
        <div className="register-link">
          ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
        </div>
      </form>
    </div>
  );
};

export default AuthLogin;
