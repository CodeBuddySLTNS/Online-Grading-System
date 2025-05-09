"use client";

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
import { Header } from "@/components/header";

// sample data
const sample = [
  { subjectId: 1, subjectName: "Math", semester: 1 },
  { subjectId: 2, subjectName: "English", semester: 2 },
];

export function CourseTable({ courses = sample, onViewStudents }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="px-4 py-8">
        <Card className="w-full px-4 max-w-5xl shadow-lg rounded-2xl gap-4">
          <CardHeader className="flex items-center gap-2 px-4 sm:px-6">
            <BookOpen className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg sm:text-xl">Course List</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table className="min-w-[600px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Course ID</TableHead>
                    <TableHead className="text-center">Course Name</TableHead>
                    <TableHead className="text-center">Semester</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.length > 0 ? (
                    courses.map((course) => (
                      <TableRow key={course.subjectId}>
                        <TableCell className="whitespace-nowrap">
                          {course.subjectId}
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
                            View Students
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
