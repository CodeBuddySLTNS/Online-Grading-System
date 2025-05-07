import React from "react";
import { useMainStore } from "@/states/store";
import StudentsPortal from "./student/page";
import TeachersPortal from "./teacher/page";

const LoggedIn = () => {
  const user = useMainStore((state) => state.user);

  return (
    <div>
      {user.role === "student" ? <StudentsPortal /> : <TeachersPortal />}
    </div>
  );
};

export default LoggedIn;
