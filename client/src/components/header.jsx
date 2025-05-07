import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useMainStore } from "@/states/store";
import { LogOut } from "lucide-react";

export function Header() {
  const user = useMainStore((state) => state.user);

  const handleLogout = () => {
    useMainStore.getState().setUser({});
    useMainStore.getState().setIsLoggedIn(false);
    useMainStore.getState().setIsLoading(true);
    localStorage.removeItem("token");
    setTimeout(() => {
      useMainStore.getState().setIsLoading(false);
    }, 1000);
  };

  const getInitials = (firstName, lastName) => {
    const f = firstName ? firstName[0] : "";
    const l = lastName ? lastName[0] : "";
    return (f + l).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-background shadow-md border-b">
      <div className="flex items-center gap-3">
        <Avatar className="w-10 h-10">
          <AvatarFallback>
            {getInitials(user.firstName, user.lastName) || "U"}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold tracking-tight text-primary">
          Online Grading System
        </h1>
      </div>
      <nav className="flex items-center gap-3 flex-wrap">
        <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
          {`${user.firstName || ""} ${user.lastName || ""}`}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="text-sm font-medium hover:text-destructive hover:border-destructive"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </nav>
    </header>
  );
}
