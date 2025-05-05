import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const departments = [
  { id: 1, name: "Computer Science Department" },
  { id: 2, name: "Mathematics Department" },
  { id: 3, name: "English Department" },
];

export default function DepartmentsPage() {
  return (
    <div>
      <div className="p-8 md:px-20">
        <h1 className="text-3xl font-bold mb-6">Departments You Handle</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <Card key={dept.id} className="rounded-2xl shadow-md">
              <CardHeader>
                <CardTitle>{dept.name}</CardTitle>
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
    </div>
  );
}
