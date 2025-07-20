import { useDispatch } from 'react-redux';
   import { logout } from "features/auth/authSlice";
const startup = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    // ... tu header actual
    <button onClick={handleLogout}>Cerrar Sesión</button>
  );
};