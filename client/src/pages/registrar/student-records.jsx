import NavigateBack from "@/components/back";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { coleAPI } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Calendar } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const StudentRecords = () => {
  const [depyear, setDepyear] = useState({ department: "", year: "" });

  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: coleAPI("/departments"),
  });

  return (
    <div className="min-h-screen">
      <Header />
      <div className="p-4">
        <NavigateBack
          onBackFn={
            departments && depyear.department
              ? () => setDepyear({ department: null, year: null })
              : null
          }
        />
        <Card
          className="w-full max-w-3xl mx-auto mt-4 shadow-lg rounded-xl"
          style={{ backgroundColor: "rgba(255,255,255,0.75)" }}
        >
          <CardHeader className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            <CardTitle className="w-full flex justify-between items-center">
              <div>
                {departments && !depyear.department
                  ? "Select Department"
                  : depyear.department?.departmentName}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              {departments && !depyear.department ? (
                departments.map((dept, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-lg font-semibold justify-start px-4 py-6 hover:bg-secondary hover:text-primary hover:shadow transition"
                    onClick={() =>
                      setDepyear((prev) => ({
                        ...prev,
                        department: dept,
                      }))
                    }
                  >
                    <span className="hidden md:block">
                      {dept.departmentName} ({dept.shortName})
                    </span>
                    <span className="block md:hidden truncate">
                      {dept.shortName} - {dept.departmentName}
                    </span>
                  </Button>
                ))
              ) : departments && !depyear.year ? (
                <>
                  <Link
                    to={`/registrar/student-records/${
                      depyear.department?.shortName +
                      depyear.department?.departmentId
                    }`}
                    state={{
                      department: depyear.department,
                      yearLevel: 1,
                    }}
                  >
                    <Button
                      variant="outline"
                      className="w-full text-lg font-semibold justify-start px-4 py-6 hover:bg-secondary hover:text-primary hover:shadow transition"
                    >
                      1st Year
                    </Button>
                  </Link>

                  <Link
                    to={`/registrar/student-records/${
                      depyear.department?.shortName +
                      depyear.department?.departmentId
                    }`}
                    state={{
                      department: depyear.department,
                      yearLevel: 2,
                    }}
                  >
                    <Button
                      variant="outline"
                      className="w-full text-lg font-semibold justify-start px-4 py-6 hover:bg-secondary hover:text-primary hover:shadow transition"
                    >
                      2nd Year
                    </Button>
                  </Link>

                  <Link
                    to={`/registrar/student-records/${
                      depyear.department?.shortName +
                      depyear.department?.departmentId
                    }`}
                    state={{
                      department: depyear.department,
                      yearLevel: 3,
                    }}
                  >
                    <Button
                      variant="outline"
                      className="w-full text-lg font-semibold justify-start px-4 py-6 hover:bg-secondary hover:text-primary hover:shadow transition"
                    >
                      3rd Year
                    </Button>
                  </Link>

                  <Link
                    to={`/registrar/student-records/${
                      depyear.department?.shortName +
                      depyear.department?.departmentId
                    }`}
                    state={{
                      department: depyear.department,
                      yearLevel: 4,
                    }}
                  >
                    <Button
                      variant="outline"
                      className="w-full text-lg font-semibold justify-start px-4 py-6 hover:bg-secondary hover:text-primary hover:shadow transition"
                    >
                      4th Year
                    </Button>
                  </Link>
                </>
              ) : (
                <p className="text-muted-foreground text-center col-span-full">
                  No departments available.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentRecords;
