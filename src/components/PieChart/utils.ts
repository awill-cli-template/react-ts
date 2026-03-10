import type { ParametricEquation, PieInput, Pie3DSeriesItem } from "./type";

export function getParametricEquation(startRatio: number, endRatio: number, k: number, h: number): ParametricEquation {
  const startRadian = startRatio * Math.PI * 2;
  const endRadian = endRatio * Math.PI * 2;
  return {
    u: { min: -Math.PI, max: Math.PI * 3, step: Math.PI / 32 },
    v: { min: 0, max: Math.PI * 2, step: Math.PI / 20 },
    x(u, v) {
      if (u < startRadian) {
        return Math.cos(startRadian) * (1 + Math.cos(v) * k);
      }
      if (u > endRadian) {
        return Math.cos(endRadian) * (1 + Math.cos(v) * k);
      }
      return Math.cos(u) * (1 + Math.cos(v) * k);
    },
    y(u, v) {
      if (u < startRadian) {
        return Math.sin(startRadian) * (1 + Math.cos(v) * k);
      }
      if (u > endRadian) {
        return Math.sin(endRadian) * (1 + Math.cos(v) * k);
      }
      return Math.sin(u) * (1 + Math.cos(v) * k);
    },
    z(u, v) {
      if (u < -Math.PI * 0.5) {
        return Math.sin(u);
      }
      if (u > Math.PI * 2.5) {
        return Math.sin(u) * h * 0.1;
      }
      return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
    },
  };
}

export function buildPie3DSeries(pieData: PieInput[], internalDiameterRatio?: number): Pie3DSeriesItem[] {
  const seriesTemp: Pie3DSeriesItem[] = [];
  let startValue = 0;
  let endValue = 0;
  let sumValue = 0;
  const k =
    typeof internalDiameterRatio !== "undefined" ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio) : 1 / 3;

  for (let i = 0; i < pieData.length; i += 1) {
    sumValue += pieData[i].value;
    const seriesItem: Pie3DSeriesItem = {
      name: typeof pieData[i].name === "undefined" ? `series${i}` : String(pieData[i].name),
      type: "surface",
      parametric: true as const,
      wireframe: { show: false },
      pieData: pieData[i],
      pieStatus: { selected: false, hovered: false, k },
      itemStyle: {},
    };
    if (typeof pieData[i].itemStyle !== "undefined") {
      const itemStyle: Record<string, unknown> = {};
      if (typeof pieData[i].itemStyle?.color !== "undefined") {
        itemStyle.color = pieData[i].itemStyle!.color;
      }
      itemStyle.opacity = 1;
      seriesItem.itemStyle = itemStyle;
    }
    seriesTemp.push(seriesItem);
  }

  for (let i = 0; i < seriesTemp.length; i += 1) {
    endValue = startValue + seriesTemp[i].pieData.value;
    seriesTemp[i].pieData.startRatio = startValue / sumValue;
    seriesTemp[i].pieData.endRatio = endValue / sumValue;
    seriesTemp[i].parametricEquation = getParametricEquation(
      seriesTemp[i].pieData.startRatio!,
      seriesTemp[i].pieData.endRatio!,
      k,
      Math.max(Math.min(seriesTemp[i].pieData.value / sumValue, 0.5), 0.1) * 100,
    );
    startValue = endValue;
  }
  return seriesTemp;
}
