import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import LoginPage from "@/pages/authentication/login";
import SignupPage from "@/pages/authentication/signup";

export default function LandingPage() {
  const [auth, setAuth] = useState("");

  return (
    <>
      {auth === "login" ? (
        <LoginPage setAuth={setAuth} />
      ) : auth === "signup" ? (
        <SignupPage setAuth={setAuth} />
      ) : (
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
          <Card
            className="max-w-md w-full shadow-xl rounded-2xl"
            style={{ backgroundColor: "rgba(255,255,255,0.75)" }}
          >
            <CardHeader>
              <CardTitle className="text-center text-3xl font-bold">
                Online Grading System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-600 mb-6">
                Streamlined grading, tracking, and reporting for educators and
                students.
              </p>
              <div className="flex flex-col gap-4">
                <Button className="w-full" variant="default" asChild>
                  <button onClick={() => setAuth("login")}>Login</button>
                </Button>

                <Button className="w-full" variant="secondary" asChild>
                  <button onClick={() => setAuth("signup")}>Signup</button>
                </Button>
              </div>
            </CardContent>
          </Card>
          <footer className="mt-10 text-sm text-gray-400">
            © 2025 Online Grading System. All rights reserved.
          </footer>
        </div>
      )}
    </>
  );
}
