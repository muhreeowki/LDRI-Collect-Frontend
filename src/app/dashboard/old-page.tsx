import { AppSidebar } from '@/components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

export default function DataPage() {
  const submissions = [
    {
      id: 'form1',
      name: 'Jane Doe',
      department: 'Health',
      totalScore: 38,
      maxScore: 50,
      formData: {
        Q_1_1: 'a.1.1.i',
        Q_1_2: 'a.1.2.3.i',
        Q_2_1: '1',
        Q_2_2: 'a.2.2.a',
        // ... more fields
      },
      sections: [
        { name: 'Governance', score: 7 },
        { name: 'Finance', score: 6 },
        { name: 'Technical Capacity', score: 9 },
        { name: 'Data Infrastructure', score: 8 },
        { name: 'Stakeholder Engagement', score: 8 },
      ],
    },
    {
      id: 'form2',
      name: 'John Smith',
      department: 'Education',
      totalScore: 42,
      maxScore: 50,
      formData: {
        Q_1_1: 'a.1.1.f',
        Q_1_2: 'a.1.2.1.f',
        Q_2_1: '1',
        Q_2_2: 'a.2.2.i_1',
      },
      sections: [
        { name: 'Governance', score: 9 },
        { name: 'Finance', score: 8 },
        { name: 'Technical Capacity', score: 8 },
        { name: 'Data Infrastructure', score: 8 },
        { name: 'Stakeholder Engagement', score: 9 },
      ],
    },
  ];

  // Compute average section scores
  const aggregate = (() => {
    const totalForms = submissions.length;
    const totalScore = submissions.reduce((acc, s) => acc + s.totalScore, 0);
    const maxScore = submissions.reduce((acc, s) => acc + s.maxScore, 0);
    const sectionNames = submissions[0]?.sections.map((s) => s.name) || [];

    const sectionTotals = sectionNames.map((name) => {
      const total = submissions.reduce((acc, s) => {
        const section = s.sections.find((sec) => sec.name === name);
        return acc + (section?.score || 0);
      }, 0);
      return { name, score: parseFloat((total / totalForms).toFixed(2)) };
    });

    return {
      averageScore: parseFloat((totalScore / totalForms).toFixed(2)),
      totalMax: maxScore,
      sections: sectionTotals,
    };
  })();
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
                {submissions.map((sub) => (
                  <TabsTrigger key={sub.id} value={sub.id}>
                    {sub.department}
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
                      <BarChart data={aggregate.sections}>
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
                  </CardContent>
                </Card>
              </TabsContent>
              {submissions.map((sub) => (
                <TabsContent key={sub.id} value={sub.id}>
                  <Card key={sub.id}>
                    <CardHeader>
                      <CardTitle>
                        {sub.department} - {sub.name}
                      </CardTitle>
                      <CardDescription>
                        This is the score for the {sub.department} department.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-xl font-bold">
                        {sub.totalScore} / {sub.maxScore}
                      </p>
                      <Progress value={(sub.totalScore / sub.maxScore) * 100} />
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={sub.sections}>
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
                      {submissions[0].sections.map((section) => (
                        <th
                          key={section.name}
                          className="border px-3 py-2 text-left"
                        >
                          {section.name}
                        </th>
                      ))}
                      <th className="border px-3 py-2 text-left">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((sub) => (
                      <tr key={sub.id} className="hover:bg-accent">
                        <td className="border px-3 py-2">{sub.department}</td>
                        {sub.sections.map((section) => (
                          <td key={section.name} className="border px-3 py-2">
                            {section.score}
                          </td>
                        ))}
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
