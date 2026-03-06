import type { FunnelTemplate, ProjectType } from '@/lib/types';

export const FUNNEL_TEMPLATES: FunnelTemplate[] = [
  {
    id: 'A',
    name: 'オプトイン → セミナー → 個別相談 → 成約',
    description: '高単価商品向けの王道ファネル。セミナーで教育し、個別相談でクロージング。',
    project_type: 'full_launch',
    steps: [
      { step_order: 1, step_type: 'lp_visit', name: 'LP流入', target_count: 0, target_cvr: 0, default_cvr: 100 },
      { step_order: 2, step_type: 'optin', name: 'オプトイン登録', target_count: 0, target_cvr: 0, default_cvr: 20 },
      { step_order: 3, step_type: 'seminar_apply', name: 'セミナー申込', target_count: 0, target_cvr: 0, default_cvr: 50 },
      { step_order: 4, step_type: 'seminar_attend', name: 'セミナー着席', target_count: 0, target_cvr: 0, default_cvr: 70 },
      { step_order: 5, step_type: 'consultation', name: '個別相談申込', target_count: 0, target_cvr: 0, default_cvr: 20 },
      { step_order: 6, step_type: 'conversion', name: '成約', target_count: 0, target_cvr: 0, default_cvr: 50 },
    ],
  },
  {
    id: 'B',
    name: 'オプトイン → ステップ配信 → セールスLP → 成約',
    description: '中単価商品向け。ステップ配信で教育し、セールスLPでクロージング。',
    project_type: 'full_launch',
    steps: [
      { step_order: 1, step_type: 'lp_visit', name: 'LP流入', target_count: 0, target_cvr: 0, default_cvr: 100 },
      { step_order: 2, step_type: 'optin', name: 'オプトイン登録', target_count: 0, target_cvr: 0, default_cvr: 20 },
      { step_order: 3, step_type: 'sales_page', name: 'セールスLP到達', target_count: 0, target_cvr: 0, default_cvr: 40 },
      { step_order: 4, step_type: 'conversion', name: '成約', target_count: 0, target_cvr: 0, default_cvr: 5 },
    ],
  },
  {
    id: 'C',
    name: 'VSL → セールスLP → 成約',
    description: 'VSL（動画セールスレター）で一気にクロージング。',
    project_type: 'full_launch',
    steps: [
      { step_order: 1, step_type: 'lp_visit', name: 'VSLページ流入', target_count: 0, target_cvr: 0, default_cvr: 100 },
      { step_order: 2, step_type: 'vsl_watch', name: 'VSL視聴完了', target_count: 0, target_cvr: 0, default_cvr: 30 },
      { step_order: 3, step_type: 'sales_page', name: 'セールスLP到達', target_count: 0, target_cvr: 0, default_cvr: 60 },
      { step_order: 4, step_type: 'conversion', name: '成約', target_count: 0, target_cvr: 0, default_cvr: 5 },
    ],
  },
  {
    id: 'D',
    name: 'SNS → オプトイン → ローンチ配信 → セールス → 成約',
    description: 'ローンチ形式。プリプリ→プリ→ローンチの段階的配信。',
    project_type: 'full_launch',
    steps: [
      { step_order: 1, step_type: 'sns_reach', name: 'SNSリーチ', target_count: 0, target_cvr: 0, default_cvr: 100 },
      { step_order: 2, step_type: 'optin', name: 'オプトイン登録', target_count: 0, target_cvr: 0, default_cvr: 5 },
      { step_order: 3, step_type: 'sales_page', name: 'セールスLP到達', target_count: 0, target_cvr: 0, default_cvr: 50 },
      { step_order: 4, step_type: 'conversion', name: '成約', target_count: 0, target_cvr: 0, default_cvr: 3 },
    ],
  },
  {
    id: 'S1',
    name: 'ハウスリスト配信 → セールスLP → 成約',
    description: 'スポット販売。既存リストにオファーを配信。',
    project_type: 'spot',
    steps: [
      { step_order: 1, step_type: 'list_send', name: '配信数', target_count: 0, target_cvr: 0, default_cvr: 100 },
      { step_order: 2, step_type: 'click', name: 'クリック', target_count: 0, target_cvr: 0, default_cvr: 15 },
      { step_order: 3, step_type: 'sales_page', name: 'セールスLP到達', target_count: 0, target_cvr: 0, default_cvr: 80 },
      { step_order: 4, step_type: 'conversion', name: '購入', target_count: 0, target_cvr: 0, default_cvr: 5 },
    ],
  },
  {
    id: 'S2',
    name: 'ハウスリスト配信 → 申込フォーム → 成約',
    description: 'シンプルなスポット販売。フォーム直結。',
    project_type: 'spot',
    steps: [
      { step_order: 1, step_type: 'list_send', name: '配信数', target_count: 0, target_cvr: 0, default_cvr: 100 },
      { step_order: 2, step_type: 'click', name: 'クリック', target_count: 0, target_cvr: 0, default_cvr: 15 },
      { step_order: 3, step_type: 'conversion', name: '購入', target_count: 0, target_cvr: 0, default_cvr: 8 },
    ],
  },
  {
    id: 'EG1',
    name: '広告/SNS → オプトインLP → ステップ配信 → セールスLP → 成約',
    description: 'エバーグリーンファネル。常時稼働で自動集客・販売。',
    project_type: 'evergreen',
    steps: [
      { step_order: 1, step_type: 'ad_reach', name: '広告/SNS流入', target_count: 0, target_cvr: 0, default_cvr: 100 },
      { step_order: 2, step_type: 'optin', name: 'オプトイン登録', target_count: 0, target_cvr: 0, default_cvr: 25 },
      { step_order: 3, step_type: 'sales_page', name: 'セールスLP到達', target_count: 0, target_cvr: 0, default_cvr: 30 },
      { step_order: 4, step_type: 'conversion', name: '成約', target_count: 0, target_cvr: 0, default_cvr: 3 },
    ],
  },
];

export function getTemplatesForType(type: ProjectType): FunnelTemplate[] {
  return FUNNEL_TEMPLATES.filter((t) => t.project_type === type);
}

export function getTemplate(id: string): FunnelTemplate | undefined {
  return FUNNEL_TEMPLATES.find((t) => t.id === id);
}

export function calculateKPI(
  revenueTarget: number,
  productPrice: number,
  steps: { step_type: string; default_cvr: number; target_cvr: number }[]
): { step_type: string; target_count: number }[] {
  const requiredConversions = Math.ceil(revenueTarget / productPrice);
  const result: { step_type: string; target_count: number }[] = [];

  let currentCount = requiredConversions;
  for (let i = steps.length - 1; i >= 0; i--) {
    const step = steps[i];
    result.unshift({
      step_type: step.step_type,
      target_count: currentCount,
    });
    if (i > 0) {
      const cvr = (step.target_cvr || step.default_cvr) / 100;
      currentCount = Math.ceil(currentCount / cvr);
    }
  }

  return result;
}
