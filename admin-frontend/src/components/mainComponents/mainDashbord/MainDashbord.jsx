import React from "react";
import "./MainDashbord.css";
import Chart from "chart.js/auto";
import { Line, Pie } from "react-chartjs-2";
import salesImage from "/src/assets/images/shopping-bag_1008010.png";
import momentoImage from "/src/assets/images/trophy.png";
import frameImage from "/src/assets/images/frame.png";
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
        <div className="flex justify-center items-center h-60">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-5 md:space-y-0 md:space-x-10 w-full max-w-5xl">
            <div className="w-80 h-44 relative njammlecard">
              <div className="w-full h-full bg-[#7978E9] rounded-xl shadow" />
              <div className="absolute left-[33px] bottom-[20px] text-white text-4xl font-semibold font-['Josefin Sans']">
                Customers
              </div>
              <div className="absolute left-[100px] top-[29px] text-white text-5xl font-semibold font-['Josefin Sans']">
                749
              </div>
            </div>
            <div className="w-80 h-44 relative njammlecard">
              <div className="w-full h-full bg-[#7DA0FA] rounded-xl shadow" />
              <div className="absolute left-[29px] bottom-[20px] text-white text-4xl font-semibold font-['Josefin Sans']">
                Orders
              </div>
              <div className="absolute left-[100px] top-[30px] text-white text-5xl font-semibold font-['Josefin Sans']">
                835
              </div>
            </div>
            <div className="w-80 h-44 relative njammlecard">
              <div className="w-full h-full bg-[#F3797E] rounded-xl shadow" />
              <div className="absolute left-[21px] bottom-[20px] text-white text-4xl font-semibold font-['Josefin Sans']">
                Sales
              </div>
              <div className="absolute left-[87px] top-[37px] text-white text-5xl font-semibold font-['Josefin Sans']">
                8,256
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
