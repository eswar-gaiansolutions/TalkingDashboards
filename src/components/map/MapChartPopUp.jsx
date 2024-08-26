import React, { useState, useRef, useEffect } from "react";
import { Marker, Popup } from "react-leaflet";
import PieChart from "../charts/PieChart";
import { convertEChartsDataToCustomFormat } from "../../lib/utils";
import { data } from "../../data/pi-chart";
import iconPieChart from "../charts/iconPieChart";

function MapChartPopUp({ position, map }) {
	const [isOpen, setOpen] = useState(false);
	const [option, setOption] = useState(data);
	const [iconOptions, setIconOptions] = useState(null);
	const markerRef = useRef(null);

	const handleMarkerClick = () => {
		setOpen(true);
	};

	useEffect(() => {
		const customData = convertEChartsDataToCustomFormat(data);
		setIconOptions(customData);
	}, []);

	return (
		<>
			{iconOptions && (
				<Marker
					ref={markerRef}
					position={position}
					eventHandlers={{ click: handleMarkerClick }}
					icon={iconPieChart(map, iconOptions)}
				>
					{isOpen && (
						<Popup
							onClose={() => setOpen(false)}
							minWidth={300}
							maxWidth={300}
						>
							<div className="chart-popup">
								<PieChart option={option} />
							</div>
						</Popup>
					)}
				</Marker>
			)}
		</>
	);
}

export default MapChartPopUp;
