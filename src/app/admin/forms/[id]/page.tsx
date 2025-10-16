import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAdminFormById } from "@/actions/forms";

export default async function AdminFormDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { form, message, success } = await getAdminFormById(params.id);

  if (!success || !form) {
    console.log("Error fetching form:", message);
    notFound();
  }

  console.log("Console Log of new form: ", form);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/forms" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Forms
          </Link>
        </Button>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Form Submission Details
        </h1>
        <p className="text-muted-foreground">
          Complete information about this form submission
        </p>
      </div>

      {/* Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>
            Basic information about this submission
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Submission ID</p>
              <p className="font-medium text-foreground">{form.id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Submission Date</p>
              <p className="font-medium text-foreground">
                {new Date(form.submissionDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge variant={form.completed ? "default" : "secondary"}>
                {form.completed ? "Completed" : "In Progress"}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Score</p>
              <p className="font-medium text-foreground text-xl">
                {form.totalScore}%
              </p>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-foreground mb-3">
              Delegate Information
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium text-foreground">
                  {form.delegate.name}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium text-foreground">
                  {form.delegate.email}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Department</p>
                <Badge variant="outline">{form.delegate.department}</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">County</p>
                <Badge variant="secondary" className="capitalize">
                  {form.delegate.county}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-foreground mb-3">
              Supervisor Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Supervisor Name</p>
                <p className="font-medium text-foreground">{form.User.name}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section Scores */}
      <Card>
        <CardHeader>
          <CardTitle>Section Scores</CardTitle>
          <CardDescription>Performance breakdown by section</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((section) => (
              <div
                key={section}
                className="text-center p-4 border border-border rounded-lg"
              >
                <p className="text-sm text-muted-foreground mb-1">
                  Section {section}
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {form[`section${section}Score` as keyof typeof form]}%
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Section 1 */}
      <Card>
        <CardHeader>
          <CardTitle>Section 1 - Questions & Answers</CardTitle>
          <CardDescription>Score: {form.section1Score}%</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <QuestionAnswer question="Q 1.1" answer={form.Q_1_1} />
          {form.Q_1_2 && (
            <QuestionAnswer question="Q 1.2" answer={form.Q_1_2} />
          )}
          {form.Q_1_3 && (
            <QuestionAnswer question="Q 1.3" answer={form.Q_1_3} />
          )}
          <QuestionAnswer question="Q 1.4" answer={form.Q_1_4} />
          <QuestionAnswer question="Q 1.5" answer={form.Q_1_5} />
          {form.Q_1_5_a && (
            <QuestionAnswer question="Q 1.5a" answer={form.Q_1_5_a} />
          )}
          {form.Q_1_6 && (
            <QuestionAnswer question="Q 1.6" answer={form.Q_1_6} />
          )}
          <QuestionAnswer question="Q 1.7" answer={form.Q_1_7} />
        </CardContent>
      </Card>

      {/* Section 2 */}
      <Card>
        <CardHeader>
          <CardTitle>Section 2 - Questions & Answers</CardTitle>
          <CardDescription>Score: {form.section2Score}%</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <QuestionAnswer question="Q 2.1" answer={form.Q_2_1} />
          {form.Q_2_2 && (
            <QuestionAnswer question="Q 2.2" answer={form.Q_2_2} />
          )}
          {form.Q_2_2_a && (
            <QuestionAnswer question="Q 2.2a" answer={form.Q_2_2_a} />
          )}
          <QuestionAnswer question="Q 2.3" answer={form.Q_2_3} />
          {form.Q_2_3_a && (
            <QuestionAnswer question="Q 2.3a" answer={form.Q_2_3_a} />
          )}
          <QuestionAnswer question="Q 2.4" answer={form.Q_2_4} />
          {form.Q_2_4_a && (
            <QuestionAnswer question="Q 2.4a" answer={form.Q_2_4_a} />
          )}
        </CardContent>
      </Card>

      {/* Section 3 */}
      <Card>
        <CardHeader>
          <CardTitle>Section 3 - Questions & Answers</CardTitle>
          <CardDescription>Score: {form.section3Score}%</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <QuestionAnswer question="Q 3.1" answer={form.Q_3_1} />
          {form.Q_3_1_a && (
            <QuestionAnswer question="Q 3.1a" answer={form.Q_3_1_a} />
          )}
          <QuestionAnswer question="Q 3.2" answer={form.Q_3_2} />
          {form.Q_3_2_a && (
            <QuestionAnswer question="Q 3.2a" answer={form.Q_3_2_a} />
          )}
          <QuestionAnswer question="Q 3.3" answer={form.Q_3_3} />
          {form.Q_3_3_a && (
            <QuestionAnswer question="Q 3.3a" answer={form.Q_3_3_a} />
          )}
        </CardContent>
      </Card>

      {/* Section 4 */}
      <Card>
        <CardHeader>
          <CardTitle>Section 4 - Questions & Answers</CardTitle>
          <CardDescription>Score: {form.section4Score}%</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <QuestionAnswer question="Q 4.1" answer={form.Q_4_1} />
          <QuestionAnswer question="Q 4.1a" answer={form.Q_4_1_a} />
          <QuestionAnswer question="Q 4.2" answer={form.Q_4_2} />
          {form.Q_4_2_a && (
            <QuestionAnswer question="Q 4.2a" answer={form.Q_4_2_a} />
          )}
          <QuestionAnswer question="Q 4.3" answer={form.Q_4_3} />
          <QuestionAnswer question="Q 4.4" answer={form.Q_4_4} />
          {form.Q_4_4_a && (
            <QuestionAnswer question="Q 4.4a" answer={form.Q_4_4_a} />
          )}
          <QuestionAnswer question="Q 4.5" answer={form.Q_4_5} />
          {form.Q_4_5_a && (
            <QuestionAnswer question="Q 4.5a" answer={form.Q_4_5_a} />
          )}
          <QuestionAnswer question="Q 4.6" answer={form.Q_4_6} />
          {form.Q_4_6_a && (
            <QuestionAnswer question="Q 4.6a" answer={form.Q_4_6_a} />
          )}
          <QuestionAnswer question="Q 4.7" answer={form.Q_4_7} />
          {form.Q_4_7_a && (
            <QuestionAnswer question="Q 4.7a" answer={form.Q_4_7_a} />
          )}
          <QuestionAnswer question="Q 4.8" answer={form.Q_4_8} />
          {form.Q_4_8_a && (
            <QuestionAnswer question="Q 4.8a" answer={form.Q_4_8_a} />
          )}
          <QuestionAnswer question="Q 4.9" answer={form.Q_4_9} />
          {form.Q_4_9_a && (
            <QuestionAnswer question="Q 4.9a" answer={form.Q_4_9_a} />
          )}
          <QuestionAnswer question="Q 4.10" answer={form.Q_4_10} />
          {form.Q_4_10_a && (
            <QuestionAnswer question="Q 4.10a" answer={form.Q_4_10_a} />
          )}
        </CardContent>
      </Card>

      {/* Section 5 */}
      <Card>
        <CardHeader>
          <CardTitle>Section 5 - Questions & Answers</CardTitle>
          <CardDescription>Score: {form.section5Score}%</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <QuestionAnswer question="Q 5.1" answer={form.Q_5_1} />
          {form.Q_5_1_a && (
            <QuestionAnswer question="Q 5.1a" answer={form.Q_5_1_a} />
          )}
          <QuestionAnswer question="Q 5.2" answer={form.Q_5_2} />
          {form.Q_5_2_a && (
            <QuestionAnswer question="Q 5.2a" answer={form.Q_5_2_a} />
          )}
          <QuestionAnswer question="Q 5.3" answer={form.Q_5_3} />
          <QuestionAnswer question="Q 5.4" answer={form.Q_5_4} />
          {form.Q_5_4_a && (
            <QuestionAnswer question="Q 5.4a" answer={form.Q_5_4_a} />
          )}
          <QuestionAnswer question="Q 5.5" answer={form.Q_5_5} />
          {form.Q_5_5_a && (
            <QuestionAnswer question="Q 5.5a" answer={form.Q_5_5_a} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function QuestionAnswer({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <div className="border-l-2 border-border pl-4">
      <p className="text-sm font-medium text-muted-foreground mb-1">
        {question}
      </p>
      <p className="text-foreground">{answer}</p>
    </div>
  );
}
