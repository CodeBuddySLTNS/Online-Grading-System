import { Header } from "@/components/header";
import StudentGradeTable from "@/components/student/student-grade-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { coleAPI, yearLevelText } from "@/lib/utils";
import { useMainStore } from "@/states/store";
import { useQuery } from "@tanstack/react-query";
import { User, School } from "lucide-react";

export default function StudentPortal() {
  const user = useMainStore((state) => state.user);

  const { data: student } = useQuery({
    queryKey: ["user"],
    queryFn: coleAPI("/users/user/me"),
  });

  const { data: grades } = useQuery({
    queryKey: ["grades"],
    queryFn: coleAPI("/grades/student?studentId=" + user.userId),
  });

  return (
    <div>
      <Header />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-10 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <User className="w-10 h-10 text-primary shrink-0" />
            <div>
              <h1 className="text-xl font-bold leading-tight">
                Welcome, {student?.firstName}!
              </h1>
              <p className="text-muted-foreground text-sm">
                Student Portal Dashboard
              </p>
            </div>
          </div>
        </div>

        <Card
          className="shadow-lg rounded-2xl gap-2.5"
          style={{ backgroundColor: "rgba(255,255,255,0.75)" }}
        >
          <CardHeader>
            <div className="flex items-center gap-2">
              <School className="w-5 h-5 text-primary" />
              <CardTitle>Student Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
            <div>
              <span className="font-semibold">Full Name:</span>{" "}
              {student?.firstName} {student?.middleName} {student?.lastName}
            </div>
            <div>
              <span className="font-semibold">Username:</span>{" "}
              {student?.username}
            </div>

            <div>
              <span className="font-semibold">Department:</span>{" "}
              {student?.departmentName} ({student?.shortName})
            </div>
            <div>
              <span className="font-semibold">Year Level:</span>{" "}
              {yearLevelText(student?.yearLevel)}
            </div>
          </CardContent>
        </Card>

        <StudentGradeTable grades={grades} />
      </div>
    </div>
  );
}
