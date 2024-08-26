import React from "react";
import ReactECharts from "echarts-for-react";

const LineChart = ({ data }) => {
const option = {
  tooltip: {
    trigger: "axis",
    formatter: function (params) {
      let result = `${params[0].name}<br/>`;
      params.forEach((item) => {
        result += `${item.marker}${item.seriesName}: ${
          item.value / 1000
        }k<br/>`;
      });
      return result;
    },
  },
  legend: {
    data:
      data.length > 0
        ? Object.keys(data[0]).filter((key) => key !== "year")
        : [],
  },
  xAxis: {
    type: "category",
    data: data.map((item) => item.year),
  },
  yAxis: {
    type: "value",
    axisLabel: {
      formatter: function (value) {
        return `${value / 1000}k`;
      },
    },
  },
  series: Object.keys(data[0] || {})
    .filter((key) => key !== "year")
    .map((MIA) => ({
      name: MIA,
      type: "line",
      data: data.map((item) => item[MIA] || 0),
    })),
};
  return (
    <ReactECharts
      option={option}
      style={{ width: "50vw", height: "50vh" }}
      notMerge={true}
      lazyUpdate={true}
      theme={"light"}
    />
  );
};

export default LineChart;
