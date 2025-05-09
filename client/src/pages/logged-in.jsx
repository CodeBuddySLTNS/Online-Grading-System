import React from "react";
import { useMainStore } from "@/states/store";
import StudentsPortal from "./student/page";
import TeachersPortal from "./teacher/page";
import { RegistrarDashboard } from "./registrar/page";

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
        <div>dean</div>
      )}
    </div>
  );
};

export default LoggedIn;
