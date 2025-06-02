import { useEffect, useState } from "react";
import api from "../api/axiosInstance";

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

  useEffect(() => {
    api.get("/Usuario")
      .then(res => {
        console.log("✅ Usuarios desde backend:", res.data);
        setUsuarios(res.data);
      })
      .catch(err => {
        console.error("❌ Error al cargar usuarios:", err);
      });
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Listado de Usuarios</h2>
      <table border={1} cellPadding={8}>
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
                <button onClick={() => alert("Editar: " + u.idUsuario)}>✏️</button>
                <button onClick={() => alert("Eliminar: " + u.idUsuario)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
