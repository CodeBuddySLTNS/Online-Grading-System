import NavigateBack from "@/components/back";
import { Header } from "@/components/header";
import { SortablePaginatedTable } from "@/components/sortable-paginated-table";
import { Button } from "@/components/ui/button";
import { coleAPI } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle, FileText } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const ReviewGrades = () => {
  const queryClient = useQueryClient();
  const { excelGradeId } = useParams();

  const { data: grades } = useQuery({
    queryKey: ["excelData"],
    queryFn: coleAPI(`/grades/excelgrade?id=${excelGradeId}`),
  });

  const { mutateAsync: approve } = useMutation({
    mutationFn: coleAPI("/grades/excelgrades/approve", "POST"),
    onSuccess: () => {
      toast("Success!", {
        description: "Grades approved.",
        style: {
          fontSize: "1rem",
          backgroundColor: "#d4edda",
          color: "#155724",
        },
      });
      queryClient.invalidateQueries(["excelData"]);
    },
    onError: (e) => {
      if (e.response?.data?.message) {
        toast("Error!", {
          description: e.response?.data?.message,
          style: {
            fontSize: "1rem",
            backgroundColor: "#f8d7da",
            color: "#721c24",
          },
        });
      } else {
        toast("Error!", {
          description: "Unable to connect to the server.",
          style: {
            fontSize: "1rem",
            backgroundColor: "#f8d7da",
            color: "#721c24",
          },
        });
      }
    },
  });

  const handleApprove = async () => {
    try {
      await approve({ excelGradeId: grades.excelGradeId });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="p-4 max-w-6xl mx-auto">
        <NavigateBack />
        <div className="p-4 border rounded-lg shadow-sm bg-white dark:bg-muted mt-4">
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
                  {grades?.subject &&
                    `${grades?.subject} | ${
                      grades?.semester == 1 ? "1st Semester" : "2nd Semester"
                    }`}
                </p>
              </div>
            </div>
            <Button
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-sm md:text-base font-medium shadow-md bg-green-700 hover:bg-green-500"
              disabled={grades?.isApproved || !grades?.subject}
              onClick={handleApprove}
            >
              <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
              <span>{grades?.isApproved ? "Approved" : "Approve"}</span>
            </Button>
          </div>

          <SortablePaginatedTable data={grades?.data} pageSize={10} />
        </div>
      </div>
    </div>
  );
};

export default ReviewGrades;
