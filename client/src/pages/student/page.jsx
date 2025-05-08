import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { coleAPI, yearLevelText } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { User, BookOpen, School } from "lucide-react";

export default function StudentPortal() {
  const { data: student } = useQuery({
    queryKey: ["user"],
    queryFn: coleAPI("/users/user/me"),
  });

  return (
    <div>
      <Header />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
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

        <Card className="shadow-lg rounded-2xl gap-2.5">
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

        <Card className="shadow-lg rounded-2xl gap-1">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <CardTitle>Enrolled Courses</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Course Code</TableHead>
                    <TableHead>Course Title</TableHead>
                    <TableHead>Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="text-center text-muted-foreground"
                    >
                      No courses enrolled yet.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
