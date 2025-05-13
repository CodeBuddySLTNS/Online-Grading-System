import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <AlertTriangle className="text-red-500 w-16 h-16 mb-1" />
      <h1 className="text-3xl font-bold text-primary mb-2">
        404 - Page Not Found
      </h1>
      <p className="text-muted-foreground mb-6">
        Sorry, the page you're looking for doesn’t exist or has been moved.
      </p>
      <Button onClick={() => navigate("/")} className="px-6 py-2">
        Go to Home
      </Button>
    </div>
  );
}
