import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PendingCard = ({ grade }) => {
  const navigate = useNavigate();

  return (
    <Card className="rounded-2xl shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 gap-2.5">
      <CardHeader className="flex flex-col gap-2">
        <CardTitle className="text-lg flex items-center gap-2 text-yellow-600">
          <Clock className="w-5 h-5" />
          <span className="font-semibold">Pending Grades Approval</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <InfoRow label="Subject" value={grade.subject} />
        <InfoRow label="Department" value={grade.departmentShort} />
        <InfoRow label="Year Level" value={grade.yearLevel} />
        <InfoRow
          label="Semester"
          value={grade.semester === 1 ? "1st" : "2nd"}
        />
        <InfoRow label="Submitted By" value={grade.teacher} />
        <InfoRow label="School Year" value={grade.schoolYear} />
      </CardContent>

      <CardFooter>
        <Button
          className="w-full shadow-sm"
          onClick={() =>
            navigate(`/registrar/waiting-for-approval/${grade.excelGradeId}`)
          }
        >
          Review Grades
        </Button>
      </CardFooter>
    </Card>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between gap-2">
    <span className="font-medium text-primary">{label}:</span>
    <span className="truncate">{value}</span>
  </div>
);

export default PendingCard;
