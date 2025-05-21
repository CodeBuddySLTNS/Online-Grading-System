import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { coleAPI } from "@/lib/utils";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { toast } from "sonner";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMainStore } from "@/states/store";

const schema = Joi.object({
  subjectId: Joi.string().label("Subject").required(),
});

export default function HandleNewSubject({ departmentId, year, sy }) {
  const user = useMainStore((state) => state.user);
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });

  const { data: departmentSubjects = [] } = useQuery({
    queryKey: ["departmentSubjects"],
    queryFn: coleAPI(
      `/subjects/departmentsubjects?departmentId=${departmentId}&yearLevel=${year}`
    ),
  });

  const { mutateAsync: handleSubject } = useMutation({
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
      queryClient.invalidateQueries(["subjects"]);
      setOpen(false);
    },
    onError: (e) => {
      toast("Error!", {
        description:
          e.response?.data?.message || "Unable to connect to the server.",
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
      const payload = {
        teacherId: user.userId,
        departmentId: Number(departmentId),
        yearLevel: Number(year),
        subjectId: Number(data.subjectId),
        schoolYearId: Number(sy),
      };

      await handleSubject(payload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="w-full md:w-auto shadow hover:shadow-md"
        >
          Handle new course
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Handle new subject</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="subjectId">Subject</Label>
            <Controller
              control={control}
              name="subjectId"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {departmentSubjects.map((subject) => (
                      <SelectItem
                        key={subject.subjectId}
                        value={subject.subjectId.toString()}
                      >
                        {subject.code} - {subject.subjectName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.subjectId && (
              <p className="text-sm text-red-500">{errors.subjectId.message}</p>
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
