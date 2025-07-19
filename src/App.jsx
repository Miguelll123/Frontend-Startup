import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Startups/Home/Home";
import MainLayout from "./components/Layout/MainLayout";
import AuthLogin from "./components/Auth/AuthLogin";
import ProtectedRoute from "./components/Common/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública para login */}
        <Route path="/login" element={<AuthLogin />} />
        {/* Rutas privadas, protegidas por autenticación */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  {/* Aquí puedes añadir más rutas privadas */}
                </Routes>
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
