import React from 'react';
import StartupDashboard from '../Startups/Dashboard/StartupDashboard';
import MentorDashboard from '../Mentors/Dashboard/MentorDashboard';
import AuthLogout from '../Auth/AuthLogout';


const AdminDashboard = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Bienvenid@ admin!</h1>
      <AuthLogout />
    </div>
  );
};

export default AdminDashboard;