import React from 'react';
import StartupDashboard from '../Startups/Dashboard/StartupDashboard';
import MentorDashboard from '../Mentors/Dashboard/MentorDashboard';
import AuthLogout from '../Auth/AuthLogout';


const AdminDashboard = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Bienvenid@ admin!</h1>
    <div>
      <h2>Lo que puedes ver en el Dashboard de Startups:</h2>
      <ul>
        <li>
          <strong>Total de startups registradas</strong> 🔢: El número total de empresas emergentes en la plataforma.
        </li>
        <li>
          <strong>Distribución por sector</strong> 🏭: Un desglose de las startups según su industria (tecnología, salud, educación, etc.).
        </li>
        <li>
          <strong>Distribución por etapa</strong> 🚀: Cómo se distribuyen las startups en sus diferentes fases de desarrollo (idea, crecimiento, expansión, etc.).
        </li>
        <li>
          <strong>Detalles por etapa</strong> 📌: Un listado específico de las startups, organizado según la fase en la que se encuentren.
        </li>
        <li>
          <strong>Estado de las sesiones</strong> 📅: Un resumen de las sesiones, indicando cuáles están <strong>firmadas</strong> y cuáles <strong>pendientes</strong>.
        </li>
        <li>
          <strong>Detalles de sesiones según su estado</strong> 📂: Información más detallada sobre cada sesión, filtrada por su estado actual (firmada o pendiente).
        </li>
        <li>
          <strong>Listado de contactos de cada startup</strong> 👥: La información de contacto relevante asociada a cada startup.
        </li>
      </ul>
    </div>
      <div style={{ width: "100%", height: "80vh" }}>
      <iframe
        src="https://admin-dashboard-1vi8.onrender.com"
        title="Panel Externo de Startups"
        style={{ width: "100%", height: "100%", border: "none" }}
        allowFullScreen
     />
    </div>
      <AuthLogout />
    </div>
  );
};

export default AdminDashboard;