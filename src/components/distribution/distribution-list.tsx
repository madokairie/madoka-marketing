"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sparkles,
  ChevronDown,
  Mail,
  MessageCircle,
  FileText,
  Clock,
  CheckCircle2,
  PenLine,
  Eye,
} from "lucide-react";
import type { Distribution, DistributionType, DistributionStatus } from "@/lib/types";

// --- Mock Data ---

const mockDistributions: Distribution[] = [
  // オプトイン後ステップ
  { id: "d1", project_id: "p1", type: "step", sequence_order: 1, scheduled_date: null, line_content: "", email_subject: "ご登録ありがとうございます", email_preheader: "", email_content: "", status: "approved" },
  { id: "d2", project_id: "p1", type: "step", sequence_order: 2, scheduled_date: null, line_content: "", email_subject: "成功者が実践する3つの法則", email_preheader: "", email_content: "", status: "approved" },
  { id: "d3", project_id: "p1", type: "step", sequence_order: 3, scheduled_date: null, line_content: "", email_subject: "なぜ97%の人が結果を出せないのか", email_preheader: "", email_content: "", status: "edited" },
  { id: "d4", project_id: "p1", type: "step", sequence_order: 4, scheduled_date: null, line_content: "", email_subject: "受講生の声をご紹介します", email_preheader: "", email_content: "", status: "generated" },
  { id: "d5", project_id: "p1", type: "step", sequence_order: 5, scheduled_date: null, line_content: "", email_subject: "特別セミナーのご案内", email_preheader: "", email_content: "", status: "draft" },
  // セミナーリマインド
  { id: "d6", project_id: "p1", type: "reminder", sequence_order: 1, scheduled_date: "2026-03-10", line_content: "", email_subject: "【3日前】セミナー参加URLのご案内", email_preheader: "", email_content: "", status: "approved" },
  { id: "d7", project_id: "p1", type: "reminder", sequence_order: 2, scheduled_date: "2026-03-12", line_content: "", email_subject: "【明日】セミナー準備のご確認", email_preheader: "", email_content: "", status: "approved" },
  { id: "d8", project_id: "p1", type: "reminder", sequence_order: 3, scheduled_date: "2026-03-13", line_content: "", email_subject: "【本日】まもなく開始です", email_preheader: "", email_content: "", status: "edited" },
  { id: "d9", project_id: "p1", type: "reminder", sequence_order: 4, scheduled_date: "2026-03-13", line_content: "", email_subject: "【開始15分前】入室リンク", email_preheader: "", email_content: "", status: "draft" },
  // セミナー後フォロー
  { id: "d10", project_id: "p1", type: "follow", sequence_order: 1, scheduled_date: "2026-03-13", line_content: "", email_subject: "本日のセミナーありがとうございました", email_preheader: "", email_content: "", status: "generated" },
  { id: "d11", project_id: "p1", type: "follow", sequence_order: 2, scheduled_date: "2026-03-14", line_content: "", email_subject: "個別相談の特別枠をご用意しました", email_preheader: "", email_content: "", status: "generated" },
  { id: "d12", project_id: "p1", type: "follow", sequence_order: 3, scheduled_date: "2026-03-15", line_content: "", email_subject: "個別相談の残席わずかです", email_preheader: "", email_content: "", status: "draft" },
  // セールス期間
  { id: "d13", project_id: "p1", type: "sales", sequence_order: 1, scheduled_date: "2026-03-16", line_content: "", email_subject: "【限定公開】特別プログラムのご案内", email_preheader: "", email_content: "", status: "generated" },
  { id: "d14", project_id: "p1", type: "sales", sequence_order: 2, scheduled_date: "2026-03-17", line_content: "", email_subject: "早期申込特典は明日まで", email_preheader: "", email_content: "", status: "draft" },
  { id: "d15", project_id: "p1", type: "sales", sequence_order: 3, scheduled_date: "2026-03-18", line_content: "", email_subject: "受講生インタビュー動画をお届け", email_preheader: "", email_content: "", status: "draft" },
  { id: "d16", project_id: "p1", type: "sales", sequence_order: 4, scheduled_date: "2026-03-19", line_content: "", email_subject: "よくあるご質問にお答えします", email_preheader: "", email_content: "", status: "draft" },
  { id: "d17", project_id: "p1", type: "sales", sequence_order: 5, scheduled_date: "2026-03-20", line_content: "", email_subject: "【最終日】本日23:59で締切です", email_preheader: "", email_content: "", status: "draft" },
];

const typeLabels: Record<string, string> = {
  step: "オプトイン後ステップ",
  reminder: "セミナーリマインド",
  follow: "セミナー後フォロー",
  sales: "セールス期間",
};

const typeIcons: Record<string, React.ReactNode> = {
  step: <FileText className="h-4 w-4" />,
  reminder: <Clock className="h-4 w-4" />,
  follow: <MessageCircle className="h-4 w-4" />,
  sales: <Sparkles className="h-4 w-4" />,
};

