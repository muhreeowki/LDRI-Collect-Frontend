import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users } from "lucide-react";
import CreateDelegateDialog from "@/components/create-delegate-dialog";
import { getUsersDelegates } from "@/actions/delegate-actions";
import { DelegatesTable } from "@/components/delegates-table-user";

export default async function UserDelegatesPage() {
  // In a real app, you'd get the user ID from the session/auth
  const { delegates } = await getUsersDelegates();

  if (delegates.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            My Delegates
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage your delegates and their form submissions
          </p>
        </div>

        <Card className="border-border bg-card">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="rounded-full bg-muted p-6 mb-4">
              <Users className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No Delegates Yet
            </h3>
            <p className="text-muted-foreground text-center mb-6 max-w-md">
              You haven't added any delegates yet. Create your first delegate to
              start collecting form submissions.
            </p>
            <CreateDelegateDialog />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            My Delegates
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage your delegates and their form submissions
          </p>
        </div>
        <CreateDelegateDialog />
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">All Delegates</CardTitle>
          <CardDescription className="text-muted-foreground">
            View and manage all delegates under your supervision
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DelegatesTable delegates={delegates} />
        </CardContent>
      </Card>
    </div>
  );
}
