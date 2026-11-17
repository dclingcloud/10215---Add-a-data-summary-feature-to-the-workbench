export type LayoutMode = 'single' | 'double';

export type ChartVisualType = 'line' | 'bar' | 'table';

export type ChartCategory = 'IP协议统计图' | '接口指标统计图' | '应用协议分布占比';

export interface DashboardCardConfig {
  id: string;
  title: string;
  category: ChartCategory;
  visualType: ChartVisualType;
  topology: string;
  metric: string;
  showSummary: boolean;
}

export interface DashboardRow {
  id: string;
  layout: LayoutMode;
  cards: DashboardCardConfig[];
}
