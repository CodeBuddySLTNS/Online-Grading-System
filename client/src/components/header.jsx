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
    <header className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-b">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold">Online Grading System</h1>
      </div>
      <div className="flex items-center gap-4 flex-wrap">
        <Button variant="ghost" size="sm">
          Dashboard
        </Button>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          Logout
        </Button>
        <Avatar className="w-8 h-8">
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
