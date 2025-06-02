// src/pages/Tratamientos.tsx
import { useEffect, useState } from "react";
import api from "../api/axiosInstance";

interface Tratamiento {
  idTratamiento: number;
  pacienteId: number;
  medicamento: string;
  dosis: string;
  frecuencia: string;
  duracion: number;
  fechaInicio: string;
}

export default function Tratamientos() {
  const [tratamientos, setTratamientos] = useState<Tratamiento[]>([]);

  const cargarTratamientos = async () => {
    try {
      const res = await api.get("/Tratamiento");
      setTratamientos(res.data);
    } catch (error) {
      console.error("Error al cargar tratamientos:", error);
    }
  };

  useEffect(() => {
    cargarTratamientos();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Listado de Tratamientos</h2>
      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Medicamento</th>
            <th>Dosis</th>
            <th>Frecuencia</th>
            <th>Duración (días)</th>
            <th>Fecha de Inicio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tratamientos.map((t) => (
            <tr key={t.idTratamiento}>
              <td>{t.pacienteId}</td>
              <td>{t.medicamento}</td>
              <td>{t.dosis}</td>
              <td>{t.frecuencia}</td>
              <td>{t.duracion}</td>
              <td>{new Date(t.fechaInicio).toLocaleDateString()}</td>
              <td>
                <button onClick={() => alert("Editar: " + t.idTratamiento)}>
                  ✏️
                </button>
                <button onClick={() => alert("Eliminar: " + t.idTratamiento)}>
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}