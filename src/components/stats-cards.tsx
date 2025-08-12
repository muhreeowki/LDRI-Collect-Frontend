import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, UserCheck, Building } from "lucide-react"
import { mockStats } from "@/lib/prisma"

export async function StatsCards() {
  // Simulate async operation
  await new Promise((resolve) => setTimeout(resolve, 100))

  const stats = [
    {
      title: "Total Users",
      value: mockStats.totalUsers,
      icon: Users,
      description: "Registered users",
    },
    {
      title: "Valid Users",
      value: mockStats.validUsers,
      icon: UserCheck,
      description: "Verified users",
    },
    {
      title: "Delegates",
      value: mockStats.totalDelegates,
      icon: Building,
      description: "Active delegates",
    },
    {
      title: "Form Submissions",
      value: mockStats.totalForms,
      icon: FileText,
      description: "Total submissions",
    },
  ]

  return (
    <>
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
