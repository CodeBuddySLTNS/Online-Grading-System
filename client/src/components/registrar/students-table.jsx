import React, { useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function StudentsTable({ data = [], pageSize = 5 }) {
  const { department, yearLevel } = useLocation().state;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const headers = useMemo(
    () => (data.length > 0 ? Object.keys(data[0]) : []),
    [data]
  );

  const sortedRows = useMemo(() => {
    if (sortColumn === null) return data;
    return [...data].sort((a, b) => {
      const valA = a[headers[sortColumn]];
      const valB = b[headers[sortColumn]];

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, headers, sortColumn, sortOrder]);

  const totalPages = Math.ceil(sortedRows.length / pageSize);
  const paginatedRows = sortedRows.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSort = (index) => {
    if (sortColumn === index) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(index);
      setSortOrder("asc");
    }
  };

  return (
    <div className="space-y-4">
      {paginatedRows.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead onClick={() => handleSort(0)}>
                  <p className="flex items-center justify-center cursor-pointer select-none gap-0.5">
                    Name
                    {sortColumn === 0 &&
                      (sortOrder === "asc" ? (
                        <ChevronUp className="w-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5" />
                      ))}
                  </p>
                </TableHead>
                <TableHead>
                  <p className="flex items-center cursor-pointer select-none gap-0.5 justify-center">
                    Action
                  </p>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell className="text-center">
                    {row.lastName}, {row.firstName}
                  </TableCell>
                  <TableCell className="text-center">
                    <Link
                      to={`/registrar/student-records/${
                        department.shortName + yearLevel
                      }/${row.lastName}-${row.firstName}`}
                      state={{ student: row }}
                    >
                      <Button size="sm">View Grades</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="w-full h-36 border rounded-lg">
          <div className="w-full h-full flex justify-center items-center">
            <p className="text-sm text-muted-foreground">No data to load.</p>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center px-2">
        <Button
          variant="outline"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages || 1}
        </span>
        <Button
          variant="outline"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
