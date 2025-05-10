import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { coleAPI } from "@/lib/utils";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { toast } from "sonner";

const schema = Joi.object({
  schoolYearName: Joi.string().label("School Year").required(),
});

const AddSchoolYear = () => {
  const { mutateAsync: addSchoolYear } = useMutation({
    mutationFn: coleAPI("/registrar/addsy", "POST"),
    onSuccess: () => {
      toast("Success!", {
        description: "School Year added successfully.",
        style: {
          fontSize: "1rem",
          backgroundColor: "#d4edda",
          color: "#155724",
        },
      });
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
      await addSchoolYear(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="w-full md:w-[60%]  mx-auto shadow-lg rounded-2xl gap-3">
      <CardHeader>
        <h2 className="text-xl font-bold">Add New School Year</h2>
      </CardHeader>
      <CardContent className="h-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-full flex flex-col gap-6"
        >
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="schoolYearName">School Year</Label>
              <Input
                id="schoolYearName"
                {...register("schoolYearName")}
                placeholder="S.Y. 2024-2025"
              />
              {errors.subjectName && (
                <p className="text-sm text-red-500">
                  {errors.schoolYearName.message}
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

export default AddSchoolYear;
