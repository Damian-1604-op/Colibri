import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Login.css";
import Input from "../input/Input";
import Button from "../button/Button";
import toast from "react-hot-toast";

export default function LogIn({ onSubmit }) {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await onSubmit(user);
      console.log(res);
      if (res.status === 200) {
        const user = res.data.user;

        if (user.rol !== 4) {
          toast.error("No tienes acesso a esta area");
          return;
        }

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        toast.success("Bienvenido " + res.data.user.name);

        console.log(user);

        navigate("/homepage");
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 401 || status === 402) {
          toast.error(data.message || "Error de credenciales");
        } else {
          toast.error("Ocurrió un error inesperado");
        }
      } else {
        toast.error("No se pudo conectar con el servidor");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Iniciar sesión</h1>

        <form onSubmit={handleSubmit}>
          <Input
            ph="Ingresa tu usuario"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />

          <Input
            ph="Ingresa tu contraseña"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />

          <Button type="submit" variant="primary">
            Iniciar sesión
          </Button>
        </form>
      </div>
    </div>
  );
}
