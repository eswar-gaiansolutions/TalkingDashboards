import React, { useState } from "react";
import { MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapComponent from "./MapComponent";
import geojson from "../geojson/GUJARAT_DISTRICTS.json";
import "./maps-styles.css";

const DistrictsMap = () => {
	const [center, setCenter] = useState([22.6708, 71.5724]);
	return (
		<div className="w-full h-full">
			<MapContainer
				center={center}
				zoom={8}
				style={{ height: "100%", width: "100%" }}
			>
				<MapComponent center={center} geoJsonData={geojson} />
			</MapContainer>
		</div>
	);
};

export default DistrictsMap;
