import { useEffect, useState } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../../api/users";

import UserForm from "../../components/UserForm";
import UsersTable from "../../components/tables/UsersTable";
import Button from "../../components/Button";
import Modal from "../../components/Modal/Modal";
import "./users.css";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [open, setOpen] = useState(false);

  const loadUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSubmit = async (data) => {
    try {
      if (editingUser) {
        await updateUser(editingUser.id_user, data);
        setEditingUser(null);
      } else {
        await createUser(data);
      }
      setOpen(false);
      loadUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (user) => {
    setEditingUser(user);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm("¿Eliminar usuario?")) {
      await deleteUser(id);
      loadUsers();
    }
  };

  const handleCreate = () => {
    setEditingUser(null);
    setOpen(true);
  };
  return (
    <div className="container">
      <h1>Panel de Usuarios </h1>
      <Button onClick={() => handleCreate()}>createUser</Button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <UserForm onSubmit={handleSubmit} editingUser={editingUser} />
      </Modal>
      <UsersTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
