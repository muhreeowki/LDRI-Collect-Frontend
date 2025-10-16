"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  FileText,
  UserCheck,
  LogOut,
} from "lucide-react";

const navItems = [
  {
    title: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "User Validation",
    href: "/admin/validation",
    icon: UserCheck,
  },
  {
    title: "Form Submissions",
    href: "/admin/forms",
    icon: FileText,
  },
  {
    title: "Delegates",
    href: "/admin/delegates",
    icon: Users,
  },
  {
    title: "All Users",
    href: "/admin/users",
    icon: Users,
  },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col h-full">
      <div className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary",
              )}
            >
              <Icon className="h-5 w-5" />
              {item.title}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-border">
        <Link
          href="/logout"
          className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors text-muted-foreground hover:text-foreground hover:bg-secondary"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Link>
      </div>
    </nav>
  );
}
