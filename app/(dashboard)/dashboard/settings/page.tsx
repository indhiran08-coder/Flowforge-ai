import { currentUser } from "@clerk/nextjs/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, User, Calendar, Shield } from "lucide-react";
import { format } from "date-fns";

export default async function SettingsPage() {
  const user = await currentUser();

  const initials = [user?.firstName?.[0], user?.lastName?.[0]]
    .filter(Boolean)
    .join("")
    .toUpperCase() || "?";

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your account and preferences.</p>
      </div>

      {/* Profile card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <User className="h-4 w-4" /> Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user?.imageUrl} alt={user?.firstName ?? ""} />
              <AvatarFallback className="text-lg bg-indigo-100 text-indigo-700">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-slate-900 text-lg">
                {[user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Anonymous"}
              </p>
              <Badge variant="secondary" className="text-xs mt-1">
                Free Plan
              </Badge>
            </div>
          </div>

          <div className="grid gap-3 pt-2">
            <div className="flex items-center gap-3 text-sm">
              <div className="rounded-lg bg-slate-50 p-2">
                <Mail className="h-4 w-4 text-slate-500" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Email</p>
                <p className="font-medium text-slate-700">
                  {user?.emailAddresses[0]?.emailAddress ?? "—"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="rounded-lg bg-slate-50 p-2">
                <Calendar className="h-4 w-4 text-slate-500" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Member since</p>
                <p className="font-medium text-slate-700">
                  {user?.createdAt
                    ? format(new Date(user.createdAt), "MMMM d, yyyy")
                    : "—"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="rounded-lg bg-slate-50 p-2">
                <Shield className="h-4 w-4 text-slate-500" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Auth provider</p>
                <p className="font-medium text-slate-700 capitalize">
                  {user?.externalAccounts?.[0]?.provider ?? "Email"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Manage via Clerk */}
      <Card className="border-blue-100 bg-blue-50/50">
        <CardContent className="py-4">
          <p className="text-sm text-blue-700">
            To update your profile, password, or connected accounts, use the{" "}
            <strong>account button</strong> in the sidebar.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
