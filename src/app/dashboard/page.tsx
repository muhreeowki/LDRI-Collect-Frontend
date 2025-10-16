import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  FileText,
  CheckCircle,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CreateDelegateDialog from "@/components/create-delegate-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  OverallPerformanceChart,
  SectionPerformanceChart,
} from "@/components/overview-charts";
import { getUserForms } from "@/actions/forms";
import { getUserDashboard } from "@/actions/users";

type Form = {
  id: string;
  submissionDate: Date;
  completed: boolean;
  totalScore: number;
  maxScore: number;
  section1Score: number;
  section2Score: number;
  section3Score: number;
  section4Score: number;
  section5Score: number;
  delegate: {
    name: string;
    email: string;
    county: string;
    department: string;
  };
};

type DashboardStats = {
  expectedDelegates: number;
  completedForms: number;
  delegates: {
    name: string;
    email: string;
    department: string;
    formSubmissionCode: string;
    hasSubmitted: boolean;
    formId: string | null;
  }[];
  _count: {
    Delegates: number;
    FormSubmissions: number;
  };
};

export default async function UserDashboardPage() {
  const [formsRes, dashboardResp] = await Promise.all([
    getUserForms(),
    getUserDashboard(),
  ]);

  const forms: Form[] = formsRes.success ? formsRes.forms : [];
  const dashboardStats: DashboardStats | null = dashboardResp.success
    ? dashboardResp.summary
    : null;

  const totalDelegates = Number(dashboardStats?._count?.Delegates ?? 0);
  const completedForms = Number(dashboardStats?._count?.FormSubmissions ?? 0);

  const aggregate = forms
    ? (() => {
        const totalForms = forms.length;
        const totalScore = forms.reduce(
          (acc: any, s: any) => acc + s.totalScore,
          0,
        );
        const maxScore = forms.reduce(
          (acc: any, s: any) => acc + s.maxScore,
          0,
        );
        const sectionNames = [
          "Governance",
          "Finance",
          "Technical Capacity",
          "Data Infrastructure",
          "Stakeholder Engagement",
        ];

        const section1Scores = forms.reduce(
          (acc: any, s: any) => acc + (s.section1Score || 0),
          0,
        );
        const section2Scores = forms.reduce(
          (acc: any, s: any) => acc + (s.section2Score || 0),
          0,
        );
        const section3Scores = forms.reduce(
          (acc: any, s: any) => acc + (s.section3Score || 0),
          0,
        );
        const section4Scores = forms.reduce(
          (acc: any, s: any) => acc + (s.section4Score || 0),
          0,
        );
        const section5Scores = forms.reduce(
          (acc: any, s: any) => acc + (s.section5Score || 0),
          0,
        );

        const sectionScores = [
          section1Scores,
          section2Scores,
          section3Scores,
          section4Scores,
          section5Scores,
        ];

        const sectionTotals = sectionNames.map((name: any, idx: number) => {
          return { name, score: sectionScores[idx] };
        });

        return {
          averageScore: Number.parseFloat((totalScore / totalForms).toFixed(2)),
          totalMax: maxScore,
          sections: sectionTotals,
        };
      })()
    : (null as any);

  const hasDelegates =
    dashboardStats?.delegates && dashboardStats.delegates.length > 0;
  const hasForms = forms.length > 0;

  const completionRate =
    totalDelegates > 0
      ? Math.round((completedForms / totalDelegates) * 100)
      : 0;
  const avgScore = aggregate ? aggregate.averageScore : 0;

  const statCards = [
    {
      title: "My Delegates",
      value: totalDelegates,
      description: "Active delegates",
      icon: Users,
    },
    {
      title: "Form Submissions",
      value: completedForms,
      description: `${completedForms} completed`,
      icon: FileText,
    },
    {
      title: "Completion Rate",
      value: `${completionRate}%`,
      description: "Forms completed",
      icon: CheckCircle,
    },
    {
      title: "Avg Score",
      value: avgScore ? `${avgScore}` : "--",
      description: "Across all forms",
      icon: TrendingUp,
    },
  ];

  const performanceMetrics = aggregate
    ? [
        { metric: "Completion", value: completionRate },
        { metric: "Avg Score", value: aggregate.averageScore },
        { metric: "Governance", value: aggregate.sections[0].score },
        { metric: "Finance", value: aggregate.sections[1].score },
        { metric: "Technical", value: aggregate.sections[2].score },
      ]
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Welcome back
        </h2>
        <p className="text-muted-foreground mt-1">
          Here's an overview of your activity
        </p>
      </div>

      {!hasDelegates && (
        <Alert className="border-border bg-card">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Get Started</AlertTitle>
          <AlertDescription className="flex items-center justify-between">
            <span>
              You haven't added any delegates yet. Create your first delegate to
              start collecting form submissions.
            </span>
            <CreateDelegateDialog triggerVariant="outline" />
          </AlertDescription>
        </Alert>
      )}

      {hasDelegates && !hasForms && (
        <Alert className="border-border bg-card">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Waiting for Form Submissions</AlertTitle>
          <AlertDescription>
            Statistics cannot be displayed until your delegates submit their
            forms. Please ensure your delegates complete their assigned forms.
          </AlertDescription>
        </Alert>
      )}

      {hasForms ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="border-border bg-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.title}
                className="border-border bg-card opacity-50"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">--</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    No data yet
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {hasForms && aggregate && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">
                Section Performance
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Total scores across all form sections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SectionPerformanceChart data={aggregate.sections} />
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">
                Overall Performance Metrics
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Key performance indicators across all areas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OverallPerformanceChart data={performanceMetrics} />
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Delegates</CardTitle>
            <CardDescription className="text-muted-foreground">
              Your most recently added delegates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardStats?.delegates.slice(0, 5).map((delegate) => (
                <div
                  key={delegate.formSubmissionCode}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium text-foreground">
                      {delegate.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {delegate.department}
                    </p>
                  </div>
                  <Badge
                    variant={delegate.hasSubmitted ? "default" : "secondary"}
                  >
                    {delegate.hasSubmitted ? "Submitted" : "Pending"}
                  </Badge>
                </div>
              ))}
              {(!dashboardStats?.delegates ||
                dashboardStats.delegates.length === 0) && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No delegates yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Forms</CardTitle>
            <CardDescription className="text-muted-foreground">
              Your latest form submissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {forms.slice(0, 5).map((form) => (
                <div
                  key={form.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium text-foreground">
                      {form.delegate ? form.delegate.name : "N/A"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(form.submissionDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={form.completed ? "default" : "secondary"}>
                      {form.completed ? "Completed" : "In Progress"}
                    </Badge>
                    <span className="text-sm font-medium text-foreground">
                      {form.totalScore}
                    </span>
                  </div>
                </div>
              ))}
              {forms.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No forms yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
