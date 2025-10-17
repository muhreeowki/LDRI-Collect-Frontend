import { LoginForm } from "@/components/login-form";
import { Navbar } from "@/components/navbar";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <div className="min-h-max flex flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
        <div className="w-full max-w-lg">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
