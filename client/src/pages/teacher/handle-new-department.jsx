import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const departments = ["BSCS", "BSIT", "BSECE"];
const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

export default function TeacherDepartmentSelector() {
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-8 space-y-6"
    >
      <h1 className="text-3xl font-bold">Select Department and Year Level</h1>

      <div>
        <label className="block mb-1 font-medium">Department</label>
        <Controller
          name="department"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
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
              <SelectTrigger>
                <SelectValue placeholder="Select Year Level" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
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
  );
}
