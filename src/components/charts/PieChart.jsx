import React from "react";
import ReactECharts from "echarts-for-react";

const PieChart = () => {
	const option = {
		title: {
			text: "Sample Pie Chart",
			subtext: "ECharts for React",
			left: "center",
		},
		tooltip: {
			trigger: "item",
		},
		legend: {
			show: false,
			orient: "vertical",
			left: "left",
		},
		series: [
			{
				name: "Access From",
				type: "pie",
				radius: "50%",
				data: [
					{ value: 1048, name: "Search Engine" },
					{ value: 735, name: "Direct" },
					{ value: 580, name: "Email" },
					{ value: 484, name: "Union Ads" },
					{ value: 300, name: "Video Ads" },
				],
				emphasis: {
					itemStyle: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: "rgba(0, 0, 0, 0.5)",
					},
				},
			},
		],
	};

	return (
		<ReactECharts
			option={option}
			style={{ height: "100%", width: "100%" }}
		/>
	);
};

export default PieChart;
