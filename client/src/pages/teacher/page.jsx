import { Header } from "@/components/header";
import DepartmentsPage from "@/components/teacher/departments";
import DepartmentWithYears from "@/components/teacher/departments-with-years";

export default function TeachersPage() {
  return (
    <div className="">
      <Header />
      <DepartmentsPage />
    </div>
  );
}
