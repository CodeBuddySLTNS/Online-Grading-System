import { useMainStore } from "@/states/store";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PageWrapper = ({ children }) => {
  const user = useMainStore((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      (location.pathname.startsWith("/teacher") &&
        (user?.role === "admin" ||
          user?.role === "student" ||
          user?.role === "registrar")) ||
      (location.pathname.startsWith("/registrar") &&
        (user?.role === "admin" ||
          user?.role === "student" ||
          user?.role === "teacher"))
    ) {
      navigate("/");
    }
  }, [location, navigate, user]);

  return <div>{children}</div>;
};

export default PageWrapper;
