import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Mail, Phone, Building, Users } from 'lucide-react';
import { getUsersDelegates } from '@/actions/delegate-actions';

export default async function DelegatesPage() {
  // Mock data matching the Delegate Prisma schema
  const resp = await getUsersDelegates();
  if (!resp.success) {
    return (
      <div className="p-6 rounded-md border text-sm text-muted-foreground">
        Failed to load delegates.
      </div>
    );
  }
  const delegates = resp.delegates;

  const mockDelegates = [
    {
      formSubmissionCode: 'DEL001',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@county.gov',
      phone: '+1 (555) 123-4567',
      county: 'NAIROBI',
      department: 'Health Services',
      supervisor: { name: 'Dr. Michael Chen', id: 1 },
      userId: 1,
      form: {
        totalScore: 87,
        submissionDate: '2024-01-15',
        status: 'COMPLETED',
      },
    },
    {
      formSubmissionCode: 'DEL002',
      name: 'James Kimani',
      email: 'james.kimani@county.gov',
      phone: '+1 (555) 234-5678',
      county: 'MOMBASA',
      department: 'Education',
      supervisor: { name: 'Prof. Mary Wanjiku', id: 2 },
      userId: 2,
      form: {
        totalScore: 92,
        submissionDate: '2024-01-14',
        status: 'COMPLETED',
      },
    },
    {
      formSubmissionCode: 'DEL003',
      name: 'Grace Achieng',
      email: 'grace.achieng@county.gov',
      phone: '+1 (555) 345-6789',
      county: 'KISUMU',
      department: 'Infrastructure',
      supervisor: { name: 'Eng. Peter Mwangi', id: 3 },
      userId: 3,
      form: {
        totalScore: 78,
        submissionDate: '2024-01-13',
        status: 'COMPLETED',
      },
    },
    {
      formSubmissionCode: 'DEL004',
      name: 'David Mutua',
      email: 'david.mutua@county.gov',
      phone: '+1 (555) 456-7890',
      county: 'NAKURU',
      department: 'Finance',
      supervisor: { name: 'CPA Jane Njeri', id: 4 },
      userId: 4,
      form: null, // No form submission yet
    },
    {
      formSubmissionCode: 'DEL005',
      name: 'Rebecca Wanjiru',
      email: 'rebecca.wanjiru@county.gov',
      phone: '+1 (555) 567-8901',
      county: 'KIAMBU',
      department: 'Human Resources',
      supervisor: { name: 'Mr. Samuel Ochieng', id: 5 },
      userId: 5,
      form: {
        totalScore: 95,
        submissionDate: '2024-01-16',
        status: 'COMPLETED',
      },
    },
    {
      formSubmissionCode: 'DEL006',
      name: 'Anthony Kariuki',
      email: 'anthony.kariuki@county.gov',
      phone: '+1 (555) 678-9012',
      county: 'MACHAKOS',
      department: 'Agriculture',
      supervisor: { name: "Dr. Lucy Nyong'o", id: 6 },
      userId: 6,
      form: {
        totalScore: 84,
        submissionDate: '2024-01-12',
        status: 'COMPLETED',
      },
    },
  ];

  const completedSubmissions = delegates.filter(
    (delegate) => delegate.form?.status === 'COMPLETED'
  ).length;
  const pendingSubmissions = delegates.filter(
    (delegate) => !delegate.form
  ).length;

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
              Your Delegates
            </h1>
            <p className="text-muted-foreground">
              Manage and view all registered delegates and their assessment
              submissions
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        </div>

        {/* Delegates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {delegates.map((delegate) => (
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
                      {delegate.formSubmissionCode}
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
                    <span className="text-muted-foreground capitalize">
                      {delegate.county} • {delegate.department}
                    </span>
                  </div>
                </div>

                {delegate.form && (
                  <div className="pt-2 border-t border-border">
                    <div className="text-xs text-muted-foreground">
                      Submitted:{' '}
                      {new Date(
                        delegate.form.submissionDate
                      ).toLocaleDateString()}
                    </div>
                  </div>
                )}

                <a href={`/dashboard/delegates/${delegate.formSubmissionCode}`}>
                  <Button
                    className="w-full bg-transparent mt-4"
                    variant="outline"
                  >
                    <User className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
