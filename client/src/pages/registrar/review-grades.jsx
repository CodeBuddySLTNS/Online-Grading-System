import NavigateBack from "@/components/back";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { coleAPI } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ReviewGrades = () => {
  const grades = useLocation().state;
  const queryClient = useQueryClient();
  const [isApproved, setApproved] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(grades?.students?.length / itemsPerPage) || 1;

  const paginatedStudents = grades?.students?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const { data: depgrades } = useQuery({
    queryKey: ["depstudents"],
    queryFn: coleAPI(
      `/grades/department?teacherId=${grades?.teacherId}&departmentId=${grades?.departmentId}&yearLevel=${grades?.yearLevel}&subjectId=${grades?.subjectId}&schoolYearId=${grades?.schoolYearId}`
    ),
  });

  const jsondata = depgrades?.map((s) => ({
    Name: s.studentName,
    Prelim: s.prelim,
    Midterm: s.midterm,
    Semifinal: s.semifinal,
    Final: s.final,
    Average: s.average,
  }));

  const { mutateAsync: approve, isPending } = useMutation({
    mutationFn: coleAPI("/grades/approve", "POST"),
    onSuccess: () => {
      toast("Success!", {
        description: "Grades approved.",
        style: {
          fontSize: "1rem",
          backgroundColor: "#d4edda",
          color: "#155724",
        },
      });
      setApproved(true);

      const worksheet = XLSX.utils.json_to_sheet(jsondata);

      worksheet["!cols"] = [
        { wch: 30 },
        { wch: 10 },
        { wch: 10 },
        { wch: 10 },
        { wch: 10 },
        { wch: 10 },
      ];

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet);

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const data = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(
        data,
        `${grades.departmentShort + grades.yearLevel} - ${
          grades.subjectCode
        }.xlsx`
      );
    },
    onError: (e) => {
      toast("Error!", {
        description:
          e.response?.data?.message || "Unable to connect to the server.",
        style: {
          fontSize: "1rem",
          backgroundColor: "#f8d7da",
          color: "#721c24",
        },
      });
    },
  });

  useEffect(() => {
    if (grades) {
      setCurrentPage(1);
      queryClient.invalidateQueries(["depstudents"]);
    }
  }, [grades, queryClient]);

  const handleApprove = async () => {
    try {
      await approve({
        teacherId: grades.teacherId,
        departmentId: grades.departmentId,
        yearLevel: grades.yearLevel,
        subjectId: grades.subjectId,
        schoolYearId: grades.schoolYearId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="p-4 max-w-6xl mx-auto">
        <NavigateBack />
        <div className="p-4 border rounded-lg shadow-sm dark:bg-muted mt-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary shrink-0" />
              <div>
                <h1 className="text-lg md:text-xl font-semibold leading-snug">
                  Grade Review{" "}
                  {grades?.departmentShort &&
                    `(${grades.departmentShort}-${grades.yearLevel})`}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {grades?.subjectName &&
                    `${grades?.subjectName} | ${
                      grades?.semester == 1 ? "1st Semester" : "2nd Semester"
                    }`}
                </p>
              </div>
            </div>
            <Button
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-sm md:text-base font-medium shadow-md bg-green-700 hover:bg-green-500"
              disabled={isApproved || !grades?.subjectName}
              onClick={handleApprove}
            >
              <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
              <span>
                {isPending
                  ? "processing..."
                  : isApproved
                  ? "Approved"
                  : "Approve"}
              </span>
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="text-center">Prelim</TableHead>
                <TableHead className="text-center">Midterm</TableHead>
                <TableHead className="text-center">Semifinal</TableHead>
                <TableHead className="text-center">Final</TableHead>
                <TableHead className="text-center">Average</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedStudents?.map((grade, index) => (
                <TableRow key={index}>
                  <TableCell>{grade.studentName}</TableCell>
                  <TableCell className="text-center">{grade.prelim}</TableCell>
                  <TableCell className="text-center">{grade.midterm}</TableCell>
                  <TableCell className="text-center">
                    {grade.semifinal}
                  </TableCell>
                  <TableCell className="text-center">{grade.final}</TableCell>
                  <TableCell className="text-center">{grade.average}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-center gap-4 py-4">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </Button>
            <p className="text-sm mt-1">
              Page {currentPage} of {totalPages}
            </p>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewGrades;
