import React, { useState, useRef } from "react";
import { Marker, Popup } from "react-leaflet";
import PieChart from "./charts/PieChart";

function MapChartPopUp({ position, icon }) {
	const [isOpen, setOpen] = useState(false);
	const markerRef = useRef(null);

	const handleMarkerClick = () => {
		setOpen(true);
	};

	return (
		<Marker
			ref={markerRef}
			position={position}
			eventHandlers={{ click: handleMarkerClick }}
			icon={icon}
		>
			{isOpen && (
				<Popup
					onClose={() => setOpen(false)}
					minWidth={300}
					maxWidth={300}
				>
					<div className="chart-popup">
						<PieChart />
					</div>
				</Popup>
			)}
		</Marker>
	);
}

export default MapChartPopUp;
