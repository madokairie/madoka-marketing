"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Offer, Bonus, GuaranteeType } from "@/lib/types";

interface StepOfferProps {
  onNext: (data: { offer: Partial<Offer> }) => void;
  onBack: () => void;
  initialData?: { offer: Partial<Offer> };
}

export function StepOffer({ onNext, onBack, initialData }: StepOfferProps) {
  const [regularPrice, setRegularPrice] = useState<string>(
    initialData?.offer?.regular_price?.toString() ?? ""
  );
  const [earlyPrice, setEarlyPrice] = useState<string>(
    initialData?.offer?.early_price?.toString() ?? ""
  );
  const [installmentPrice, setInstallmentPrice] = useState<string>(
    initialData?.offer?.installment_price?.toString() ?? ""
  );
  const [installmentCount, setInstallmentCount] = useState<string>(
    initialData?.offer?.installment_count?.toString() ?? ""
  );
  const [bonuses, setBonuses] = useState<Bonus[]>(
    initialData?.offer?.bonuses ?? [{ name: "", value: 0, description: "" }]
  );
  const [guaranteeType, setGuaranteeType] = useState<GuaranteeType>(
    initialData?.offer?.guarantee_type ?? "refund"
  );
  const [guaranteeDetail, setGuaranteeDetail] = useState(
    initialData?.offer?.guarantee_detail ?? ""
  );
  const [scarcityType, setScarcityType] = useState(
    initialData?.offer?.scarcity?.type ?? "none"
  );
  const [scarcityDetail, setScarcityDetail] = useState(
    initialData?.offer?.scarcity?.detail ?? ""
  );
  const [urgencyType, setUrgencyType] = useState(
    initialData?.offer?.urgency?.type ?? "none"
  );
  const [urgencyDetail, setUrgencyDetail] = useState(
    initialData?.offer?.urgency?.detail ?? ""
  );

  const addBonus = () => {
    setBonuses((prev) => [...prev, { name: "", value: 0, description: "" }]);
  };

  const removeBonus = (index: number) => {
    setBonuses((prev) => prev.filter((_, i) => i !== index));
  };

  const updateBonus = (index: number, field: keyof Bonus, value: string | number) => {
    setBonuses((prev) =>
      prev.map((b, i) => (i === index ? { ...b, [field]: value } : b))
    );
  };

  const isValid = regularPrice.trim() !== "" && Number(regularPrice) > 0;

  const handleSubmit = () => {
    if (!isValid) return;
    const offer: Partial<Offer> = {
      regular_price: Number(regularPrice),
      early_price: earlyPrice ? Number(earlyPrice) : null,
      installment_price: installmentPrice ? Number(installmentPrice) : null,
      installment_count: installmentCount ? Number(installmentCount) : null,
      bonuses: bonuses.filter((b) => b.name.trim() !== ""),
      guarantee_type: guaranteeType,
      guarantee_detail: guaranteeDetail,
      scarcity:
        scarcityType !== "none" ? { type: scarcityType, detail: scarcityDetail } : null,
      urgency:
        urgencyType !== "none" ? { type: urgencyType, detail: urgencyDetail } : null,
    };
    onNext({ offer });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-[#2d2d2d] mb-1">オファー設計</h2>
        <p className="text-sm text-[#8a8a8a]">
          価格設定、特典、保証、限定性を設計します
        </p>
      </div>

      {/* Pricing */}
      <div className="space-y-5">
        <h3 className="text-sm font-semibold text-[#1a2332] border-b border-[#e5e5e5] pb-2">
          価格設定
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>
              通常価格 <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#8a8a8a]">
                ¥
              </span>
              <Input
                type="number"
                placeholder="298000"
                value={regularPrice}
                onChange={(e) => setRegularPrice(e.target.value)}
                className="pl-7"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>早期割引価格</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#8a8a8a]">
                ¥
              </span>
              <Input
                type="number"
                placeholder="198000"
                value={earlyPrice}
                onChange={(e) => setEarlyPrice(e.target.value)}
                className="pl-7"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>分割価格</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#8a8a8a]">
                ¥
              </span>
              <Input
                type="number"
                placeholder="49800"
                value={installmentPrice}
                onChange={(e) => setInstallmentPrice(e.target.value)}
                className="pl-7"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>分割回数</Label>
            <Input
              type="number"
              placeholder="6"
              value={installmentCount}
              onChange={(e) => setInstallmentCount(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Bonuses */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#e5e5e5] pb-2">
          <h3 className="text-sm font-semibold text-[#1a2332]">特典リスト</h3>
          <Button variant="outline" size="sm" onClick={addBonus} className="gap-1">
            <Plus className="h-3.5 w-3.5" />
            追加
          </Button>
        </div>

        <div className="space-y-3">
          {bonuses.map((bonus, index) => (
            <div
              key={index}
              className="flex items-start gap-3 rounded-lg border border-[#e5e5e5] bg-[#faf9f7] p-3"
            >
              <div className="flex-1 grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">特典名</Label>
                  <Input
                    placeholder="例: 個別コンサルティング"
                    value={bonus.name}
                    onChange={(e) => updateBonus(index, "name", e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">価値（円）</Label>
                  <Input
                    type="number"
                    placeholder="50000"
                    value={bonus.value || ""}
                    onChange={(e) => updateBonus(index, "value", Number(e.target.value))}
                  />
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => removeBonus(index)}
                className="mt-5 text-[#8a8a8a] hover:text-red-500"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Guarantee */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-[#1a2332] border-b border-[#e5e5e5] pb-2">
          保証
        </h3>

        <div className="space-y-3">
          <Label>保証タイプ</Label>
          <RadioGroup
            value={guaranteeType}
            onValueChange={(v) => setGuaranteeType(v as GuaranteeType)}
            className="flex items-center gap-4"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="refund" id="guarantee-refund" />
              <Label htmlFor="guarantee-refund" className="font-normal">
                返金保証
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="result" id="guarantee-result" />
              <Label htmlFor="guarantee-result" className="font-normal">
                成果保証
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="support" id="guarantee-support" />
              <Label htmlFor="guarantee-support" className="font-normal">
                サポート保証
              </Label>
            </div>
          </RadioGroup>

          <div className="space-y-2">
            <Label>保証詳細</Label>
            <Textarea
              placeholder="保証の具体的な内容を記入してください"
              value={guaranteeDetail}
              onChange={(e) => setGuaranteeDetail(e.target.value)}
              rows={2}
            />
          </div>
        </div>
      </div>

      {/* Scarcity & Urgency */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-[#1a2332] border-b border-[#e5e5e5] pb-2">
            限定性
          </h3>
          <Select value={scarcityType} onValueChange={setScarcityType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="選択してください" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">なし</SelectItem>
              <SelectItem value="quantity">人数限定</SelectItem>
              <SelectItem value="period">期間限定</SelectItem>
            </SelectContent>
          </Select>
          {scarcityType !== "none" && (
            <Input
              placeholder="例: 先着30名限定"
              value={scarcityDetail}
              onChange={(e) => setScarcityDetail(e.target.value)}
            />
          )}
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-[#1a2332] border-b border-[#e5e5e5] pb-2">
            緊急性
          </h3>
          <Select value={urgencyType} onValueChange={setUrgencyType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="選択してください" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">なし</SelectItem>
              <SelectItem value="countdown">カウントダウン</SelectItem>
              <SelectItem value="early_bonus">早期特典</SelectItem>
              <SelectItem value="price_increase">段階値上げ</SelectItem>
            </SelectContent>
          </Select>
          {urgencyType !== "none" && (
            <Input
              placeholder="例: 48時間限定で特別価格"
              value={urgencyDetail}
              onChange={(e) => setUrgencyDetail(e.target.value)}
            />
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between pt-4 border-t border-[#e5e5e5]">
        <Button variant="outline" onClick={onBack}>
          戻る
        </Button>
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
