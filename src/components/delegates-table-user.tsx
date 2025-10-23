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
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteDelegate } from "@/actions/delegate-actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Delegate = {
  formSubmissionCode: string;
  name: string;
  email: string;
  phone: string;
  county: string;
  department: string;
  hasForm: boolean;
  formCompleted?: boolean;
};

export function DelegatesTable({ delegates }: { delegates: Delegate[] }) {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDelegate, setSelectedDelegate] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!selectedDelegate) return;

    setIsDeleting(true);
    try {
      await deleteDelegate(selectedDelegate);
      setDeleteDialogOpen(false);
      setSelectedDelegate(null);
      router.refresh();
    } catch (error) {
      console.error("Error deleting delegate:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="rounded-md border border-border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-muted/50">
              <TableHead className="text-muted-foreground">Name</TableHead>
              <TableHead className="text-muted-foreground">Email</TableHead>
              <TableHead className="text-muted-foreground">Phone</TableHead>
              <TableHead className="text-muted-foreground">
                Department
              </TableHead>
              <TableHead className="text-muted-foreground">County</TableHead>
              <TableHead className="text-muted-foreground">
                Form Status
              </TableHead>
              <TableHead className="text-muted-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {delegates.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-muted-foreground py-8"
                >
                  No delegates found. Create your first delegate to get started.
                </TableCell>
              </TableRow>
            ) : (
              delegates.map((delegate) => (
                <TableRow
                  key={delegate.formSubmissionCode}
                  className="hover:bg-muted/50"
                >
                  <TableCell className="font-medium text-foreground">
                    <Link
                      href={`/dashboard/delegates/${delegate.formSubmissionCode}`}
                      className="hover:underline"
                    >
                      {delegate.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    <Link
                      href={`/dashboard/delegates/${delegate.formSubmissionCode}`}
                      className="hover:underline"
                    >
                      {delegate.email}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    <Link
                      href={`/dashboard/delegates/${delegate.formSubmissionCode}`}
                      className="hover:underline"
                    >
                      {delegate.phone}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/dashboard/delegates/${delegate.formSubmissionCode}`}
                    >
                      <Badge
                        variant="outline"
                        className="text-foreground border-border"
                      >
                        {delegate.department}
                      </Badge>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/dashboard/delegates/${delegate.formSubmissionCode}`}
                    >
                      <Badge variant="secondary" className="capitalize">
                        {delegate.county}
                      </Badge>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/dashboard/delegates/${delegate.formSubmissionCode}`}
                    >
                      {delegate.hasForm ? (
                        <Badge
                          variant={
                            delegate.formCompleted ? "default" : "secondary"
                          }
                        >
                          {delegate.formCompleted ? "Completed" : "In Progress"}
                        </Badge>
                      ) : (
                        <Badge variant="outline">No Form</Badge>
                      )}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDelegate(delegate.formSubmissionCode);
                        setDeleteDialogOpen(true);
                      }}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this delegate and their associated
              form submission. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
