import NavigateBack from "@/components/back";
import { Header } from "@/components/header";
import { SortablePaginatedTable } from "@/components/sortable-paginated-table";
import { Button } from "@/components/ui/button";
import { coleAPI } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle, FileText } from "lucide-react";
import { useParams } from "react-router-dom";

const ReviewGrades = () => {
  const { excelGradeId } = useParams();

  const { data: grades } = useQuery({
    queryKey: ["excelData"],
    queryFn: coleAPI(`/grades/excelgrade?id=${excelGradeId}`),
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="px-4 py-6 max-w-6xl mx-auto">
        <NavigateBack />
        <div className="p-4 border rounded-lg shadow-sm bg-white dark:bg-muted mt-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary shrink-0" />
              <div>
                <h1 className="text-lg md:text-xl font-semibold leading-snug">
                  Grade Review ({grades?.departmentShort}-{grades?.yearLevel})
                </h1>
                <p className="text-sm text-muted-foreground">
                  {grades?.subject} |{" "}
                  {grades?.semester == 1 ? "1st Semester" : "2nd Semester"}
                </p>
              </div>
            </div>
            <Button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-sm md:text-base font-medium shadow-md bg-green-700 hover:bg-green-500">
              <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
              <span>Approve</span>
            </Button>
          </div>

          <SortablePaginatedTable data={grades?.data} pageSize={10} />
        </div>
      </div>
    </div>
  );
};

export default ReviewGrades;
