import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const AuthLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <>
      <Button onClick={handleLogout} type="primary">
        Cerrar Sesión
      </Button>
    </>
  );
};

export default AuthLogout;
