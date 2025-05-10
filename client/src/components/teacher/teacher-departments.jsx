import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { coleAPI, yearLevelText } from "@/lib/utils";
import { useMainStore } from "@/states/store";
import { Link } from "react-router-dom";

export default function DepartmentsPage() {
  const user = useMainStore((state) => state.user);
  const { data } = useQuery({
    queryKey: ["teacherDepartments"],
    queryFn: coleAPI("/teachers/teacher?id=" + user.userId),
  });

  return (
    <div>
      <div className="p-8 md:px-20">
        <div className="flex justify-between flex-wrap">
          <h1 className="text-2xl font-bold mb-6">Departments You Handle</h1>
          <Link to="/teacher/newdepartment">
            <Button variant="secondary">Handle New Department</Button>
          </Link>
        </div>
        <div className="space-y-8">
          {Object.entries(data?.departments || {}).map(
            ([yearLevel, deptList]) => (
              <div key={yearLevel}>
                <h2 className="text-xl font-semibold mb-4">
                  {yearLevelText(yearLevel)}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {deptList.map((dept) => (
                    <Card
                      key={dept.departmentId}
                      className="rounded-2xl shadow-md transition-transform transform hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                    >
                      <CardHeader className="flex-1">
                        <CardTitle className="poppins">
                          {dept.name} ({dept.short})
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Link
                          to={`/teacher/subjects/students/${dept.departmentId}/${yearLevel}/${dept.short}`}
                        >
                          <Button variant="default" className="w-full">
                            View Department
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
