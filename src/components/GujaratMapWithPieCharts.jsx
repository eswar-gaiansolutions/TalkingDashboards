import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const GujaratMapWithPieCharts = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);

    myChart.showLoading();

    // Correct path to the GeoJSON file
    fetch('/geojson/GUJARAT_DISTRICTS.geojson')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((gujaratJson) => {
        echarts.registerMap('Gujarat', gujaratJson);

        function randomPieSeries(center, radius) {
          const data = ['A', 'B', 'C', 'D'].map((t) => {
            return {
              value: Math.round(Math.random() * 100),
              name: 'Category ' + t
            };
          });
          return {
            type: 'pie',
            coordinateSystem: 'geo',
            tooltip: {
              formatter: '{b}: {c} ({d}%)'
            },
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            animationDuration: 0,
            radius: radius + '%',
            center,
            data
          };
        }

        const option = {
          geo: {
            map: 'Gujarat',
            roam: true,
            itemStyle: {
              areaColor: '#e7e8ea'
            }
          },
          tooltip: {},
          legend: {},
          series: [
            // Example pie charts on top of some districts in Gujarat
            randomPieSeries([72.627494, 23.32505], 5), // Ahmedabad
            randomPieSeries([70.802159, 22.303894], 5), // Rajkot
            randomPieSeries([72.966526, 22.470702], 5), // Gandhinagar
            randomPieSeries([71.760225, 21.764473], 5)  // Bhavnagar
          ]
        };

        myChart.hideLoading();
        myChart.setOption(option);

        window.addEventListener('resize', () => {
          myChart.resize();
        });
      })
      .catch((error) => {
        console.error('Error loading Gujarat GeoJSON:', error);
      });

    // Clean up on unmount
    return () => {
      myChart.dispose();
      window.removeEventListener('resize', () => myChart.resize());
    };
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div
        ref={chartRef}
        style={{
          width: '50vw', // Occupy the first quadrant (half of the width)
          height: '50vh', // Occupy the first quadrant (half of the height)
        }}
      />
    </div>
  );
};

export default GujaratMapWithPieCharts;

