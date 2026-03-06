"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LayoutGrid,
  GitBranch,
  FileText,
  Send,
  Calendar,
  BarChart3,
  ClipboardList,
  Download,
} from "lucide-react";
import { useUIStore } from "@/lib/stores/project-store";

const tabs = [
  { value: "overview", label: "概要", icon: LayoutGrid },
  { value: "funnel", label: "ファネル", icon: GitBranch },
  { value: "lp", label: "LP", icon: FileText },
  { value: "distribution", label: "配信", icon: Send },
  { value: "calendar", label: "カレンダー", icon: Calendar },
  { value: "dashboard", label: "ダッシュボード", icon: BarChart3 },
  { value: "report", label: "レポート", icon: ClipboardList },
  { value: "export", label: "エクスポート", icon: Download },
];

interface ProjectTabsProps {
  children: Record<string, React.ReactNode>;
}

export function ProjectTabs({ children }: ProjectTabsProps) {
  const { activeTab, setActiveTab } = useUIStore();

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="w-full justify-start bg-white border border-[#e5e5e5] rounded-lg h-auto p-1 flex-wrap gap-0.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="flex items-center gap-1.5 px-3 py-2 text-sm data-[state=active]:bg-[#1a2332] data-[state=active]:text-white data-[state=active]:shadow-sm rounded-md text-[#8a8a8a] hover:text-[#2d2d2d] transition-colors"
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </TabsTrigger>
          );
        })}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-6">
          {children[tab.value] || (
            <div className="flex items-center justify-center h-64 bg-white border border-[#e5e5e5] rounded-lg">
              <div className="text-center">
                <tab.icon className="h-10 w-10 text-[#e5e5e5] mx-auto mb-3" />
                <p className="text-[#8a8a8a] text-sm">{tab.label}タブは準備中です</p>
              </div>
            </div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}
