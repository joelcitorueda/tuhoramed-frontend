import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Usuarios from "./pages/Usuarios";
import Tratamientos from "./pages/Tratamientos";
import CrearUsuarioForm from "./pages/usuarios/CrearUsuarioForm";
import EditarUsuarioFormWrapper from "./pages/usuarios/EditarUsuarioFormWrapper";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="usuarios" element={<Usuarios />} />
        <Route path="tratamientos" element={<Tratamientos />} />
        <Route path="usuarios/crear" element={<CrearUsuarioForm onClose={() => window.history.back()} />} />
        <Route path="usuarios/editar/:id" element={<EditarUsuarioFormWrapper />} />
      </Route>
    </Routes>
  );
}

export default App;
