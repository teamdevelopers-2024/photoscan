import React, { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./MainDashboard.css";
import Chart from "chart.js/auto";
import { Line, Pie } from "react-chartjs-2";
import CustomDropdown from "./CustomDropDown";
import api from "../../../services/api.js";

function MainDashbord() {
  const currentYear = new Date().getFullYear();

  const yearlyLabels = [
    currentYear - 4, currentYear - 3, currentYear - 2, currentYear - 1, currentYear,
  ];

  const [lineChartRange, setLineChartRange] = useState("Monthly");
  const [currentYearIndex, setCurrentYearIndex] = useState(2);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [salesData, setSalesData] = useState(null);
  const [ordersData, setOrdersData] = useState([]);

  const chartContainerRef = useRef(null); // Reference for the chart container

  const fetchCardData = async () => {
    try {
      const response = await api.getCardData();
      console.log("orders",response.data.orders);
      setOrdersData(response.data.orders)
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
  
    // Center-aligned header row
    doc.setFontSize(18);
    doc.text("Order Report", doc.internal.pageSize.getWidth() / 2, yPosition, { align: "center" });
    yPosition += 10;
  
    // Header row for order details with adjusted column widths and right-aligned total amount
    const columnWidths = [40, 50, 30, 40]; // Adjust widths as needed
    const totalAmountWidth = columnWidths[2]; // Width for total amount
  
    doc.setFontSize(12);
    doc.text("Order Date", columnWidths[0], yPosition, { align: "center" });
    doc.text("Order ID", columnWidths[0] + columnWidths[1], yPosition, { align: "center" });
    doc.text("Amount ", columnWidths[0] + columnWidths[1] + columnWidths[2], yPosition, { align: "center" });
    doc.text("Status", columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3], yPosition, { align: "center" });
    yPosition += 10;
    doc.line(10, yPosition, doc.internal.pageSize.getWidth() - 10, yPosition); // Separator line
    yPosition += 5;
  
    // Process and display order details with centered text
    let totalAmount = 0;
    ordersData.forEach((order) => {
      const { orderDate, orderId, totalAmount: orderAmount, status } = order;
      doc.setFontSize(10);
      doc.text(formatDate(orderDate), columnWidths[0], yPosition, { align: "center" });
      doc.text(orderId, columnWidths[0] + columnWidths[1], yPosition, { align: "center" });
      doc.text(orderAmount.toFixed(2), columnWidths[0] + columnWidths[1] + columnWidths[2] , yPosition, { align: "center" }); // Calculate x-position for right-aligned total amount
      doc.text(status, columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3], yPosition, { align: "center" });
      yPosition += 10;
      totalAmount += orderAmount;
    });
  
    // Display total amount with right alignment
    doc.setFontSize(12);
    const totalXPos = doc.internal.pageSize.getWidth() - totalAmountWidth - 10; // Calculate x-position for right-aligned total amount
    doc.text(`Total Amount: $${totalAmount.toFixed(2)}`, totalXPos, yPosition, { align: "right" });
  
    doc.save("order-report.pdf");
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);

  };


  const filteredData = {
    labels: lineChartRange === "Monthly"
      ? ["Jan", "Feb", "Mar", "April", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
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
