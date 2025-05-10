import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing-page";
import TeachersPage from "./pages/teacher/page";
import { useQuery } from "@tanstack/react-query";
import { coleAPI } from "./lib/utils";
import { useEffect } from "react";
import { useMainStore } from "./states/store";
import LoggedIn from "./pages/logged-in";
import TeacherDepartmentSelector from "./pages/teacher/handle-new-department";
import DepartmentStudents from "./pages/teacher/department-students";
import PageWrapper from "./pages/page-wrapper";

const App = () => {
  const isLoggedIn = useMainStore((state) => state.isLoggedIn);
  const isLoading = useMainStore((state) => state.isLoading);

  const { data: user, isLoading: loading } = useQuery({
    queryKey: ["user"],
    queryFn: coleAPI("/users/user/me"),
  });

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        useMainStore.getState().setIsLoading(false);
      }, 800);
    }
  }, [loading]);

  useEffect(() => {
    if (user) {
      console.log(user);
      useMainStore.getState().setUser(user);
      useMainStore.getState().setIsLoggedIn(true);
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div>
      {isLoggedIn ? (
        <Router>
          <Routes>
            <Route path="/" element={<LoggedIn />} />
            <Route
              path="/teacher"
              element={
                <PageWrapper>
                  <TeachersPage />
                </PageWrapper>
              }
            />
            <Route
              path="/teacher/newdepartment/:sy"
              element={
                <PageWrapper>
                  <TeacherDepartmentSelector />
                </PageWrapper>
              }
            />
            <Route
              path="/teacher/subjects/students/:sy/:departmentShortName/:yearLevel/:departmentId"
              element={
                <PageWrapper>
                  <DepartmentStudents />
                </PageWrapper>
              }
            />
          </Routes>
        </Router>
      ) : (
        <LandingPage />
      )}
    </div>
  );
};

export default App;
