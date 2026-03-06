"use client";

import { Sidebar } from "./sidebar";
import { useUIStore } from "@/lib/stores/project-store";
import { cn } from "@/lib/utils";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { sidebarOpen } = useUIStore();

  return (
    <div className="min-h-screen">
      <Sidebar />
      <main
        className={cn(
          "transition-all duration-200 min-h-screen",
          sidebarOpen ? "ml-64" : "ml-16"
        )}
      >
        <div className="max-w-[1200px] mx-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
