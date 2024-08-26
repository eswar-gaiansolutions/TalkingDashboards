import React, { useEffect, useRef } from "react";
import { TileLayer, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import PieChart from "./charts/PieChart";
import { calculateGeoJsonCenter } from "../lib/utils";

const MapComponent = ({ center, geoJsonData }) => {
	const map = useMap();
	const geoJsonLayerRef = useRef(null);

	useEffect(() => {
		map.setView(center, map.getZoom(), {
			animate: true,
		});
	}, [center, map]);

	const onEachFeature = (feature, layer) => {
		if (feature.properties && feature.properties.dtname) {
			layer.bindPopup(feature.properties.dtname);

			// Render the PieChart component to a static HTML string
			const pieChartHtml = ReactDOMServer.renderToString(<PieChart />);

			// Create a divIcon with the PieChart HTML
			const pieChartMarker = L.divIcon({
				className: "custom-div-icon",
				html: `<div style="width: 100px; height: 100px;">${pieChartHtml}</div>`,
				iconSize: [100, 100],
				iconAnchor: [50, 50],
			});

			// Calculate the center of the GeoJSON feature
			const center = calculateGeoJsonCenter(feature);

			if (center) {
				const coordinates = center;
				const latLng = L.latLng(coordinates[0], coordinates[1]);

				// Add the PieChart marker to the map at the calculated center
				L.marker(latLng, { icon: pieChartMarker }).addTo(map);
			}
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
