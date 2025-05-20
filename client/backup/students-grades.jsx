import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { coleAPI } from "@/lib/utils";
import { Input } from "../ui/input";
import { useState } from "react";
import { Check, X } from "lucide-react";
import { useMainStore } from "@/states/store";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import NavigateBack from "@/components/back";
import { toast } from "sonner";

const StudentsGrades = ({
  setSubject,
  subject,
  departmentId,
  year,
  sy,
  departmentShortName,
}) => {
  const queryClient = useQueryClient();
  const user = useMainStore((state) => state.user);
  const [submitted, setSubmitted] = useState(false);
  const [edit, setEdit] = useState({
    studentId: "",
    prelim: "",
    midterm: "",
    semifinal: "",
    final: "",
  });

  const { data: students } = useQuery({
    queryKey: ["students"],
    queryFn: coleAPI(
      `/students/withgrades?departmentId=${departmentId}&yearLevel=${year}&subjectId=${subject.subjectId}&schoolYearId=${sy}&teacherId=${user.userId}`
    ),
  });

  const { mutateAsync: saveGrade } = useMutation({
    mutationFn: coleAPI("/grades/add", "POST"),
    onSuccess: () => {
      queryClient.invalidateQueries(["students"]);
      setEdit({
        studentId: "",
        prelim: "",
        midterm: "",
        semifinal: "",
        final: "",
      });
      setSubmitted(false);
    },
  });

  const { mutateAsync: submitGrades } = useMutation({
    mutationFn: coleAPI("/grades/submit", "POST"),
    onSuccess: (data) => {
      toast("Success!", {
        description:
          data?.changedRows === 0
            ? "Grades already submitted."
            : "Grades submitted successfully and waiting for approval.",
        style: {
          fontSize: "1rem",
          backgroundColor: "#d4edda",
          color: "#155724",
        },
      });
      setSubmitted(true);
    },
    onError: (e) => {
      if (e.response?.data?.message) {
        toast("Error!", {
          description: e.response?.data?.message,
          style: {
            fontSize: "1rem",
            backgroundColor: "#f8d7da",
            color: "#721c24",
          },
        });
      } else {
        toast("Error!", {
          description: "Unable to connect to the server.",
          style: {
            fontSize: "1rem",
            backgroundColor: "#f8d7da",
            color: "#721c24",
          },
        });
      }
    },
  });

  const handleRowClick = (student) => {
    if (student.studentId !== edit.studentId) {
      setEdit({
        studentId: student.studentId,
        prelim: student.prelim,
        midterm: student.midterm,
        semifinal: student.semifinal,
        final: student.final,
      });
    }
  };

  const getAverage = () => {
    return (
      (Number(edit.prelim) +
        Number(edit.midterm) +
        Number(edit.semifinal) +
        Number(edit.final)) /
      4
    ).toFixed(1);
  };

  const handleSubmitGrades = async () => {
    const body = {
      teacherId: user.userId,
      departmentId: Number(departmentId),
      yearLevel: Number(year),
      subjectId: subject.subjectId,
      schoolYearId: Number(sy),
    };

    try {
      await submitGrades(body);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveChanges = async () => {
    const average = getAverage();
    const body = {
      studentId: edit.studentId,
      teacherId: user.userId,
      departmentId: Number(departmentId),
      yearLevel: Number(year),
      subjectId: subject.subjectId,
      schoolYearId: Number(sy),
      prelim: Number(edit.prelim),
      midterm: Number(edit.midterm),
      semifinal: Number(edit.semifinal),
      final: Number(edit.final),
      average: average,
    };

    try {
      await saveGrade(body);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDiscardChanges = (student) => {
    if (student.studentId !== edit.studentId) {
      setEdit({
        studentId: "",
        prelim: "",
        midterm: "",
        semifinal: "",
        final: "",
      });
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <NavigateBack onBackFn={() => setSubject("")} />
      <Card className="w-full max-w-5xl shadow-lg rounded-2xl gap-4">
        <CardHeader className="flex justify-between">
          <div className="flex items-center gap-2">
            <User className="w-6 h-6 text-primary" />
            <div>
              <h1 className="text-lg md:text-xl font-semibold">
                Students Grades ({departmentShortName}-{year})
              </h1>
              <p className="text-sm">
                {subject.subjectName} |{" "}
                {subject.semester == 1 ? "1st semester" : "2nd semester"}
              </p>
            </div>
          </div>
          <Button disabled={submitted} onClick={handleSubmitGrades}>
            Submit Grades
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <p>Name</p>
                </TableHead>
                <TableHead>
                  <p className="text-center">Prelim</p>
                </TableHead>
                <TableHead>
                  <p className="text-center">Midterm</p>
                </TableHead>
                <TableHead>
                  <p className="text-center">Semifinal</p>
                </TableHead>
                <TableHead>
                  <p className="text-center">Final</p>
                </TableHead>
                <TableHead>
                  <p className="text-center">Average</p>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students?.length > 0 ? (
                students.map((student, index) => (
                  <TableRow
                    key={index}
                    className="cursor-pointer"
                    onClick={() => handleRowClick(student)}
                  >
                    <TableCell>
                      {student.lastName}, {student.firstName}
                    </TableCell>
                    <TableCell>
                      {student.studentId === edit.studentId ? (
                        <Input
                          value={edit.prelim || ""}
                          className="w-full disabled:text-black disabled:opacity-100"
                          type="number"
                          min={1}
                          max={5}
                          onChange={(e) =>
                            setEdit((prev) => ({
                              ...prev,
                              prelim: e.target.value,
                            }))
                          }
                        />
                      ) : (
                        <p className="text-center">{student.prelim || "0.0"}</p>
                      )}
                    </TableCell>

                    <TableCell>
                      {student.studentId === edit.studentId ? (
                        <Input
                          value={edit.midterm || ""}
                          className="w-full disabled:text-black disabled:opacity-100"
                          type="number"
                          min={1}
                          max={5}
                          onChange={(e) =>
                            setEdit((prev) => ({
                              ...prev,
                              midterm: e.target.value,
                            }))
                          }
                        />
                      ) : (
                        <p className="text-center">
                          {student.midterm || "0.0"}
                        </p>
                      )}
                    </TableCell>

                    <TableCell>
                      {student.studentId === edit.studentId ? (
                        <Input
                          value={edit.semifinal || ""}
                          className="w-full disabled:text-black disabled:opacity-100"
                          type="number"
                          min={1}
                          max={5}
                          onChange={(e) =>
                            setEdit((prev) => ({
                              ...prev,
                              semifinal: e.target.value,
                            }))
                          }
                        />
                      ) : (
                        <p className="text-center">
                          {student.semifinal || "0.0"}
                        </p>
                      )}
                    </TableCell>

                    <TableCell>
                      {student.studentId === edit.studentId ? (
                        <Input
                          value={edit.final || ""}
                          className="w-full disabled:text-black disabled:opacity-100"
                          type="number"
                          min={1}
                          max={5}
                          onChange={(e) =>
                            setEdit((prev) => ({
                              ...prev,
                              final: e.target.value,
                            }))
                          }
                        />
                      ) : (
                        <p className="text-center">{student.final || "0.0"}</p>
                      )}
                    </TableCell>

                    <TableCell className="text-center">
                      {student.studentId === edit.studentId
                        ? getAverage()
                        : student.average || "0.0"}
                    </TableCell>

                    {edit.studentId === student.studentId && (
                      <TableCell className="w-3 mx-0 px-0">
                        <div className="flex gap-2">
                          <Check
                            className="w-4.5 text-green-700"
                            onClick={handleSaveChanges}
                          />
                          <X
                            className="w-4.5 text-red-700"
                            onClick={handleDiscardChanges}
                          />
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell>No students</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentsGrades;
