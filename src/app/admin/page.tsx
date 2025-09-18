import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { UsersTable } from "@/components/users-table";
import { FormsTable } from "@/components/forms-table";
import { StatsCards } from "@/components/stats-cards";
import { Users, FileText } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage users and view form submissions
          </p>
        </div>

        {/* Bento Box Layout */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Stats Cards - Top Row */}
          <Suspense fallback={<StatsCardsSkeleton />}>
            <StatsCards />
          </Suspense>
          {/* Users Table - Large Card */}
          <Card className="md:col-span-2 lg:col-span-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Users
              </CardTitle>
              <CardDescription>
                Manage all registered users in the system. Click the 'Pending'
                badge to validate a user.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<TableSkeleton />}>
                <UsersTable />
              </Suspense>
            </CardContent>
          </Card>

          {/* Form Submissions Table - Large Card */}
          <Card className="md:col-span-2 lg:col-span-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Form Submissions
              </CardTitle>
              <CardDescription>
                View and manage all form submissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<TableSkeleton />}>
                <FormsTable />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatsCardsSkeleton() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-3 w-24 mt-2" />
          </CardContent>
        </Card>
      ))}
    </>
  );
}

function TableSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  );
}
