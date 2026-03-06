"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FolderOpen,
  BookOpen,
  Star,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useUIStore } from "@/lib/stores/project-store";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const navItems = [
  { href: "/dashboard", label: "ダッシュボード", icon: LayoutDashboard },
  { href: "/projects/mock-1", label: "プロジェクト", icon: FolderOpen },
  { href: "/knowledge", label: "ナレッジベース", icon: BookOpen },
  { href: "/testimonials", label: "お客様の声", icon: Star },
  { href: "/settings", label: "設定", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen } = useUIStore();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-full bg-white border-r border-[#e5e5e5] z-40 transition-all duration-200 flex flex-col",
        sidebarOpen ? "w-64" : "w-16"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-[#e5e5e5]">
        <Sparkles className="h-6 w-6 text-[#c9a96e] shrink-0" />
        {sidebarOpen && (
          <span className="ml-3 font-semibold text-[#1a2332] text-sm whitespace-nowrap">
            Madoka Launch Engine
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 space-y-1 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;

          const linkContent = (
            <Link
              href={item.href}
              className={cn(
                "flex items-center h-10 rounded-lg px-3 text-sm transition-colors relative",
                isActive
                  ? "bg-[#1a2332]/5 text-[#1a2332] font-medium"
                  : "text-[#8a8a8a] hover:bg-[#1a2332]/3 hover:text-[#2d2d2d]"
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#1a2332] rounded-r" />
              )}
              <Icon className="h-5 w-5 shrink-0" />
              {sidebarOpen && <span className="ml-3 whitespace-nowrap">{item.label}</span>}
            </Link>
          );

          if (!sidebarOpen) {
            return (
              <Tooltip key={item.href + item.label} delayDuration={0}>
                <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            );
          }

          return <div key={item.href + item.label}>{linkContent}</div>;
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-2 border-t border-[#e5e5e5]">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-center text-[#8a8a8a] hover:text-[#2d2d2d]"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>
    </aside>
  );
}
