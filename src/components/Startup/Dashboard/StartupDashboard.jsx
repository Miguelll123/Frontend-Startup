import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StartupDashboard.css';

const StartupDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axios.get('https://api-dashboard-rta7.onrender.com/api/dashboard');
        setDashboardData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar el dashboard');
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <div>Cargando dashboard...</div>;
  if (error) return <div>{error}</div>;
  if (!dashboardData) return <div>No hay datos disponibles</div>;

  return (
    <div className="dashboard-container">
      <h1>Dashboard de Startups</h1>
      
      {/* Sección de Estadísticas Clave */}
      <section className="stats-section">
        <h2>Estadísticas Clave</h2>
        <div className="stats-grid">
          {/* Aquí irán las estadísticas cuando tengamos los datos */}
        </div>
      </section>

      {/* Sección de Distribución de Sectores */}
      <section className="sectors-section">
        <h2>Distribución de Sectores</h2>
        <div className="pie-chart">
          {/* Aquí irá el gráfico de sectores */}
        </div>
      </section>

      {/* Top 5 Startups */}
      <section className="top-startups-section">
        <h2>Top 5 Startups con Más Premios</h2>
        <div className="startups-table">
          {dashboardData?.topStartups?.map((startup, index) => (
            <div key={index} className="startup-row">
              <span>{startup.company}</span>
              <span>{startup.awards}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Listado de Contactos */}
      <section className="contacts-section">
        <h2>Listado de Contactos</h2>
        <div className="contacts-table">
          {dashboardData?.contacts?.map((contact, index) => (
            <div key={index} className="contact-row">
              <span>{contact.company}</span>
              <span>{contact.sector}</span>
              <span>{contact.email}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StartupDashboard; 