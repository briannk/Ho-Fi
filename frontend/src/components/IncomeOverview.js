import React from "react";
import { Feed } from "semantic-ui-react";
import DataViz from "./DataViz";
import { spendingData } from "../data/data";
import DISPLAYS from "../constants/displays";

const IncomeOverview = () => {
  const containerStyles = `container max-w-full border-4
     rounded p-4 mx-1`;
  return (
    <div className={containerStyles}>
      <h2>
        Income from {spendingData.startDate} to {spendingData.endDate}
      </h2>
      <DataViz data={spendingData} display={DISPLAYS.EXPENSES} />
      <Feed />
    </div>
  );
};

export default IncomeOverview;
