"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

// Sample data (can be passed as props)
const users = [
  {
    userId: 1,
    username: "renz",
    firstName: "renz",
    middleName: "",
    lastName: "cole",
    yearLevel: 2,
  },
  {
    userId: 2,
    username: "maria",
    firstName: "maria",
    middleName: "s.",
    lastName: "cruz",
    yearLevel: 1,
  },
  {
    userId: 3,
    username: "juan",
    firstName: "juan",
    middleName: "",
    lastName: "dela cruz",
    yearLevel: 3,
  },
  {
    userId: 4,
    username: "ana",
    firstName: "ana",
    middleName: "l.",
    lastName: "reyes",
    yearLevel: 4,
  },
  {
    userId: 5,
    username: "peter",
    firstName: "peter",
    middleName: "b.",
    lastName: "parker",
    yearLevel: 2,
  },
  {
    userId: 6,
    username: "clark",
    firstName: "clark",
    middleName: "j.",
    lastName: "kent",
    yearLevel: 1,
  },
  {
    userId: 7,
    username: "bruce",
    firstName: "bruce",
    middleName: "w.",
    lastName: "wayne",
    yearLevel: 4,
  },
  // Add more data for testing
];

const yearLevelText = (year) => {
  switch (year) {
    case 1:
      return "1st Year";
    case 2:
      return "2nd Year";
    case 3:
      return "3rd Year";
    case 4:
      return "4th Year";
    default:
      return "Unknown";
  }
};

export function UsersTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // number of items per page
  const totalPages = Math.ceil(users.length / pageSize);

  const paginatedUsers = users.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <Card className="max-w-4xl mx-auto shadow-lg rounded-2xl">
      <CardHeader className="flex items-center gap-2">
        <User className="w-5 h-5 text-primary" />
        <CardTitle>Users List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Year Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => (
                  <TableRow key={user.userId}>
                    <TableCell>{user.userId}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>
                      {`${user.firstName} ${user.middleName} ${user.lastName}`.trim()}
                    </TableCell>
                    <TableCell>{yearLevelText(user.yearLevel)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-muted-foreground"
                  >
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination controls */}
        <div className="flex justify-between items-center mt-4">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
