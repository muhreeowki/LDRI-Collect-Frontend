import { getUsers } from "@/actions/admin";
import { UsersTable } from "@/components/users-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          All Users
        </h2>
        <p className="text-muted-foreground mt-1">
          View all validated users in the system
        </p>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Validated Users</CardTitle>
          <CardDescription className="text-muted-foreground">
            All users who have been validated and have access to the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UsersTable users={users} />
        </CardContent>
      </Card>
    </div>
  );
}
