import axios from "axios";

const bqBaseUrl =
  "https://ig.mobiusdtaas.ai/pi-bigquery-service/v1.0/big-queries";
const adhocUrl =
  "https://ig.mobiusdtaas.ai/pi-cohorts-service/v1.0/cohorts/adhoc";
const token = import.meta.env.VITE_XPX_TOKEN;

export async function getBqData(bqId) {
  const url = `${bqBaseUrl}/${bqId}/data`;

  try {
    const response = await axios.post(url, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
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

export async function bqAdhoc(queryString) {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const data = {
      type: "TIDB",
      definition: queryString,
    };

    const response = await axios.post(url, data, { headers });
    return response.data?.model?.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      console.error("Error response:", error.response.data);
      console.error("Error status:", error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Error request:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error message:", error.message);
    }
    console.error("Error config:", error.config);
  }
}
