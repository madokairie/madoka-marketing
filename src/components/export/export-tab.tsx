"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Download, ExternalLink, FileText, Send, Presentation, BarChart3 } from "lucide-react";
import { toast } from "sonner";

export function ExportTab() {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("コピーしました");
  };

  return (
    <div className="space-y-6">
      {/* UTAGE Copy */}
      <Card className="border-[#e5e5e5]">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Send className="h-5 w-5 text-[#4a6fa5]" />
            <CardTitle className="text-base">UTAGE用コピー</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* LPs */}
          <div>
            <h3 className="text-sm font-medium text-[#1a2332] mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              LP (3件)
            </h3>
            <div className="space-y-2">
              {[
                { name: "オプトインLP", sections: 7, status: "completed" },
                { name: "セミナー申込LP", sections: 12, status: "completed" },
                { name: "セールスLP", sections: 17, status: "draft" },
              ].map((lp) => (
                <div key={lp.name} className="flex items-center justify-between p-3 bg-[#faf9f7] rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-[#2d2d2d]">{lp.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {lp.sections}セクション
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    disabled={lp.status === "draft"}
                    onClick={() => handleCopy("LP content")}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    セクション別コピー
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Distributions */}
          <div>
            <h3 className="text-sm font-medium text-[#1a2332] mb-2 flex items-center gap-2">
              <Send className="h-4 w-4" />
              配信文 (17通)
            </h3>
            <div className="space-y-2">
              {[
                { name: "オプトイン後ステップ", count: 5 },
                { name: "セミナーリマインド", count: 4 },
                { name: "セミナー後フォロー", count: 3 },
                { name: "セールス期間", count: 5 },
              ].map((group) => (
                <div key={group.name} className="flex items-center justify-between p-3 bg-[#faf9f7] rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-[#2d2d2d]">{group.name}</span>
                    <Badge variant="outline" className="text-xs">{group.count}通</Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => handleCopy("Distribution content")}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    一括コピー
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Canva */}
      <Card className="border-[#e5e5e5]">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Presentation className="h-5 w-5 text-[#c9a96e]" />
            <CardTitle className="text-base">Canva連携</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-[#faf9f7] rounded-lg">
            <div>
              <span className="text-sm text-[#2d2d2d]">セミナースライド</span>
              <p className="text-xs text-[#8a8a8a]">200枚 / Canvaで編集可能</p>
            </div>
            <Button variant="outline" size="sm" className="text-xs">
              <ExternalLink className="h-3 w-3 mr-1" />
              Canvaで開く
            </Button>
          </div>
          <div className="flex items-center justify-between p-3 bg-[#faf9f7] rounded-lg">
            <div>
              <span className="text-sm text-[#2d2d2d]">リードマグネット</span>
              <p className="text-xs text-[#8a8a8a]">PDF / Canvaで編集可能</p>
            </div>
            <Button variant="outline" size="sm" className="text-xs">
              <ExternalLink className="h-3 w-3 mr-1" />
              Canvaで開く
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* PDF */}
      <Card className="border-[#e5e5e5]">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-[#2d6a4f]" />
            <CardTitle className="text-base">PDF出力</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-[#faf9f7] rounded-lg">
            <span className="text-sm text-[#2d2d2d]">ローンチレポート</span>
            <Button variant="outline" size="sm" className="text-xs">
              <Download className="h-3 w-3 mr-1" />
              PDF生成
            </Button>
          </div>
          <div className="flex items-center justify-between p-3 bg-[#faf9f7] rounded-lg">
            <span className="text-sm text-[#2d2d2d]">ファネル設計書</span>
            <Button variant="outline" size="sm" className="text-xs">
              <Download className="h-3 w-3 mr-1" />
              PDF生成
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
