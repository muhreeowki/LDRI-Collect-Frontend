import { getPendingUsers } from "@/actions/admin";
import { UserValidationTable } from "@/components/user-validation-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function UserValidationPage() {
  const pendingUsers = await getPendingUsers();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            User Validation
          </h2>
          <p className="text-muted-foreground mt-1">
            Review and validate new user signups
          </p>
        </div>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          {pendingUsers.length} Pending
        </Badge>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">
            Pending User Signups
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Review user information and authorization forms before validating
            accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserValidationTable users={pendingUsers} />
        </CardContent>
      </Card>
    </div>
  );
}
