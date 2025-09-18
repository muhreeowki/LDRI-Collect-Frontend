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
import { Eye, Edit } from "lucide-react";
import { getUsers, validateUser } from "@/actions/users";
import { Input } from "./ui/input";

export async function UsersTable() {
  // Simulate async operation
  const res = await getUsers();
  if ((res as any)?.success === false) {
    return (
      <div className="rounded-md border p-4 text-sm text-muted-foreground">
        Failed to load users.
      </div>
    );
  }
  const users = res;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>County</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Delegates</TableHead>
            <TableHead>Forms</TableHead>
            <TableHead>Authorization</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: any) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="capitalize">{user.county}</TableCell>
              <TableCell>{user.department}</TableCell>
              <TableCell>
                {user.valid ? (
                  <Badge variant="default" className="cursor-default">
                    Valid
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="cursor-default">
                    Pending Validation
                  </Badge>
                )}
              </TableCell>
              <TableCell>{user._count.Delegates}</TableCell>
              <TableCell>{user._count.FormSubmissions}</TableCell>
              <TableCell>
                <a
                  href={user.authorizationFormLink}
                  target="_blank"
                  className="text-blue-400 hover:underline"
                >
                  View Document
                </a>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {!user.valid && (
                    <form action={validateUser}>
                      <Input type="hidden" name="id" value={user.id} />
                      <Button
                        size="sm"
                        className="bg-amber-300 hover:bg-amber-400"
                        type="submit"
                      >
                        Validate
                      </Button>
                    </form>
                  )}
                  {/* <Button variant="ghost" size="sm"> */}
                  {/*   <Eye className="h-4 w-4" /> */}
                  {/* </Button> */}
                  {/* <Button variant="ghost" size="sm"> */}
                  {/*   <Edit className="h-4 w-4" /> */}
                  {/* </Button> */}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
