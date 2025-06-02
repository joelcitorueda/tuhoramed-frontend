import { NavLink } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaNotesMedical } from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">TuHoraMed</div>
      <nav className="nav">
        <NavLink to="/usuarios" className="nav-link">
          <FaUser className="icon" /> Usuarios
        </NavLink>
        <NavLink to="/tratamientos" className="nav-link">
          <FaNotesMedical className="icon" /> Tratamientos
        </NavLink>
        <NavLink to="/" className="nav-link logout">
          <FaSignOutAlt className="icon" /> Cerrar Sesión
        </NavLink>
      </nav>
    </aside>
  );
}
