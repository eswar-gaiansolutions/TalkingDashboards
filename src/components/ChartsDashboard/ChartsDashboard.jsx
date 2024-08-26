import React, { useEffect, useState } from "react";
import { transformDataForLineChart } from "../../utils/dataTransformer";
import testData from "../../data/testData.json";
import "./ChartsDashboard.css";
import GujaratMapWithPieCharts from "../GujaratMapWithPieCharts";
import LineChart from "../LineChart/LineChart";
import StackedBarChart from "../StackedBarChart";
import AppsRevenuePerDistrict from "../AppsRevenuePerDistrict/AppsRevenuePerDistrict";

const ChartsDashboard = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Access the named data from the JSON file
        setData(testData.lineChartData);
    }, []);

    const transformedData = transformDataForLineChart(data, "query");

    return (
        <div className="dashboardContainer">
            <div className="dashboardItemquad1">
                <GujaratMapWithPieCharts />
            </div>
            <div className="dashboardItemquad2">
                {/* <AppsRevenuePerDistrict bqId="66cc4e1f5e912f0da602e65f"/> */}
                <AppsRevenuePerDistrict queryString="SELECT * from t_66cc2957f604240f964044bf_t" />
            </div>
            <div className="dashboardItemquad3">
                <LineChart data={transformedData} />
            </div>
            <div className="dashboardItemquad4">
                <StackedBarChart />
            </div>
        </div>
    );
};

export default ChartsDashboard;
