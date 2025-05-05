import React from "react";
import LandingPage from "./components/landing-page";
import LoginPage from "./components/authentication/login";
import SignupPage from "./components/authentication/signup";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </>
  );
};

export default App;
