import { getUserProfile } from "@/actions/users";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Building2,
  FileText,
} from "lucide-react";

export default async function UserProfilePage() {
  // In a real app, you'd get the user ID from the session/auth
  const { profile, success, message } = await getUserProfile();
  if (!success) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            My Profile
          </h2>
          <p className="text-muted-foreground mt-1">
            View your account information
          </p>
        </div>
        <Card className="border-border bg-card">
          <CardContent className="p-6 text-center text-red-600">
            {message || "Failed to load profile information."}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          My Profile
        </h2>
        <p className="text-muted-foreground mt-1">
          View your account information
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">
              Personal Information
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Your basic account details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium text-foreground">{profile.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium text-foreground">{profile.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">National ID</p>
                <p className="font-medium text-foreground">
                  {profile.nationalId}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">County</p>
                <Badge variant="secondary" className="capitalize mt-1">
                  {profile.county}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Work Information</CardTitle>
            <CardDescription className="text-muted-foreground">
              Your professional details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Briefcase className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Position</p>
                <p className="font-medium text-foreground">
                  {profile.position}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Department</p>
                <Badge variant="outline" className="mt-1">
                  {profile.department}
                </Badge>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">
                  Authorization Form
                </p>
                <a
                  href={profile.authorizationFormLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline mt-1 inline-block"
                >
                  View Document
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
