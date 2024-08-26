import axios from "axios";

const baseUrl = "https://ig.gov-cloud.ai/tf-entity-ingestion/v1.0/schemas";
const token = import.meta.env.VITE_XPX_TOKEN;

export async function getSchemaData(schemaId) {
  const url = `${baseUrl}/${schemaId}/instances/list`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data?.entities;
  } catch (error) {
    if (error.response) {
      // Request made and server responded
      console.error("Error Response:", error.response.data);
      console.error("Error Status:", error.response.status);
      console.error("Error Headers:", error.response.headers);
    } else if (error.request) {
      // Request made but no response received
      console.error("Error Request:", error.request);
    } else {
      // Something else happened while setting up the request
      console.error("Error Message:", error.message);
    }
    console.error("Error Config:", error.config);
  }
}
