import React from "react";
import './App.css'
import ChartsDashboard from "./components/ChartsDashboard/ChartsDashboard";
import AppsRevenuePerDistrict from "./components/AppsRevenuePerDistrict/AppsRevenuePerDistrict"

function App() {
    return (
        <div className="rootContainer">
            <ChartsDashboard />
            <AppsRevenuePerDistrict />
        </div>
    );
}

export default App
