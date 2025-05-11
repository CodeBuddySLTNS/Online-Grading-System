import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { coleAPI } from "@/lib/utils";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { toast } from "sonner";
import { useState } from "react";

const schema = Joi.object({
  schoolYearName: Joi.string().label("School Year").required(),
});

export default function AddSchoolYearDialog() {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: joiResolver(schema),
  });

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
      setOpen(false);
    },
    onError: (e) => {
      const description =
        e?.response?.data?.message || "Unable to connect to the server.";
      toast("Error!", {
        description,
        style: {
          fontSize: "1rem",
          backgroundColor: "#f8d7da",
          color: "#721c24",
        },
      });
    },
  });

  const onSubmit = async (data) => {
    try {
      await addSchoolYear(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add School Year</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Add New School Year</DialogTitle>
          <DialogDescription className="text-center">
            This will be used across student records and reporting.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="schoolYearName">School Year</Label>
            <Input
              id="schoolYearName"
              {...register("schoolYearName")}
              placeholder="S.Y. 2024-2025"
            />
            {errors.schoolYearName && (
              <p className="text-sm text-red-500">
                {errors.schoolYearName.message}
              </p>
            )}
          </div>
          <div className="flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
