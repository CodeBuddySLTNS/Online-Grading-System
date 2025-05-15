"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { FileText, FolderOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import InsertSubjectForm from "@/components/registrar/insert-subject-form";
import InsertDepartmentSubjectForm from "@/components/registrar/insert-department-subject-form";
import { Separator } from "@/components/ui/separator";
import AddSchoolYear from "@/components/registrar/add-school-year";
import InsertStudentSubjectForm from "@/components/registrar/insert-student-subject";

export function RegistrarDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8 mb-16">
        <div className="flex flex-wrap justify-between mb-6 gap-3">
          <div className="md:px-2">
            <h2 className="text-2xl font-bold tracking-tight text-primary">
              Welcome, Registrar!
            </h2>
            <p className="text-muted-foreground text-sm">
              Manage student records and approval requests below.
            </p>
          </div>
          <AddSchoolYear />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Card
            className="hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => navigate("/registrar/student-records")}
          >
            <CardHeader className="flex items-center gap-2">
              <FolderOpen className="w-6 h-6 text-primary" />
              <CardTitle>Student Records</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              View and manage enrolled students, their grades, and academic
              progress.
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => navigate("/registrar/waiting-for-approval")}
          >
            <CardHeader className="flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary" />
              <CardTitle>Waiting for Approval</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Review and approve grades submitted by teachers.
            </CardContent>
          </Card>
        </div>

        <Separator className="my-7" />

        <div className="w-full grid gap-6 md:grid-cols-2">
          <InsertSubjectForm />
          <InsertDepartmentSubjectForm />
          <InsertStudentSubjectForm />
        </div>
      </main>
    </div>
  );
}
