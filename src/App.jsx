import React from 'react';
import GujaratMapWithPieCharts from "./components/GujaratMapWithPieCharts";
import StackedBarChart from "./components/StackedBarChart";
import './App.css'; // Import the CSS file

function App() {
  return (
    <div className="grid-container">
      <div className="quadrant-one">
        <GujaratMapWithPieCharts /> 
      </div>
      <div className="quadrant-three">
        <StackedBarChart />
      </div>
    </div>
  );
}

export default App
