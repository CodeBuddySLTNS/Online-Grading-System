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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { coleAPI } from "@/lib/utils";
import { useMainStore } from "@/states/store";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavigateBack from "@/components/back";

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
  const { sy } = useParams();
  const [parameters, setParameters] = useState("");
  const user = useMainStore((state) => state.user);

  const queryClient = useQueryClient();

  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: coleAPI("/departments"),
  });

  const { data: departmentSubjects, isPending } = useQuery({
    queryKey: ["departmentSubjects"],
    queryFn: coleAPI("/subjects/departmentsubjects" + parameters),
  });

  const { mutateAsync: handleDepartment } = useMutation({
    mutationFn: coleAPI(`/teachers/teacher/newdepartment`, "POST"),
    onSuccess: () => {
      toast("Success!", {
        description: "Department Subject has been successfully handled.",
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
      subjectId: "",
    },
  });

  const onSubmit = async (data) => {
    if (!data.department || !data.year || !data.subjectId) {
      alert("Please select department, year level, and course.");
      return;
    }

    const payload = {
      teacherId: user.userId,
      departmentId: Number(data.department),
      yearLevel: Number(data.year),
      subjectId: Number(data.subjectId),
      schoolYearId: Number(sy),
    };

    try {
      await handleDepartment(payload);
    } catch (error) {
      console.log(error);
    }
  };

  const watchedDepartment = watch("department");
  const watchedYear = watch("year");
  watch("subjectId");

  useEffect(() => {
    if (watchedDepartment && watchedYear) {
      setParameters(
        `?departmentId=${watchedDepartment}&yearLevel=${watchedYear}`
      );
    }
  }, [watchedDepartment, watchedYear]);

  useEffect(() => {
    if (parameters) {
      queryClient.invalidateQueries(["departmentSubjects"]);
    }
  }, [parameters, queryClient]);

  return (
    <div>
      <Header />
      <div
        className="h-full"
        style={{ backgroundColor: "rgba(255,255,255,0.75)" }}
      >
        <div className="max-w-md mx-auto pt-8 px-0 space-y-6">
          <NavigateBack />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto p-8 pt-0 space-y-6"
        >
          <h1 className="text-2xl font-bold">
            Select Department and Year Level
          </h1>

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

          <div>
            <label className="block mb-1 font-medium">Subject</label>
            <Controller
              name="subjectId"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {departmentSubjects && departmentSubjects.length > 0 ? (
                      departmentSubjects.map((subject) => (
                        <SelectItem
                          key={subject.subjectId}
                          value={String(subject.subjectId)}
                        >
                          {subject.subjectName}
                        </SelectItem>
                      ))
                    ) : isPending ? (
                      <p className="text-center text-sm text-muted-foreground">
                        loading...
                      </p>
                    ) : !parameters ? (
                      <p className="text-center text-sm text-muted-foreground">
                        Please select department and year first.
                      </p>
                    ) : (
                      <p className="text-center text-sm text-muted-foreground">
                        No assigned subjects in this department yet.
                      </p>
                    )}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <Button type="submit" className="w-full">
            Confirm Selection
          </Button>
        </form>
      </div>
    </div>
  );
}
