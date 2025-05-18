import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookOpen } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function StudentGradeTable({ grades = [] }) {
  const schoolYears = useMemo(
    () => [...new Set(grades.map((g) => g.schoolYearName))].sort().reverse(),
    [grades]
  );
  const semesters = useMemo(
    () => [...new Set(grades.map((g) => g.semester))].sort().reverse(),
    [grades]
  );

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");

  useEffect(() => {
    if (schoolYears.length > 0) {
      setSelectedYear(schoolYears[0]);
    }
  }, [schoolYears]);

  useEffect(() => {
    if (semesters.length > 0) {
      setSelectedSemester(semesters[0].toString());
    }
  }, [semesters]);

  const filteredGrades = grades.filter(
    (g) =>
      (!selectedYear || g.schoolYearName === selectedYear) &&
      (!selectedSemester || g.semester.toString() === selectedSemester)
  );

  return (
    <Card
      className="shadow-lg rounded-2xl gap-3"
      style={{ backgroundColor: "rgba(255,255,255,0.75)" }}
    >
      <CardHeader>
        <div className="flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-primary" />
          <CardTitle>Your Grades</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Showing latest school year and semester by default:{" "}
          <span className="font-medium">{selectedYear}</span>,{" "}
          {selectedSemester === "1" ? "1st" : "2nd"} Semester
        </p>
      </CardHeader>
      <CardContent className="space-y-2.5">
        <div className="flex gap-1.5">
          <Select onValueChange={setSelectedYear} value={selectedYear}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select School Year" />
            </SelectTrigger>
            <SelectContent>
              {schoolYears.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={setSelectedSemester} value={selectedSemester}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Semester" />
            </SelectTrigger>
            <SelectContent>
              {semesters.map((sem) => (
                <SelectItem key={sem} value={sem.toString()}>
                  {sem === 1 ? "1st Semester" : "2nd Semester"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {filteredGrades.length > 0 ? (
          <div className="overflow-auto w-full">
            <Table className="min-w-[600px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Prelim</TableHead>
                  <TableHead>Midterm</TableHead>
                  <TableHead>Semifinal</TableHead>
                  <TableHead>Final</TableHead>
                  <TableHead>Average</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGrades.map((g, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="whitespace-nowrap">
                      {g.subjectName}
                    </TableCell>
                    <TableCell>{g.prelim}</TableCell>
                    <TableCell>{g.midterm}</TableCell>
                    <TableCell>{g.semifinal}</TableCell>
                    <TableCell>{g.final}</TableCell>
                    <TableCell className="font-medium">{g.average}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No grades found for the selected filters.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
