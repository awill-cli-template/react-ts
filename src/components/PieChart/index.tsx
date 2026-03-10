import React, { useRef, useEffect, useState, useMemo } from "react";
import ReactEcharts from "echarts-for-react";
import "echarts-gl";
import type { EChartsOption } from "echarts";
import { buildPie3DSeries } from "./utils";
import type { PieInput, Pie3DSeriesItem } from "./type";

type Pie3DChartsProps = {
  data: Array<{ name: string; data: number; color: string }>;
};

const Pie3DCharts: React.FC<Pie3DChartsProps> = ({ data }) => {
  const optionsData = useMemo(
    () =>
      data.map((item) => ({
        name: item.name,
        value: item.data,
        itemStyle: { color: item.color },
        label: {
          show: true,
          padding: 6,
          formatter: () => `{name|${item.name}}{value|${item.data}}{unit|家}`,
          rich: {
            name: {
              fontSize: 16,
              color: item.color,
              padding: [0, 12, 0, 0],
            },
            value: {
              fontSize: 18,
              color: "#fff",
            },
            unit: {
              fontSize: 12,
              color: "rgba(255,255,255,0.6)",
            },
          },
        },
      })),
    [data],
  );

  const echartsRef = useRef<ReactEcharts>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [sumValue, setSumValue] = useState(0);
  const [series, setSeries] = useState<Pie3DSeriesItem[]>([]);
  const [labelPosition, setLabelPosition] = useState<Array<"left" | "right">>([]);

  const chartOption: EChartsOption | any = useMemo(
    () => ({
      tooltip: {
        backgroundColor: "rgba(50, 170, 255, .3)",
        borderColor: "rgba(50, 170, 255, 1)",
        textStyle: { fontSize: 28, color: "#fff", fontFamily: "AlibabaPuHuiTi-Regular" },
        formatter: (params: any) => {
          if (params.seriesType === "surface") {
            return `${params.seriesName}<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>${series[params.seriesIndex - 1].pieData.value}`;
          }
        },
      },
      label: { show: true, color: "#fff" },
      xAxis3D: { min: -1, max: 1 },
      yAxis3D: { min: -1, max: 1 },
      zAxis3D: { min: -1, max: 1 },
      grid3D: {
        show: false,
        boxHeight: 5,
        boxWidth: 60,
        boxDepth: 60,
        top: -30,
        light: { main: { intensity: 0.5, shadow: true } },
        viewControl: {
          alpha: 40,
          beta: 30,
          distance: 150,
          rotateSensitivity: 0,
          zoomSensitivity: 0,
          panSensitivity: 0,
          autoRotate: false,
        },
        postEffect: {
          enable: true,
          bloom: { enable: true, bloomIntensity: 0 },
          SSAO: { enable: false, quality: "medium", radius: 2 },
        },
      },
      series: [
        {
          name: "pie2d",
          type: "pie",
          label: { opacity: 1, edgeDistance: "8%", alignTo: "edge", overflow: "none" },
          labelLayout: (params: any) => {
            const inst = echartsRef.current?.getEchartsInstance?.();
            if (!inst) return;
            const isLeft = params.labelRect.x < inst.getWidth() / 2;
            if (labelPosition.length !== optionsData.length) {
              setLabelPosition((pre) => [...pre, isLeft ? "left" : "right"]);
            }
            const points = params.labelLinePoints;
            points[2][0] = isLeft ? params.labelRect.x : params.labelRect.x + params.labelRect.width;
            return { labelLinePoints: points, verticalAlign: "bottom" };
          },
          startAngle: -35,
          clockwise: false,
          radius: ["40%", "40%"],
          center: ["50%", "45%"],
          data: optionsData.map((item, index) => ({
            ...item,
            labelLine: {
              length: "10%",
              length2: 0,
              lineStyle: {
                width: 3,
                color: {
                  type: "linear",
                  x: labelPosition[index] === "left" ? 1 : 0,
                  y: 0,
                  x2: labelPosition[index] === "left" ? 0 : 1,
                  y2: 0,
                  colorStops: [
                    { offset: 0, color: "rgba(59,209,248,.1)" },
                    { offset: 1, color: "rgba(59,209,248,1)" },
                  ],
                  global: false,
                },
              },
            },
          })),
          emphasis: { disabled: true },
          animation: false,
        },
        ...series,
      ],
    }),
    [series, labelPosition, optionsData],
  );

  useEffect(() => {
    if (echartsRef.current && sumValue) {
      const echartsInstance = echartsRef.current.getEchartsInstance();
      echartsInstance.on("finished", () => {
        setIsFinished(true);
      });
    }
  }, [sumValue]);

  useEffect(() => {
    const pieSeries = buildPie3DSeries(optionsData as unknown as PieInput[], 0.71);
    setSeries(pieSeries);
    const s = pieSeries.reduce((acc, cur) => acc + cur.pieData.value, 0);
    setSumValue(s);
  }, [optionsData]);

  return (
    <ReactEcharts
      ref={echartsRef}
      option={chartOption}
      notMerge
      lazyUpdate
      style={{ width: "100%", height: "100%", opacity: isFinished ? 1 : 0, transition: "opacity 0.3s" }}
    />
  );
};

export default Pie3DCharts;
