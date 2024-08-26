import React from "react";
import ReactDOMServer from "react-dom/server";

// LEAFLET
import L from "leaflet";

// PIE CHART
import { PieChart } from "react-minimal-pie-chart";

const iconPieChart = (mapContext, data) => {
	// SET SIZE PIE CHART BY ZOOM
	const getSizePieChart = () => {
		if (mapContext.getZoom() <= 10) return 20;
		else if (mapContext.getZoom() <= 18) return 25;
		else return 20;
	};

	return L.divIcon({
		className: "marker-pie-chart",
		html: ReactDOMServer.renderToString(
			<div
				style={{
					width: (getSizePieChart() + 8) * 1.5,
					height: (getSizePieChart() + 8) * 1.5,
					transform: "translate(-50%, -50%)",
				}}
			>
				<PieChart
					data={data}
					radius={getSizePieChart()}
					center={[getSizePieChart() + 8, getSizePieChart() + 8]}
					viewBoxSize={[
						(getSizePieChart() + 8) * 2,
						(getSizePieChart() + 8) * 2,
					]}
					lineWidth={70}
					labelPosition={100 - 70 / 2}
				/>
			</div>
		),
	});
};

export default iconPieChart;
