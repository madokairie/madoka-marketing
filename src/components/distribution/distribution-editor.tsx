"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Sparkles,
  MessageCircle,
  Mail,
  Calendar,
  Hash,
} from "lucide-react";
import type { Distribution, DistributionStatus } from "@/lib/types";

// --- Mock Content ---

const mockLineContent = `【セミナー参加ありがとうございました】

{name}さん

本日はセミナーにご参加いただき
誠にありがとうございました。

セミナーでお伝えした
「3ステップ集客法」について
さらに詳しくお伝えする
個別相談会を開催します。

━━━━━━━━━━━
個別相談会（無料）
━━━━━━━━━━━
日時：ご希望の日時で調整
所要：約60分（オンライン）
特典：個別戦略シート作成

▼ 今すぐ予約する
{consultation_url}

※ 先着10名限定です
  残り枠わずかとなっております`;

const mockEmailSubject = "本日のセミナーありがとうございました";
const mockEmailPreheader = "個別相談の特別枠をご用意しました";
const mockEmailContent = `{name}様

本日はお忙しい中、セミナーにご参加いただき
誠にありがとうございました。

セミナーでお伝えした「3ステップ集客法」は
いかがでしたでしょうか？

多くの方から「もっと詳しく知りたい」
「自分のビジネスに当てはめるとどうなるか聞きたい」
というお声をいただいております。

そこで、セミナー参加者限定で
【無料個別相談会】を開催いたします。

━━━━━━━━━━━━━━━━━
個別相談会の内容
━━━━━━━━━━━━━━━━━

1. あなたのビジネスの現状分析
2. 3ステップ集客法の個別カスタマイズ
3. 90日間のアクションプラン作成

【特典】個別戦略シート（通常5万円相当）を
　　　　無料でプレゼント

━━━━━━━━━━━━━━━━━

■ 開催概要
・形式：オンライン（Zoom）
・所要時間：約60分
・費用：無料
・定員：先着10名様

▼ 個別相談を予約する
{consultation_url}

※ セミナー参加者限定の特別枠です。
　 定員に達し次第、受付を終了いたします。

何かご不明な点がございましたら、
お気軽にご返信ください。

それでは、{name}様とお話できることを
楽しみにしております。

{sender_name}`;

// --- Helper ---

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

const typeLabels: Record<string, string> = {
  step: "オプトイン後ステップ",
  reminder: "セミナーリマインド",
  follow: "セミナー後フォロー",
  sales: "セールス期間",
  countdown: "カウントダウン",
  onboarding: "オンボーディング",
  recovery: "リカバリー",
  pre_pre_launch: "プリプリローンチ",
  pre_launch: "プリローンチ",
};

// --- Component ---

interface DistributionEditorProps {
  distribution: Distribution;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
  onSave?: (updated: Partial<Distribution>) => void;
  onAIModify?: () => void;
}

