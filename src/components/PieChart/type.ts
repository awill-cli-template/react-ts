export type ParametricEquation = {
  u: { min: number; max: number; step: number };
  v: { min: number; max: number; step: number };
  x: (u: number, v: number) => number;
  y: (u: number, v: number) => number;
  z: (u: number, v: number) => number;
};

export type PieInput = {
  name?: string;
  value: number;
  itemStyle?: { color?: string };
};

export type Pie3DSeriesItem = {
  name: string;
  type: "surface";
  parametric: true;
  wireframe: { show: boolean };
  pieData: PieInput & { startRatio?: number; endRatio?: number };
  pieStatus: { selected: boolean; hovered: boolean; k: number };
  itemStyle: Record<string, unknown>;
  parametricEquation?: ParametricEquation;
};
