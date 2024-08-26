import React, { useEffect, useRef, useState } from "react";
import { TileLayer, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { calculateGeoJsonCenter } from "../../lib/utils";
import MapChartPopUp from "./MapChartPopUp";

const MapComponent = ({ center, geoJsonData }) => {
	const map = useMap();
	const geoJsonLayerRef = useRef(null);
	const [featureCenters, setFeatureCenters] = useState([]);

	useEffect(() => {
		map.setView(center, map.getZoom(), {
			animate: true,
		});
	}, [center, map]);

	useEffect(() => {
		if (geoJsonLayerRef.current) {
			const centers = [];
			geoJsonLayerRef.current.clearLayers();
			geoJsonLayerRef.current.addData(geoJsonData);

			geoJsonData.features.forEach((feature) => {
				if (feature.properties && feature.properties.dtname) {
					const coordinates = calculateGeoJsonCenter(feature);
					const latLng = L.latLng(coordinates[0], coordinates[1]);
					centers.push(latLng);
				}
			});

			setFeatureCenters(centers); // Update state outside the render phase
		}
	}, [geoJsonData]);

	return (
		<div className="w-full h-full">
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>
			<GeoJSON data={geoJsonData} ref={geoJsonLayerRef} />
			{featureCenters.map((latLng, index) => (
				<MapChartPopUp key={index} position={latLng} map={map} />
			))}
		</div>
	);
};

export default MapComponent;