export function DistributionEditor({
  distribution,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false,
  onSave,
  onAIModify,
}: DistributionEditorProps) {
  const [lineContent, setLineContent] = useState(
    distribution.line_content || mockLineContent
  );
  const [emailSubject, setEmailSubject] = useState(
    distribution.email_subject || mockEmailSubject
  );
  const [emailPreheader, setEmailPreheader] = useState(
    distribution.email_preheader || mockEmailPreheader
  );
  const [emailContent, setEmailContent] = useState(
    distribution.email_content || mockEmailContent
  );
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const statusStyle = getStatusStyle(distribution.status);

  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // Fallback: do nothing
    }
  };

  return (
    <div className="space-y-4">
      {/* Navigation header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          disabled={!hasPrevious}
          onClick={onPrevious}
          style={{ color: "#8a8a8a" }}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          前の配信
        </Button>
        <Button
          variant="ghost"
          size="sm"
          disabled={!hasNext}
          onClick={onNext}
          style={{ color: "#8a8a8a" }}
        >
          次の配信
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="space-y-3">
            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                className="text-xs"
                style={{
                  backgroundColor: statusStyle.bg,
                  color: statusStyle.color,
                  border: "none",
                }}
              >
                {statusStyle.label}
              </Badge>
              <Badge variant="outline" className="text-xs" style={{ borderColor: "#e5e5e5", color: "#8a8a8a" }}>
                {typeLabels[distribution.type] || distribution.type}
              </Badge>
              <div className="flex items-center gap-1 text-xs" style={{ color: "#8a8a8a" }}>
                <Hash className="h-3 w-3" />
                {distribution.sequence_order}
              </div>
              {distribution.scheduled_date && (
                <div className="flex items-center gap-1 text-xs" style={{ color: "#8a8a8a" }}>
                  <Calendar className="h-3 w-3" />
                  {distribution.scheduled_date}
                </div>
              )}
            </div>

            {/* Title */}
            <div className="text-base font-semibold" style={{ color: "#1a2332" }}>
              {distribution.email_subject || `配信 #${distribution.sequence_order}`}
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="line">
            <TabsList className="mb-4">
              <TabsTrigger value="line" className="gap-1.5">
                <MessageCircle className="h-3.5 w-3.5" />
                LINE
              </TabsTrigger>
              <TabsTrigger value="email" className="gap-1.5">
                <Mail className="h-3.5 w-3.5" />
                メール
              </TabsTrigger>
            </TabsList>

            {/* LINE Tab */}
            <TabsContent value="line" className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium" style={{ color: "#2d2d2d" }}>
                    LINEメッセージ
                  </Label>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => handleCopy(lineContent, "line")}
                    style={{ color: "#8a8a8a" }}
                  >
                    {copiedField === "line" ? (
                      <Check className="h-3 w-3 mr-1" style={{ color: "#2d6a4f" }} />
                    ) : (
                      <Copy className="h-3 w-3 mr-1" />
                    )}
                    {copiedField === "line" ? "コピー済" : "コピー"}
                  </Button>
                </div>
                <Textarea
                  value={lineContent}
                  onChange={(e) => setLineContent(e.target.value)}
                  rows={16}
                  className="text-sm font-mono leading-relaxed resize-none"
                  style={{ borderColor: "#e5e5e5" }}
                />
                <p className="text-xs" style={{ color: "#8a8a8a" }}>
                  {lineContent.length} 文字
                </p>
              </div>
            </TabsContent>

            {/* Email Tab */}
            <TabsContent value="email" className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium" style={{ color: "#2d2d2d" }}>
                    件名
                  </Label>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => handleCopy(emailSubject, "subject")}
                    style={{ color: "#8a8a8a" }}
                  >
                    {copiedField === "subject" ? (
                      <Check className="h-3 w-3 mr-1" style={{ color: "#2d6a4f" }} />
                    ) : (
                      <Copy className="h-3 w-3 mr-1" />
                    )}
                    {copiedField === "subject" ? "コピー済" : "コピー"}
                  </Button>
                </div>
                <Input
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="text-sm"
                  style={{ borderColor: "#e5e5e5" }}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium" style={{ color: "#2d2d2d" }}>
                  プリヘッダー
                </Label>
                <Input
                  value={emailPreheader}
                  onChange={(e) => setEmailPreheader(e.target.value)}
                  className="text-sm"
                  style={{ borderColor: "#e5e5e5" }}
                  placeholder="受信トレイに表示されるプレビューテキスト"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium" style={{ color: "#2d2d2d" }}>
                    本文
                  </Label>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => handleCopy(emailContent, "body")}
                    style={{ color: "#8a8a8a" }}
                  >
                    {copiedField === "body" ? (
                      <Check className="h-3 w-3 mr-1" style={{ color: "#2d6a4f" }} />
                    ) : (
                      <Copy className="h-3 w-3 mr-1" />
                    )}
                    {copiedField === "body" ? "コピー済" : "コピー"}
                  </Button>
                </div>
                <Textarea
                  value={emailContent}
                  onChange={(e) => setEmailContent(e.target.value)}
                  rows={20}
                  className="text-sm font-mono leading-relaxed resize-none"
                  style={{ borderColor: "#e5e5e5" }}
                />
                <p className="text-xs" style={{ color: "#8a8a8a" }}>
                  {emailContent.length} 文字
                </p>
              </div>
            </TabsContent>
          </Tabs>

          {/* Actions */}
          <div className="flex items-center gap-2 mt-6 pt-4" style={{ borderTop: "1px solid #e5e5e5" }}>
            <Button
              variant="outline"
              size="sm"
              style={{ borderColor: "#c9a96e", color: "#c9a96e" }}
              onClick={onAIModify}
            >
              <Sparkles className="h-3 w-3 mr-1" />
              AIで修正
            </Button>
            <div className="flex-1" />
            <Button
              size="sm"
              className="font-semibold"
              style={{ backgroundColor: "#1a2332", color: "#fff" }}
              onClick={() =>
                onSave?.({
                  line_content: lineContent,
                  email_subject: emailSubject,
                  email_preheader: emailPreheader,
                  email_content: emailContent,
                })
              }
            >
              保存
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
