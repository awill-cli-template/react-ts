import React, { useEffect, useMemo, useRef, useCallback } from "react";
import ReactECharts from "echarts-for-react";
import { merge } from "lodash";
import type { EChartsOption } from "echarts";
import type { ChartProps } from "./type";

const Chart: React.FC<ChartProps> = ({
  xAxisData,
  series,
  loading = false,
  extraOption = {},
  onEvents,
  dataZoomAutoPlay = {
    enabled: false,
  },
}) => {
  const chartRef = useRef<ReactECharts>(null);
  const intervalRef = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const cursorRef = useRef(0);

  const baseOption: EChartsOption = useMemo(
    () => ({
      tooltip: {
        trigger: "axis",
        padding: 10,
        backgroundColor: "rgba(50, 170, 255, .3)",
        borderColor: "rgba(50, 170, 255, 1)",
        textStyle: { color: "#fff" },
      },
      grid: {
        top: 60,
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: xAxisData,
        axisLine: { lineStyle: { color: "#ccc" } },
      },
      yAxis: {
        type: "value",
        splitLine: { lineStyle: { type: "dashed" } },
      },
    }),
    [xAxisData],
  );

  const optionComputed = useMemo(() => {
    const endValue = (dataZoomAutoPlay?.visiblePoints ?? 5) - 1;
    const dz: EChartsOption["dataZoom"] = [{ type: "inside", zoomLock: true, startValue: 0, endValue }];
    return merge({}, baseOption, { dataZoom: dz }, { series }, extraOption);
  }, [baseOption, series, extraOption, dataZoomAutoPlay?.visiblePoints]);

  const stop = useCallback(() => {
    if (intervalRef.current != null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const tick = useCallback(() => {
    const inst = chartRef.current?.getEchartsInstance?.();
    if (!inst) return;
    const len = Array.isArray(xAxisData) ? xAxisData.length : 0;
    if (!len) return;
    let start = cursorRef.current;
    const count = dataZoomAutoPlay?.visiblePoints ?? 5;
    let end = start + count - 1;
    if (end >= len) {
      start = 0;
      end = count - 1;
      cursorRef.current = 1;
    } else {
      cursorRef.current = start + 1;
    }
    inst.setOption({ dataZoom: [{ type: "inside", startValue: start, endValue: end }] }, false);
  }, [xAxisData, dataZoomAutoPlay?.visiblePoints]);

  const start = useCallback(() => {
    if (!dataZoomAutoPlay?.enabled) return;
    if (pausedRef.current) return;
    if (intervalRef.current != null) return;
    const interval = dataZoomAutoPlay?.intervalMs ?? 2000;
    intervalRef.current = window.setInterval(() => {
      tick();
    }, interval);
  }, [dataZoomAutoPlay?.enabled, dataZoomAutoPlay?.intervalMs, tick]);

  useEffect(() => {
    stop();
    cursorRef.current = 0;
    if (dataZoomAutoPlay?.enabled && xAxisData?.length) {
      start();
    }
    return () => {
      stop();
    };
  }, [xAxisData, dataZoomAutoPlay?.enabled, start, stop]);

  const handleMouseEnter = useCallback(() => {
    pausedRef.current = true;
    stop();
  }, [stop]);

  const handleMouseLeave = useCallback(() => {
    pausedRef.current = false;
    start();
  }, [start]);

  return (
    <div style={{ height: "100%", width: "100%" }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <ReactECharts
        ref={chartRef}
        option={optionComputed}
        style={{ height: "100%", width: "100%" }}
        showLoading={loading}
        notMerge
        onEvents={onEvents}
      />
    </div>
  );
};

export default Chart;
