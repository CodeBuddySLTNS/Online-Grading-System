import NavigateBack from "@/components/back";
import { Header } from "@/components/header";
import { StudentsTable } from "@/components/registrar/students-table";
import { Button } from "@/components/ui/button";
import { coleAPI } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { FileText } from "lucide-react";
import { useLocation } from "react-router-dom";

const Students = () => {
  const { department, yearLevel } = useLocation().state;

  const { data: students } = useQuery({
    queryKey: ["students"],
    queryFn: coleAPI(
      `/students?departmentId=${department?.departmentId}&yearLevel=${yearLevel}`
    ),
  });

  return (
    <div className="min-h-screen">
      <Header />
      <div className="p-4">
        <NavigateBack />
        <div
          className="md:w-[80%] p-4 border rounded-lg shadow-sm dark:bg-muted mt-4 mx-auto"
          style={{ backgroundColor: "rgba(255,255,255,0.75)" }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary shrink-0" />
              <div>
                <h1 className="text-lg md:text-xl font-semibold leading-snug">
                  Student Records{" "}
                  {department && `(${department?.shortName}-${yearLevel})`}
                </h1>
              </div>
            </div>
          </div>
          {students?.length > 0 ? (
            <StudentsTable data={students} pageSize={10} />
          ) : (
            <div className="h-40 flex justify-center items-center border rounded-lg">
              No students in this department.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Students;
