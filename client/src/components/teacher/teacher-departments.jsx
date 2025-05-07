import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { coleAPI } from "@/lib/utils";
import { useMainStore } from "@/states/store";

export default function DepartmentsPage() {
  const user = useMainStore((state) => state.user);
  const { data } = useQuery({
    queryKey: ["teacherDepartments"],
    queryFn: coleAPI("/teachers/teacher?id=" + user.userId),
  });

  console.log(data);

  return (
    <div>
      <div className="p-8 md:px-20">
        <div className="flex justify-between flex-wrap">
          <h1 className="text-2xl font-bold mb-6">Departments You Handle</h1>
          <Button variant="secondary">Handle New Department</Button>
        </div>
        <div className="space-y-8">
          {Object.entries(data?.departments || {}).map(
            ([yearLevel, deptList]) => (
              <div key={yearLevel}>
                <h2 className="text-xl font-semibold mb-4">
                  Year Level {yearLevel}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {deptList.map((dept) => (
                    <Card
                      key={dept.departmentId}
                      className="rounded-2xl shadow-md"
                    >
                      <CardHeader>
                        <CardTitle className="poppins">{dept.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Button variant="default" className="w-full">
                          View Department
                        </Button>
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
