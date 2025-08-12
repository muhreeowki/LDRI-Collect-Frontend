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
import { mockForms } from '@/lib/prisma';
import { getForms } from '@/actions/form-submissions';

export async function FormsTable() {
  // Simulate async operation
  const forms = await getForms();

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Form ID</TableHead>
            <TableHead>Delegate</TableHead>
            <TableHead>County</TableHead>
            <TableHead>Supervisor</TableHead>
            <TableHead>Section 1</TableHead>
            <TableHead>Section 2</TableHead>
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
              <TableCell>
                <Badge variant="outline">
                  {form.Q_1_1 === 'Yes' ? 'Complete' : 'Incomplete'}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline">
                  {form.Q_2_1 === 'Approved' ? 'Complete' : 'Incomplete'}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
