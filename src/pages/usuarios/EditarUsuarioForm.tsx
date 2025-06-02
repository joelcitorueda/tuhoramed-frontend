import { useState, useEffect } from "react";
import api from "../../api/axiosInstance";
import Swal from "sweetalert2";
import "../../layouts/MainLayout.css";

interface Usuario {
  idUsuario: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  rol: string;
}

export default function EditarUsuarioForm({
  idUsuario,
  onClose,
}: {
  idUsuario: number;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Usuario | null>(null);

  useEffect(() => {
    api
      .get(`/Usuario/${idUsuario}`)
      .then((res) => setForm(res.data))
      .catch(() =>
        Swal.fire("Error", "No se pudo cargar el usuario", "error")
      );
  }, [idUsuario]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (form) {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/Usuario/${idUsuario}`, form);
      Swal.fire({
        icon: "success",
        title: "¡Actualizado!",
        text: "El usuario ha sido actualizado correctamente.",
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
      onClose();
    } catch {
      Swal.fire("Error", "No se pudo actualizar el usuario", "error");
    }
  };

  if (!form) return <p className="content-area">Cargando...</p>;

  return (
    <div className="content-area">
      <div className="table-container">
        <h2 style={{ marginBottom: "1.5rem", fontWeight: "600" }}>Editar Usuario</h2>
        <form
          onSubmit={handleSubmit}
          className="formulario"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1rem",
          }}
        >
          <input
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
          <input
            name="apellido"
            placeholder="Apellido"
            value={form.apellido}
            onChange={handleChange}
            required
          />
          <input
            name="correo"
            type="email"
            placeholder="Correo"
            value={form.correo}
            onChange={handleChange}
            required
          />
          <input
            name="telefono"
            placeholder="Teléfono"
            value={form.telefono}
            onChange={handleChange}
            required
          />
          <select
            name="rol"
            value={form.rol}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar rol</option>
            <option value="admin">Admin</option>
            <option value="usuario">Usuario</option>
          </select>

          <div
            className="form-actions"
            style={{
              gridColumn: "1 / -1",
              display: "flex",
              justifyContent: "flex-end",
              gap: "1rem",
              marginTop: "1rem",
            }}
          >
            <button type="button" className="btn-cancelar" onClick={onClose}>
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-guardar"
              style={{ backgroundColor: "#254D70" }}
            >
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
