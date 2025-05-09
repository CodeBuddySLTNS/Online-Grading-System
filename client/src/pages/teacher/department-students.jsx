import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
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
import { useParams } from "react-router-dom";
import { Header } from "@/components/header";
import ExcelUploader from "@/components/teacher/excel-uploader";
import { CourseTable } from "./courses-table";
import { coleAPI } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useMainStore } from "@/states/store";
import NavigateBack from "@/components/back";

export default function DepartmentStudents() {
  const { departmentId, yearLevel, departmentShortName, sy } = useParams();
  const [studentsGrades, setStudentsGrades] = useState([]);
  const [subject, setSubject] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const user = useMainStore((state) => state.user);

  const { data: subjects } = useQuery({
    queryKey: ["subjects"],
    queryFn: coleAPI(
      `/teachers/departmentsubjects?teacherId=${user.userId}&departmentId=${departmentId}&yearLevel=${yearLevel}&schoolYearId=${sy}`
    ),
  });

  const rowsPerPage = 10;
  const totalPages = Math.ceil((studentsGrades.length - 1) / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedData = [...studentsGrades].slice(1).sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setStudentsGrades([studentsGrades[0], ...sortedData]);
  };

  const paginatedData = studentsGrades
    .slice(1)
    .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex justify-center p-4 md:px-20">
        {subject ? (
          <div className="w-full flex flex-col justify-center items-center">
            <NavigateBack onBackFn={() => setSubject("")} />
            <Card className="w-full max-w-5xl shadow-lg rounded-2xl gap-4">
              <CardHeader className="flex justify-between">
                <div className="flex items-center gap-2">
                  <User className="w-6 h-6 text-primary" />
                  <div>
                    <h1 className="text-lg md:text-xl font-semibold">
                      Students Grades ({departmentShortName}-{yearLevel})
                    </h1>
                    <p className="text-sm">
                      {subject.subjectName} |{" "}
                      {subject.semester == 1 ? "1st semester" : "2nd semester"}
                    </p>
                  </div>
                </div>
                <ExcelUploader
                  setData={setStudentsGrades}
                  department={departmentShortName}
                  year={yearLevel}
                  subject={subject}
                />
              </CardHeader>
              <CardContent>
                {studentsGrades.length > 0 ? (
                  <div className="overflow-x-auto rounded-lg border">
                    <Table className="min-w-full text-sm">
                      <TableHeader>
                        <TableRow>
                          {studentsGrades[0]?.map((header, index) => (
                            <TableHead
                              key={index}
                              className={`whitespace-nowrap ${
                                index > 0 && "text-center"
                              } cursor-pointer`}
                              onClick={() => handleSort(index)}
                            >
                              {header}
                              {sortConfig.key === index && (
                                <span>
                                  {sortConfig.direction === "ascending"
                                    ? " 🔼"
                                    : " 🔽"}
                                </span>
                              )}
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedData.map((row, rowIndex) => (
                          <TableRow
                            key={rowIndex}
                            className="hover:bg-muted transition-colors"
                          >
                            {row.map((cell, cellIndex) => (
                              <TableCell
                                key={cellIndex}
                                className={cellIndex === 0 ? "" : "text-center"}
                              >
                                {cell}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="h-28 flex justify-center items-center rounded-lg border">
                    <p className="text-center text-muted-foreground">
                      No grades to load.
                    </p>
                  </div>
                )}
                <div className="mt-4 flex justify-between items-center">
                  <Button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    variant="secondary"
                    className="shadow"
                  >
                    Previous
                  </Button>
                  <p className="text-sm">
                    Page {currentPage} of {totalPages || 1}
                  </p>
                  <Button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages || !totalPages}
                    className="shadow"
                  >
                    Next
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <CourseTable
            courses={subjects}
            department={departmentShortName}
            year={yearLevel}
            onViewStudents={(data) => setSubject(data)}
          />
        )}
      </main>
    </div>
  );
}
