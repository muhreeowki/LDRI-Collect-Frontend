import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, User, Mail, Phone, Building } from "lucide-react";
import DelegateForm from "@/components/delegate-form";
import { getUsersDelegates } from "@/actions/delegate-actions";

interface DelegateForm {
  id: string;
  name: string;
  email: string;
  phone: string;
  county: string;
  department: string;
}

function EmptyDelegatesState() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          <div className="text-center space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Delegates</h1>
              <p className="text-muted-foreground">
                No delegates found. Create your first delegate to get started.
              </p>
            </div>
            <DelegateForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function DelegatesPage() {
  const resp = await getUsersDelegates();
  if (!resp.success) {
    return (
      <div className="p-6 rounded-md border text-sm text-muted-foreground">
        Failed to load delegates.
      </div>
    );
  }
  const delegates = resp.delegates;

  const completedSubmissions = delegates.filter(
    (delegate: any) => delegate.form?.status === "COMPLETED",
  ).length;
  const pendingSubmissions = delegates.filter(
    (delegate: any) => !delegate.form,
  ).length;
  const averageScore =
    delegates
      .filter((delegate: any) => delegate.form?.totalScore)
      .reduce(
        (sum: any, delegate: any) => sum + (delegate.form?.totalScore || 0),
        0,
      ) / delegates.filter((delegate: any) => delegate.form?.totalScore).length;

  // Conditional rendering based on delegates availability
  if (delegates.length === 0) {
    return <EmptyDelegatesState />;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              All Delegates
            </h1>
            <p className="text-muted-foreground">
              Manage and view all registered delegates and their assessment
              submissions
            </p>
          </div>
          <Dialog defaultOpen={false}>
            <DialogTrigger asChild>
              <Button className="bg-foreground text-background hover:bg-foreground/90">
                <User className="h-4 w-4 mr-2" />
                Create New Delegate
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full">
              <DelegateForm />
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Delegates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {delegates.length}
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Completed Assessments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {completedSubmissions}
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Assessments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {pendingSubmissions}
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Average Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {averageScore.toFixed(1)}%
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Delegates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {delegates.map((delegate: any) => (
            <Card
              key={delegate.formSubmissionCode}
              className="border border-border hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-semibold text-foreground">
                      {delegate.name}
                    </CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {(delegate.formSubmissionCode as string).slice(0, 20)}...
                    </Badge>
                  </div>
                  <div className="text-right">
                    {delegate.form ? (
                      <div className="space-y-1">
                        <div className="text-2xl font-bold text-foreground">
                          {delegate.form.totalScore}%
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          Completed
                        </Badge>
                      </div>
                    ) : (
                      <Badge variant="outline" className="text-xs">
                        Pending
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {delegate.email}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {delegate.phone}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {delegate.county} • {delegate.department}
                    </span>
                  </div>
                </div>

                {delegate.form && (
                  <div className="pt-2 border-t border-border">
                    <div className="text-xs text-muted-foreground">
                      Submitted:{" "}
                      {new Date(
                        delegate.form.submissionDate,
                      ).toLocaleDateString()}
                    </div>
                  </div>
                )}

                <Link href={`/delegates/${delegate.formSubmissionCode}`}>
                  <Button className="w-full bg-transparent" variant="outline">
                    <User className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
