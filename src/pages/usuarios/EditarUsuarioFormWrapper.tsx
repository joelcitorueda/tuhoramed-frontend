import { useParams, useNavigate } from "react-router-dom";
import EditarUsuarioForm from "./EditarUsuarioForm";

export default function EditarUsuarioFormWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  return <EditarUsuarioForm idUsuario={Number(id)} onClose={() => navigate("/usuarios")} />;
}
