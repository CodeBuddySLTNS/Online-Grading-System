import { Header } from "@/components/header";
import NavigateBack from "@/components/back";
import PendingCard from "@/components/registrar/pending-card";
import { useQuery } from "@tanstack/react-query";
import { coleAPI } from "@/lib/utils";

export default function PendingGrades() {
  const { data: grades } = useQuery({
    queryKey: ["excelGrades"],
    queryFn: coleAPI("/grades/excelgrades?pending=1"),
  });

  return (
    <div>
      <Header />
      <div className="min-h-screen p-4 bg-bac]">
        <NavigateBack />
        {grades?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {grades.map((grade, index) => (
              <PendingCard key={index} grade={grade} index={index} />
            ))}
          </div>
        ) : (
          <div className="min-h-[40vh] flex items-center justify-center text-muted-foreground">
            No pending grades at the moment.
          </div>
        )}
      </div>
    </div>
  );
}
