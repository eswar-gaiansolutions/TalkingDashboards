import React from 'react';
import ReactECharts from 'echarts-for-react';

const StackedBarChart = () => {
  // Raw data for the chart (ensuring no negative values)
  const rawData = [
    [100, 302, 301, 334, 390, 330, 320],
    [320, 132, 101, 134, 90, 230, 210],
    [220, 182, 191, 234, 290, 330, 310],
    [150, 212, 201, 154, 190, 330, 410],
    [820, 832, 901, 934, 1290, 1330, 1320]
  ];

  // Calculate the total data for each day
  const totalData = [];
  for (let i = 0; i < rawData[0].length; ++i) {
    let sum = 0;
    for (let j = 0; j < rawData.length; ++j) {
      sum += rawData[j][i];
    }
    totalData.push(sum);
  }

  // Grid configuration for the chart
  const grid = {
    left: 100,
    right: 100,
    top: 50,
    bottom: 50
  };

  // Series configuration for the chart
  const series = [
    'Direct',
    'Mail Ad',
    'Affiliate Ad',
    'Video Ad',
    'Search Engine'
  ].map((name, sid) => {
    return {
      name,
      type: 'bar',
      stack: 'total',
      barWidth: '60%',
      label: {
        show: true,
        formatter: (params) => Math.round(params.value * 1000) / 10 + '%'
      },
      data: rawData[sid].map((d, did) =>
        totalData[did] <= 0 ? 0 : d / totalData[did]
      )
    };
  });

  // ECharts option configuration
  const option = {
    legend: {
      selectedMode: false
    },
    grid,
    yAxis: {
      type: 'value'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    series
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: '400px', width: '100%' }}
    />
  );
};

export default StackedBarChart;
