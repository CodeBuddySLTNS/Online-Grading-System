import React from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";

const InsertSubjectForm = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post("/api/subjects", data);
      alert("Subject inserted successfully!");
      reset();
    } catch (err) {
      console.error(err);
      alert("Error inserting subject");
    }
  };

  return (
    <Card className="w-full mx-auto shadow-lg rounded-2xl gap-3">
      <CardHeader>
        <h2 className="text-xl font-bold">Add New Subject</h2>
      </CardHeader>
      <CardContent className="h-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-full flex flex-col gap-4"
        >
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="code">Subject Code</Label>
              <Input id="code" {...register("code", { required: true })} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="subjectName">Subject Name</Label>
              <Input
                id="subjectName"
                {...register("subjectName", { required: true })}
              />
            </div>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default InsertSubjectForm;
