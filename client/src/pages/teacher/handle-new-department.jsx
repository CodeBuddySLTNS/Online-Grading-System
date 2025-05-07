import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Header } from "@/components/header";
import { useQuery } from "@tanstack/react-query";
import { coleAPI } from "@/lib/utils";

const years = [
  {
    value: "1",
    label: "1st Year",
  },
  {
    value: "2",
    label: "2nd Year",
  },
  {
    value: "3",
    label: "3rd Year",
  },
  {
    value: "4",
    label: "4th Year",
  },
];

export default function TeacherDepartmentSelector() {
  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: coleAPI("/departments"),
  });

  console.log(departments);

  const { handleSubmit, control, watch } = useForm({
    defaultValues: {
      department: "",
      year: "",
    },
  });

  const onSubmit = (data) => {
    if (!data.department || !data.year) {
      alert("Please select both department and year level.");
      return;
    }
    alert(`Selected: ${data.department} - ${data.year}`);
  };

  const selectedDepartment = watch("department");
  const selectedYear = watch("year");

  return (
    <div>
      <Header />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto p-8 space-y-6"
      >
        <h1 className="text-2xl font-bold">Select Department and Year Level</h1>

        <div>
          <label className="block mb-1 font-medium">Department</label>
          <Controller
            name="department"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  {departments?.map((dept) => (
                    <SelectItem
                      key={dept.departmentId}
                      value={String(dept.departmentId)}
                    >
                      {dept.departmentName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Year Level</label>
          <Controller
            name="year"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Year Level" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year.value} value={year.value}>
                      {year.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          Confirm Selection
        </Button>

        {selectedDepartment && selectedYear && (
          <div className="text-muted-foreground">
            You selected: <strong>{selectedDepartment}</strong> -{" "}
            <strong>{selectedYear}</strong>
          </div>
        )}
      </form>
    </div>
  );
}
