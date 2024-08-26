import React, { useEffect, useState } from "react";
import { transformDataForLineChart } from "../../utils/dataTransformer";
import testData from "../../data/testData.json";
import "./ChartsDashboard.css"; 
import GujaratMapWithPieCharts from "../GujaratMapWithPieCharts";
import LineChart from "../LineChart/LineChart";

const ChartsDashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Access the named data from the JSON file
    setData(testData.lineChartData);
  }, []);

  const transformedData = transformDataForLineChart(data, "query");

  return (
    <div className="dashboardContainer">
      <div className="dashboardItem1">
        <GujaratMapWithPieCharts />
      </div>
      <div className="dashboardItem2">
        <LineChart data={transformedData} />
      </div>
    </div>
  );
};

export default ChartsDashboard;
