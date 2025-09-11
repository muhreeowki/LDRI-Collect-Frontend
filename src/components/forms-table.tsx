import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download } from "lucide-react";
import { getAllForms } from "@/actions/forms";
import Link from "next/link";

export async function FormsTable() {
  // Simulate async operation
  const forms = await getAllForms();
  if ((forms as any)?.success === false) {
    return (
      <div className="rounded-md border p-4 text-sm text-muted-foreground">
        Failed to load forms.
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Form ID</TableHead>
            <TableHead>Delegate</TableHead>
            <TableHead>County</TableHead>
            <TableHead>Supervisor</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {forms.map((form: any) => (
            <TableRow key={form.id}>
              <TableCell className="font-mono text-sm">
                {form.id.slice(0, 8)}...
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{form.delegate.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {form.delegate.email}
                  </div>
                </div>
              </TableCell>
              <TableCell className="capitalize">
                {form.delegate.county}
              </TableCell>
              <TableCell>
                {form.User ? (
                  <div>
                    <div className="font-medium">{form.User.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {form.User.email}
                    </div>
                  </div>
                ) : (
                  <Badge variant="secondary">No Supervisor</Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Link href={`/submissions/${form.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 bg-transparent"
                    >
                      <Eye className="h-4 w-4" />
                      View Submission
                    </Button>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
