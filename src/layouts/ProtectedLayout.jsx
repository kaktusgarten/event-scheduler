import { Outlet, useNavigate, useOutletContext } from "react-router";
import { useEffect, use } from "react";
import { GesamtseitenContext } from "../contexts/GesamtseitenContext";

const ProtectedLayout = () => {
  const navigate = useNavigate();
  const { localStorageToken } = use(GesamtseitenContext);
  const token = localStorageToken;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  if (!token) return null;

  return <Outlet />;
};

export default ProtectedLayout;
