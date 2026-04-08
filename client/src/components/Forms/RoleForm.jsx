import React, { useEffect, useState } from "react";
import Input from "../input/Input";
import Button from "../button/Button";
export default function RoleForm({ onSubmit, editingRol }) {
  const [form, setForm] = useState({ rol_name: "" });

  useEffect(() => {
    if (editingRol) {
      console.log("editnado");
      setForm({ rol_name: editingRol.rol_name });
    }
  }, [editingRol]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(form.rol_name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await onSubmit(form);
    console.log(res);
    if (res) {
      setForm({ rol_name: "" });
    }
  };
  return (
    <form className="formHorizontal" onSubmit={handleSubmit}>
      <h1 className="title__form">Administracion de roles</h1>
      <div className="form__action">
        <Input
          name="rol_name"
          ph={"Nombre del rol"}
          value={form.rol_name}
          onChange={handleChange}
          required={true}
        />
        <Button type="submit" variant="primary">
          {editingRol ? "Editar rol" : "Crear rol"}
        </Button>
      </div>
    </form>
  );
}
