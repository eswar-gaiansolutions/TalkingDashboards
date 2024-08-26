import React from "react";
import ReactDOMServer from "react-dom/server";

// LEAFLET
import L from "leaflet";

// PIE CHART
import { PieChart } from "react-minimal-pie-chart";

const iconPieChart = (mapContext) => {
	// SET SIZE PIE CHART BY ZOOM
	const getSizePieChart = () => {
		if (mapContext.getZoom() <= 10) return 20;
		else if (mapContext.getZoom() <= 18) return 25;
		else return 20;
	};

	// SET STATIC DATA FOR PIE CHART
	const getDataPieChart = () => {
		return [
			{
				title: "Accidents",
				value: 10,
				color: "#E38627",
			},
			{
				title: "Traffic Jams",
				value: 5,
				color: "#C13C37",
			},
			{
				title: "Roadblocks",
				value: 3,
				color: "#6A2135",
			},
		];
	};

	return L.divIcon({
		className: "marker-pie-chart",
		html: ReactDOMServer.renderToString(
			<div
				style={{
					width: (getSizePieChart() + 8) * 2,
					height: (getSizePieChart() + 8) * 2,
					transform: "translate(-50%, -50%)",
				}}
			>
				<PieChart
					data={getDataPieChart()}
					radius={getSizePieChart()}
					center={[getSizePieChart() + 8, getSizePieChart() + 8]}
					viewBoxSize={[
						(getSizePieChart() + 8) * 2,
						(getSizePieChart() + 8) * 2,
					]}
					lineWidth={70}
					label={({ dataEntry }) => dataEntry.value}
					labelPosition={100 - 70 / 2}
				/>
			</div>
		),
	});
};

export default iconPieChart;
