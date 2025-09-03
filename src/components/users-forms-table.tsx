import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Download } from 'lucide-react';
import { getAllForms, getUserForms } from '@/actions/forms';

export async function UsersFormsTable() {
  // Simulate async operation
  const resp = await getUserForms();
  if ((resp as any)?.success === false) {
    return (
      <div className="rounded-md border p-4 text-sm text-muted-foreground">
        Failed to load forms.
      </div>
    );
  }
  const forms = resp.forms;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>FormID</TableHead>
            <TableHead>Delegate</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Score</TableHead>
            <TableHead></TableHead>
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
              <TableCell>{form.delegate.department}</TableCell>
              <TableCell className="font-bold">{form.totalScore}</TableCell>
              <TableCell className="w-0">
                <div className="flex justify-end">
                  <form action={`/dashboard/submissions/${form.id}`}>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
