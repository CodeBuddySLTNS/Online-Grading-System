"use client";

import NavigateBack from "@/components/back";
import { Header } from "@/components/header";
import { SchoolYearList } from "@/components/school-year";
import DepartmentsPage from "@/components/teacher/teacher-departments";
import { Button } from "@/components/ui/button";
import { coleAPI } from "@/lib/utils";
import { useMainStore } from "@/states/store";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function TeachersPortal() {
  const user = useMainStore((state) => state.user);
  const [sy, setSy] = useState("");
  const navigate = useNavigate();

  const { data: schoolYears } = useQuery({
    queryKey: ["schoolYears"],
    queryFn: coleAPI("/registrar/sy"),
  });

  return (
    <div className="min-h-screen ">
      <Header />

      <div className="px-4 md:px-20 py-8">
        {sy ? (
          <>
            <div className="mb-1 flex justify-between">
              <NavigateBack
                onBackFn={sy ? () => setSy("") : () => navigate(-1)}
              />
              <Link to={`/teacher/newdepartment/${sy}`}>
                <Button variant="secondary" className="shadow hover:shadow-lg">
                  Add New Department
                </Button>
              </Link>
            </div>

            <div className=" rounded-xl px-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-xl sm:text-2xl font-bold text-primary">
                  Departments You’re Handling
                </h1>
              </div>

              <div className="mt-6">
                <DepartmentsPage sy={sy} />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-full max-w-3xl mx-auto text-center my-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-primary">
                Hello, Teacher {user?.firstName}! 👋
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base mt-2">
                Kindly select a school year to view and manage your assigned
                departments.
              </p>
            </div>

            <SchoolYearList
              schoolYears={schoolYears}
              onSelect={(data) => setSy(data.schoolYearId)}
            />
          </>
        )}
      </div>
    </div>
  );
}
