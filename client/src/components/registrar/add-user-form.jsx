import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { coleAPI } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Eye, EyeClosed } from "lucide-react";

const schema = Joi.object({
  firstName: Joi.string().required().label("First Name"),
  middleName: Joi.string().optional().allow("").label("Middle Name"),
  lastName: Joi.string().required().label("Last Name"),
  username: Joi.string().required().label("Username"),
  password: Joi.string().min(3).required().label("Password"),
  role: Joi.string()
    .valid("student", "teacher", "registrar", "admin")
    .required()
    .label("Role"),
});

export default function AddUserForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutateAsync: addUser, isPending } = useMutation({
    mutationFn: coleAPI("/registrar/adduser", "POST"),
    onSuccess: () => {
      toast("Success!", {
        description: "User added successfully.",
        style: {
          fontSize: "1rem",
          backgroundColor: "#d4edda",
          color: "#155724",
        },
      });
      reset();
    },
    onError: (e) => {
      toast("Error!", {
        description: e.response?.data?.message || "Unable to add user.",
        style: { backgroundColor: "#f8d7da", color: "#721c24" },
      });
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    watch,
  } = useForm({ resolver: joiResolver(schema) });

  const onSubmit = async (data) => {
    await addUser(data);
  };

  const roleValue = watch("role");

  return (
    <Card
      className="w-full"
      style={{ backgroundColor: "rgba(255,255,255,0.75)" }}
    >
      <CardHeader>
        <CardTitle>Add New User</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col gap-1">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" {...register("firstName")} />
              {errors.firstName && (
                <p className="text-red-500 text-xs">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="middleName">Middle Name</Label>
              <Input id="middleName" {...register("middleName")} />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" {...register("lastName")} />
              {errors.lastName && (
                <p className="text-red-500 text-xs">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="username">Username</Label>
            <Input id="username" {...register("username")} />
            {errors.username && (
              <p className="text-red-500 text-xs">{errors.username.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeClosed size={17} /> : <Eye size={17} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="role">Role</Label>
            <Select
              value={roleValue}
              onValueChange={(value) => setValue("role", value)}
            >
              <SelectTrigger id="role" className="w-full">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="teacher">Teacher</SelectItem>
                <SelectItem value="registrar">Registrar</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-red-500 text-xs">{errors.role.message}</p>
            )}
          </div>
          <Button type="submit" className="mt-2" asChild>
            <button disabled={isPending}>Add User</button>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
