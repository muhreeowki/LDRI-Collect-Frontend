import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, UserCheck, Building } from "lucide-react"
import { getAdminStats } from "@/actions/users"

export async function StatsCards() {
  const res = await getAdminStats()
  const derived = res.success
    ? res.stats
    : { totalUsers: 0, validUsers: 0, totalDelegates: 0, totalForms: 0 }

  const stats = [
    {
      title: "Total Users",
      value: derived?.totalUsers,
      icon: Users,
      description: "Registered users",
    },
    {
      title: "Valid Users",
      value: derived?.validUsers,
      icon: UserCheck,
      description: "Verified users",
    },
    {
      title: "Delegates",
      value: derived?.totalDelegates,
      icon: Building,
      description: "Active delegates",
    },
    {
      title: "Form Submissions",
      value: derived?.totalForms,
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
