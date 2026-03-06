"use client";

import {
  Package,
  Users,
  Gift,
  Sparkles,
  FileText,
  Send,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project, LPType, LPStatus } from "@/lib/types";
import { useUIStore } from "@/lib/stores/project-store";

interface OverviewTabProps {
  project: Project;
}

interface LPGenerationItem {
  type: LPType;
  label: string;
  status: LPStatus;
  score: number | null;
}

const mockLPItems: LPGenerationItem[] = [
  { type: "optin", label: "オプトインLP", status: "completed", score: 82 },
  { type: "seminar", label: "セミナーLP", status: "completed", score: 78 },
  { type: "sales", label: "セールスLP", status: "draft", score: null },
  { type: "thanks", label: "サンクスページ", status: "draft", score: null },
];

function getStatusBadge(status: LPStatus) {
  switch (status) {
    case "completed":
      return (
        <Badge className="bg-[#2d6a4f]/10 text-[#2d6a4f] border-[#2d6a4f]/20 hover:bg-[#2d6a4f]/10">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          完了
        </Badge>
      );
    case "generating":
      return (
        <Badge className="bg-[#d4a843]/10 text-[#d4a843] border-[#d4a843]/20 hover:bg-[#d4a843]/10">
          <Clock className="h-3 w-3 mr-1" />
          生成中
        </Badge>
      );
    case "draft":
      return (
        <Badge className="bg-[#8a8a8a]/10 text-[#8a8a8a] border-[#8a8a8a]/20 hover:bg-[#8a8a8a]/10">
          <AlertCircle className="h-3 w-3 mr-1" />
          未生成
        </Badge>
      );
  }
}

