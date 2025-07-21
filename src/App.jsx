import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/Layout/MainLayout";
import StartupDashboard from "./components/Startups/Dashboard/StartupDashboard";
import MentorDashboard from "./components/Mentors/Dashboard/MentorDashboard";
import AuthLogin from "./components/Auth/AuthLogin";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import { useSelector } from "react-redux";
import TrainersList from "./components/Common/Trainers/TrainersList";
import Mentors from "./components/Startups/Mentoring/Mentors/Mentors";
import ParticipantDetail from "./components/Common/Participants/ParticipantDetail";
import ModulesList from "./components/Common/Modules/ModulesList";
import SessionDetail from "./components/Common/Modules/SessionDetail";
import MentoringSessionList from "./components/Common/MentoringSessions/MentoringSessions";

function App() {
  const userRole = useSelector((state) => state.auth.user?.role);

  const getRedirectPath = () => {
    switch (userRole) {
      case "startup":
        return "/startup";
      case "mentor":
        return "/mentor";
      case "admin":
        return "/admin";
      default:
        return "/";
    }
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Ruta pública */}
          <Route path="/login" element={<AuthLogin />} />

          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<MainLayout />}>
              {/* Redirección dinámica al index */}
              <Route index element={<Navigate to={getRedirectPath()} />} />
              <Route path="startup" element={<StartupDashboard />} />
              <Route path="startup/mentores" element={<Mentors />} />
              <Route path="mentor" element={<MentorDashboard />} />
              <Route path="startup/startups" element={<ParticipantDetail />} />
              <Route path="mentor/startups" element={<ParticipantDetail />} />
              <Route path="startup/material" element={<ModulesList />} />
              <Route path="mentor/material" element={<ModulesList />} />
              <Route path="startup/programa/sesion/:id" element={<SessionDetail />} />
              <Route path="mentor/programa/sesion/:id" element={<SessionDetail />} />
              <Route path="startup/formadores" element={<TrainersList />} />
              <Route path="mentor/mismentorias" element={<MentoringSessionList />} />
              {/* <Route path="admin" element={<AdminDashboard />} /> */}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
