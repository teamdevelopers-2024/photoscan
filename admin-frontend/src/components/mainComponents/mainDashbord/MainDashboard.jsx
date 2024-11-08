import React, { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./MainDashboard.css";
import Chart from "chart.js/auto";
import { Line, Pie } from "react-chartjs-2";
import CustomDropdown from "./customDropDown.jsx";
import api from "../../../services/api.js";

function MainDashbord() {
  const currentYear = new Date().getFullYear();

  const yearlyLabels = [
    currentYear - 4, currentYear - 3, currentYear - 2, currentYear - 1, currentYear,
  ];

  const [lineChartRange, setLineChartRange] = useState("Monthly");
  const [pieChartCategory, setPieChartCategory] = useState("All");
  const [currentYearIndex, setCurrentYearIndex] = useState(2);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [salesData, setSalesData] = useState(null);

  const chartContainerRef = useRef(null); // Reference for the chart container

  const fetchCardData = async () => {
    try {
      const response = await api.getCardData();
      setTotalCustomers(response.data.totalCustomers);
      setTotalOrders(response.data.totalOrders);
      setTotalSales(response.data.totalSales);
    } catch (error) {
      console.log("Error Fetching Card Data", error);
    }
  };

  const fetchSalesData = async () => {
    try {
      const response = await api.getGraphData();
      setSalesData(response.data);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  useEffect(() => {
    fetchCardData();
    fetchSalesData();
  }, []);

    const onDownloadClick = async () => {
      const doc = new jsPDF();
      let yPosition = 10;

      doc.setFontSize(18);
      doc.text("Yearly Financial Report", 10, yPosition);
      yPosition += 10;

      // Add Financial Overview Section
      doc.setFontSize(14);
      doc.text(`Year: ${yearlyLabels[currentYearIndex]}`, 10, yPosition);
      yPosition += 10;
      doc.text(`Total Customers: ${totalCustomers}`, 10, yPosition);
      yPosition += 10;
      doc.text(`Total Orders: ${totalOrders}`, 10, yPosition);
      yPosition += 10;
      doc.text(`Total Sales: $${totalSales}`, 10, yPosition);
      yPosition += 10;

      // Capture Sales Chart as Image and Insert into PDF
      const chartContainer = document.getElementById("chart-container");
      if (chartContainer) {
        const chartImage = await html2canvas(chartContainer);
        const chartData = chartImage.toDataURL("image/png");
        doc.addImage(chartData, "PNG", 10, yPosition, 190, 80);
        yPosition += 90;
      }

      // Include Additional Order Details or Summary Data (Example)
      doc.setFontSize(12);
      salesData?.yearlyData?.forEach((data, index) => {
        if (index <= currentYearIndex) { // include only up to selected year
          doc.text(`Year ${yearlyLabels[index]}: Sales - $${data.totalSales}, Orders - ${data.totalOrders}`, 10, yPosition);
          yPosition += 10;
        }
      });

      // Download PDF
      doc.save("financial-report.pdf");
    };
  const filteredData = {
    labels: lineChartRange === "Monthly"
      ? ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      : yearlyLabels,
    datasets: [
      {
        label: "Sales Amount ($)",
        backgroundColor: "rgba(83, 101, 126, 0.2)",
        borderColor: "rgba(83, 101, 126, 0.8)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(83, 101, 126, 1)",
        data: lineChartRange === "Monthly"
          ? salesData?.monthlyData[yearlyLabels[currentYearIndex]]
          : salesData?.yearlyData.map((yearData) => yearData.totalSales),
      },
    ],
  };

  const pieChartColors = [
    "rgba(76, 86, 106, 0.6)",
    "rgba(108, 122, 137, 0.6)",
    "rgba(131, 149, 167, 0.6)",
  ];

  const categoryData = {
    labels: salesData?.categoryNames.map((category) => category),
    datasets: [
      {
        label: "Sales Distribution by Category",
        data: salesData?.categoryValues,
        backgroundColor: pieChartColors,
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

  if (!salesData) return <div>Loading...</div>;

  return (
    <div className="dash-main" ref={chartContainerRef}>
      <div className="cards-container">
        <div className="info-card gradient-grayblue">
          <span className="card-title">Total Customers</span>
          <span className="card-value">{totalCustomers}</span>
        </div>
        <div className="info-card gradient-gray">
          <span className="card-title">Total Orders</span>
          <span className="card-value">{totalOrders}</span>
        </div>
        <div className="info-card gradient-teal">
          <span className="card-title">Total Sales ($)</span>
          <span className="card-value">{totalSales}</span>
        </div>
      </div>

      <div className="filters">
        <div></div>
        <CustomDropdown lineChartRange={lineChartRange} setLineChartRange={setLineChartRange} />
        <button className="download-button" onClick={onDownloadClick}>
          Download
        </button>
      </div>

      <div className="dash-main-body">
        <div className="chart-container flex flex-col justify-center flex-2">
          <div className="year-display">
            {lineChartRange === "Monthly" && <h3>{yearlyLabels[currentYearIndex]}</h3>}
            {lineChartRange === "Yearly" && <h3>{yearlyLabels[0]} - {yearlyLabels[yearlyLabels.length - 1]}</h3>}
          </div>
          <div className="chart-wrapper">
            <button className={`arrow-button left ${lineChartRange === "Yearly" && "opacity-0"}`} onClick={() => changeYear("left")}>
              &lt;
            </button>
            <div className="chart-flex-container">
              <Line data={filteredData} options={{ maintainAspectRatio: false }} style={{ width: "100%", height: "250px" }} />
            </div>
            <button className={`arrow-button right ${lineChartRange === "Yearly" && "opacity-0"}`} onClick={() => changeYear("right")}>
              &gt;
            </button>
          </div>
        </div>

        <div className="chart-container flex flex-col justify-center">
          <Pie data={categoryData} style={{ width: "100%", height: "250px" }} />
        </div>
      </div>
    </div>
  );
}

export default MainDashbord;
