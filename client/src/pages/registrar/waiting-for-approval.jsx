import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";

export default function PendingGradeGroups({ gradeGroups }) {
  const navigate = useNavigate();

  if (!gradeGroups?.length) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center text-muted-foreground">
        No pending grades at the moment.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {gradeGroups.map((group, idx) => (
        <Card
          key={idx}
          className="rounded-2xl shadow-md hover:shadow-lg transition-transform hover:-translate-y-1"
        >
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-500" />
              Pending Approval
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p>
              <strong>Department:</strong> {group.departmentName}
            </p>
            <p>
              <strong>Subject:</strong> {group.subjectName}
            </p>
            <p>
              <strong>Year Level:</strong> {group.yearLevel}
            </p>
            <p>
              <strong>Submitted By:</strong> {group.teacherName}
            </p>
            <p>
              <strong>School Year:</strong> {group.schoolYearName}
            </p>
            <p>
              <strong>Semester:</strong> {group.semester === 1 ? "1st" : "2nd"}
            </p>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={() =>
                navigate(
                  `/registrar/review/${group.schoolYearId}/${group.subjectId}/${group.departmentId}/${group.yearLevel}`
                )
              }
            >
              Review Grades
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
