import { auth, currentUser } from "@clerk/nextjs/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitBranch, History, Zap } from "lucide-react";
import { syncUser } from "@/features/auth/sync-user";

export default async function DashboardPage() {
  const { userId } = await auth();
  const user = await currentUser();

  // Sync user to database on every dashboard visit
  if (userId && user) {
    await syncUser({
      clerkId: user.id,
      email: user.emailAddresses[0]?.emailAddress ?? "",
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
    });
  }

  const stats = [
    { label: "Total Workflows", value: "0", icon: GitBranch },
    { label: "Total Executions", value: "0", icon: Zap },
    { label: "Recent Runs", value: "0", icon: History },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Welcome back, {user?.firstName ?? "there"} 👋
        </h1>
        <p className="text-slate-600">Here&apos;s your automation overview.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Get Started</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            No workflows yet. Go to <strong>Workflows</strong> to create your first one.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}