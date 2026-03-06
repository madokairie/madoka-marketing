// Project types
export type ProjectType = 'full_launch' | 'spot' | 'education' | 'evergreen';
export type ProjectStatus = 'draft' | 'active' | 'completed' | 'archived';
export type LPType = 'optin' | 'seminar' | 'sales' | 'thanks';
export type LPStatus = 'draft' | 'generating' | 'completed';
export type SectionStatus = 'draft' | 'generated' | 'edited' | 'approved';
export type DistributionType = 'step' | 'reminder' | 'follow' | 'sales' | 'countdown' | 'onboarding' | 'recovery' | 'pre_pre_launch' | 'pre_launch';
export type DistributionStatus = 'draft' | 'generated' | 'edited' | 'approved';
export type GuaranteeType = 'refund' | 'result' | 'support';
export type KnowledgeType = 'lp' | 'distribution' | 'benchmark' | 'seminar';
export type TestimonialPermission = 'public' | 'anonymous';
export type Channel = 'line' | 'email';

export interface Client {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  client_id: string;
  product_id: string | null;
  name: string;
  type: ProjectType;
  status: ProjectStatus;
  funnel_template: string | null;
  revenue_target: number;
  launch_date: string | null;
  tone_settings: ToneSettings;
  product_info: ProductInfo;
  created_at: string;
  updated_at: string;
  // Relations
  client?: Client;
  persona?: Persona;
  offer?: Offer;
  funnel?: Funnel;
}

export interface ProductInfo {
  name: string;
  description: string;
  price_range: string;
  target: string;
  usp: string;
  evidence: string;
  is_new: boolean;
  past_launch_data?: string;
}

export interface ToneSettings {
  tones: string[];
  keywords: string[];
  brand_colors: {
    main: string;
    sub: string;
    accent: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
}

export interface Persona {
  id: string;
  project_id: string;
  demographics: {
    age_range: string;
    gender: string;
    occupation: string;
    income: string;
  };
  pain_points: string[];
  ideal_future: string;
  past_attempts: string;
  objections: string[];
  channels: string[];
  language_style: string;
  raw_conversation: ChatMessage[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface Offer {
  id: string;
  project_id: string;
  regular_price: number;
  early_price: number | null;
  installment_price: number | null;
  installment_count: number | null;
  bonuses: Bonus[];
  guarantee_type: GuaranteeType;
  guarantee_detail: string;
  scarcity: { type: string; detail: string } | null;
  urgency: { type: string; detail: string } | null;
}

export interface Bonus {
  name: string;
  value: number;
  description: string;
}

export interface Funnel {
  id: string;
  project_id: string;
  template_id: string;
  is_custom: boolean;
  steps: FunnelStep[];
}

export interface FunnelStep {
  id: string;
  funnel_id: string;
  step_order: number;
  step_type: string;
  name: string;
  target_count: number;
  target_cvr: number;
  default_cvr: number;
  actual_count?: number;
  actual_cvr?: number;
}

export interface LandingPage {
  id: string;
  project_id: string;
  type: LPType;
  status: LPStatus;
  copy_score: number | null;
  score_detail: CopyScore | null;
  sections: LPSection[];
  created_at: string;
  updated_at: string;
}

export interface LPSection {
  id: string;
  landing_page_id: string;
  section_order: number;
  section_type: string;
  title: string;
  content: string;
  status: SectionStatus;
}

export interface CopyScore {
  headline: number;
  problemStatement: number;
  logicFlow: number;
  socialProof: number;
  offer: number;
  cta: number;
  objectionHandling: number;
  readability: number;
  targetFit: number;
  uniqueness: number;
  total: number;
}

export interface Distribution {
  id: string;
  project_id: string;
  type: DistributionType;
  sequence_order: number;
  scheduled_date: string | null;
  line_content: string;
  email_subject: string;
  email_preheader: string;
  email_content: string;
  status: DistributionStatus;
}

export interface LaunchMetric {
  id: string;
  project_id: string;
  date: string;
  metrics: Record<string, number>;
  revenue: number;
  memo: string;
}

export interface LaunchReport {
  id: string;
  project_id: string;
  summary: ReportSummary;
  generated_at: string;
}

export interface ReportSummary {
  total_revenue: number;
  total_conversions: number;
  roas: number | null;
  funnel_performance: Record<string, { target: number; actual: number; cvr: number }>;
  wins: string[];
  improvements: string[];
  recommendations: string[];
}

export interface Testimonial {
  id: string;
  client_id: string | null;
  product_id: string | null;
  name: string;
  content: string;
  before_state: string;
  after_state: string;
  tags: string[];
  permission: TestimonialPermission;
  media_urls: string[];
  created_at: string;
}

export interface KnowledgeItem {
  id: string;
  type: KnowledgeType;
  title: string;
  content: string;
  source_url: string | null;
  tags: string[];
  analysis: Record<string, unknown> | null;
  created_at: string;
}

export interface CalendarEvent {
  id: string;
  project_id: string;
  date: string;
  type: DistributionType;
  title: string;
  distribution_id: string | null;
  completed: boolean;
}

export interface AIDiagnosis {
  bottlenecks: {
    step_name: string;
    actual_cvr: number;
    target_cvr: number;
    severity: 'critical' | 'warning' | 'ok';
    hypotheses: string[];
    actions: ActionSuggestion[];
  }[];
  wins: {
    step_name: string;
    actual_cvr: number;
    target_cvr: number;
    analysis: string;
  }[];
  overall_assessment: string;
}

export interface ActionSuggestion {
  title: string;
  description: string;
  content_type: 'distribution' | 'lp_section';
  priority: 'high' | 'medium' | 'low';
}

// Funnel templates
export interface FunnelTemplate {
  id: string;
  name: string;
  description: string;
  project_type: ProjectType;
  steps: Omit<FunnelStep, 'id' | 'funnel_id' | 'actual_count' | 'actual_cvr'>[];
}
