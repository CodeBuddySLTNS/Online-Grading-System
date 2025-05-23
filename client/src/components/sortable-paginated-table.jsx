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

export function SortablePaginatedTable({
  data = [],
  pageSize = 5,
  isObjectData = false,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const headers = useMemo(() => {
    if (isObjectData && data.length > 0) {
      return Object.keys(data[0]);
    }
    return data[0] || [];
  }, [data, isObjectData]);

  const rows = useMemo(() => {
    if (isObjectData) {
      return data;
    }
    return data.slice(1);
  }, [data, isObjectData]);

  const sortedRows = useMemo(() => {
    if (sortColumn === null) return rows;
    return [...rows].sort((a, b) => {
      const valA = isObjectData ? a[headers[sortColumn]] : a[sortColumn];
      const valB = isObjectData ? b[headers[sortColumn]] : b[sortColumn];

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [rows, sortColumn, sortOrder, isObjectData, headers]);

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
                {headers.map((header, index) => (
                  <TableHead key={index} onClick={() => handleSort(index)}>
                    <p
                      className={`flex items-center cursor-pointer select-none gap-0.5 ${
                        index > 0 && "justify-center"
                      }`}
                    >
                      {header}
                      {sortColumn === index &&
                        (sortOrder === "asc" ? (
                          <ChevronUp className="w-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5" />
                        ))}
                    </p>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {headers.map((header, cellIndex) => (
                    <TableCell
                      key={cellIndex}
                      className={cellIndex > 0 && "text-center"}
                    >
                      {isObjectData ? row[header] : row[cellIndex]}
                    </TableCell>
                  ))}
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
