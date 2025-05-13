import React, { useEffect } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { coleAPI } from "@/lib/utils";

const StudentGrades = ({
  studentsGrades,
  sortConfig,
  handleSort,
  paginatedData,
  params,
  setData,
}) => {
  const { data: excelData, isPending } = useQuery({
    queryKey: ["excelData"],
    queryFn: coleAPI(`/grades/excelgrade` + params),
  });

  useEffect(() => {
    if (excelData && setData) {
      setData(excelData.data);
    }
  }, [excelData, setData]);

  useEffect(() => {
    return () => setData([]);
  }, []);

  return (
    <>
      {studentsGrades.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border">
          <Table className="min-w-full text-sm">
            <TableHeader>
              <TableRow>
                {studentsGrades[0]?.map((header, index) => (
                  <TableHead
                    key={index}
                    className={`whitespace-nowrap ${
                      index > 0 && "text-center"
                    } cursor-pointer`}
                    onClick={() => handleSort(index)}
                  >
                    {header}
                    {sortConfig.key === index && (
                      <span>
                        {sortConfig.direction === "ascending" ? " 🔼" : " 🔽"}
                      </span>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  className="hover:bg-muted transition-colors"
                >
                  {row.map((cell, cellIndex) => (
                    <TableCell
                      key={cellIndex}
                      className={cellIndex === 0 ? "" : "text-center"}
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : isPending ? (
        <div>loading</div>
      ) : (
        <div className="h-28 flex justify-center items-center rounded-lg border">
          <p className="text-center text-muted-foreground">
            No grades to load.
          </p>
        </div>
      )}
    </>
  );
};

export default StudentGrades;
