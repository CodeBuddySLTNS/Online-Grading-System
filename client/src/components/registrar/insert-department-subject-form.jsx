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
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { coleAPI } from "@/lib/utils";

const InsertDepartmentSubjectForm = () => {
  const { handleSubmit, setValue, reset } = useForm();

  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: coleAPI("/departments"),
  });

  const { data: subjects } = useQuery({
    queryKey: ["subjects"],
    queryFn: coleAPI("/subjects"),
  });

  const onSubmit = async (data) => {
    try {
      await axios.post("/api/departmentSubjects", data);
      alert("Association inserted successfully!");
      reset();
    } catch (err) {
      console.error(err);
      alert("Error inserting association");
    }
  };

  console.log(departments, subjects);

  return (
    <Card className="w-full mx-auto shadow-lg rounded-2xl gap-3">
      <CardHeader>
        <h2 className="text-xl font-bold">Assign Subject to Department</h2>
      </CardHeader>
      <CardContent className="h-full">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="grid gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>Department</Label>
              <Select
                onValueChange={(value) => setValue("departmentId", value)}
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
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Subject</Label>
              <Select onValueChange={(value) => setValue("subjectId", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects?.map((subject) => (
                    <SelectItem
                      key={subject.subjectId}
                      value={String(subject.subjectId)}
                    >
                      {subject.code} - {subject.subjectName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Semester</Label>
              <Select onValueChange={(value) => setValue("semester", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default InsertDepartmentSubjectForm;
