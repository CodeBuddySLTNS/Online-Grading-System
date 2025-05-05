import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-slate-100 px-4">
      <Card className="max-w-md w-full shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">
            Online Grading System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600 mb-6">
            Effortless grading, tracking, and reporting for educators and
            students.
          </p>
          <div className="flex flex-col gap-4">
            <Link to="/login">
              <Button className="w-full" variant="default">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="w-full" variant="secondary">
                Signup
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
      <footer className="mt-10 text-sm text-gray-400">
        © 2025 Online Grading System. All rights reserved.
      </footer>
    </div>
  );
}
