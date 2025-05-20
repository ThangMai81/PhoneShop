import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet, json } from "react-router-dom";
import { getCookie, removeCookie } from "../store/Cookie";

export default function ProtectedRoute() {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.loginReducer.isLogin);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function verifyToken() {
      try {
        const res = await fetch(
          "https://PhoneShopBackEnd.onrender.com/auth/verify-token",
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          window.alert("Please sign in first!");
          navigate("/login");
        }

        console.log("Response in verifyToken: ", await res.json());
      } catch (error) {
        window.alert("Please sign in first!");
        navigate("/login");
      } finally {
        setChecking(false);
      }
    }

    if (!isLogin) {
      navigate("/login");
    } else {
      verifyToken();
    }
  }, [isLogin, navigate]);

  if (checking) return null;

  return <Outlet />;
}
