import React from "react";
import { Feed } from "semantic-ui-react";
import DataViz from "./DataViz";
import { spendingData } from "../data/data";

const Expenses = () => {
  const containerStyles = `container max-w-full max-h-full border-4
     rounded p-4 mx-1`;
  return (
    <div className={containerStyles}>
      <h2>{`Expenses from ${spendingData.startDate} to ${spendingData.endDate}`}</h2>
      <DataViz data={spendingData} />
      <Feed />
    </div>
  );
};

export default Expenses;
