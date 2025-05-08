import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { coleAPI } from "@/lib/utils";
import { useParams } from "react-router-dom";
import { Header } from "@/components/header";

const yearLevelText = (year) => {
  switch (year) {
    case 1:
      return "1st Year";
    case 2:
      return "2nd Year";
    case 3:
      return "3rd Year";
    case 4:
      return "4th Year";
    default:
      return "Unknown";
  }
};

export default function DepartmentStudents() {
  const { departmentId, yearLevel } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: students } = useQuery({
    queryKey: ["students"],
    queryFn: coleAPI(
      `/students?departmentId=${departmentId}&yearLevel=${yearLevel}`
    ),
  });

  const pageSize = 5;
  const totalPages = Math.ceil(students?.length / pageSize) || 1;

  const paginatedStudents = students?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex justify-center px-4 py-8">
        <Card className="w-full max-w-5xl shadow-lg rounded-2xl gap-2">
          <CardHeader className="flex items-center">
            <User className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg sm:text-xl">Students List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-lg border">
              <Table className="min-w-full text-sm">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20 whitespace-nowrap">
                      User ID
                    </TableHead>
                    <TableHead className="whitespace-nowrap text-center">
                      Username
                    </TableHead>
                    <TableHead className="whitespace-nowrap text-center">
                      Full Name
                    </TableHead>
                    <TableHead className="whitespace-nowrap text-center">
                      Year Level
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedStudents?.length > 0 ? (
                    paginatedStudents.map((user) => (
                      <TableRow
                        key={user.userId}
                        className="hover:bg-muted transition-colors"
                      >
                        <TableCell>{user.userId}</TableCell>
                        <TableCell className="text-center">
                          {user.username}
                        </TableCell>
                        <TableCell className="text-center">
                          {`${user.firstName} ${user.middleName} ${user.lastName}`.trim()}
                        </TableCell>
                        <TableCell className="text-center">
                          {yearLevelText(user.yearLevel)}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="text-center text-muted-foreground"
                      >
                        No students found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages || totalPages === 1}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              >
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
