import { getAdminStats } from "@/actions/admin";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, FileText, UserCheck, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function AdminDashboardPage() {
  const { stats } = await getAdminStats();

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      description: `${stats.pendingUsers} pending validation`,
      icon: Users,
      trend: "+12% from last month",
    },
    {
      title: "Form Submissions",
      value: stats.totalForms,
      description: `${stats.completedForms} completed`,
      icon: FileText,
      trend: "+8% from last month",
    },
    {
      title: "Total Delegates",
      value: stats.totalDelegates,
      description: "Active delegates",
      icon: UserCheck,
      trend: "+5% from last month",
    },
    {
      title: "Avg Form Score",
      value: `${stats.avgFormScore}%`,
      description: "Across all submissions",
      icon: TrendingUp,
      trend: "+2.5% from last month",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Dashboard Overview
        </h2>
        <p className="text-muted-foreground mt-1">
          Monitor your form collection application activity
        </p>
      </div>

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
                <p className="text-xs text-primary mt-2">{stat.trend}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Quick Actions</CardTitle>
          <CardDescription className="text-muted-foreground">
            Common administrative tasks
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <a
            href="/admin/validation"
            className="flex flex-col gap-3 p-6 rounded-lg border border-border hover:bg-secondary transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary">
                <UserCheck className="h-6 w-6 text-foreground" />
              </div>
              <Badge variant="secondary" className="ml-auto">
                {stats.pendingUsers}
              </Badge>
            </div>
            <div>
              <p className="font-semibold text-foreground text-lg">
                Validate Users
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {stats.pendingUsers} users pending validation
              </p>
            </div>
          </a>
          <a
            href="/admin/forms"
            className="flex flex-col gap-3 p-6 rounded-lg border border-border hover:bg-secondary transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary">
                <FileText className="h-6 w-6 text-foreground" />
              </div>
              <Badge variant="secondary" className="ml-auto">
                {stats.totalForms}
              </Badge>
            </div>
            <div>
              <p className="font-semibold text-foreground text-lg">
                View Forms
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {stats.totalForms} total form submissions
              </p>
            </div>
          </a>
          <a
            href="/admin/delegates"
            className="flex flex-col gap-3 p-6 rounded-lg border border-border hover:bg-secondary transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary">
                <Users className="h-6 w-6 text-foreground" />
              </div>
              <Badge variant="secondary" className="ml-auto">
                {stats.totalDelegates}
              </Badge>
            </div>
            <div>
              <p className="font-semibold text-foreground text-lg">
                Manage Delegates
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {stats.totalDelegates} active delegates
              </p>
            </div>
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
