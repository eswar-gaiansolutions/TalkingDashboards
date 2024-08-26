import * as turf from "@turf/turf";

export function calculateGeoJsonCenter(geoJson) {
	if (geoJson?.geometry?.coordinates?.length === 0) {
		// Default center coordinates if no data
		return null;
	}
	const centroid = turf.center(geoJson);
	const coordinates = centroid.geometry.coordinates;
	// [lat, long]
	return [coordinates[1], coordinates[0]];
}

export function convertEChartsDataToCustomFormat(echartsData) {
	if (
		!echartsData ||
		!echartsData.series ||
		echartsData.series.length === 0
	) {
		return [];
	}

	const seriesData = echartsData.series[0].data;
	const colors = ["#E38627", "#C13C37", "#6A2135", "#4A90E2", "#50E3C2"]; // Predefined color array

	// Edge case: If the series data is undefined or empty, return an empty array
	if (!seriesData || seriesData.length === 0) {
		return [];
	}

	// Convert the series data into the desired format
	const customData = seriesData.map((item, index) => {
		return {
			title: item.name || `Unknown ${index + 1}`,
			value: item.value || 0,
			color: colors[index % colors.length],
		};
	});

	return customData;
}