function getStatusStyle(status: DistributionStatus) {
  switch (status) {
    case "approved":
      return { bg: "rgba(45, 106, 79, 0.1)", color: "#2d6a4f", label: "承認済" };
    case "edited":
      return { bg: "rgba(74, 111, 165, 0.1)", color: "#4a6fa5", label: "編集済" };
    case "generated":
      return { bg: "rgba(201, 169, 110, 0.1)", color: "#c9a96e", label: "生成済" };
    case "draft":
      return { bg: "rgba(138, 138, 138, 0.1)", color: "#8a8a8a", label: "下書き" };
  }
}

interface DistributionListProps {
  onSelect?: (distribution: Distribution) => void;
  onGenerateAll?: () => void;
  onGenerateByType?: (type: DistributionType) => void;
}

export function DistributionList({
  onSelect,
  onGenerateAll,
  onGenerateByType,
}: DistributionListProps) {
  const [distributions] = useState<Distribution[]>(mockDistributions);

  const groupedByType = distributions.reduce<Record<string, Distribution[]>>(
    (acc, dist) => {
      const key = dist.type;
      if (!acc[key]) acc[key] = [];
      acc[key].push(dist);
      return acc;
    },
    {}
  );

  const typeOrder: DistributionType[] = ["step", "reminder", "follow", "sales"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: "#1a2332" }}>
            配信コンテンツ
          </h1>
          <p className="text-sm mt-1" style={{ color: "#8a8a8a" }}>
            全 {distributions.length} 件の配信を管理
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" style={{ borderColor: "#e5e5e5" }}>
                タイプ別生成
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {typeOrder.map((type) => (
                <DropdownMenuItem
                  key={type}
                  onClick={() => onGenerateByType?.(type)}
                >
                  {typeIcons[type]}
                  <span className="ml-2">{typeLabels[type]}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            size="sm"
            className="font-semibold"
            style={{ backgroundColor: "#c9a96e", color: "#fff" }}
            onClick={onGenerateAll}
          >
            <Sparkles className="h-3 w-3 mr-1" />
            全配信一括生成
          </Button>
        </div>
      </div>

      {/* Grouped lists */}
      {typeOrder.map((type) => {
        const items = groupedByType[type];
        if (!items || items.length === 0) return null;

        const approvedCount = items.filter((d) => d.status === "approved").length;

        return (
          <Card key={type}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2" style={{ color: "#1a2332" }}>
                  {typeIcons[type]}
                  <span className="font-semibold">{typeLabels[type]}</span>
                  <Badge variant="outline" className="ml-1 text-xs" style={{ borderColor: "#e5e5e5", color: "#8a8a8a" }}>
                    {items.length}件
                  </Badge>
                </div>
                <span className="text-xs font-normal" style={{ color: "#8a8a8a" }}>
                  {approvedCount}/{items.length} 承認済
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 pt-0">
              {items.map((dist) => {
                const statusStyle = getStatusStyle(dist.status);
                return (
                  <button
                    key={dist.id}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-gray-50"
                    onClick={() => onSelect?.(dist)}
                  >
                    {/* Sequence number */}
                    <div
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                      style={{
                        backgroundColor:
                          dist.status === "approved" ? "#2d6a4f" : "#e5e5e5",
                        color: dist.status === "approved" ? "#fff" : "#8a8a8a",
                      }}
                    >
                      {dist.status === "approved" ? (
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      ) : (
                        dist.sequence_order
                      )}
                    </div>

                    {/* Title */}
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-medium truncate"
                        style={{ color: "#2d2d2d" }}
                      >
                        {dist.email_subject || `配信 #${dist.sequence_order}`}
                      </p>
                      {dist.scheduled_date && (
                        <p className="text-xs mt-0.5" style={{ color: "#8a8a8a" }}>
                          {dist.scheduled_date}
                        </p>
                      )}
                    </div>

                    {/* Status badge */}
                    <Badge
                      className="shrink-0 text-xs"
                      style={{
                        backgroundColor: statusStyle.bg,
                        color: statusStyle.color,
                        border: "none",
                      }}
                    >
                      {statusStyle.label}
                    </Badge>

                    {/* Channel badges */}
                    <div className="flex shrink-0 gap-1">
                      <div
                        className="flex h-6 w-6 items-center justify-center rounded"
                        style={{ backgroundColor: "rgba(45, 106, 79, 0.1)" }}
                        title="LINE"
                      >
                        <MessageCircle className="h-3 w-3" style={{ color: "#2d6a4f" }} />
                      </div>
                      <div
                        className="flex h-6 w-6 items-center justify-center rounded"
                        style={{ backgroundColor: "rgba(74, 111, 165, 0.1)" }}
                        title="メール"
                      >
                        <Mail className="h-3 w-3" style={{ color: "#4a6fa5" }} />
                      </div>
                    </div>
                  </button>
                );
              })}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
