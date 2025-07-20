import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/Layout/MainLayout";
import StartupDashboard from "./components/Startups/Dashboard/StartupDashboard";
import MentorDashboard from "./components/Mentors/Dashboard/MentorDashboard";
import AuthLogin from "./components/Auth/AuthLogin";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import { useSelector } from "react-redux";
import Mentors from "./components/Startups/Mentoring/Mentors/Mentors";

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
              {/* <Route path="admin" element={<AdminDashboard />} /> */}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
