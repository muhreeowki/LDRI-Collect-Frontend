import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getDelegate } from "@/actions/delegate-actions";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Building2,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function DelegateDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { success, delegate, message } = await getDelegate(params.id);

  if (!success || !delegate) {
    console.error("Error fetching delegate:", message);
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/delegates" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Delegates
          </Link>
        </Button>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">{delegate.name}</h1>
        <p className="text-muted-foreground">
          Complete information about this delegate
        </p>
      </div>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>How to reach this delegate</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium text-foreground">{delegate.email}</p>
            </div>
          </div>
          <Separator />
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium text-foreground">{delegate.phone}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Work Information */}
      <Card>
        <CardHeader>
          <CardTitle>Work Information</CardTitle>
          <CardDescription>Department and location details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Building2 className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Department</p>
              <Badge variant="outline" className="mt-1">
                {delegate.department}
              </Badge>
            </div>
          </div>
          <Separator />
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">County</p>
              <Badge variant="secondary" className="mt-1 capitalize">
                {delegate.county}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Submission Status */}
      <Card>
        <CardHeader>
          <CardTitle>Form Submission</CardTitle>
          <CardDescription>
            Status and details of form submission
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Submission Code</p>
              <p className="font-mono text-sm font-medium text-foreground">
                {delegate.formSubmissionCode}
              </p>
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-sm text-muted-foreground mb-2">Status</p>
            {delegate.hasForm ? (
              <div className="space-y-3">
                <Badge
                  variant={delegate.formCompleted ? "default" : "secondary"}
                >
                  {delegate.formCompleted ? "Completed" : "In Progress"}
                </Badge>
                {delegate.form && (
                  <div className="mt-4">
                    <Button asChild>
                      <Link href={`/dashboard/forms/${delegate.form.id}`}>
                        View Form Details
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <Badge variant="outline">No Form Submitted</Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Form Summary (if exists) */}
      {delegate.form && (
        <Card>
          <CardHeader>
            <CardTitle>Form Summary</CardTitle>
            <CardDescription>
              Quick overview of the submitted form
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Submission Date</p>
                <p className="font-medium text-foreground">
                  {new Date(delegate.form.submissionDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Score</p>
                <p className="text-2xl font-bold text-foreground">
                  {delegate.form.totalScore}%
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge
                  variant={delegate.form.completed ? "default" : "secondary"}
                >
                  {delegate.form.completed ? "Completed" : "In Progress"}
                </Badge>
              </div>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground mb-3">
                Section Scores
              </p>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((section) => (
                  <div
                    key={section}
                    className="text-center p-3 border border-border rounded"
                  >
                    <p className="text-xs text-muted-foreground mb-1">
                      S{section}
                    </p>
                    <p className="font-bold text-foreground">
                      {
                        delegate.form![
                          `section${section}Score` as keyof typeof delegate.form
                        ]
                      }
                      %
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
