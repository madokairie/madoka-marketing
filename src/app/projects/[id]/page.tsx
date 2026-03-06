"use client";

import Link from "next/link";
import {
  ChevronRight,
  Rocket,
  Calendar,
  Target,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ProjectTabs } from "@/components/project/project-tabs";
import { OverviewTab } from "@/components/project/overview-tab";
import { LPList } from "@/components/lp/lp-list";
import type { Project } from "@/lib/types";

const mockProject: Project = {
  id: "mock-1",
  client_id: "client-1",
  product_id: "product-1",
  name: "高額講座ローンチ 2026年春",
  type: "full_launch",
  status: "active",
  funnel_template: null,
  revenue_target: 10000000,
  launch_date: "2026-04-15",
  created_at: "2026-02-01T00:00:00Z",
  updated_at: "2026-03-06T00:00:00Z",
  product_info: {
    name: "ビジネス構築マスター講座",
    description:
      "起業初期〜年商1000万の女性起業家向け、売上を3倍にするビジネス構築講座",
    price_range: "¥500,000",
    target: "30〜40代女性起業家",
    usp: "実績者100名以上、再現性の高い独自メソッド",
    evidence: "受講生の80%が3ヶ月で売上2倍以上を達成",
    is_new: false,
  },
  tone_settings: {
    tones: ["権威的", "情熱的"],
    keywords: ["本質", "成長", "プロフェッショナル"],
    brand_colors: { main: "#1a2332", sub: "#faf9f7", accent: "#c9a96e" },
    fonts: { heading: "Noto Sans JP", body: "Noto Sans JP" },
  },
};

const projectTypeLabels: Record<string, string> = {
  full_launch: "フルローンチ",
  spot: "スポット施策",
  education: "教育ファネル",
  evergreen: "エバーグリーン",
};

const projectStatusConfig: Record<
  string,
  { label: string; className: string }
> = {
  draft: {
    label: "下書き",
    className: "bg-[#8a8a8a]/10 text-[#8a8a8a] border-[#8a8a8a]/20",
  },
  active: {
    label: "進行中",
    className: "bg-[#2d6a4f]/10 text-[#2d6a4f] border-[#2d6a4f]/20",
  },
  completed: {
    label: "完了",
    className: "bg-[#4a6fa5]/10 text-[#4a6fa5] border-[#4a6fa5]/20",
  },
  archived: {
    label: "アーカイブ",
    className: "bg-[#8a8a8a]/10 text-[#8a8a8a] border-[#8a8a8a]/20",
  },
};

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function daysUntil(dateStr: string): number {
  const now = new Date();
  const target = new Date(dateStr);
  const diff = target.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function ProjectDetailPage() {
  const project = mockProject;
  const statusConfig = projectStatusConfig[project.status];
  const daysLeft = project.launch_date ? daysUntil(project.launch_date) : null;

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard" className="text-[#8a8a8a] hover:text-[#2d2d2d]">
                ダッシュボード
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="text-[#1a2332] font-medium">
              {project.name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Project Header */}
      <Card className="border-[#e5e5e5] shadow-none">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Left: Project Info */}
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-[#1a2332] flex items-center justify-center shrink-0">
                <Rocket className="h-6 w-6 text-[#c9a96e]" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl font-bold text-[#1a2332]">
                    {project.name}
                  </h1>
                  <Badge
                    variant="outline"
                    className="border-[#1a2332]/20 text-[#1a2332]"
                  >
                    {projectTypeLabels[project.type]}
                  </Badge>
                  <Badge
                    className={`${statusConfig.className} hover:${statusConfig.className}`}
                  >
                    {statusConfig.label}
                  </Badge>
                </div>
                <p className="text-sm text-[#8a8a8a] mt-1">
                  {project.product_info.description}
                </p>
              </div>
            </div>

            {/* Right: Key Metrics */}
            <div className="flex items-center gap-6 shrink-0">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-[#c9a96e]" />
                <div>
                  <p className="text-xs text-[#8a8a8a]">売上目標</p>
                  <p className="text-sm font-bold text-[#1a2332] font-[var(--font-inter)]">
                    {formatCurrency(project.revenue_target)}
                  </p>
                </div>
              </div>

              {project.launch_date && (
                <>
                  <div className="h-8 w-px bg-[#e5e5e5]" />
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#4a6fa5]" />
                    <div>
                      <p className="text-xs text-[#8a8a8a]">ローンチ日</p>
                      <p className="text-sm font-medium text-[#2d2d2d]">
                        {formatDate(project.launch_date)}
                      </p>
                    </div>
                  </div>

                  {daysLeft !== null && daysLeft > 0 && (
                    <>
                      <div className="h-8 w-px bg-[#e5e5e5]" />
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-[#2d6a4f]" />
                        <div>
                          <p className="text-xs text-[#8a8a8a]">残り</p>
                          <p className="text-sm font-bold text-[#2d6a4f] font-[var(--font-inter)]">
                            {daysLeft}日
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Tone Tags */}
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#e5e5e5]">
            <span className="text-xs text-[#8a8a8a]">トーン:</span>
            {project.tone_settings.tones.map((tone) => (
              <Badge
                key={tone}
                variant="outline"
                className="text-xs border-[#c9a96e]/30 text-[#c9a96e] bg-[#c9a96e]/5"
              >
                {tone}
              </Badge>
            ))}
            <span className="text-xs text-[#8a8a8a] ml-2">キーワード:</span>
            {project.tone_settings.keywords.map((kw) => (
              <Badge
                key={kw}
                variant="outline"
                className="text-xs border-[#e5e5e5] text-[#8a8a8a]"
              >
                {kw}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <ProjectTabs>
        {{
          overview: <OverviewTab project={project} />,
          lp: <LPList />,
        }}
      </ProjectTabs>
    </div>
  );
}
