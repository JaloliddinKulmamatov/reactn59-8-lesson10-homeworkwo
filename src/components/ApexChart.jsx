import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ApexChart = () => {
  const [chartData] = useState({
    series: [
      {
        name: "Price (Past 24 Hours) in INR",
        data: [
          2980000, 2945000, 2960000, 2925000, 2975000, 2950000, 3000000,
          2985000, 3050000, 3010000, 3080000, 3040000, 3075000, 3030000,
          3065000, 3020000, 3055000, 3015000, 3080000, 3045000, 3070000,
          3035000, 3060000, 3025000, 3050000, 3010000, 3070000, 3030000,
          3060000, 3020000, 3050000, 3010000, 3080000, 3040000, 3070000,
          3030000, 3060000, 3020000, 3050000, 3010000, 3080000, 3040000,
          3070000, 3030000, 3060000, 3020000, 3050000, 3010000, 3080000,
          3040000,
        ],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
        background: "#000",
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 2,
        colors: ["#4FD1C5"],
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: [
          "8:45 AM",
          "9:15 AM",
          "9:45 AM",
          "10:15 AM",
          "10:45 AM",
          "11:15 AM",
          "11:45 AM",
          "12:15 PM",
          "12:45 PM",
          "1:15 PM",
          "1:45 PM",
          "2:15 PM",
          "2:45 PM",
          "3:15 PM",
          "3:45 PM",
          "4:15 PM",
          "4:45 PM",
          "5:15 PM",
          "5:45 PM",
          "6:15 PM",
          "6:45 PM",
          "7:15 PM",
          "7:45 PM",
          "8:15 PM",
          "8:45 PM",
          "9:15 PM",
          "9:45 PM",
          "10:15 PM",
          "10:45 PM",
          "11:15 PM",
          "11:45 PM",
          "12:15 AM",
          "12:45 AM",
          "1:15 AM",
          "1:45 AM",
          "2:15 AM",
          "2:45 AM",
          "3:15 AM",
          "3:45 AM",
          "4:15 AM",
          "4:45 AM",
          "5:15 AM",
          "5:45 AM",
          "6:15 AM",
          "6:45 AM",
          "7:15 AM",
          "7:45 AM",
          "8:15 AM",
        ],
        labels: {
          style: {
            colors: "#ccc",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#ccc",
          },
        },
      },
      tooltip: {
        theme: "dark",
      },
      legend: {
        show: false,
      },
      title: {
        text: "",
      },
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
