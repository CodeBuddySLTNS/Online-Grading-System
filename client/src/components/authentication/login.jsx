import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-slate-100 px-4">
      <Card className="max-w-md w-full shadow-xl rounded-2xl gap-2">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="email">Username</Label>
              <Input id="email" type="text" placeholder="Enter your username" />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <Button type="submit" className="w-full mt-2">
              Login
            </Button>
          </form>
          <p className="text-sm text-center text-gray-500 mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 underline">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
