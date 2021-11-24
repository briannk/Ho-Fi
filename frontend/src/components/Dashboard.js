import React from "react";
import DataViz from "./DataViz";
import Expenses from "./Expenses";
import Income from "./Income";

const Dashboard = () => {
  const containerStyles = `container mx-auto`;
  return (
    <div className={containerStyles}>
      <h1>Dashboard</h1>
      <div className="flex flex-row justify-center ">
        <Expenses />
        <Income />
      </div>
    </div>
  );
};

export default Dashboard;
