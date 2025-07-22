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
import NetworkingList from "./components/Startups/Networking/NetworkingList";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminInvite from "./components/Admin/AdminInvite";
import AuthRegister from "./components/Auth/AuthRegister";
import MentoringSessionList from "./components/Common/MentoringSessions/MentoringSessions";
import StartupSnapshot from "./components/Startups/Dashboard/StartupSnapshot";

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
          <Route path="/registro" element={<AuthRegister />} />
          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<MainLayout />}>
              {/* Redirección dinámica al index */}
              <Route index element={<Navigate to={getRedirectPath()} />} />
              <Route path="startup" element={<StartupDashboard />} />
              <Route path="startup/mentores" element={<Mentors />} />
              <Route path="startup/startups" element={<ParticipantDetail />} />
              <Route path="startup/startup-snapshot" element={<StartupSnapshot />} />
              <Route path="startup/material" element={<ModulesList />} />
              <Route path="startup/programa/sesion/:id" element={<SessionDetail />} />
              <Route path="startup/networking" element={<NetworkingList />} />
              <Route path="startup/formadores" element={<TrainersList />} />
              <Route path="startup/mismentorias" element={<MentoringSessionList />} />
              <Route path="mentor" element={<MentorDashboard />} />
              <Route path="mentor/startups" element={<ParticipantDetail />} />
              <Route path="mentor/material" element={<ModulesList />} />
              <Route path="mentor/programa/sesion/:id" element={<SessionDetail />} />
              <Route path="mentor/mismentorias" element={<MentoringSessionList />} />
              <Route path="admin/startups" element={<ParticipantDetail />} />
              <Route path="admin/programa/sesion/:id" element={<SessionDetail />} />
              <Route path="admin/material" element={<ModulesList />} />
              <Route path="admin/networking" element={<NetworkingList />} />
              <Route path="admin/formadores" element={<TrainersList />} />
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="admin/home" element={<AdminDashboard />} />
              <Route path="admin/invitar" element={<AdminInvite />} />
              <Route
                path="admin/mentoring"
                element={
                  <>
                    <MentoringSessionList /> <Mentors />
                  </>
                }
              />
              {/* <Route path="admin/mismentorias" element={<MentoringSessionList />} /> */}

              {/* <Route path="admin" element={<AdminDashboard />} /> */}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
