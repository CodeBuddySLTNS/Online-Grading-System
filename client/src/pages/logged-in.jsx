import React from "react";
import TeachersPage from "./teacher/page";
import { useMainStore } from "@/states/store";
import StudentsPortal from "./student/page";

const LoggedIn = () => {
  const user = useMainStore((state) => state.user);

  return (
    <div>{user.role === "student" ? <StudentsPortal /> : <TeachersPage />}</div>
  );
};

export default LoggedIn;
