"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

export function SchoolYearList({ schoolYears = [], onSelect }) {
  return (
    <Card className="w-full max-w-3xl mx-auto mt-4 shadow-lg rounded-xl">
      <CardHeader className="flex items-center gap-2">
        <Calendar className="w-5 h-5 text-primary" />
        <CardTitle>Select a School Year</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          {schoolYears.length > 0 ? (
            schoolYears.map((sy) => (
              <Button
                key={sy.schoolYearId}
                variant="outline"
                className="w-full text-lg font-semibold justify-start text-center px-4 py-6 hover:bg-secondary hover:text-primary hover:shadow transition"
                onClick={() => onSelect?.(sy)}
              >
                {sy.schoolYearName}
              </Button>
            ))
          ) : (
            <p className="text-muted-foreground text-center col-span-full">
              No school years available.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
