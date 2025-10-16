import { getDelegates } from "@/actions/admin";
import { DelegatesTable } from "@/components/delegates-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function DelegatesPage() {
  const delegates = await getDelegates();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Delegates
        </h2>
        <p className="text-muted-foreground mt-1">
          Manage all delegates and their supervisors
        </p>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">All Delegates</CardTitle>
          <CardDescription className="text-muted-foreground">
            Complete list of delegates with their contact information and
            supervisors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DelegatesTable delegates={delegates} />
        </CardContent>
      </Card>
    </div>
  );
}
