// MainLayout.tsx
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./MainLayout.css";

export default function MainLayout() {
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="main-content">
        <header className="top-bar">
          <h1 className="app-title">TuHoraMed</h1>
        </header>
        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
