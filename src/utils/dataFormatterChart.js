import { bqAdhoc, getBqData } from "./bqUtils";
import { getSchemaData } from "./schemaUtils";

/**
 * Generates pie chart data by fetching data from BigQuery.
 *
 * This function fetches data using either a predefined BigQuery BQ ID (`bqId`)
 * or an ad-hoc SQL query string (`queryString`). If both parameters are provided,
 * `bqId` will be prioritized over `queryString`.
 *
 * @param {string} [bqId] - The BigQuery BQ ID for retrieving pre-executed query results.
 * @param {string} [queryString] - The SQL query string for an ad-hoc query to BigQuery.
 *
 * @note If both `bqId` and `queryString` are provided, `bqId` will be prioritized.
 * @note BQ Api response should be like:
 * [
 *    {
 *        district:"Rajkot",
 *        appName:"Aegis",
 *        appRevenue:"123"
 *    }
 * ]
 * @example
 * // Example 1: Using a predefined BigQuery BQ ID
 * const bqId = "BQ_1234567890";
 * generateChartData(bqId).then(data => {
 *   console.log(data);
 * }).catch(error => {
 *   console.error("Error fetching data by bqId:", error);
 * });
 *
 * @example
 * // Example 2: Using an ad-hoc SQL query string
 * const queryString = "SELECT * FROM my_dataset.my_table LIMIT 100";
 * generateChartData(null, queryString).then(data => {
 *   console.log(data);
 * }).catch(error => {
 *   console.error("Error fetching data by queryString:", error);
 * });
 *
 */
export async function generatePieChartData(bqId, queryString) {
  let bqApiData;
  if (!bqId && !queryString) {
    bqApiData = await getSchemaData(import.meta.env.VITE_TEST_SCHEMA);
  }

  if (queryString) {
    bqApiData = await bqAdhoc(queryString);
  }

  if (bqId) {
    bqApiData = await getBqData(bqId);
  }

  let districtMapObj = new Map();

  bqApiData.map((mapData, index) => {
    if (!districtMapObj.has(mapData?.district)) {
      districtMapObj.set(mapData?.district, [
        {
          value: mapData?.appRevenue,
          name: mapData?.appName,
        },
      ]);
    } else {
      districtMapObj.set(mapData?.district, [
        ...districtMapObj.get(mapData?.district),
        {
          value: mapData?.appRevenue,
          name: mapData?.appName,
        },
      ]);
    }
  });

  return districtMapObj;
}
