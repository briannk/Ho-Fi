import React from "react";
import { Feed } from "semantic-ui-react";
import DataViz from "./DataViz";
import { spendingData } from "../data/data";

const Income = () => {
  const containerStyles = `container max-w-full border-4
     rounded p-4 mx-1`;
  return (
    <div className={containerStyles}>
      <h2>{`Income from ${spendingData.startDate} to ${spendingData.endDate}`}</h2>
      <DataViz data={spendingData} />
      <Feed />
    </div>
  );
};

export default Income;
