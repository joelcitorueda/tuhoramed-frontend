// App.tsx
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Usuarios from "./pages/Usuarios";
import Tratamientos from "./pages/Tratamientos";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="usuarios" element={<Usuarios />} />
        <Route path="tratamientos" element={<Tratamientos />} />
      </Route>
    </Routes>
  );
}

export default App;
