import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing-page";
import LoginPage from "./pages/authentication/login";
import SignupPage from "./pages/authentication/signup";
import TeachersPage from "./pages/teacher/page";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/teacher" element={<TeachersPage />} />
      </Routes>
    </>
  );
};

export default App;
