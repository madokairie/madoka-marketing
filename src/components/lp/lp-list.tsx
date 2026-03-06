"use client";

import { useState } from "react";
import {
  Sparkles,
  FileText,
  Edit,
  CheckCircle2,
  Clock,
  AlertCircle,
  Wand2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { LandingPage, LPType, LPStatus, CopyScore } from "@/lib/types";
import { LPEditor } from "./lp-editor";

const lpTypeLabels: Record<LPType, string> = {
  optin: "オプトインLP",
  seminar: "セミナーLP",
  sales: "セールスLP",
  thanks: "サンクスページ",
};

const lpTypeDescriptions: Record<LPType, string> = {
  optin: "無料オファーでリスト獲得するためのLP",
  seminar: "セミナー・説明会への誘導LP",
  sales: "本命商品の販売ページ",
  thanks: "購入・申込後のサンクスページ",
};

function getStatusConfig(status: LPStatus) {
  switch (status) {
    case "completed":
      return {
        icon: CheckCircle2,
        label: "完了",
        className: "bg-[#2d6a4f]/10 text-[#2d6a4f] border-[#2d6a4f]/20",
      };
    case "generating":
      return {
        icon: Clock,
        label: "生成中",
        className: "bg-[#d4a843]/10 text-[#d4a843] border-[#d4a843]/20",
      };
    case "draft":
      return {
        icon: AlertCircle,
        label: "未生成",
        className: "bg-[#8a8a8a]/10 text-[#8a8a8a] border-[#8a8a8a]/20",
      };
  }
}

const mockScoreDetail: CopyScore = {
  headline: 85,
  problemStatement: 80,
  logicFlow: 75,
  socialProof: 82,
  offer: 70,
  cta: 78,
  objectionHandling: 72,
  readability: 85,
  targetFit: 80,
  uniqueness: 73,
  total: 78,
};

const mockLPs: LandingPage[] = [
  {
    id: "lp-1",
    project_id: "mock-1",
    type: "optin",
    status: "completed",
    copy_score: 82,
    score_detail: { ...mockScoreDetail, total: 82, headline: 88, readability: 90 },
    sections: [],
    created_at: "2026-03-01T10:00:00Z",
    updated_at: "2026-03-03T14:30:00Z",
  },
  {
    id: "lp-2",
    project_id: "mock-1",
    type: "seminar",
    status: "completed",
    copy_score: 78,
    score_detail: mockScoreDetail,
    sections: [],
    created_at: "2026-03-01T10:00:00Z",
    updated_at: "2026-03-04T09:00:00Z",
  },
  {
    id: "lp-3",
    project_id: "mock-1",
    type: "sales",
    status: "draft",
    copy_score: null,
    score_detail: null,
    sections: [],
    created_at: "2026-03-01T10:00:00Z",
    updated_at: "2026-03-01T10:00:00Z",
  },
  {
    id: "lp-4",
    project_id: "mock-1",
    type: "thanks",
    status: "draft",
    copy_score: null,
    score_detail: null,
    sections: [],
    created_at: "2026-03-01T10:00:00Z",
    updated_at: "2026-03-01T10:00:00Z",
  },
];

export function LPList() {
  const [selectedLP, setSelectedLP] = useState<LandingPage | null>(null);

  if (selectedLP) {
    return (
      <LPEditor
        landingPage={selectedLP}
        onBack={() => setSelectedLP(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#1a2332]">ランディングページ</h3>
          <p className="text-sm text-[#8a8a8a] mt-0.5">
            ファネルに必要なLPの生成・編集を管理します
          </p>
        </div>
        <Button className="bg-[#c9a96e] hover:bg-[#b8985d] text-white">
          <Wand2 className="h-4 w-4 mr-2" />
          全LP一括生成
        </Button>
      </div>

      {/* LP Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockLPs.map((lp) => {
          const statusConfig = getStatusConfig(lp.status);
          const StatusIcon = statusConfig.icon;
          const scoreColor =
            lp.copy_score !== null
              ? lp.copy_score >= 80
                ? "#2d6a4f"
                : lp.copy_score >= 60
                ? "#d4a843"
                : "#a3333d"
              : "#8a8a8a";

          return (
            <Card
              key={lp.id}
              className="border-[#e5e5e5] shadow-none hover:border-[#c9a96e]/50 transition-colors cursor-pointer group"
              onClick={() => lp.status === "completed" ? setSelectedLP(lp) : undefined}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-[#1a2332]/5 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-[#1a2332]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1a2332]">
                        {lpTypeLabels[lp.type]}
                      </h4>
                      <p className="text-xs text-[#8a8a8a]">
                        {lpTypeDescriptions[lp.type]}
                      </p>
                    </div>
                  </div>
                  <Badge className={`${statusConfig.className} hover:${statusConfig.className}`}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {statusConfig.label}
                  </Badge>
                </div>

                {/* Score Bar */}
                {lp.copy_score !== null && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-[#8a8a8a]">コピースコア</span>
                      <span
                        className="text-sm font-bold font-[var(--font-inter)]"
                        style={{ color: scoreColor }}
                      >
                        {lp.copy_score}/100
                      </span>
                    </div>
                    <div className="h-2 bg-[#e5e5e5] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${lp.copy_score}%`,
                          backgroundColor: scoreColor,
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {lp.status === "completed" ? (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-[#e5e5e5] hover:border-[#1a2332] hover:bg-[#1a2332]/5"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLP(lp);
                        }}
                      >
                        <Edit className="h-3.5 w-3.5 mr-1" />
                        編集
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-[#e5e5e5] hover:border-[#c9a96e] hover:bg-[#c9a96e]/5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Sparkles className="h-3.5 w-3.5 mr-1 text-[#c9a96e]" />
                        再生成
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="sm"
                      className="flex-1 bg-[#c9a96e] hover:bg-[#b8985d] text-white"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Sparkles className="h-3.5 w-3.5 mr-1" />
                      AIで生成
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
