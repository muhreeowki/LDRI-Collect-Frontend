import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  FileText,
  AlertCircle,
} from 'lucide-react';
import { getDelegate } from '@/actions/delegate-actions';

interface PageProps {
  params: {
    code: string;
  };
}

export default async function DelegateDetailPage({ params }: PageProps) {
  const resp = await getDelegate(params.code);
  if (!resp.success) {
    return (
      <div className="p-6 rounded-md border text-sm text-muted-foreground">
        Failed to load delegate. {resp.error}
      </div>
    );
  }
  const delegate = resp.delegate;

  if (!delegate) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="border border-border">
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center space-y-2">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto" />
                <h2 className="text-xl font-semibold text-foreground">
                  Delegate Not Found
                </h2>
                <p className="text-muted-foreground">
                  The delegate with code "{params.code}" could not be found.
                </p>
                <Link href="/dashboard">
                  <Button variant="outline" className="mt-4 bg-transparent">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Delegates
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <Link href="/dashboard/delegates">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Delegates
                </Button>
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              {delegate.name}
            </h1>
            <p className="text-muted-foreground">
              Delegate Profile and Assessment Details
            </p>
          </div>
        </div>

        {/* Delegate Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Information */}
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Full Name
                </div>
                <div className="text-foreground">{delegate.name}</div>
              </div>

              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Submission Code
                </div>
                <Badge variant="outline">{delegate.formSubmissionCode}</Badge>
              </div>

              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Email
                </div>
                <div className="text-foreground flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  {delegate.email}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Phone
                </div>
                <div className="text-foreground flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  {delegate.phone}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Work Information */}
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Building className="h-5 w-5" />
                Work Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  County
                </div>
                <div className="text-foreground">{delegate.county}</div>
              </div>

              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Department
                </div>
                <div className="text-foreground">{delegate.department}</div>
              </div>

              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  User ID
                </div>
                <div className="text-foreground">{delegate.userId}</div>
              </div>
            </CardContent>
          </Card>

          {/* Assessment Status */}
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <FileText className="h-5 w-5" />
                Assessment Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {delegate.form ? (
                <>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Status
                    </div>
                    <Badge variant="secondary">Completed</Badge>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Total Score
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      {delegate.form.totalScore}%
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Submission Date
                    </div>
                    <div className="text-foreground flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {new Date(
                        delegate.form.submissionDate
                      ).toLocaleDateString()}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Assessment ID
                    </div>
                    <div className="text-foreground">{delegate.form.id}</div>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <div className="text-sm text-muted-foreground">
                    No assessment submitted
                  </div>
                  <Badge variant="outline" className="mt-2">
                    Pending
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Assessment Results */}
        {delegate.form && (
          <>
            {/* Section Scores */}
            <Card className="border border-border">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Assessment Section Scores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {[
                    {
                      name: 'Leadership',
                      score: delegate.form.section1Score,
                      max: 20,
                    },
                    {
                      name: 'Technical',
                      score: delegate.form.section2Score,
                      max: 20,
                    },
                    {
                      name: 'Interpersonal',
                      score: delegate.form.section3Score,
                      max: 20,
                    },
                    {
                      name: 'Strategic',
                      score: delegate.form.section4Score,
                      max: 20,
                    },
                    {
                      name: 'Personal',
                      score: delegate.form.section5Score,
                      max: 20,
                    },
                  ].map((section, index) => (
                    <div key={index} className="text-center space-y-2">
                      <div className="text-sm font-medium text-muted-foreground">
                        {section.name}
                      </div>
                      <div className="text-2xl font-bold text-foreground">
                        {section.score}/{section.max}
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-foreground h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${(section.score / section.max) * 100}%`,
                          }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {Math.round((section.score / section.max) * 100)}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Assessment Answers */}
            {/* <AssessmentAnswers questionsBySection={delegate.form.answers} /> */}
          </>
        )}
      </div>
    </div>
  );
}
