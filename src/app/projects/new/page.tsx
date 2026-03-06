"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AppLayout } from "@/components/layout/app-layout";
import { WizardProgress } from "@/components/project/wizard-progress";
import { StepProductInfo } from "@/components/project/step-product-info";
import { StepPersona } from "@/components/project/step-persona";
import { StepOffer } from "@/components/project/step-offer";
import { StepTone } from "@/components/project/step-tone";
import type {
  ProjectType,
  ProductInfo,
  Persona,
  Offer,
  ToneSettings,
} from "@/lib/types";

interface WizardData {
  projectType: ProjectType;
  productInfo: ProductInfo;
  clientName: string;
  persona: Partial<Persona>;
  offer: Partial<Offer>;
  toneSettings: ToneSettings;
}

export default function NewProjectPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [wizardData, setWizardData] = useState<Partial<WizardData>>({});

  const markCompleted = (step: number) => {
    setCompletedSteps((prev) => (prev.includes(step) ? prev : [...prev, step]));
  };

  const handleStep1Next = (data: {
    projectType: ProjectType;
    productInfo: ProductInfo;
    clientName: string;
  }) => {
    setWizardData((prev) => ({ ...prev, ...data }));
    markCompleted(1);
    setCurrentStep(2);
  };

  const handleStep2Next = (data: { persona: Partial<Persona> }) => {
    setWizardData((prev) => ({ ...prev, ...data }));
    markCompleted(2);
    setCurrentStep(3);
  };

  const handleStep3Next = (data: { offer: Partial<Offer> }) => {
    setWizardData((prev) => ({ ...prev, ...data }));
    markCompleted(3);
    setCurrentStep(4);
  };

  const handleStep4Submit = (data: { toneSettings: ToneSettings }) => {
    setWizardData((prev) => ({ ...prev, ...data }));
    markCompleted(4);

    // For now, just redirect with a toast
    toast.success("プロジェクトを作成しました", {
      description: "ダッシュボードにリダイレクトします",
    });
    router.push("/dashboard");
  };

  const goBack = (toStep: number) => {
    setCurrentStep(toStep);
  };

  return (
    <AppLayout>
      <div className="max-w-[800px] mx-auto">
        <div className="mb-2">
          <h1 className="text-2xl font-bold text-[#1a2332]">新規プロジェクト作成</h1>
          <p className="text-sm text-[#8a8a8a] mt-1">
            4つのステップでプロジェクトをセットアップします
          </p>
        </div>

        <WizardProgress currentStep={currentStep} completedSteps={completedSteps} />

        <div className="rounded-xl border border-[#e5e5e5] bg-white p-6 shadow-sm">
          {currentStep === 1 && (
            <StepProductInfo
              onNext={handleStep1Next}
              initialData={
                wizardData.projectType
                  ? {
                      projectType: wizardData.projectType,
                      productInfo: wizardData.productInfo!,
                      clientName: wizardData.clientName!,
                    }
                  : undefined
              }
            />
          )}
          {currentStep === 2 && (
            <StepPersona
              onNext={handleStep2Next}
              onBack={() => goBack(1)}
              initialData={
                wizardData.persona ? { persona: wizardData.persona } : undefined
              }
            />
          )}
          {currentStep === 3 && (
            <StepOffer
              onNext={handleStep3Next}
              onBack={() => goBack(2)}
              initialData={
                wizardData.offer ? { offer: wizardData.offer } : undefined
              }
            />
          )}
          {currentStep === 4 && (
            <StepTone
              onSubmit={handleStep4Submit}
              onBack={() => goBack(3)}
              initialData={
                wizardData.toneSettings
                  ? { toneSettings: wizardData.toneSettings }
                  : undefined
              }
            />
          )}
        </div>
      </div>
    </AppLayout>
  );
}
