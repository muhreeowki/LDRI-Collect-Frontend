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
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Building2,
  FileText,
  ExternalLink,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getUser } from "@/actions/users";

type Delegate = {
  formSubmissionCode: string;
  name: string;
  email: string;
  phone: string;
  county: string;
  department: string;
  userId: string;
};

export default async function AdminUserDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { user, success, message } = await getUser(params.id);

  if (!success || !user) {
    console.error("Error fetching user:", message);
    notFound();
  }

  console.log(user);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/users" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Users
          </Link>
        </Button>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
        <p className="text-muted-foreground">
          Complete user profile and activity overview
        </p>
      </div>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            User contact and identification details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium text-foreground">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium text-foreground">{user.phone}</p>
              </div>
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">National ID</p>
              <p className="font-medium text-foreground">{user.nationalId}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sex</p>
              <p className="font-medium text-foreground capitalize">
                {user.sex}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Work Information */}
      <Card>
        <CardHeader>
          <CardTitle>Work Information</CardTitle>
          <CardDescription>
            Department, position, and location details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Department</p>
                <Badge variant="outline" className="mt-1">
                  {user.department}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">County</p>
                <Badge variant="secondary" className="mt-1 capitalize">
                  {user.county}
                </Badge>
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <p className="text-sm text-muted-foreground">Position</p>
            <p className="font-medium text-foreground">{user.position}</p>
          </div>
        </CardContent>
      </Card>

      {/* Authorization */}
      <Card>
        <CardHeader>
          <CardTitle>Authorization</CardTitle>
          <CardDescription>
            Account validation and authorization documents
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Account Status</p>
            <Badge variant={user.valid ? "default" : "secondary"}>
              {user.valid ? "Validated" : "Pending Validation"}
            </Badge>
          </div>
          <Separator />
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Authorization Form
            </p>
            <a
              href={user.authorizationFormLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              View Document
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Activity Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Overview</CardTitle>
          <CardDescription>
            Delegates and form submissions managed by this user
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border border-border rounded-lg">
              <Users className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">
                {user._count.Delegates}
              </p>
              <p className="text-sm text-muted-foreground">Total Delegates</p>
            </div>
            <div className="text-center p-4 border border-border rounded-lg">
              <FileText className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">
                {user._count.FormSubmissions}
              </p>
              <p className="text-sm text-muted-foreground">Form Submissions</p>
            </div>
            <div className="text-center p-4 border border-border rounded-lg">
              <FileText className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">
                {user._count.FormSubmissions}
              </p>
              <p className="text-sm text-muted-foreground">Completed Forms</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Delegates */}
      {user._count.Delegates > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Delegates</CardTitle>
            <CardDescription>
              Latest delegates assigned to this user
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {user.Delegates &&
                user.Delegates.map((delegate: Delegate) => (
                  <div
                    key={delegate.formSubmissionCode}
                    className="flex items-center justify-between p-3 border border-border rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        {delegate.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {delegate.email}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{delegate.department}</Badge>
                      <Button size="sm" variant="ghost" asChild>
                        <Link
                          href={`/admin/delegates/${delegate.formSubmissionCode}`}
                        >
                          View
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
