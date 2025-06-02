import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import "../layouts/MainLayout.css";

interface Usuario {
  idUsuario: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  rol: string;
  fechaRegistro: string;
  estado: boolean;
}

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const navigate = useNavigate();

  const cargarUsuarios = async () => {
    try {
      const res = await api.get("/Usuario");
      setUsuarios(res.data);
    } catch (err) {
      console.error("Error al cargar usuarios:", err);
    }
  };

  const eliminarUsuario = async (id: number) => {
    const result = await Swal.fire({
      title: "¿Está seguro de eliminar?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, bórralo!",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/Usuario/${id}`);
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Usuario eliminado",
          showConfirmButton: false,
          timer: 2000,
        });
        cargarUsuarios();
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
      }
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  return (
    <div className="table-container">
      <div className="search-box">
        <h2>Listado de Usuarios</h2>
        <button
          className="btn-new"
          onClick={() => navigate("/usuarios/crear")}
        >
          + Nuevo Usuario
        </button>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.idUsuario}>
              <td>{u.nombre} {u.apellido}</td>
              <td>{u.correo}</td>
              <td>{u.rol}</td>
              <td>{u.telefono}</td>
              <td>
                <div className="actions">
                  <button
                    className="btn-edit"
                    onClick={() => navigate(`/usuarios/editar/${u.idUsuario}`)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => eliminarUsuario(u.idUsuario)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
