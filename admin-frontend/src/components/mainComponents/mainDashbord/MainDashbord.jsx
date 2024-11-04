import React, { useState } from "react";
import "./MainDashbord.css";
import Chart from "chart.js/auto";
import { Line, Pie } from "react-chartjs-2";

function MainDashbord() {
  const currentYear = new Date().getFullYear(); // Get the current year

  const yearlyLabels = [
    currentYear - 3,currentYear - 2, currentYear - 1, currentYear,
  ];

  // State for selected month range and pie chart category
  const [lineChartRange, setLineChartRange] = useState("Monthly");
  const [pieChartCategory, setPieChartCategory] = useState("All");
  const [currentYearIndex, setCurrentYearIndex] = useState(2); // Start with the current year

  // Monthly Sales Amount Data for each year (example data)
  const monthlyData = {
    [currentYear - 2]: [1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000],
    [currentYear - 1]: [2000, 3000, 4000, 3500, 4500, 5500, 6000, 7000, 7500, 8000, 8500, 9000],
    [currentYear]: [2500, 3500, 4500, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000],
    [currentYear + 1]: [3000, 4000, 5000, 4500, 5500, 6500, 7500, 8500, 9500, 10500, 11500, 12500],
    [currentYear + 2]: [3500, 4500, 5500, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000],
    [currentYear + 3]: [4000, 5000, 6000, 5500, 6500, 7500, 8500, 9500, 10500, 11500, 12500, 13500]
  };

  // Line Chart Data
  const filteredData = {
    labels: lineChartRange === "Monthly" ? ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] : yearlyLabels,
    datasets: [
      {
        label: "Sales Amount ($)",
        backgroundColor: "rgba(83, 101, 126, 0.2)",  // Light Gray-Blue fill
        borderColor: "rgba(83, 101, 126, 0.8)",      // Darker Gray-Blue border
        borderWidth: 2,
        pointBackgroundColor: "rgba(83, 101, 126, 1)",
        data: lineChartRange === "Monthly" ? monthlyData[yearlyLabels[currentYearIndex]] : [15000, 22000, 18000, 30000, 25000, 35000], // Use example yearly data for yearly chart
      },
    ],
  };

  // Pie Chart: Sales Distribution by Category
  const allCategoriesData = [3000, 4500, 2756]; // All categories data
  const categoryData = {
    labels: pieChartCategory === "All" ? ["Trophies", "Frames", "Gifts"] : [pieChartCategory],
    datasets: [
      {
        label: "Sales Distribution by Category",
        data: pieChartCategory === "All" ? allCategoriesData : [allCategoriesData[["Trophies", "Frames", "Gifts"].indexOf(pieChartCategory)]],
        backgroundColor: pieChartCategory === "All" ? [
          "rgba(76, 86, 106, 0.6)",    // Color for Trophies
          "rgba(108, 122, 137, 0.6)",  // Color for Frames
          "rgba(131, 149, 167, 0.6)",  // Color for Gifts
        ] : ["rgba(76, 86, 106, 0.6)"], // Single color for specific category
        hoverOffset: 4,
      },
    ],
  };

  // Function to change the year when buttons are clicked
  const changeYear = (direction) => {
    if (direction === "left" && currentYearIndex > 0) {
      setCurrentYearIndex(currentYearIndex - 1);
    } else if (direction === "right" && currentYearIndex < yearlyLabels.length - 1) {
      setCurrentYearIndex(currentYearIndex + 1);
    }
  };

  return (
    <div className="dash-main">
      <div className="cards-container">
        <div className="info-card gradient-grayblue">
          <span className="card-title">Total Customers</span>
          <span className="card-value">749</span>
        </div>
        <div className="info-card gradient-gray">
          <span className="card-title">Total Orders</span>
          <span className="card-value">835</span>
        </div>
        <div className="info-card gradient-teal">
          <span className="card-title">Total Sales ($)</span>
          <span className="card-value">8,256</span>
        </div>
      </div>

      {/* Filter Dropdowns */}
      <div className="filters">
        <label>
          Line Chart Range:
          <select value={lineChartRange} onChange={(e) => setLineChartRange(e.target.value)}>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </label>
        <label>
          Pie Chart Category:
          <select value={pieChartCategory} onChange={(e) => setPieChartCategory(e.target.value)}>
            <option value="All">All</option>
            <option value="Trophies">Trophies</option>
            <option value="Frames">Frames</option>
            <option value="Gifts">Gifts</option>
          </select>
        </label>
      </div>

      {/* Charts */}
      <div className="dash-main-body">
        <div className="chart-container">
          <div className="year-display">
            <h3>{yearlyLabels[currentYearIndex]}</h3> {/* Display the currently selected year */}
          </div>
          <button onClick={() => changeYear("left")}>&lt;</button>
          <Line data={filteredData} options={{ maintainAspectRatio: false }} />
          <button onClick={() => changeYear("right")}>&gt;</button>
        </div>
        <div className="chart-container">
          <Pie data={categoryData} />
        </div>
      </div>
    </div>
  );
}

export default MainDashbord;
