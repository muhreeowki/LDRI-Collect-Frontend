import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Users,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  ClipboardCheck,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="border-b">
        <div className="container mx-auto px-6 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-2 bg-accent rounded-full">
              <span className="text-sm font-medium">
                BRIDGE Local Form Platform
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Empowering communities through data-driven insights
            </h1>
            <p className="text-xl md:text-2xl mb-10 leading-relaxed max-w-3xl mx-auto">
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
                  variant="outline"
                  className="text-base px-8 py-6 h-auto bg-transparent"
                >
                  Login
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* About BRIDGE Section */}
      <section className="border-b">
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 rounded-lg flex items-center justify-center">
                <ClipboardCheck className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
              About the BRIDGE Local Form
            </h2>
            <div className="space-y-6 text-lg leading-relaxed">
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
      <section className="border-b">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">47</div>
              <div className="text-sm uppercase tracking-wide">
                Counties Participating
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">25</div>
              <div className="text-sm uppercase tracking-wide">
                Assessment Questions
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold  mb-2">5</div>
              <div className="text-sm  uppercase tracking-wide">
                Governance Areas
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold  mb-2">1,200+</div>
              <div className="text-sm  uppercase tracking-wide">
                Data Points Collected
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Goals Section */}
      <section className="border-b border-gray-200">
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold  mb-6">
              What we aim to accomplish
            </h2>
            <p className="text-xl ">
              Transforming local governance through comprehensive data
              collection and analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-gray-200 hover:border-gray-400 transition-all">
              <CardContent className="p-8">
                <div className="w-12 h-12  rounded-lg flex items-center justify-center mb-6">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold  mb-4">
                  Evidence-Based Insights
                </h3>
                <p className=" leading-relaxed">
                  Collect and analyze comprehensive data to identify patterns,
                  strengths, and areas for improvement across county governance
                  structures.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 hover:border-gray-400 transition-all">
              <CardContent className="p-8">
                <div className="w-12 h-12  rounded-lg flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold  mb-4">Capacity Building</h3>
                <p className=" leading-relaxed">
                  Empower county delegates and leadership teams with data-driven
                  recommendations to strengthen their governance capabilities
                  and service delivery.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 hover:border-gray-400 transition-all">
              <CardContent className="p-8">
                <div className="w-12 h-12  rounded-lg flex items-center justify-center mb-6">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold  mb-4">
                  Transparent Reporting
                </h3>
                <p className=" leading-relaxed">
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
      <section className="border-b border-gray-200">
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold  mb-6">
              Five key governance areas
            </h2>
            <p className="text-xl ">
              Each assessment evaluates critical dimensions of local governance
              to provide a comprehensive performance picture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Leadership",
                description: "Strategic vision and team coordination",
              },
              {
                title: "Communication",
                description: "Information flow and stakeholder engagement",
              },
              {
                title: "Technical Capacity",
                description: "Skills and resource management",
              },
              {
                title: "Problem Solving",
                description: "Innovation and adaptive solutions",
              },
              {
                title: "Performance",
                description: "Service delivery and outcomes",
              },
            ].map((area, index) => (
              <Card key={index} className="border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle2 className="h-5 w-5  mt-0.5 flex-shrink-0" />
                    <h3 className="text-lg font-bold ">{area.title}</h3>
                  </div>
                  <p className="text-sm  leading-relaxed">{area.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="">
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join the BRIDGE platform today
            </h2>
            <p className="text-xl  mb-10">
              Be part of the movement to strengthen local governance through
              data-driven insights and collaborative improvement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <form action="/onboarding">
                <Button
                  size="lg"
                  variant="default"
                  className="text-base px-8 py-6 h-auto"
                >
                  Create an Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
              <form action="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base px-8 py-6 h-auto bg-transparent text-white border-white hover:bg-white/10"
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
