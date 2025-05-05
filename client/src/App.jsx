import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing-page";
import TeachersPage from "./pages/teacher/page";
import { useMainStore } from "./states/store";
import { useQuery } from "@tanstack/react-query";
import { coleAPI } from "./lib/utils";
import LoginPage from "./components/authentication/login";
import { useEffect } from "react";

const App = () => {
  const user = useMainStore((state) => state.user);

  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: coleAPI("/users/user/me"),
  });

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <>
      {user ? (
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/teacher" element={<TeachersPage />} />
        </Routes>
      ) : (
        <LandingPage />
      )}
    </>
  );
};

export default App;
