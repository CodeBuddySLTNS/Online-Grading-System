import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Menu } from "lucide-react";

export function Header() {
  return (
    <header className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-b">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold">Online Grading System</h1>
      </div>
      <div className="flex items-center gap-4 flex-wrap">
        <Button variant="ghost" size="sm">
          Dashboard
        </Button>
        <Button variant="ghost" size="sm">
          Logout
        </Button>
        <Avatar className="w-8 h-8">
          <AvatarFallback>TS</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
