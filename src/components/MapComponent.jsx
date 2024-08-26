import React, { useEffect, useRef } from "react";
import { TileLayer, GeoJSON, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ center, geoJsonData }) => {
	const map = useMap();
	const geoJsonLayerRef = useRef(null);

	useEffect(() => {
		map.setView(center, map.getZoom(), {
			animate: true,
		});
	}, [center, map]);

	const onEachFeature = (feature, layer) => {
		if (feature.properties && feature.properties.name) {
			layer.bindPopup(feature.properties.name);
		}
	};

	useEffect(() => {
		if (geoJsonLayerRef.current) {
			geoJsonLayerRef.current.clearLayers();
			geoJsonLayerRef.current.addData(geoJsonData);
		}
	}, [geoJsonData]);

	return (
		<div className="w-full h-full">
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>
			<GeoJSON
				data={geoJsonData}
				onEachFeature={onEachFeature}
				ref={geoJsonLayerRef}
			/>
		</div>
	);
};

export default MapComponent;
