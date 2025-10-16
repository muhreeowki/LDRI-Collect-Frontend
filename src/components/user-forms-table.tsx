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
import { useRouter } from "next/navigation";

type Form = {
  id: string;
  submissionDate: Date;
  completed: boolean;
  totalScore: number;
  section1Score: number;
  section2Score: number;
  section3Score: number;
  section4Score: number;
  section5Score: number;
  delegate: {
    name: string;
    email: string;
    county: string;
    department: string;
  };
};

export function UserFormsTable({ forms }: { forms: Form[] }) {
  const router = useRouter();

  return (
    <div className="rounded-md border border-border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-muted/50">
            <TableHead className="text-muted-foreground">Delegate</TableHead>
            <TableHead className="text-muted-foreground">Department</TableHead>
            <TableHead className="text-muted-foreground">County</TableHead>
            <TableHead className="text-muted-foreground">
              Submission Date
            </TableHead>
            <TableHead className="text-muted-foreground">Status</TableHead>
            <TableHead className="text-muted-foreground">Total Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {forms.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center text-muted-foreground py-8"
              >
                No form submissions yet.
              </TableCell>
            </TableRow>
          ) : (
            forms.map((form) => (
              <TableRow
                key={form.id}
                className="hover:bg-muted/50 cursor-pointer"
                onClick={() => router.push(`/dashboard/forms/${form.id}`)}
              >
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">
                      {form.delegate ? form.delegate.name : "N/A"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {form.delegate ? form.delegate.email : "N/A"}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="text-foreground border-border"
                  >
                    {form.delegate ? form.delegate.department : "N/A"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="capitalize">
                    {form.delegate ? form.delegate.county : "N/A"}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(form.submissionDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge variant={form.completed ? "default" : "secondary"}>
                    {form.completed ? "Completed" : "In Progress"}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium text-foreground">
                  {form.totalScore}%
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
