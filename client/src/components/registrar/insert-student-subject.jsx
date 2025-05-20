import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { coleAPI } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import { Input } from "../ui/input";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { toast } from "sonner";
import { Book } from "lucide-react";

const schema = Joi.object({
  departmentId: Joi.string().required().label("Department"),
  studentId: Joi.string().required().label("Student"),
  subjectId: Joi.string().required().label("Subject"),
  schoolYearId: Joi.string().required().label("School Year"),
  yearLevel: Joi.number()
    .integer()
    .min(1)
    .max(4)
    .required()
    .label("Year Level"),
});

const InsertStudentSubjectForm = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: coleAPI("/departments"),
  });

  const { data: subjects } = useQuery({
    queryKey: ["subjects"],
    queryFn: coleAPI("/subjects"),
  });

  const { data: students } = useQuery({
    queryKey: ["students"],
    queryFn: coleAPI("/students?all=1"),
  });

  const { data: schoolYear } = useQuery({
    queryKey: ["schoolYear"],
    queryFn: coleAPI("/registrar/sy"),
  });

  const { mutateAsync: addDepartmentSubject } = useMutation({
    mutationFn: coleAPI("/subjects/departmentsubjects/add", "POST"),
    onSuccess: () => {
      toast("Success!", {
        description: "Subject assigned successfully.",
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

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      departmentId: "",
      subjectId: "",
      studentId: "",
      yearLevel: "",
      schoolYearId: "",
    },
  });

  const departmentId = watch("departmentId");
  const schoolYearId = watch("schoolYearId");
  const studentId = watch("studentId");
  const subjectId = watch("subjectId");

  useEffect(() => {
    if (studentId && students) {
      const matched = students.find((s) => String(s.userId) === studentId);
      setSelectedStudent(matched || null);
    }
  }, [studentId, students]);

  useEffect(() => {
    if (subjectId && subjects) {
      const matched = subjects.find((s) => String(s.subjectId) === subjectId);
      setSelectedSubject(matched || null);
    }
  }, [subjectId, subjects]);

  const onSubmit = async (data) => {
    try {
      await addDepartmentSubject(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="w-full mx-auto shadow-lg rounded-2xl gap-3">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Book className="w-6 h-6 text-primary" />
          <h2 className="text-lg font-bold">Assign Subject to Department</h2>
        </div>
      </CardHeader>
      <CardContent className="h-full">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="grid gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>Student</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {selectedStudent
                      ? `${selectedStudent.lastName}, ${selectedStudent.firstName}`
                      : "Select student"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search student..." />
                    <CommandList>
                      <CommandEmpty>No student found.</CommandEmpty>
                      {students?.map((student) => (
                        <CommandItem
                          key={student.userId}
                          onSelect={() => {
                            setValue("studentId", String(student.userId), {
                              shouldValidate: true,
                            });
                            setSelectedStudent(student);
                          }}
                        >
                          {student.lastName}, {student.firstName}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {errors.studentId && (
                <p className="text-sm text-red-500">
                  {errors.studentId.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Department</Label>
              <Select
                value={departmentId || ""}
                onValueChange={(value) =>
                  setValue("departmentId", value, { shouldValidate: true })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select department" />
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
              {errors.departmentId && (
                <p className="text-sm text-red-500">
                  {errors.departmentId.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Subject</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {selectedSubject
                      ? `${selectedSubject.code} - ${selectedSubject.subjectName}`
                      : "Select subject"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search subject..." />
                    <CommandList>
                      <CommandEmpty>No subjects found.</CommandEmpty>
                      {subjects?.map((subject) => (
                        <CommandItem
                          key={subject.subjectId}
                          onSelect={() => {
                            setValue("subjectId", String(subject.subjectId), {
                              shouldValidate: true,
                            });
                            setSelectedSubject(subject);
                          }}
                        >
                          {subject.code} - {subject.subjectName}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {errors.subjectId && (
                <p className="text-sm text-red-500">
                  {errors.subjectId.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Year Level</Label>
              <Input
                type="number"
                placeholder="Enter year level"
                min={1}
                max={4}
                {...register("yearLevel")}
              />
              {errors.yearLevel && (
                <p className="text-sm text-red-500">
                  {errors.yearLevel.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>School Year</Label>
              <Select
                value={schoolYearId || ""}
                onValueChange={(value) =>
                  setValue("schoolYearId", value, { shouldValidate: true })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {schoolYear?.map((sy) => (
                    <SelectItem
                      key={sy.schoolYearId}
                      value={String(sy.schoolYearId)}
                    >
                      {sy.schoolYearName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.schoolYearId && (
                <p className="text-sm text-red-500">
                  {errors.schoolYearId.message}
                </p>
              )}
            </div>
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default InsertStudentSubjectForm;
