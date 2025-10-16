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
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

type FormSubmission = {
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
  User: {
    name: string;
    email: string;
  };
};

export function FormSubmissionsTable({ forms }: { forms: FormSubmission[] }) {
  const router = useRouter();

  return (
    <div className="rounded-md border border-border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-muted/50">
            <TableHead className="text-muted-foreground">Delegate</TableHead>
            <TableHead className="text-muted-foreground">Supervisor</TableHead>
            <TableHead className="text-muted-foreground">Department</TableHead>
            <TableHead className="text-muted-foreground">
              Submission Date
            </TableHead>
            <TableHead className="text-muted-foreground">Status</TableHead>
            <TableHead className="text-muted-foreground">Total Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {forms.map((form) => (
            <TableRow
              key={form.id}
              className="hover:bg-muted/50 cursor-pointer"
              onClick={() => router.push(`/admin/forms/${form.id}`)}
            >
              <TableCell>
                <div>
                  <p className="font-medium text-foreground">
                    {form.delegate.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {form.delegate.email}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium text-foreground">
                    {form.User.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {form.User.email}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="text-foreground border-border"
                >
                  {form.delegate.department}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {format(form.submissionDate, "MMM dd, yyyy")}
              </TableCell>
              <TableCell>
                {form.completed ? (
                  <Badge className="bg-primary text-primary-foreground">
                    Completed
                  </Badge>
                ) : (
                  <Badge variant="secondary">In Progress</Badge>
                )}
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-lg font-bold text-foreground">
                      {form.totalScore}
                    </span>
                    <span className="text-sm text-muted-foreground">/ 100</span>
                  </div>
                  <Progress value={form.totalScore} className="h-2" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
