import NavigateBack from "@/components/back";
import { Header } from "@/components/header";
import { StudentsTable } from "@/components/registrar/students-table";
import { coleAPI } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { FileText } from "lucide-react";
import { useParams } from "react-router-dom";

const Students = () => {
  const { departmentId, department, yearLevel } = useParams();

  const { data: students } = useQuery({
    queryKey: ["students"],
    queryFn: coleAPI(
      `/students?departmentId=${departmentId}&yearLevel=${yearLevel}`
    ),
  });

  console.log(students);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="p-4">
        <NavigateBack />
        <div className="md:w-[80%] p-4 border rounded-lg shadow-sm bg-white dark:bg-muted mt-4 mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary shrink-0" />
              <div>
                <h1 className="text-lg md:text-xl font-semibold leading-snug">
                  Student Records {department && `(${department}-${yearLevel})`}
                </h1>
              </div>
            </div>
          </div>
          <StudentsTable data={students} pageSize={10} />
        </div>
      </div>
    </div>
  );
};

export default Students;
