import React from "react";
import "./MainDashbord.css";
import Chart from "chart.js/auto";
import { Line, Pie } from "react-chartjs-2";
import salesImage from "/src/assets/images/shopping-bag_1008010.png";
import agentsImage from "/src/assets/images/customer-service_2706907.png";
import propertyImage from "/src/assets/images/godown_17082603.png";
import usersImage from "/src/assets/images/person_13924070.png";

function MainDashbord() {
  const labels = ["January", "February", "March", "April", "May", "June"];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [0, 10, 5, 2, 20, 30, 45],
      },
    ],
  };
  const datar = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
    datasets: [
      {
        label: "My Dataset",
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <>
      <div className="dash-main">
        <div className="dash-main-head">
          <div className="dash-amin-head-1">
            <div className="dash-admin-sales dash-card">
            <img style={{width:50 ,height:55 ,paddingRight:15}} src={salesImage} alt="" />
              <div>
              
                <p style={{ fontSize: 26, padding:0, margin:0 }}>Orders</p>
                <p style={{ fontSize: 26,padding:0 ,margin:0 }}>1735</p>
              </div>
            </div>
          </div>
          <div className="dash-amin-head-1">
            <div className="dash-admin-sales dash-card">
            <img style={{width:50 ,height:55 ,paddingRight:15}} src={propertyImage} alt="" />
              <div>
              
                <p style={{ fontSize: 26, padding:0, margin:0 }}>Properties</p>
                <p style={{ fontSize: 26,padding:0 ,margin:0 }}>1735</p>
              </div>
            </div>
          </div>
          <div className="dash-amin-head-1">
            <div className="dash-admin-agents dash-card">
            <img style={{width:50 ,height:55 ,paddingRight:15}} src={agentsImage} alt="" />
              <div >
              
                <p style={{ fontSize: 26, padding:0, margin:0 }}>Agents</p>
                <p style={{ fontSize: 26,paddingLeft:20 ,margin:0 }}>35</p>
              </div>
            </div>
          </div>
          <div className="dash-amin-head-1">
            <div className="dash-admin-user dash-card">
            <img style={{width:50 ,height:55 ,paddingRight:15}} src={usersImage} alt="" />
              <div>
              
                <p style={{ fontSize: 26, padding:0, margin:0 }}>Users</p>
                <p style={{ fontSize: 26,paddingLeft:20 ,margin:0 }}>73</p>
              </div>
            </div>
          </div>
        </div>
        <div className="dash-main-body">
          <div className="dash-main-body-sgraph">
            <div className="graph">
              <Line data={data} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="dash-main-body-rgraph">
            <div className="graph">
              <Pie data={datar} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainDashbord;
