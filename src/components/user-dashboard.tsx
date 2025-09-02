//
'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Button } from '@/components/ui/button';

type SectionScore = { name: string; score: number };
type Submission = {
  id: string;
  delegate?: { department?: string; name?: string };
  totalScore: number;
  maxScore: number;
  sections: SectionScore[];
};
type DelegateSummary = {
  name: string;
  email: string;
  department: string;
  formSubmissionCode: string;
  hasSubmitted: boolean;
  formId: string | null;
};

export default function UserDashboard({
  submissions,
  isLocked,
  expectedDelegates,
  delegates,
  aggregate,
}: {
  submissions: Submission[];
  isLocked: boolean;
  expectedDelegates: number;
  delegates: DelegateSummary[];
  aggregate: any;
}) {
  const totalDelegates = expectedDelegates ?? 0;

  if (totalDelegates === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Card className="max-w-xl rounded p-8 shadow w-full">
          <CardHeader>
            <CardTitle>No Delegates Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Please add delegates to your account. Once delegates are created
              and have submitted their forms, the dashboard will be available.
            </p>
            <form action="/dashboard/delegates" className="space-y-4 float-end">
              <Button>Create Delegates</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLocked) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="max-w-xl rounded p-8 shadow">
          <div className="mb-6 text-center w-full">
            <h2 className="text-2xl font-bold mb-2 text-muted-foreground">
              Dashboard Locked
            </h2>
            <p className="text-muted-foreground mb-4">
              The dashboard is currently unavailable because not all delegates
              have completed their submissions. Please wait until all delegates
              have submitted their forms to view the dashboard.
            </p>
          </div>
          <table className="w-full table-auto border text-sm rounded">
            <thead>
              <tr>
                <th className="border px-3 py-2 text-left">Delegate</th>
                <th className="border px-3 py-2 text-left">Department</th>
                <th className="border px-3 py-2 text-left">Status</th>
                <th className="border px-3 py-2 text-left">Submission</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {(delegates ?? []).map((d, idx) => (
                <tr
                  key={d.formSubmissionCode ?? idx}
                  className="hover:bg-accent"
                >
                  <td className="border px-3 py-2">
                    {d.name || `Delegate ${idx + 1}`}
                  </td>
                  <td className="border px-3 py-2">{d.department || '-'}</td>
                  <td className="border px-3 py-2 font-semibold">
                    {d.hasSubmitted ? (
                      <span className="text-green-600">Completed</span>
                    ) : (
                      <span className="text-yellow-600">Pending</span>
                    )}
                  </td>
                  <td className="border px-3 py-2">
                    {d.hasSubmitted && d.formId ? (
                      <a
                        href={`/dashboard/forms/${d.formId}`}
                        className="text-blue-600 underline"
                      >
                        View Submission
                      </a>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="p-6">
            {/* Department Scores */}
            <Tabs defaultValue={'total'}>
              <TabsList className="justify-start">
                <TabsTrigger value={'total'}>Total Score</TabsTrigger>
                {submissions &&
                  submissions.length > 0 &&
                  submissions.map((sub) => (
                    <TabsTrigger key={sub.id} value={sub.id}>
                      {sub.delegate?.department || 'Department'}
                    </TabsTrigger>
                  ))}
              </TabsList>
              <TabsContent value="total">
                <Card>
                  <CardHeader>
                    <CardTitle>Total Score</CardTitle>
                    <CardDescription>
                      This is the average score across all departments.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {aggregate && submissions && submissions.length > 0 ? (
                      <>
                        <p className="text-xl font-bold">
                          {aggregate.averageScore} /{' '}
                          {aggregate.totalMax / submissions.length}
                        </p>
                        <Progress
                          value={
                            (aggregate.averageScore /
                              (aggregate.totalMax / submissions.length)) *
                            100
                          }
                        />
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={aggregate.sections || []}>
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 10]} />
                            <Tooltip />
                            <Bar
                              dataKey="score"
                              fill="#16a34a"
                              radius={[4, 4, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </>
                    ) : (
                      <p className="text-muted-foreground">
                        No aggregate data available.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              {submissions &&
                submissions.length > 0 &&
                submissions.map((sub) => (
                  <TabsContent key={sub.id} value={sub.id}>
                    <Card key={sub.id}>
                      <CardHeader>
                        <CardTitle>
                          {sub.delegate?.department} - {sub.delegate?.name}
                        </CardTitle>
                        <CardDescription>
                          This is the score for the{' '}
                          {sub.delegate?.department || 'N/A'} department.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-xl font-bold">
                          {sub.totalScore} / {sub.maxScore}
                        </p>
                        <Progress
                          value={
                            sub.maxScore
                              ? (sub.totalScore / sub.maxScore) * 100
                              : 0
                          }
                        />
                        <div>
                          <a
                            href={`/dashboard/forms/${sub.id}`}
                            className="text-blue-600 underline text-sm"
                          >
                            Open details
                          </a>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={sub.sections || []}>
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 10]} />
                            <Tooltip />
                            <Bar
                              dataKey="score"
                              fill="#3b82f6"
                              radius={[4, 4, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
            </Tabs>
            {/* Submissions Tab */}
          </div>
          <div className="p-6">
            <Card>
              <CardHeader>
                <CardTitle>Scores Table by Department and Section</CardTitle>
              </CardHeader>
              <CardContent className="overflow-auto">
                <table className="w-full table-auto border text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="border px-3 py-2 text-left">Department</th>
                      {(submissions &&
                        submissions.length > 0 &&
                        submissions[0]?.sections?.map(
                          (section: SectionScore) => (
                            <th
                              key={section.name}
                              className="border px-3 py-2 text-left"
                            >
                              {section.name}
                            </th>
                          )
                        )) ||
                        null}
                      <th className="border px-3 py-2 text-left">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((sub) => (
                      <tr key={sub.id} className="hover:bg-accent">
                        <td className="border px-3 py-2">
                          {sub.delegate?.department}
                        </td>
                        {sub.sections?.map((section: SectionScore) => (
                          <td key={section.name} className="border px-3 py-2">
                            {section.score}
                          </td>
                        )) || null}
                        <td className="border px-3 py-2 font-semibold">
                          {sub.totalScore}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
