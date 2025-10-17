import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import {
  FileText,
  Users,
  BarChart3,
  ArrowRight,
  ClipboardCheck,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="border-b border-border">
        <div className="container mx-auto px-6 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-2 bg-muted rounded-full">
              <span className="text-sm font-medium text-foreground">
                BRIDGE Local Form Platform
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
              Empowering communities through data-driven insights
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto">
              The BRIDGE Local Form platform collects and analyzes critical
              community data to drive meaningful change and improve local
              governance across counties.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <form action="/onboarding">
                <Button size="lg" className="text-base px-8 py-6 h-auto">
                  Sign Up
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
              <form action="/login">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-base border-border border-2 px-8 py-6 h-auto bg-transparent"
                >
                  Login
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* About BRIDGE Section */}
      <section className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
                <ClipboardCheck className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 text-center">
              About the BRIDGE Local Form
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                The BRIDGE (Building Resilient Infrastructure for Development
                and Governance Excellence) Local Form is a comprehensive
                assessment tool designed to evaluate and strengthen local
                governance structures across counties.
              </p>
              <p>
                Through systematic data collection from county delegates, we
                gather critical insights into five key areas of governance:
                leadership effectiveness, communication systems, technical
                capacity, problem-solving capabilities, and overall performance
                metrics.
              </p>
              <p>
                Our mission is to transform this data into actionable
                intelligence that helps county governments identify strengths,
                address gaps, and implement evidence-based improvements that
                directly benefit their communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-border">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                47
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">
                Counties Participating
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                25
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">
                Assessment Questions
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                5
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">
                Governance Areas
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                1,200+
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">
                Data Points Collected
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Goals Section */}
      <section className="border-b border-border">
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              What we aim to accomplish
            </h2>
            <p className="text-xl text-muted-foreground">
              Transforming local governance through comprehensive data
              collection and analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-border hover:border-muted-foreground transition-all">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-6">
                  <BarChart3 className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Evidence-Based Insights
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Collect and analyze comprehensive data to identify patterns,
                  strengths, and areas for improvement across county governance
                  structures.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:border-muted-foreground transition-all">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Capacity Building
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Empower county delegates and leadership teams with data-driven
                  recommendations to strengthen their governance capabilities
                  and service delivery.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:border-muted-foreground transition-all">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-6">
                  <FileText className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Transparent Reporting
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Generate clear, actionable reports that help counties track
                  progress, benchmark performance, and demonstrate
                  accountability to their communities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Assessment Areas Section */}
      <section className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Five key governance areas
            </h2>
            <p className="text-xl text-muted-foreground">
              Each assessment evaluates critical dimensions of local governance
              to provide a comprehensive performance picture.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
            {[
              {
                number: "01",
                title: "Leadership",
                description: "Strategic vision and team coordination",
              },
              {
                number: "02",
                title: "Communication",
                description: "Information flow and stakeholder engagement",
              },
              {
                number: "03",
                title: "Technical Capacity",
                description: "Skills and resource management",
              },
              {
                number: "04",
                title: "Problem Solving",
                description: "Innovation and adaptive solutions",
              },
              {
                number: "05",
                title: "Performance",
                description: "Service delivery and outcomes",
              },
            ].map((area, index) => (
              <Card
                key={index}
                className="border-border hover:border-muted-foreground transition-colors w-full sm:w-80"
              >
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-muted-foreground mb-4">
                      {area.number}
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">
                      {area.title}
                    </h3>
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {area.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary">
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Join the BRIDGE platform today
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-10">
              Be part of the movement to strengthen local governance through
              data-driven insights and collaborative improvement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <form action="/onboarding">
                <Button
                  size="lg"
                  className="text-base px-8 py-6 h-auto border-border border-2"
                >
                  Create an Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
              <form action="/login">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-base px-8 py-6 h-auto "
                >
                  Login to Dashboard
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
