import type React from "react";
import { AdminNav } from "@/components/admin-nav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 border-r border-border bg-card">
        <div className="sticky top-0 h-screen flex flex-col">
          <div className="flex items-center h-16 px-6 border-b border-border">
            <h1 className="text-lg font-bold text-foreground">
              Admin Dashboard
            </h1>
          </div>
          <AdminNav />
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="container max-w-7xl mx-auto px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
