"use client";

import { useState, useEffect } from "react";
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
import { BookOpen } from "lucide-react";
import NavigateBack from "@/components/back";
import HandleNewSubject from "./handle-new-subject";

export function CourseTable({
  courses = [],
  onViewStudents,
  departmentId,
  department,
  year,
  sy,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(courses.length / itemsPerPage);

  const paginatedCourses = courses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [courses]);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <NavigateBack />
      <Card
        className="w-full px-4 max-w-5xl shadow-lg rounded-2xl gap-4"
        style={{ backgroundColor: "rgba(255,255,255,0.75)" }}
      >
        <CardHeader className="flex items-center gap-2 px-4 sm:px-6">
          <BookOpen className="w-5 h-5 text-primary" />
          <CardTitle className="w-full flex justify-between">
            <div className="text-lg sm:text-xl">
              Course List ({department}-{year})
            </div>
            <HandleNewSubject departmentId={departmentId} year={year} sy={sy} />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="min-w-[600px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-36">Course Code</TableHead>
                  <TableHead className="text-center">Course Name</TableHead>
                  <TableHead className="text-center">Semester</TableHead>
                  <TableHead className="w-36 text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCourses.length > 0 ? (
                  paginatedCourses.map((course) => (
                    <TableRow key={course.subjectId}>
                      <TableCell className="whitespace-nowrap">
                        {course.code}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-center">
                        {course.subjectName}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-center">
                        {course.semester}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          size="sm"
                          className="w-full sm:w-auto"
                          onClick={() => onViewStudents(course)}
                        >
                          View Grades
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center text-muted-foreground"
                    >
                      No courses found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

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
        </CardContent>
      </Card>
    </div>
  );
}