export function OverviewTab({ project }: OverviewTabProps) {
  const { setActiveTab } = useUIStore();

  return (
    <div className="space-y-6">
      {/* Top row: Project Info + Persona */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Info */}
        <Card className="border-[#e5e5e5] shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-[#8a8a8a] flex items-center gap-2">
              <Package className="h-4 w-4" />
              商品情報
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="font-semibold text-[#1a2332] text-lg">
                {project.product_info.name}
              </p>
              <p className="text-sm text-[#8a8a8a] mt-1">
                {project.product_info.description}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-[#8a8a8a]">価格帯</span>
                <p className="font-medium text-[#2d2d2d]">{project.product_info.price_range}</p>
              </div>
              <div>
                <span className="text-[#8a8a8a]">ターゲット</span>
                <p className="font-medium text-[#2d2d2d]">{project.product_info.target}</p>
              </div>
              <div className="col-span-2">
                <span className="text-[#8a8a8a]">USP</span>
                <p className="font-medium text-[#2d2d2d]">{project.product_info.usp}</p>
              </div>
              <div className="col-span-2">
                <span className="text-[#8a8a8a]">実績・エビデンス</span>
                <p className="font-medium text-[#2d2d2d]">{project.product_info.evidence}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Persona */}
        <Card className="border-[#e5e5e5] shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-[#8a8a8a] flex items-center gap-2">
              <Users className="h-4 w-4" />
              ペルソナ
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[#8a8a8a]">年齢層</span>
                <p className="font-medium text-[#2d2d2d]">30〜40代</p>
              </div>
              <div>
                <span className="text-[#8a8a8a]">職業</span>
                <p className="font-medium text-[#2d2d2d]">女性起業家</p>
              </div>
            </div>
            <div>
              <span className="text-[#8a8a8a]">悩み・ペインポイント</span>
              <ul className="mt-1 space-y-1">
                <li className="text-[#2d2d2d]">- 集客が安定しない</li>
                <li className="text-[#2d2d2d]">- 単価を上げたいが方法がわからない</li>
                <li className="text-[#2d2d2d]">- 自分のメソッドに自信が持てない</li>
              </ul>
            </div>
            <div>
              <span className="text-[#8a8a8a]">理想の未来</span>
              <p className="font-medium text-[#2d2d2d]">
                安定的に月商100万を超え、自信を持ってビジネスを展開できる状態
              </p>
            </div>
            <div>
              <span className="text-[#8a8a8a]">過去の試み</span>
              <p className="font-medium text-[#2d2d2d]">
                SNS集客、無料セミナー、低価格商品の販売
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Offer Summary */}
      <Card className="border-[#e5e5e5] shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-[#8a8a8a] flex items-center gap-2">
            <Gift className="h-4 w-4" />
            オファー設計
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-[#8a8a8a]">通常価格</span>
              <p className="font-semibold text-[#1a2332] text-lg">¥500,000</p>
            </div>
            <div>
              <span className="text-[#8a8a8a]">早期割引価格</span>
              <p className="font-semibold text-[#c9a96e] text-lg">¥398,000</p>
            </div>
            <div>
              <span className="text-[#8a8a8a]">分割払い</span>
              <p className="font-medium text-[#2d2d2d]">¥35,000 x 12回</p>
            </div>
            <div>
              <span className="text-[#8a8a8a]">保証</span>
              <p className="font-medium text-[#2d2d2d]">30日間全額返金保証</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-[#e5e5e5]">
            <span className="text-[#8a8a8a] text-sm">特典</span>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline" className="border-[#c9a96e] text-[#c9a96e]">
                個別コンサルティング（¥100,000相当）
              </Badge>
              <Badge variant="outline" className="border-[#c9a96e] text-[#c9a96e]">
                テンプレート集（¥50,000相当）
              </Badge>
              <Badge variant="outline" className="border-[#c9a96e] text-[#c9a96e]">
                コミュニティ永久アクセス（¥30,000相当）
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* LP Generation Progress */}
      <Card className="border-[#e5e5e5] shadow-none">
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium text-[#8a8a8a] flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            LP生成状況
          </CardTitle>
          <Button
            size="sm"
            className="bg-[#c9a96e] hover:bg-[#b8985d] text-white"
            onClick={() => setActiveTab("lp")}
          >
            <FileText className="h-3.5 w-3.5 mr-1" />
            LP管理へ
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockLPItems.map((item) => (
              <div
                key={item.type}
                className="p-4 rounded-lg border border-[#e5e5e5] bg-[#faf9f7]"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#2d2d2d]">
                    {item.label}
                  </span>
                  {getStatusBadge(item.status)}
                </div>
                {item.score !== null && (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-1.5 bg-[#e5e5e5] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${item.score}%`,
                          backgroundColor:
                            item.score >= 80
                              ? "#2d6a4f"
                              : item.score >= 60
                              ? "#d4a843"
                              : "#a3333d",
                        }}
                      />
                    </div>
                    <span className="text-xs font-medium font-[var(--font-inter)]">
                      {item.score}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Button
          variant="outline"
          className="h-auto py-4 border-[#e5e5e5] hover:border-[#c9a96e] hover:bg-[#c9a96e]/5 flex flex-col items-center gap-2"
          onClick={() => setActiveTab("lp")}
        >
          <FileText className="h-5 w-5 text-[#c9a96e]" />
          <span className="text-sm font-medium text-[#2d2d2d]">LP編集</span>
          <span className="text-xs text-[#8a8a8a]">コピーの確認・編集</span>
        </Button>
        <Button
          variant="outline"
          className="h-auto py-4 border-[#e5e5e5] hover:border-[#4a6fa5] hover:bg-[#4a6fa5]/5 flex flex-col items-center gap-2"
          onClick={() => setActiveTab("distribution")}
        >
          <Send className="h-5 w-5 text-[#4a6fa5]" />
          <span className="text-sm font-medium text-[#2d2d2d]">配信設定</span>
          <span className="text-xs text-[#8a8a8a]">LINE/メール配信管理</span>
        </Button>
        <Button
          variant="outline"
          className="h-auto py-4 border-[#e5e5e5] hover:border-[#2d6a4f] hover:bg-[#2d6a4f]/5 flex flex-col items-center gap-2"
          onClick={() => setActiveTab("dashboard")}
        >
          <BarChart3 className="h-5 w-5 text-[#2d6a4f]" />
          <span className="text-sm font-medium text-[#2d2d2d]">ダッシュボード</span>
          <span className="text-xs text-[#8a8a8a]">数値の確認・分析</span>
        </Button>
      </div>
    </div>
  );
}
