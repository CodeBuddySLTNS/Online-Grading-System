import NavigateBack from "@/components/back";
import { Header } from "@/components/header";
import { SchoolYearList } from "@/components/school-year";
import DepartmentsPage from "@/components/teacher/teacher-departments";
import { Button } from "@/components/ui/button";
import { coleAPI } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function TeachersPortal() {
  const [sy, setSy] = useState("");
  const navigate = useNavigate();

  const { data: schoolYears } = useQuery({
    queryKey: ["schoolYears"],
    queryFn: coleAPI("/registrar/sy"),
  });

  return (
    <div>
      <Header />
      <div className="p-4 md:px-20">
        {sy ? (
          <>
            <div>
              <NavigateBack
                onBackFn={sy ? () => setSy("") : () => navigate(-1)}
              />
            </div>
            <div className="px-3">
              <div className="flex justify-between flex-wrap">
                <h1 className="text-2xl font-bold mb-6">
                  Departments You Handle
                </h1>
                <Link to={"/teacher/newdepartment/" + sy}>
                  <Button
                    variant="secondary"
                    className="shadow hover:shadow-lg"
                  >
                    Handle New Department
                  </Button>
                </Link>
              </div>
              <DepartmentsPage sy={sy} />
            </div>
          </>
        ) : (
          <SchoolYearList
            schoolYears={schoolYears}
            onSelect={(data) => setSy(data.schoolYearId)}
          />
        )}
      </div>
    </div>
  );
}
