import { getUserForms } from "@/actions/forms";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserFormsTable } from "@/components/user-forms-table";

export default async function UserFormsPage() {
  // In a real app, you'd get the user ID from the session/auth
  const { forms, success, message } = await getUserForms();
  if (!success) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            My Form Submissions
          </h2>
          <p className="text-muted-foreground mt-1">
            View all form submissions from your delegates
          </p>
        </div>
        <Card className="border-border bg-card">
          <CardContent className="p-6 text-center text-red-600">
            {message || "Failed to load form submissions."}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          My Form Submissions
        </h2>
        <p className="text-muted-foreground mt-1">
          View all form submissions from your delegates
        </p>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">
            All Form Submissions
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Track the progress and scores of all forms submitted by your
            delegates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserFormsTable forms={forms} />
        </CardContent>
      </Card>
    </div>
  );
}
