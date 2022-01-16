import React, { useState, useEffect } from "react";

import Overview from "./Overview";
import IncomeOverview from "./IncomeOverview";
import DetailedFeedEntry from "./DetailedFeedEntry";

import { Select } from "semantic-ui-react";
import DataViz from "./DataViz";
import RecentFeed from "./RecentFeed";
import { spendingData, payData } from "../data/data";
import DISPLAYS from "../constants/displays";
import CHART_TYPE from "../constants/chartTypes";
import { useDataContext } from "../contexts/DataContext";
import DetailedFeed from "./DetailedFeed";
import PieViz from "./PieViz";

const containerStyles = `container max-h-full border-4
     rounded p-4 mx-1`;

const sortOptions = [
  { key: "date", text: "Date", value: "transactionDate" },
  { key: "vendor", text: "Vendor", value: "vendor" },
  { key: "category", text: "Category", value: "category" },
  { key: "paymentMethod", text: "Payment Method", value: "paymentMethod" },
];

const Dashboard = () => {
  const [expenseData, setExpenseData] = useState(null);
  const [incomeData, setIncomeData] = useState(null);

  const [formattedEData, setFormattedEData] = useState({
    sortBy: "category",
    data: "",
  });

  const [formattedIData, setFormattedIData] = useState({
    sortBy: "source",
    data: "",
  });

  const { generateThemes, expensesData } = useDataContext();

  console.log(expenseData);
  const containerStyles = `container mx-auto py-12`;

  useEffect(() => {
    setExpenseData(spendingData);
    setIncomeData(payData);
  }, []);
  return (
    <div className={containerStyles}>
      <h1>Dashboard</h1>
      <div className="flex flex-col lg:flex-row">
        <div
          className="w-full lg:w-1/2 max-h-full border-4
     rounded p-4 mx-1"
        >
          <Overview
            of="Expenses"
            dataProp={expenseData}
            formattedData={formattedEData}
            handleData={(key, value) =>
              setFormattedEData((prev) => {
                return { ...prev, [key]: value };
              })
            }
          />
          {formattedEData.data && (
            <>
              <PieViz dataProp={formattedEData} />
              <DetailedFeed dataProp={formattedEData} />
            </>
          )}
        </div>
        <div
          className="w-full lg:w-1/2 max-h-full border-4
     rounded p-4 mx-1"
        >
          <Overview
            of="Income"
            dataProp={payData}
            formattedData={formattedIData}
            handleData={(key, value) =>
              setFormattedIData((prev) => {
                return { ...prev, [key]: value };
              })
            }
          />
          {formattedIData.data && (
            <>
              <PieViz dataProp={formattedIData} />
              <DetailedFeed dataProp={formattedIData} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
