import { NavLink } from "react-router-dom";
import Chart from "components/Chart";
import type { ECElementEvent, SeriesOption } from "echarts";
import * as echarts from "echarts";
import { useMemo, useState } from "react";
import Pie3DCharts from "components/PieChart";

const Home = () => {
  const [data, setData] = useState([120, 132, 101, 134, 90, 230, 210]);
  const [xAxisData, setXAxisData] = useState(["周一", "周二", "周三", "周四", "周五", "周六", "周日"]);
  const series: SeriesOption[] = useMemo(
    () => [
      {
        name: "访问量",
        type: "bar",
        data,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#32aaff" },
            { offset: 1, color: "#3275ff" },
          ]),
        },
      },
    ],
    [data],
  );
  const seriesPie: SeriesOption[] = [
    {
      name: "访问量",
      type: "pie",
      radius: "55%",
      data: [
        { value: 120, name: "周一" },
        { value: 132, name: "周二" },
        { value: 101, name: "周三" },
        { value: 134, name: "周四" },
        { value: 90, name: "周五" },
        { value: 230, name: "周六" },
        { value: 210, name: "周日" },
      ],
    },
  ];
  const pie3dData = [
    { name: "直接访问", data: 335, color: "#5B8FF9" },
    { name: "邮件营销", data: 310, color: "#5AD8A6" },
    { name: "联盟广告", data: 234, color: "#5D7092" },
    { name: "视频广告", data: 135, color: "#F6BD16" },
    { name: "搜索引擎", data: 548, color: "#E8684A" },
  ];
  const handleClick = (params: ECElementEvent) => {
    // 这里可以根据 params 定位到点击的数据点或系列
    console.log("chart:click", params);
  };
  const handleMouseOver = (params: ECElementEvent) => {
    console.log("chart:mouseover", params);
  };
  return (
    <div>
      <h1>Home</h1>
      <NavLink to="/about">Go About</NavLink>
      <button
        onClick={() => {
          setData([100, 200, 150, 300, 250, 400, 350]);
          setXAxisData(["周六", "周日", "周一", "周二", "周三", "周四", "周五"]);
        }}
      >
        点击
      </button>
      <div style={{ height: 360, width: 500 }} className="mt-6">
        <Chart
          xAxisData={xAxisData}
          series={series}
          extraOption={{
            legend: { top: 0, right: 0 },
            grid: { left: 20, right: 20 },
          }}
          dataZoomAutoPlay={{ enabled: true, visiblePoints: 5 }}
          onEvents={{
            click: handleClick,
            mouseover: handleMouseOver,
          }}
        />
      </div>
      <div style={{ height: 360, width: 500 }} className="mt-6">
        <Chart
          series={seriesPie}
          extraOption={{
            legend: { top: 0, right: 0 },
            grid: { left: 20, right: 20 },
            tooltip: { trigger: "item" },
          }}
          onEvents={{
            click: handleClick,
            mouseover: handleMouseOver,
          }}
        />
      </div>
      <div style={{ height: 500, width: 600 }} className="mt-6">
        <Pie3DCharts data={pie3dData} />
      </div>
    </div>
  );
};

export default Home;
