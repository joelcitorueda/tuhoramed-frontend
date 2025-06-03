import { useState } from "react";
import api from "../../api/axiosInstance";
import Swal from "sweetalert2";
import "../../layouts/MainLayout.css";

export default function CrearUsuarioForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    rol: "",
    contrasena: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/Usuario", {
        nombre: form.nombre,
        apellido: form.apellido,
        correo: form.correo,
        telefono: form.telefono,
        rol: form.rol,
        contrasena: form.contrasena,
      });

      Swal.fire({
        icon: "success",
        title: "¡Usuario creado!",
        text: "El usuario se ha registrado correctamente.",
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });

      onClose();
    } catch (err: any) {
      console.error("Error al crear usuario:", err);
      Swal.fire("Error", "Correo ya existente", "error");
    }
  };

  return (
    <div className="content-area">
      <div className="table-container">
        <h2 style={{ marginBottom: "1.5rem", fontWeight: "600" }}>Crear Nuevo Usuario</h2>
        <form onSubmit={handleSubmit} className="formulario" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
          <input name="nombre" placeholder="Nombre" onChange={handleChange} value={form.nombre} required />
          <input name="apellido" placeholder="Apellido" onChange={handleChange} value={form.apellido} required />
          <input name="correo" type="email" placeholder="Correo" onChange={handleChange} value={form.correo} required />
          <input name="telefono" placeholder="Teléfono" onChange={handleChange} value={form.telefono} required />
          <select name="rol" onChange={handleChange} value={form.rol} required>
            <option value="">Seleccionar rol</option>
            <option value="admin">Admin</option>
            <option value="medico">Medico</option>
            <option value="cuidador">Cuidador</option>
            <option value="paciente">Paciente</option>
          </select>
          <input name="contrasena" type="password" placeholder="Contraseña" onChange={handleChange} value={form.contrasena} required />

          <div className="form-actions" style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
            <button type="button" className="btn-cancelar" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn-guardar">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
