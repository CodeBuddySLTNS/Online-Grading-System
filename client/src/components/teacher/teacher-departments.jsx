import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { coleAPI, yearLevelText } from "@/lib/utils";
import { useMainStore } from "@/states/store";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DepartmentsPage({ sy }) {
  const user = useMainStore((state) => state.user);
  const [departments, setDepartments] = useState({ loading: true, data: [] });

  const { data } = useQuery({
    queryKey: ["teacherDepartments"],
    queryFn: coleAPI(`/teachers/teacher?id=${user.userId}&sy=${sy}`),
  });

  useEffect(() => {
    if (data)
      setDepartments({
        loading: false,
        data: Object.entries(data.departments || {}),
      });
  }, [data]);

  useEffect(() => {
    return () => setDepartments({ loading: true, data: [] });
  }, []);

  return (
    <div className="space-y-8">
      {departments.data.length > 0 ? (
        departments.data.map(([yearLevel, deptList]) => (
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
                      to={`/teacher/subjects/students/${sy}/${dept.short}/${yearLevel}/${dept.departmentId}`}
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
        ))
      ) : departments.loading ? (
        <div className="flex justify-center items-center">
          <div className="loader mt-16"></div>
        </div>
      ) : (
        <div>No departments handled.</div>
      )}
    </div>
  );
}
