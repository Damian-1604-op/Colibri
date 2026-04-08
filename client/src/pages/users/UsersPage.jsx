import { useEffect, useState } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getRoles,
  createRole,
  updateRole,
  deleteRole,
} from "../../api/api";

import UserForm from "../../components/Forms/UserForm";
import UsersTable from "../../components/tables/UsersTable";
import RoleTable from "../../components/tables/RoleTable";
import Modal from "../../components/Modal/Modal";
import toast from "react-hot-toast";
import "./users.css";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [showRolesModal, setShowRolesModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [open, setOpen] = useState(false);

  const loadData = async () => {
    try {
      const [usersRes, rolesRes] = await Promise.all([getUsers(), getRoles()]);
      setUsers(usersRes.data);
      setRoles(rolesRes.data);
    } catch (error) {
      toast.error("Error al cargar los datos");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (data) => {
    let res;
    try {
      if (editingUser) {
        res = await updateUser(editingUser.id_user, data);
        toast.success("Usuario actualizado correctamente");
        console.log(res);
        console.log(data);

        setEditingUser(null);
      } else {
        console.log(data);

        await createUser(data);
        toast.success("Usuario creado correctamente");
      }
      setOpen(false);
      loadData();

      return res;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al guardar usuario");
      console.error("response: ", res);
      return null;
    }
  };

  const handleSubmitRol = async (data, id_rol = null) => {
    try {
      let res;
      if (id_rol) {
        res = await updateRole(id_rol, data);
        toast.success("Rol actualizado");
      } else {
        res = await createRole(data);
        toast.success("Rol creado");
      }
      loadData();
      console.log(res);
      return res;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Error al crear el rol",
      );
      console.error(error);
      return null;
    }
  };

  const handleDeleteRol = async (id) => {
    if (confirm("Eliminar rol?")) {
      try {
        await deleteRole(id);
        toast.success("Rol eliminado");
        loadData();
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            "Error al eliminar el rol",
        );
        console.error(error);
      }
    }
  };

  const handleEdit = async (user) => {
    setEditingUser(user);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm("¿Eliminar usuario?")) {
      await deleteUser(id);
      loadData();
    }
  };

  const handleCreate = () => {
    setEditingUser(null);
    setOpen(true);
  };
  return (
    <div className="container">
      <h1 className="container__title">Panel de Usuarios </h1>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <UserForm
          onSubmit={handleSubmit}
          editingUser={editingUser}
          roles={roles}
          onOpenRoles={() => setShowRolesModal(true)}
        />
      </Modal>
      {showRolesModal && (
        <Modal isOpen={showRolesModal} onClose={() => setShowRolesModal(false)}>
          <RoleTable
            role={roles}
            onCreate={handleSubmitRol}
            onUpdate={handleSubmitRol}
            onDelete={handleDeleteRol}
          />
        </Modal>
      )}
      <UsersTable
        users={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
      />
    </div>
  );
}
