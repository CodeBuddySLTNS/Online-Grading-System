import { useQuery } from "@tanstack/react-query";
import { coleAPI, yearLevelText } from "@/lib/utils";
import { Header } from "@/components/header";
import NavigateBack from "@/components/back";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { User, GraduationCap, CalendarClock } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function StudentGrades() {
  const { student, schoolYearId } = useLocation().state;

  const { data: grades } = useQuery({
    queryKey: ["studentGrades"],
    queryFn: coleAPI(
      `/grades/student?studentId=${student?.userId}&schoolYearId=${schoolYearId}`
    ),
  });

  const grouped = useMemo(() => {
    if (!grades) return {};

    return grades.reduce((acc, grade) => {
      const { schoolYearName, yearLevel, semester } = grade;

      if (!acc[schoolYearName]) acc[schoolYearName] = {};
      if (!acc[schoolYearName][yearLevel]) acc[schoolYearName][yearLevel] = {};
      if (!acc[schoolYearName][yearLevel][semester])
        acc[schoolYearName][yearLevel][semester] = [];

      acc[schoolYearName][yearLevel][semester].push(grade);
      return acc;
    }, {});
  }, [grades]);

  return (
    <div className="min-h-screen text-foreground">
      <Header />
      <div className="p-4">
        <div className="mx-auto">
          <NavigateBack />
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold flex items-center gap-2 text-primary">
                <User className="w-7 h-7" />
                {student.firstName}{" "}
                {student.middleName ? student.middleName + " " : ""}
                {student.lastName}
              </h1>
              <p className="text-muted-foreground text-sm flex items-center gap-1 mt-1">
                <GraduationCap className="w-4 h-4" />
                {student.departmentName}
              </p>
            </div>

            {Object.keys(grouped).length === 0 ? (
              <div className="text-muted-foreground text-center py-10">
                No grades available.
              </div>
            ) : (
              Object.entries(grouped).map(([schoolYear, levels]) => (
                <Accordion
                  key={schoolYear}
                  type="single"
                  collapsible
                  className="mb-8 border bg-muted/60 rounded-lg overflow-hidden"
                >
                  <AccordionItem value={schoolYear}>
                    <AccordionTrigger className="text-lg sm:text-xl border font-semibold px-4 py-3 bg-muted hover:bg-muted/70">
                      {schoolYear}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 py-4">
                      {Object.entries(levels).map(([yearLevel, semesters]) => (
                        <Accordion
                          key={yearLevel}
                          type="single"
                          collapsible
                          className="mb- border rounded-lg overflow-hidden"
                        >
                          <AccordionItem value={`year-${yearLevel}`}>
                            <AccordionTrigger className="text-base font-medium px-3 py-2">
                              {yearLevelText(yearLevel)}
                            </AccordionTrigger>
                            <AccordionContent className="px-3 pt-2">
                              {Object.entries(semesters).map(
                                ([sem, subjects]) => (
                                  <div key={sem} className="mb-6">
                                    <div className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                                      <CalendarClock className="w-4 h-4" />
                                      {sem === "1"
                                        ? "1st Semester"
                                        : "2nd Semester"}
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                      {subjects.map((subj, idx) => (
                                        <div
                                          key={idx}
                                          className="bg-card border rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
                                        >
                                          <div className="font-semibold text-primary mb-2 text-sm sm:text-base">
                                            {subj.subjectName}
                                          </div>
                                          <div className="text-sm text-muted-foreground space-y-1">
                                            <div className="flex justify-between">
                                              <span>Prelim</span>{" "}
                                              <span>{subj.prelim}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span>Midterm</span>{" "}
                                              <span>{subj.midterm}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span>Semifinal</span>{" "}
                                              <span>{subj.semifinal}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span>Final</span>{" "}
                                              <span>{subj.final}</span>
                                            </div>
                                            <div className="flex justify-between font-semibold mt-2 pt-2 border-t border-muted">
                                              <span>Average</span>{" "}
                                              <span>{subj.average}</span>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )
                              )}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
