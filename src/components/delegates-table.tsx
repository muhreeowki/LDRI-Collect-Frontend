import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

type Delegate = {
  formSubmissionCode: string
  name: string
  email: string
  phone: string
  county: string
  department: string
  supervisor: {
    name: string
    email: string
  }
}

export function DelegatesTable({ delegates }: { delegates: Delegate[] }) {
  return (
    <div className="rounded-md border border-border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-muted/50">
            <TableHead className="text-muted-foreground">Code</TableHead>
            <TableHead className="text-muted-foreground">Name</TableHead>
            <TableHead className="text-muted-foreground">Contact</TableHead>
            <TableHead className="text-muted-foreground">Department</TableHead>
            <TableHead className="text-muted-foreground">County</TableHead>
            <TableHead className="text-muted-foreground">Supervisor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {delegates.map((delegate) => (
            <TableRow key={delegate.formSubmissionCode} className="hover:bg-muted/50">
              <TableCell className="font-mono text-sm text-foreground">{delegate.formSubmissionCode}</TableCell>
              <TableCell className="font-medium text-foreground">{delegate.name}</TableCell>
              <TableCell>
                <div>
                  <p className="text-foreground">{delegate.email}</p>
                  <p className="text-sm text-muted-foreground">{delegate.phone}</p>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="text-foreground border-border">
                  {delegate.department}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className="capitalize">
                  {delegate.county}
                </Badge>
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium text-foreground">{delegate.supervisor.name}</p>
                  <p className="text-sm text-muted-foreground">{delegate.supervisor.email}</p>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
