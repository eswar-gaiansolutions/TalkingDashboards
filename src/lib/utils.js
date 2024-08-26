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
