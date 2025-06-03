import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { FaEdit, FaTrash } from "react-icons/fa";
import CrearTratamientoForm from "./tratamientos/CrearTratamientoForm";
import "../layouts/MainLayout.css";

interface Usuario {
  idUsuario: number;
  nombre: string;
  apellido: string;
}

interface Tratamiento {
  idTratamiento: number;
  pacienteId: number;
  paciente: Usuario | null; 
  medicamento: string;
  dosis: string;
  frecuencia: string;
  duracion: number;
  fechaInicio: string;
}

export default function Tratamientos() {
  const [tratamientos, setTratamientos] = useState<Tratamiento[]>([]);
  const [mostrarCrear, setMostrarCrear] = useState(false);

  const cargarTratamientos = async () => {
    try {
      const res = await api.get("/Tratamiento"); // Endpoint GET para todos los tratamientos
      setTratamientos(res.data);
    } catch (error) {
      console.error("Error al cargar tratamientos:", error);
    }
  };

  useEffect(() => {
    cargarTratamientos();
  }, []);

  return (
    <div className="table-container">
      <div className="search-box">
        <h2>Listado de Tratamientos</h2>
        <button className="btn-new" onClick={() => setMostrarCrear(true)}>
          + Nuevo Tratamiento
        </button>
      </div>

      {mostrarCrear && (
        <CrearTratamientoForm
          onClose={() => setMostrarCrear(false)}
          onCreated={() => {
            cargarTratamientos();
            setMostrarCrear(false);
          }}
        />
      )}

      {!mostrarCrear && (
        <table className="data-table">
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
                <td>
                  {t.paciente
                    ? `${t.paciente.nombre} ${t.paciente.apellido}`
                    : "Paciente no disponible"}
                </td>
                <td>{t.medicamento}</td>
                <td>{t.dosis}</td>
                <td>{t.frecuencia}</td>
                <td>{t.duracion}</td>
                <td>{new Date(t.fechaInicio).toLocaleDateString()}</td>
                <td>
                  <div className="actions">
                    <button
                      className="btn-edit"
                      onClick={() => alert("Editar: " + t.idTratamiento)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => alert("Eliminar: " + t.idTratamiento)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
