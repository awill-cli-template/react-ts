import type { EChartsOption, ECElementEvent, SeriesOption } from "echarts";

export interface ChartProps {
  xAxisData?: Array<string | number>;
  series: SeriesOption[];
  loading?: boolean;
  extraOption?: EChartsOption;
  onEvents?: Record<string, (_event: ECElementEvent) => void>;
  dataZoomAutoPlay?: {
    enabled?: boolean;
    visiblePoints?: number;
    intervalMs?: number;
  };
}
