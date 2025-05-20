import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { Header } from "@/components/header";

export default function DeanDashboard() {
  const navigate = useNavigate();

  const handleViewStudents = () => {
    navigate("/registrar/student-records");
  };

  return (
    <div>
      <Header />
      <div className="w-full mt-8 p-6 flex flex-col items-center justify-center">
        <Card
          className="w-full max-w-xl shadow-xl rounded-2xl"
          style={{ backgroundColor: "rgba(255,255,255,0.75)" }}
        >
          <CardHeader className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-blue-800">Welcome, Dean!</h1>
            <p className="text-gray-600">
              Manage and oversee student records with ease.
            </p>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <GraduationCap className="w-16 h-16 text-blue-700" />
            <Button
              onClick={handleViewStudents}
              className="w-full max-w-sm py-5 text-lg rounded-xl"
            >
              View Student Records
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
