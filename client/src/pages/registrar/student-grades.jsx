import { useQuery } from "@tanstack/react-query";
import { coleAPI, yearLevelText } from "@/lib/utils";
import { Header } from "@/components/header";
import NavigateBack from "@/components/back";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { GraduationCap, User } from "lucide-react";

export default function StudentGrades() {
  const { student } = useLocation().state;

  const { data: grades } = useQuery({
    queryKey: ["studentGrades"],
    queryFn: coleAPI(`/grades/student?studentId=${student?.userId}`),
  });

  const groupedBySchoolYear = useMemo(() => {
    if (!grades) return {};

    return grades.reduce((acc, grade) => {
      const { schoolYearName, yearLevel } = grade;

      if (!acc[schoolYearName]) acc[schoolYearName] = {};
      if (!acc[schoolYearName][yearLevel]) acc[schoolYearName][yearLevel] = [];

      acc[schoolYearName][yearLevel].push(grade);
      return acc;
    }, {});
  }, [grades]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="p-4 mx-auto">
        <NavigateBack />

        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2 text-primary">
                <User className="w-8 h-8" />
                {student.firstName}{" "}
                {student.middleName ? student.middleName + " " : ""}
                {student.lastName}
              </h1>
              <p className="text-muted-foreground flex items-center gap-1 mt-1 text-sm">
                <GraduationCap className="w-4 h-4" />
                {student.departmentName}
              </p>
            </div>
          </div>

          {Object.keys(groupedBySchoolYear).length === 0 ? (
            <div className="text-muted-foreground text-center">
              No grades available.
            </div>
          ) : (
            Object.entries(groupedBySchoolYear).map(([schoolYear, levels]) => (
              <div key={schoolYear} className="mb-12">
                <h3 className="text-2xl font-semibold text-accent-foreground border-b border-muted pb-2 mb-6">
                  {schoolYear}
                </h3>

                {Object.entries(levels).map(([yearLevel, subjects]) => (
                  <div key={yearLevel} className="mb-10">
                    <h4 className="text-lg font-medium mb-4 text-muted-foreground">
                      {yearLevelText(yearLevel)}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                      {subjects.map((subj, idx) => (
                        <div
                          key={idx}
                          className="bg-card border shadow-sm rounded-2xl p-4 transition hover:shadow-md"
                        >
                          <div className="font-semibold text-primary mb-2 text-sm sm:text-base">
                            {subj.subjectName}
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <div className="flex justify-between">
                              <span>Prelim</span> <span>{subj.prelim}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Midterm</span> <span>{subj.midterm}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Semifinal</span>{" "}
                              <span>{subj.semifinal}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Final</span> <span>{subj.final}</span>
                            </div>
                            <div className="flex justify-between font-semibold mt-2 pt-2 border-t border-muted">
                              <span>Average</span> <span>{subj.average}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
