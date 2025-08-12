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
import { Eye, Edit } from 'lucide-react';
import { mockUsers } from '@/lib/prisma';
import { getUsers, validateUser } from '@/actions/users';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export async function UsersTable() {
  // Simulate async operation
  const res = await getUsers();
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
                <Dialog>
                  <form>
                    {user.valid ? (
                      <Badge variant="default" className="cursor-default">
                        Valid
                      </Badge>
                    ) : (
                      <DialogTrigger asChild>
                        <Badge variant="secondary" className="cursor-pointer">
                          Pending
                        </Badge>
                      </DialogTrigger>
                    )}
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Validate User</DialogTitle>
                        <DialogDescription>
                          {' '}
                          Are you sure you want to validate this user?
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild>
                          <div className="flex flex-row gap-4 justify-between w-full">
                            <Button variant="outline">Cancel</Button>
                            <form action={validateUser}>
                              <input type="hidden" name="id" value={user.id} />
                              <Button type="submit">Validate</Button>
                            </form>
                          </div>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </form>
                </Dialog>
              </TableCell>
              <TableCell>{user._count.Delegates}</TableCell>
              <TableCell>{user._count.FormSubmissions}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
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
