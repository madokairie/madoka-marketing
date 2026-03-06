"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Persona, ChatMessage } from "@/lib/types";

interface StepPersonaProps {
  onNext: (data: { persona: Partial<Persona> }) => void;
  onBack: () => void;
  initialData?: { persona: Partial<Persona> };
}

const questions = [
  "この商品のメインターゲットはどんな人ですか？年齢、性別、職業、年収帯を教えてください。",
  "ターゲットが抱えている悩みや課題のTOP5を教えてください。",
  "ターゲットの理想の未来を教えてください。商品を使った後のビフォーアフターを具体的に。",
  "ターゲットが今まで試した解決策と、それがうまくいかなかった理由は？",
  "購買時にターゲットが感じる不安や反論は何ですか？",
  "ターゲットはどこで情報収集していますか？（SNS、YouTube、ブログ等）",
];

const questionKeys: (keyof Partial<Persona>)[] = [
  "demographics",
  "pain_points",
  "ideal_future",
  "past_attempts",
  "objections",
  "channels",
];

export function StepPersona({ onNext, onBack, initialData }: StepPersonaProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (initialData?.persona?.raw_conversation?.length) {
      return initialData.persona.raw_conversation;
    }
    return [
      {
        role: "assistant" as const,
        content:
          "ペルソナ設計を始めましょう。いくつかの質問に答えていただくだけで、精度の高いペルソナが完成します。",
        timestamp: new Date().toISOString(),
      },
      {
        role: "assistant" as const,
        content: questions[0],
        timestamp: new Date().toISOString(),
      },
    ];
  });

  const [currentInput, setCurrentInput] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    if (initialData?.persona?.raw_conversation?.length) {
      const userMsgCount = initialData.persona.raw_conversation.filter(
        (m) => m.role === "user"
      ).length;
      return Math.min(userMsgCount, questions.length);
    }
    return 0;
  });
  const [answers, setAnswers] = useState<string[]>(() => {
    if (initialData?.persona?.raw_conversation?.length) {
      return initialData.persona.raw_conversation
        .filter((m) => m.role === "user")
        .map((m) => m.content);
    }
    return [];
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isComplete = currentQuestionIndex >= questions.length;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentQuestionIndex]);

  const handleSend = () => {
    const text = currentInput.trim();
    if (!text || isComplete) return;

    const userMsg: ChatMessage = {
      role: "user",
      content: text,
      timestamp: new Date().toISOString(),
    };

    const newAnswers = [...answers, text];
    setAnswers(newAnswers);
    setCurrentInput("");

    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < questions.length) {
      const aiMsg: ChatMessage = {
        role: "assistant",
        content: questions[nextIndex],
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMsg, aiMsg]);
      setCurrentQuestionIndex(nextIndex);
    } else {
      const completeMsg: ChatMessage = {
        role: "assistant",
        content:
          "ペルソナ設計が完了しました。右側のプレビューで内容をご確認ください。問題なければ「次へ」をクリックしてください。",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMsg, completeMsg]);
      setCurrentQuestionIndex(nextIndex);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const buildPersona = (): Partial<Persona> => {
    return {
      demographics: answers[0]
        ? { age_range: "", gender: "", occupation: "", income: "", raw: answers[0] } as unknown as Persona["demographics"]
        : undefined,
      pain_points: answers[1] ? answers[1].split(/[、,\n]/).map((s) => s.trim()).filter(Boolean) : [],
      ideal_future: answers[2] ?? "",
      past_attempts: answers[3] ?? "",
      objections: answers[4] ? answers[4].split(/[、,\n]/).map((s) => s.trim()).filter(Boolean) : [],
      channels: answers[5] ? answers[5].split(/[、,\n]/).map((s) => s.trim()).filter(Boolean) : [],
      raw_conversation: messages,
    };
  };

  const handleNext = () => {
    onNext({ persona: buildPersona() });
  };

  const previewLabels = [
    "デモグラフィック",
    "悩み・課題",
    "理想の未来",
    "過去の解決策",
    "不安・反論",
    "情報収集チャネル",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[#2d2d2d] mb-1">ペルソナ設計</h2>
        <p className="text-sm text-[#8a8a8a]">
          AIの質問に回答して、ターゲットペルソナを作成します
        </p>
      </div>

      <div className="grid grid-cols-5 gap-6 min-h-[500px]">
        {/* Chat Area */}
        <div className="col-span-3 flex flex-col rounded-lg border border-[#e5e5e5] bg-white">
          <div className="border-b border-[#e5e5e5] px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-sm font-medium text-[#2d2d2d]">ペルソナ設計AI</span>
            </div>
          </div>

          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex gap-3",
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <Avatar size="sm">
                    <AvatarFallback
                      className={cn(
                        msg.role === "assistant"
                          ? "bg-[#1a2332] text-white"
                          : "bg-[#c9a96e] text-white"
                      )}
                    >
                      {msg.role === "assistant" ? (
                        <Bot className="h-3.5 w-3.5" />
                      ) : (
                        <User className="h-3.5 w-3.5" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                      msg.role === "assistant"
                        ? "bg-[#faf9f7] text-[#2d2d2d]"
                        : "bg-[#1a2332] text-white"
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {!isComplete && (
            <div className="border-t border-[#e5e5e5] p-3">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  placeholder="回答を入力..."
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1"
                />
                <Button
                  size="icon"
                  onClick={handleSend}
                  disabled={!currentInput.trim()}
                  className="bg-[#1a2332] hover:bg-[#1a2332]/90 text-white shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Persona Preview */}
        <div className="col-span-2 rounded-lg border border-[#e5e5e5] bg-white p-5">
          <h3 className="text-sm font-semibold text-[#1a2332] mb-4">ペルソナプレビュー</h3>
          <div className="space-y-4">
            {previewLabels.map((label, i) => (
              <div key={label}>
                <div className="text-xs font-medium text-[#8a8a8a] mb-1">{label}</div>
                <div
                  className={cn(
                    "rounded-md border px-3 py-2 text-sm min-h-[36px]",
                    answers[i]
                      ? "border-[#c9a96e]/30 bg-[#c9a96e]/5 text-[#2d2d2d]"
                      : "border-[#e5e5e5] bg-[#faf9f7] text-[#8a8a8a]"
                  )}
                >
                  {answers[i] || "未回答"}
                </div>
              </div>
            ))}
          </div>

          {isComplete && (
            <div className="mt-4 rounded-md bg-green-50 border border-green-200 p-3">
              <p className="text-xs font-medium text-green-700">
                全ての質問に回答済みです
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between pt-4 border-t border-[#e5e5e5]">
        <Button variant="outline" onClick={onBack}>
          戻る
        </Button>
        <Button
          onClick={handleNext}
          disabled={!isComplete}
          className="bg-[#1a2332] hover:bg-[#1a2332]/90 text-white px-8"
        >
          次へ
        </Button>
      </div>
    </div>
  );
}
