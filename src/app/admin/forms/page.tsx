import { getForms } from "@/actions/admin";
import { FormSubmissionsTable } from "@/components/form-submissions-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function FormSubmissionsPage() {
  const forms = await getForms();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Form Submissions
        </h2>
        <p className="text-muted-foreground mt-1">
          View and analyze all form submissions
        </p>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">All Submissions</CardTitle>
          <CardDescription className="text-muted-foreground">
            Complete list of form submissions with scores and status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormSubmissionsTable forms={forms} />
        </CardContent>
      </Card>
    </div>
  );
}
