import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { User, FileText, Trophy, CheckCircle, ArrowLeft } from 'lucide-react';

import Link from 'next/link';
import { AssessmentAnswers } from '@/components/form-answers';
import { getFormById } from '@/actions/forms';
import { Button } from '@/components/ui/button';

export default async function FormSubmissionsPage({
  params,
}: {
  params: { id: string };
}) {
  const resp = await getFormById(params.id);
  if (!resp.success) {
    return (
      <div className="p-6">
        <div className="mx-auto max-w-7xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-500">Failed to load form data.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  const form = resp.form;
  const overallPercentage = (form.totalScore / 100) * 100;
  const sectionData = [
    {
      name: 'Leadership',
      score: form.section1Score,
      maxScore: 20,
      color: 'bg-blue-500',
    },
    {
      name: 'Communication',
      score: form.section2Score,
      maxScore: 20,
      color: 'bg-green-500',
    },
    {
      name: 'Technical Skills',
      score: form.section3Score,
      maxScore: 20,
      color: 'bg-purple-500',
    },
    {
      name: 'Problem Solving',
      score: form.section4Score,
      maxScore: 20,
      color: 'bg-orange-500',
    },
    {
      name: 'Performance',
      score: form.section5Score,
      maxScore: 20,
      color: 'bg-red-500',
    },
  ];

  const questionsBySection = [
    {
      sectionName: 'Leadership',
      questions: [
        {
          id: 'Q_1_1',
          question: 'Understanding of company policies',
          answer: form.Q_1_1,
        },
        {
          id: 'Q_1_2',
          question: 'Initiative and team leadership',
          answer: form.Q_1_2,
        },
        {
          id: 'Q_1_3',
          question: 'Delegation and support',
          answer: form.Q_1_3,
        },
        {
          id: 'Q_1_4',
          question: 'Decision making under pressure',
          answer: form.Q_1_4,
        },
        {
          id: 'Q_1_5',
          question: 'Mentoring and development',
          answer: form.Q_1_5,
        },
      ],
    },
    {
      sectionName: 'Communication',
      questions: [
        {
          id: 'Q_2_1',
          question: 'Stakeholder communication',
          answer: form.Q_2_1,
        },
        {
          id: 'Q_2_2',
          question: 'Written communication skills',
          answer: form.Q_2_2,
        },
        {
          id: 'Q_2_3',
          question: 'Active listening abilities',
          answer: form.Q_2_3,
        },
        {
          id: 'Q_2_4',
          question: 'Presentation skills',
          answer: form.Q_2_4,
        },
        {
          id: 'Q_2_5',
          question: 'Conflict resolution',
          answer: form.Q_2_5,
        },
      ],
    },
    {
      sectionName: 'Technical Skills',
      questions: [
        {
          id: 'Q_3_1',
          question: 'Technical tool proficiency',
          answer: form.Q_3_1,
        },
        {
          id: 'Q_3_2',
          question: 'Continuous learning',
          answer: form.Q_3_2,
        },
        {
          id: 'Q_3_3',
          question: 'Technology implementation',
          answer: form.Q_3_3,
        },
        {
          id: 'Q_3_4',
          question: 'Problem troubleshooting',
          answer: form.Q_3_4,
        },
        {
          id: 'Q_3_5',
          question: 'Knowledge sharing',
          answer: form.Q_3_5,
        },
      ],
    },
    {
      sectionName: 'Problem Solving',
      questions: [
        {
          id: 'Q_4_1',
          question: 'Innovative approaches',
          answer: form.Q_4_1,
        },
        {
          id: 'Q_4_2',
          question: 'Systematic analysis',
          answer: form.Q_4_2,
        },
        {
          id: 'Q_4_3',
          question: 'Cross-functional collaboration',
          answer: form.Q_4_3,
        },
        {
          id: 'Q_4_4',
          question: 'Creative solutions',
          answer: form.Q_4_4,
        },
        {
          id: 'Q_4_5',
          question: 'Solution evaluation',
          answer: form.Q_4_5,
        },
      ],
    },
    {
      sectionName: 'Performance',
      questions: [
        {
          id: 'Q_5_1',
          question: 'Consistent delivery',
          answer: form.Q_5_1,
        },
        {
          id: 'Q_5_2',
          question: 'Quality ownership',
          answer: form.Q_5_2,
        },
        {
          id: 'Q_5_3',
          question: 'Adaptability',
          answer: form.Q_5_3,
        },
        {
          id: 'Q_5_4',
          question: 'Feedback implementation',
          answer: form.Q_5_4,
        },
        {
          id: 'Q_5_5',
          question: 'Reliability',
          answer: form.Q_5_5,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <Link href="/dashboard/submissions">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Submissions
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Form Submission Details
          </h1>
          <p className="text-muted-foreground">
            Comprehensive view of delegate assessment and scoring
          </p>
        </div>

        {/* Status and Overview */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Submission Status
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Badge variant={form.completed ? 'default' : 'secondary'}>
                  {form.completed ? 'Completed' : 'In Progress'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Submission Code
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {form.formSubmissionCode}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Overall Score
              </CardTitle>
              <Trophy className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{form.totalScore}/100</div>
              <Progress value={overallPercentage} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Delegate Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Delegate Information
            </CardTitle>
            <CardDescription>
              Details about the form submission delegate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Name
                </p>
                <p className="text-lg font-semibold">{form.delegate.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Email
                </p>
                <p className="text-sm">{form.delegate.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Department
                </p>
                <p className="text-sm">{form.delegate.department}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section Scores Cards */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Section Scores</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sectionData.map((section, index) => {
              const percentage = (section.score / section.maxScore) * 100;
              return (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{section.name}</CardTitle>
                    <CardDescription>
                      Section {index + 1} Assessment
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">
                          {section.score}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          / {section.maxScore}
                        </span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{percentage.toFixed(0)}%</span>
                        <span>
                          {percentage >= 80
                            ? 'Excellent'
                            : percentage >= 60
                            ? 'Good'
                            : percentage >= 40
                            ? 'Fair'
                            : 'Needs Improvement'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <AssessmentAnswers questionsBySection={questionsBySection} />
      </div>
    </div>
  );
}
