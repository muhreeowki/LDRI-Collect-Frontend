"use client";

import { useState } from "react";
import { validateUser, rejectUser } from "@/actions/admin";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CheckCircle, XCircle, ExternalLink, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  nationalId: string;
  county: string;
  position: string;
  department: string;
  sex: string;
  authorizationFormLink: string;
  valid: boolean;
};

export function UserValidationTable({ users }: { users: User[] }) {
  const [loading, setLoading] = useState<number | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const handleValidate = async (userId: number) => {
    setLoading(userId);
    try {
      const result = await validateUser(userId);
      toast({
        title: "Success",
        description: result.message,
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to validate user",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  const handleReject = async (userId: number) => {
    setLoading(userId);
    try {
      const result = await rejectUser(userId);
      toast({
        title: "Success",
        description: result.message,
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject user",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold text-foreground">
          All caught up!
        </h3>
        <p className="text-muted-foreground">No pending user validations</p>
      </div>
    );
  }

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
            <TableHead className="text-muted-foreground">Details</TableHead>
            <TableHead className="text-right text-muted-foreground">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="hover:bg-muted/50">
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card border-border max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-foreground">
                        User Details
                      </DialogTitle>
                      <DialogDescription className="text-muted-foreground">
                        Complete information for {user.name}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4 py-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Full Name
                        </p>
                        <p className="text-foreground">{user.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Email
                        </p>
                        <p className="text-foreground">{user.email}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Phone
                        </p>
                        <p className="text-foreground">{user.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          National ID
                        </p>
                        <p className="text-foreground">{user.nationalId}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Sex
                        </p>
                        <p className="text-foreground capitalize">{user.sex}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          County
                        </p>
                        <p className="text-foreground capitalize">
                          {user.county}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Department
                        </p>
                        <p className="text-foreground">{user.department}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Position
                        </p>
                        <p className="text-foreground">{user.position}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm font-medium text-muted-foreground mb-2">
                          Authorization Form
                        </p>
                        <a
                          href={user.authorizationFormLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary hover:underline"
                        >
                          View Document
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleValidate(user.id)}
                    disabled={loading === user.id}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Validate
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleReject(user.id)}
                    disabled={loading === user.id}
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Reject
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
