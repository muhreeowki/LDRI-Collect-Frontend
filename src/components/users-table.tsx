"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

type User = {
  id: number;
  name: string;
  email: string;
  county: string;
  department: string;
  position: string;
  valid: boolean;
};

export function UsersTable({ users }: { users: User[] }) {
  const router = useRouter();

  return (
    <div className="rounded-md border border-border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-muted/50">
            <TableHead className="text-muted-foreground">Name</TableHead>
            <TableHead className="text-muted-foreground">Email</TableHead>
            <TableHead className="text-muted-foreground">Department</TableHead>
            <TableHead className="text-muted-foreground">Position</TableHead>
            <TableHead className="text-muted-foreground">County</TableHead>
            <TableHead className="text-muted-foreground">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              className="hover:bg-muted/50 cursor-pointer"
              onClick={() => {
                user.valid
                  ? router.push(`/admin/users/${user.id}`)
                  : router.push(`/admin/validation`);
              }}
            >
              <TableCell className="font-medium text-foreground">
                {user.name}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {user.email}
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="text-foreground border-border"
                >
                  {user.department}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {user.position}
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className="capitalize">
                  {user.county}
                </Badge>
              </TableCell>
              <TableCell>
                {user.valid ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-foreground">Validated</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-red-500">Pending</span>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
