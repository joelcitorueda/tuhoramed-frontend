import { useState, useEffect } from "react";
import api from "../../api/axiosInstance";
import Swal from "sweetalert2";
import "../../layouts/MainLayout.css";

interface Usuario {
  idUsuario: number;
  nombre: string;
  apellido: string;
  rol: string;
}

interface CrearTratamientoFormProps {
  onClose: () => void;
  onCreated: () => void; 
}

export default function CrearTratamientoForm({ onClose, onCreated }: CrearTratamientoFormProps) {
  const [pacientes, setPacientes] = useState<Usuario[]>([]);
  const [form, setForm] = useState({
    pacienteId: 0,
    medicamento: "",
    dosis: "",
    frecuencia: "",
    duracion: 1,
    fechaInicio: new Date().toISOString().split("T")[0], 
  });

  
  useEffect(() => {
    api.get("/Usuario")
      .then(res => {
        const pacientesFiltrados = res.data.filter((u: Usuario) => u.rol === "paciente");
        setPacientes(pacientesFiltrados);
      })
      .catch(() => {
        Swal.fire("Error", "No se pudo cargar la lista de pacientes", "error");
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === "duracion" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.pacienteId === 0) {
      return Swal.fire("Error", "Debe seleccionar un paciente", "error");
    }

    const dataToSend = {
      pacienteId: form.pacienteId,
      medicamento: form.medicamento.trim(),
      dosis: form.dosis.trim(),
      frecuencia: form.frecuencia.trim(),
      duracion: Number(form.duracion) > 0 ? Number(form.duracion) : 1,
      fechaInicio: new Date(form.fechaInicio).toISOString(),
    };

    console.log("Enviando tratamiento:", dataToSend);

    try {
      await api.post("/Tratamiento/programar", dataToSend);
      Swal.fire({
        icon: "success",
        title: "¡Tratamiento creado!",
        text: "El tratamiento se ha registrado correctamente.",
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
      onCreated();
      onClose();
    } catch (err: any) {
      console.error("Error al crear tratamiento:", err.response?.data || err.message);
      Swal.fire("Error", err.response?.data?.title || "Hubo un problema al crear el tratamiento", "error");
    }
  };

  return (
    <div className="content-area">
      <div className="table-container">
        <h2 style={{ marginBottom: "1.5rem", fontWeight: "600" }}>Nuevo Tratamiento</h2>
        <form
          onSubmit={handleSubmit}
          className="formulario"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1rem",
          }}
        >
          <select
            name="pacienteId"
            onChange={handleChange}
            value={form.pacienteId}
            required
          >
            <option value={0}>Seleccionar paciente</option>
            {pacientes.map((p) => (
              <option key={p.idUsuario} value={p.idUsuario}>
                {p.nombre} {p.apellido}
              </option>
            ))}
          </select>

          <input
            name="medicamento"
            placeholder="Medicamento"
            value={form.medicamento}
            onChange={handleChange}
            required
          />
          <input
            name="dosis"
            placeholder="Dosis"
            value={form.dosis}
            onChange={handleChange}
            required
          />
          <input
            name="frecuencia"
            placeholder="Frecuencia"
            value={form.frecuencia}
            onChange={handleChange}
            required
          />
          <input
            name="duracion"
            type="number"
            min={1}
            placeholder="Duración (días)"
            value={form.duracion}
            onChange={handleChange}
            required
          />
          <input
            name="fechaInicio"
            type="date"
            value={form.fechaInicio}
            onChange={handleChange}
            required
          />

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
            <button type="submit" className="btn-guardar">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
