import { CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function WaitingApproval() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="flex flex-col items-center">
          <CheckCircle2 className="text-green-500 w-16 h-16 mb-4" />
          <CardTitle className="text-2xl font-bold text-center">
            Onboarding Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center">
          <p className="text-center text-muted-foreground mb-4">
            Thank you for submitting your information.
          </p>
          <p className="text-center">
            Your account is now pending admin review. You will receive an email
            once your account has been approved.
          </p>
          <form action="/">
            <Button type="submit" className="mt-4 w-full">
              Go to Home
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
