import React from "react";
import ReactECharts from "echarts-for-react";

const PieChart = ({ option }) => {
	return (
		<ReactECharts
			option={option}
			style={{ height: "100%", width: "100%" }}
		/>
	);
};

export default PieChart;
