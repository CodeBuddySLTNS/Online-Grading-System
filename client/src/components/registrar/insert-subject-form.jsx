import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { coleAPI } from "@/lib/utils";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { toast } from "sonner";
import { BookOpen } from "lucide-react";

const schema = Joi.object({
  code: Joi.string().label("Subject Code").required(),
  subjectName: Joi.string().label("Subject Name").required(),
});

const InsertSubjectForm = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: addSubject } = useMutation({
    mutationFn: coleAPI("/subjects/add", "POST"),
    onSuccess: () => {
      toast("Success!", {
        description: "Subject added successfully.",
        style: {
          fontSize: "1rem",
          backgroundColor: "#d4edda",
          color: "#155724",
        },
      });
      queryClient.invalidateQueries(["subjects"]);
      reset();
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
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: joiResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await addSubject(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="w-full mx-auto shadow-lg rounded-2xl gap-3">
      <CardHeader>
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-primary" />
          <h2 className="text-lg font-bold">Add New Subject</h2>
        </div>
      </CardHeader>
      <CardContent className="h-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-full flex flex-col gap-4"
        >
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="code">Subject Code</Label>
              <Input
                id="code"
                {...register("code")}
                placeholder="Enter subject code"
              />
              {errors.code && (
                <p className="text-sm text-red-500">{errors.code.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="subjectName">Subject Name</Label>
              <Input
                id="subjectName"
                {...register("subjectName")}
                placeholder="Enter subject name"
              />
              {errors.subjectName && (
                <p className="text-sm text-red-500">
                  {errors.subjectName.message}
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

export default InsertSubjectForm;
