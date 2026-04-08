import React, { useState } from "react";
import Button from "../button/Button";
import RoleForm from "../Forms/RoleForm";
import "./tables.css";

export default function RoleTable({ role, onDelete, onCreate, onUpdate }) {
  const [editingRol, setEditingRol] = useState(null);

  const handleEdit = (rol) => {
    setEditingRol(rol);
    console.log(editingRol);
  };

  const handleSubmit = async (formData) => {
    let res;

    if (editingRol) {
      res = await onUpdate(formData, editingRol.id_rol);
    } else {
      console.log("Creando rol", formData);
      res = await onCreate(formData);
    }

    setEditingRol(null);
    return res;
  };

  return (
    <div className="table">
      <div className="table__actionContainer">
        <RoleForm editingRol={editingRol} onSubmit={handleSubmit} />
      </div>
      <div className="table__content">
        <table>
          <thead className="White">
            <tr>
              <th>Nombre del rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {role.map((rol) => (
              <tr key={rol.id_rol}>
                <td>{rol.rol_name}</td>
                <td>
                  <Button onClick={() => handleEdit(rol)} variant="warning">
                    Editar
                  </Button>
                  <Button onClick={() => onDelete(rol.id_rol)} variant="danger">
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
