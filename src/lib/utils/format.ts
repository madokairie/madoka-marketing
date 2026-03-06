export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('ja-JP').format(value);
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(date));
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

export function getScoreColor(score: number): string {
  if (score >= 80) return 'text-green-700';
  if (score >= 60) return 'text-amber-600';
  return 'text-red-600';
}

export function getScoreBgColor(score: number): string {
  if (score >= 80) return 'bg-green-50 border-green-200';
  if (score >= 60) return 'bg-amber-50 border-amber-200';
  return 'bg-red-50 border-red-200';
}

export function getAchievementColor(actual: number, target: number): string {
  const ratio = target > 0 ? actual / target : 0;
  if (ratio >= 1) return 'text-green-700';
  if (ratio >= 0.8) return 'text-amber-600';
  return 'text-red-600';
}

export function getAchievementBadgeVariant(actual: number, target: number): 'default' | 'secondary' | 'destructive' {
  const ratio = target > 0 ? actual / target : 0;
  if (ratio >= 1) return 'default';
  if (ratio >= 0.8) return 'secondary';
  return 'destructive';
}
