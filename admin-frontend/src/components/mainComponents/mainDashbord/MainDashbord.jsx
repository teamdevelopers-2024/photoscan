import React, { useState, useEffect } from "react";
import "./MainDashbord.css";
import Chart from "chart.js/auto";
import { Line, Pie } from "react-chartjs-2";
import CustomDropdown from "./customDropDown"; // Make sure to import the CustomDropdown component
import api from "../../../services/api.js"

function MainDashbord() {
  const currentYear = new Date().getFullYear();

  const yearlyLabels = [
    currentYear - 4, currentYear - 3, currentYear - 2, currentYear - 1, currentYear,
  ];

  const [lineChartRange, setLineChartRange] = useState("Monthly");
  const [pieChartCategory, setPieChartCategory] = useState("All");
  const [currentYearIndex, setCurrentYearIndex] = useState(2);

  const monthlyData = {
    [currentYear - 2]: [1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000],
    [currentYear - 1]: [2000, 3000, 4000, 3500, 4500, 5500, 6000, 7000, 7500, 8000, 8500, 9000],
    [currentYear]: [2500, 3500, 4500, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000],
    [currentYear + 1]: [3000, 4000, 5000, 4500, 5500, 6500, 7500, 8500, 9500, 10500, 11500, 12500],
    [currentYear + 2]: [3500, 4500, 5500, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000],
    [currentYear + 3]: [4000, 5000, 6000, 5500, 6500, 7500, 8500, 9500, 10500, 11500, 12500, 13500]
  };


  const filteredData = {
    labels: lineChartRange === "Monthly" ? ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] : yearlyLabels,
    datasets: [
      {
        label: "Sales Amount ($)",
        backgroundColor: "rgba(83, 101, 126, 0.2)",
        borderColor: "rgba(83, 101, 126, 0.8)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(83, 101, 126, 1)",
        data: lineChartRange === "Monthly" ? monthlyData[yearlyLabels[currentYearIndex]] : [15000, 22000, 18000, 30000, 25000, 35000],
      },
    ],
  };

  const pieChartColors = [
    "rgba(76, 86, 106, 0.6)",
    "rgba(108, 122, 137, 0.6)",
    "rgba(131, 149, 167, 0.6)",
  ];

  const allCategoriesData = [3000, 4500, 2756];

  const categoryData = {
    labels: pieChartCategory === "All" ? ["Trophies", "Frames", "Gifts"] : [pieChartCategory],
    datasets: [
      {
        label: "Sales Distribution by Category",
        data: pieChartCategory === "All" ? allCategoriesData : [allCategoriesData[["Trophies", "Frames", "Gifts"].indexOf(pieChartCategory)]],
        backgroundColor: pieChartCategory === "All" ? pieChartColors : [pieChartColors[["Trophies", "Frames", "Gifts"].indexOf(pieChartCategory)]],
        hoverOffset: 4,
      },
    ],
  };

  const changeYear = (direction) => {
    if (direction === "left" && currentYearIndex > 0) {
      setCurrentYearIndex(currentYearIndex - 1);
    } else if (direction === "right" && currentYearIndex < yearlyLabels.length - 1) {
      setCurrentYearIndex(currentYearIndex + 1);
    }
  };


  const fetchCardData = async ()=>{
    try {
      const response = await api.getCardData()
      console.log(response,"from fetchCard Data")
    } catch (error) {
      console.log("Error Fetching Card Data", error);
    }
  }
  useEffect(()=>{
    fetchCardData() 
  },[])

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

      <div className="filters">
        <CustomDropdown
          lineChartRange={lineChartRange}
          setLineChartRange={setLineChartRange}
        />
      </div>

      <div className="dash-main-body">
        <div className="chart-container flex flex-col justify-center">
          <div className="year-display">
            {lineChartRange === "Monthly" && <h3>{yearlyLabels[currentYearIndex]}</h3>}
            {lineChartRange === "Yearly" && <h3>{yearlyLabels[0]} - {yearlyLabels[yearlyLabels.length-1]}</h3>}
          </div>
          <div className="chart-wrapper">
            <button className={`arrow-button left ${lineChartRange === "Yearly" && "opacity-0"} `} onClick={() => changeYear("left")}>&lt;</button>
            <div className="chart-flex-container">
              <Line
                data={filteredData}
                options={{ maintainAspectRatio: false }}
                style={{ width: '100%', height: '250px' }} // Adjusted height
              />
            </div>
            <button className={`arrow-button right ${lineChartRange === "Yearly" && "opacity-0"} `} onClick={() => changeYear("right")}>&gt;</button>
          </div>
        </div>

        <div className="chart-container flex flex-col justify-center">
          <Pie
            data={categoryData}
            style={{ width: '100%', height: '250px' }} // Adjusted height
          />
        </div>
      </div>
    </div>
  );
}

export default MainDashbord;
