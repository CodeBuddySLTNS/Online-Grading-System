import React from "react";
import { useMainStore } from "@/states/store";
import StudentsPortal from "./student/page";
import TeachersPortal from "./teacher/page";
import { RegistrarDashboard } from "./registrar/page";
import DeanDashboard from "./admin/page";

const LoggedIn = () => {
  const user = useMainStore((state) => state.user);

  return (
    <div>
      {user.role === "student" ? (
        <StudentsPortal />
      ) : user.role === "teacher" ? (
        <TeachersPortal />
      ) : user.role === "registrar" ? (
        <RegistrarDashboard />
      ) : (
        <DeanDashboard />
      )}
    </div>
  );
};

export default LoggedIn;
