import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-slate-100 px-4">
      <Card className="max-w-xl w-full shadow-xl rounded-2xl gap-4">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Sign Up
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col gap-1">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" type="text" placeholder="First" />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="middleName">Middle Name</Label>
                <Input id="middleName" type="text" placeholder="Middle" />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" type="text" placeholder="Last" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <Label htmlFor="department">Department</Label>
                <Input id="department" type="text" placeholder="Department" />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="year">Year</Label>
                <Input id="year" type="text" placeholder="Year" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" type="text" placeholder="Username" />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full mt-2">
              Sign Up
            </Button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 underline">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
