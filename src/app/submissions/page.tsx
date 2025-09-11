import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, User, Trophy, Eye, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getUserForms } from "@/actions/forms";

function getStatusBadgeStyle(status: boolean) {
  if (status) return "bg-gray-100 text-gray-800 border-gray-200";
  return "bg-gray-50 text-gray-600 border-gray-300";
}

export default async function SubmissionsListPage() {
  const resp = await getUserForms();
  if (!resp.success) {
    return <div className="p-6">Failed to load submissions.</div>;
  }
  const submissions = resp.forms;

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
              Form Submissions
            </h1>
            <p className="text-muted-foreground">
              Manage and view all forms submitted by your delegates.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Submissions
              </CardTitle>
              <User className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {submissions.length}
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <Trophy className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {submissions.filter((s: any) => s.status).length}
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Incompleted</CardTitle>
              <CalendarDays className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {submissions.filter((s: any) => !s.status).length}
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Score
              </CardTitle>
              <Trophy className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {Math.round(
                  submissions.reduce(
                    (acc: any, s: any) => acc + s.totalScore,
                    0,
                  ) / submissions.length,
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submissions List */}
        <div className="grid gap-6">
          {submissions.map((submission: any) => (
            <Card
              key={submission.id}
              className="border-gray-200 hover:border-gray-300 transition-colors"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {submission.delegate.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {submission.delegate.department}
                        </p>
                      </div>
                      <Badge className={getStatusBadgeStyle(submission.status)}>
                        {submission.status}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="h-4 w-4" />
                        <span>
                          Submitted:{" "}
                          {new Date(
                            submission.submissionDate,
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Trophy className="h-4 w-4" />
                        <span className="font-medium text-gray-900">
                          Score: {submission.totalScore}/100
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        {submission.totalScore}
                      </div>
                      <div className="text-xs text-gray-500">Total Score</div>
                    </div>
                    <Link href={`/submissions/${submission.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 bg-transparent"
                      >
                        <Eye className="h-4 w-4" />
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
