import { useState } from "react";
import { Header } from "@/components/header";
import { CourseTable } from "./courses-table";
import { coleAPI } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useMainStore } from "@/states/store";
import StudentsGrades from "@/components/teacher/students-grades";
import { useLocation } from "react-router-dom";

export default function DepartmentStudents() {
  const { departmentId, yearLevel, departmentShortName, sy } =
    useLocation().state;
  const [subject, setSubject] = useState(null);
  const user = useMainStore((state) => state.user);

  const { data: subjects } = useQuery({
    queryKey: ["subjects"],
    queryFn: coleAPI(
      `/teachers/departmentsubjects?teacherId=${user.userId}&departmentId=${departmentId}&yearLevel=${yearLevel}&schoolYearId=${sy}`
    ),
  });

  return (
    <div className="min-h-screen">
      <Header />
      <main className="flex justify-center px-4 py-8 md:px-20">
        {subject ? (
          <StudentsGrades
            departmentId={departmentId}
            departmentShortName={departmentShortName}
            year={yearLevel}
            subject={subject}
            setSubject={setSubject}
            sy={sy}
          />
        ) : (
          <CourseTable
            courses={subjects}
            departmentId={departmentId}
            department={departmentShortName}
            year={yearLevel}
            sy={sy}
            onViewStudents={(data) => setSubject(data)}
          />
        )}
      </main>
    </div>
  );
}
