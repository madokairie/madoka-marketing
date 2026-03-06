"use client";

import { useState } from "react";
import { Rocket, Zap, Mail, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { ProjectType, ProductInfo } from "@/lib/types";

interface StepProductInfoProps {
  onNext: (data: { projectType: ProjectType; productInfo: ProductInfo; clientName: string }) => void;
  initialData?: {
    projectType: ProjectType;
    productInfo: ProductInfo;
    clientName: string;
  };
}

const projectTypes: {
  type: ProjectType;
  name: string;
  description: string;
  icon: React.ElementType;
}[] = [
  {
    type: "full_launch",
    name: "フルローンチ",
    description: "プロダクトローンチ全工程を管理",
    icon: Rocket,
  },
  {
    type: "spot",
    name: "スポット販売",
    description: "単発キャンペーンの企画・実行",
    icon: Zap,
  },
  {
    type: "education",
    name: "リスト教育",
    description: "見込み客の教育シーケンス構築",
    icon: Mail,
  },
  {
    type: "evergreen",
    name: "エバーグリーン",
    description: "常時稼働の自動販売ファネル",
    icon: RefreshCw,
  },
];

export function StepProductInfo({ onNext, initialData }: StepProductInfoProps) {
  const [selectedType, setSelectedType] = useState<ProjectType>(
    initialData?.projectType ?? "full_launch"
  );
  const [clientMode, setClientMode] = useState<"self" | "other">(
    initialData?.clientName && initialData.clientName !== "自社" ? "other" : "self"
  );
  const [clientName, setClientName] = useState(initialData?.clientName ?? "自社");
  const [productInfo, setProductInfo] = useState<ProductInfo>(
    initialData?.productInfo ?? {
      name: "",
      description: "",
      price_range: "",
      target: "",
      usp: "",
      evidence: "",
      is_new: true,
    }
  );

  const updateField = <K extends keyof ProductInfo>(key: K, value: ProductInfo[K]) => {
    setProductInfo((prev) => ({ ...prev, [key]: value }));
  };

  const isValid =
    productInfo.name.trim() !== "" &&
    productInfo.description.trim() !== "" &&
    productInfo.price_range.trim() !== "" &&
    productInfo.target.trim() !== "" &&
    productInfo.usp.trim() !== "";

  const handleSubmit = () => {
    if (!isValid) return;
    onNext({
      projectType: selectedType,
      productInfo,
      clientName: clientMode === "self" ? "自社" : clientName,
    });
  };

  return (
    <div className="space-y-8">
      {/* Project Type Selection */}
      <div>
        <h2 className="text-lg font-semibold text-[#2d2d2d] mb-1">プロジェクトタイプ</h2>
        <p className="text-sm text-[#8a8a8a] mb-4">
          実施するマーケティング施策のタイプを選択してください
        </p>
        <div className="grid grid-cols-2 gap-3">
          {projectTypes.map((pt) => {
            const Icon = pt.icon;
            const isSelected = selectedType === pt.type;
            return (
              <button
                key={pt.type}
                type="button"
                onClick={() => setSelectedType(pt.type)}
                className={cn(
                  "flex items-start gap-3 rounded-lg border p-4 text-left transition-all",
                  isSelected
                    ? "border-[#c9a96e] bg-[#c9a96e]/5 ring-1 ring-[#c9a96e]"
                    : "border-[#e5e5e5] bg-white hover:border-[#c9a96e]/50"
                )}
              >
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                    isSelected ? "bg-[#c9a96e]/10 text-[#c9a96e]" : "bg-[#faf9f7] text-[#8a8a8a]"
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div
                    className={cn(
                      "text-sm font-medium",
                      isSelected ? "text-[#1a2332]" : "text-[#2d2d2d]"
                    )}
                  >
                    {pt.name}
                  </div>
                  <div className="text-xs text-[#8a8a8a] mt-0.5">{pt.description}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Info Form */}
      <div className="space-y-5">
        <h2 className="text-lg font-semibold text-[#2d2d2d]">商品情報</h2>

        {/* Client */}
        <div className="space-y-2">
          <Label>クライアント</Label>
          <div className="flex items-center gap-3">
            <RadioGroup
              value={clientMode}
              onValueChange={(v) => {
                setClientMode(v as "self" | "other");
                if (v === "self") setClientName("自社");
              }}
              className="flex items-center gap-4"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="self" id="client-self" />
                <Label htmlFor="client-self" className="font-normal">
                  自社
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="other" id="client-other" />
                <Label htmlFor="client-other" className="font-normal">
                  クライアント
                </Label>
              </div>
            </RadioGroup>
            {clientMode === "other" && (
              <Input
                placeholder="クライアント名を入力"
                value={clientName === "自社" ? "" : clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="max-w-[240px]"
              />
            )}
          </div>
        </div>

        {/* Product Name */}
        <div className="space-y-2">
          <Label>
            商品名 <span className="text-red-500">*</span>
          </Label>
          <Input
            placeholder="例: マスターマインド・アカデミー"
            value={productInfo.name}
            onChange={(e) => updateField("name", e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label>
            商品概要 <span className="text-red-500">*</span>
          </Label>
          <Textarea
            placeholder="商品の概要を記入してください"
            value={productInfo.description}
            onChange={(e) => updateField("description", e.target.value)}
            rows={3}
          />
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <Label>
            価格帯 <span className="text-red-500">*</span>
          </Label>
          <Input
            placeholder="例: 298,000円"
            value={productInfo.price_range}
            onChange={(e) => updateField("price_range", e.target.value)}
          />
        </div>

        {/* Target */}
        <div className="space-y-2">
          <Label>
            ターゲット <span className="text-red-500">*</span>
          </Label>
          <Input
            placeholder="例: 30-40代の起業家・フリーランス"
            value={productInfo.target}
            onChange={(e) => updateField("target", e.target.value)}
          />
        </div>

        {/* USP */}
        <div className="space-y-2">
          <Label>
            USP / 独自の強み <span className="text-red-500">*</span>
          </Label>
          <Textarea
            placeholder="他社にはない独自の価値を記入してください"
            value={productInfo.usp}
            onChange={(e) => updateField("usp", e.target.value)}
            rows={3}
          />
        </div>

        {/* Evidence */}
        <div className="space-y-2">
          <Label>実績・証拠</Label>
          <Textarea
            placeholder="実績データ、お客様の声、メディア掲載など"
            value={productInfo.evidence}
            onChange={(e) => updateField("evidence", e.target.value)}
            rows={3}
          />
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label>ステータス</Label>
          <RadioGroup
            value={productInfo.is_new ? "new" : "existing"}
            onValueChange={(v) => updateField("is_new", v === "new")}
            className="flex items-center gap-4"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="new" id="status-new" />
              <Label htmlFor="status-new" className="font-normal">
                新規商品
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="existing" id="status-existing" />
              <Label htmlFor="status-existing" className="font-normal">
                既存商品
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end pt-4 border-t border-[#e5e5e5]">
        <Button
          onClick={handleSubmit}
          disabled={!isValid}
          className="bg-[#1a2332] hover:bg-[#1a2332]/90 text-white px-8"
        >
          次へ
        </Button>
      </div>
    </div>
  );
}
