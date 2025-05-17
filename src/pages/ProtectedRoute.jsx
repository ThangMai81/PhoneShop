import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.loginReducer.isLogin);
  const authToken = localStorage.getItem("auth-token");

  useEffect(() => {
    async function verifyToken() {
      if (!authToken || !isLogin) {
        navigate("/PhoneShop/login");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/auth/verify-token",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (!response.ok) {
          localStorage.removeItem("auth-token");
          navigate("/PhoneShop/login");
        }
      } catch (error) {
        localStorage.removeItem("auth-token");
        navigate("/PhoneShop/login");
      }
    }

    verifyToken();
  }, [authToken, isLogin, navigate]);

  return isLogin ? <Outlet /> : null;
}
