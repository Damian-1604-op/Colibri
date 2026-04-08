import { useState, useEffect } from "react";
import Input from "../input/Input";
import Button from "../button/Button";
import toast from "react-hot-toast";
import "./form.css";
export default function UserForm({
  onSubmit,
  editingUser,
  roles,
  onOpenRoles,
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    id_rol: "",
  });

  useEffect(() => {
    if (editingUser) {
      setForm({
        name: editingUser.name || "",
        email: editingUser.email || "",
        password: "",
        id_rol: editingUser.rol || "",
      });
    }
  }, [editingUser]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    // if (form.password && !regex.test(form.password)) {
    //   toast.error(
    //     "La contraseña debe tener mínimo 8 caracteres, una letra y un número",
    //   );
    //   return;
    // }

    const res = await onSubmit(form);

    if (res) {
      setForm({ name: "", email: "", password: "", id_rol: "" });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1 className="title__form">
        {editingUser ? "Crear usuario" : "Editar usuario"}
      </h1>
      <Input
        name="name"
        ph={"Ingresa el nombre"}
        value={form.name}
        onChange={handleChange}
        required={true}
      />

      <Input
        name="email"
        ph="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <div className="form__container">
        <select
          className="select"
          name="id_rol"
          value={String(form.id_rol)}
          required
          onChange={handleChange}
        >
          <option value="">Selecciona un rol</option>

          {roles.map((role) => (
            <option key={role.id_rol} value={String(role.id_rol)}>
              {role.rol_name}
            </option>
          ))}
        </select>

        <Button type={"button"} variant="role_option" onClick={onOpenRoles}>
          Ver roles
        </Button>
      </div>
      <Input
        name="password"
        type="password"
        ph="Password"
        value={form.password}
        onChange={handleChange}
      />

      <Button type="submit" variant="primary">
        {editingUser ? "Actualizar" : "Crear"}
      </Button>
    </form>
  );
}
