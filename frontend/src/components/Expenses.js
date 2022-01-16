import React, { useState } from "react";
import Overview from "./Overview";
import DataHistory from "./DataHistory";
import DataTable from "./DataTable";
import PieViz from "./PieViz";
import DetailedFeed from "./DetailedFeed";
import { spendingData } from "../data/data";

const containerStyles = `container mx-auto py-12`;

const Expenses = () => {
  const [expenseData, setExpenseData] = useState(null);
  const [formattedData, setFormattedData] = useState({
    sortBy: "category",
    data: "",
  });

  console.log(expenseData);
  useState(() => {
    setExpenseData(spendingData);
  }, []);
  return (
    <div className={containerStyles}>
      <h1>Expenses</h1>
      <div className="flex flex-col xl:flex-row ">
        <div
          className="w-full xl:w-1/2  border-4
     rounded p-4 mx-1"
        >
          <Overview
            of="Expenses"
            dataProp={expenseData}
            formattedData={formattedData}
            handleData={(key, value) =>
              setFormattedData((prev) => {
                return { ...prev, [key]: value };
              })
            }
          />
          {formattedData.data && (
            <>
              <PieViz dataProp={formattedData} />
              <DetailedFeed dataProp={formattedData} />
            </>
          )}
        </div>
        <div className="w-full xl:w-1/2  border-4 rounded p-4 mx-1">
          {formattedData.data && <DataHistory dataProp={formattedData} />}
        </div>
      </div>
    </div>
  );
};

export default Expenses;
