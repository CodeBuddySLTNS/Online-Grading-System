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
import { useMutation, useQuery } from "@tanstack/react-query";
import { coleAPI } from "@/lib/utils";
import { useMainStore } from "@/states/store";
import { toast } from "sonner";

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
  const user = useMainStore((state) => state.user);

  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: coleAPI("/departments"),
  });

  const { mutateAsync: handleDepartment } = useMutation({
    mutationFn: coleAPI(`/teachers/teacher/newdepartment`, "POST"),
    onSuccess: () => {
      toast("Success!", {
        description: "Department has been successfully handled.",
        style: {
          fontSize: "1rem",
          backgroundColor: "#d4edda",
          color: "#155724",
        },
      });
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

  const { handleSubmit, control, watch } = useForm({
    defaultValues: {
      department: "",
      year: "",
    },
  });

  const onSubmit = async (data) => {
    if (!data.department || !data.year) {
      alert("Please select both department and year level.");
      return;
    }

    const payload = {
      teacherId: user.userId,
      departmentId: Number(data.department),
      yearLevel: Number(data.year),
    };

    try {
      await handleDepartment(payload);
    } catch (error) {
      console.log(error);
    }
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
