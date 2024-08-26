import React, { useEffect, useState } from "react";
import { transformDataForLineChart } from "../../utils/dataTransformer";
import testData from "../../data/testData.json";
import "./ChartsDashboard.css";
// import GujaratMapWithPieCharts from "../GujaratMapWithPieCharts";
import LineChart from "../LineChart/LineChart";
import StackedBarChart from "../StackedBarChart";
import MapParentContainer from "../map/MapParentContainer";

const ChartsDashboard = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		// Access the named data from the JSON file
		setData(testData.lineChartData);
	}, []);

	const transformedData = transformDataForLineChart(data, "query");

	return (
		<div className="dashboardContainer">
			<div className="dashboardItemquad1">
				<MapParentContainer />
			</div>
			<div className="dashboardItemquad2">
				//Here add the pie chart
				<LineChart data={transformedData} />
			</div>
			<div className="dashboardItemquad3">
				<LineChart data={transformedData} />
			</div>
			<div className="dashboardItemquad4">
				<StackedBarChart />
			</div>
		</div>
	);
};

export default ChartsDashboard;
