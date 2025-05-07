import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useMainStore } from "@/states/store";

export function Header() {
  const handleLogout = () => {
    useMainStore.getState().setUser({});
    useMainStore.getState().setIsLoggedIn(false);
    useMainStore.getState().setIsLoading(true);
    localStorage.removeItem("token");
    setTimeout(() => {
      useMainStore.getState().setIsLoading(false);
    }, 1000);
  };

  return (
    <header className="sticky top-0 z-50 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-background shadow-md border-b">
      <div className="flex items-center gap-3">
        <Avatar className="w-10 h-10">
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold tracking-tight text-primary">
          Online Grading System
        </h1>
      </div>
      <nav className="flex items-center gap-2 flex-wrap">
        <Button
          variant="ghost"
          className="text-sm font-medium hover:text-primary-foreground hover:bg-primary"
        >
          Dashboard
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="text-sm font-medium hover:text-destructive hover:border-destructive"
        >
          Logout
        </Button>
      </nav>
    </header>
  );
}
