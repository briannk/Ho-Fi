import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Overview from "./Overview";
import DetailedFeedEntry from "./DetailedFeedEntry";

import { Select, Button } from "semantic-ui-react";
import DataViz from "./DataViz";
import RecentFeed from "./RecentFeed";
import { spendingData, payData } from "../data/data";
import DISPLAYS from "../constants/displays";
import CHART_TYPE from "../constants/chartTypes";
import { useDataContext } from "../contexts/DataContext";
import { useAuthContext } from "../contexts/AuthContext";
import DetailedFeed from "./DetailedFeed";
import PieViz from "./PieViz";

const containerStyles = `container max-h-full border-4
     rounded p-4 mx-1`;

const Dashboard = () => {
  const [formattedEData, setFormattedEData] = useState({
    sortBy: "category",
    data: "",
  });

  const [formattedIData, setFormattedIData] = useState({
    sortBy: "source",
    data: "",
  });

  const { getToken } = useAuthContext();
  const {
    expensesData,
    incomeData,
    expensesGroup,
    setExpensesGroup,
    incomeGroup,
    setIncomeGroup,
  } = useDataContext();

  const containerStyles = `container mx-auto py-12`;

  return (
    <div className={containerStyles}>
      <Button
        content="test"
        onClick={async () => {
          try {
            const token = await getToken();
            console.log(token);
            const resp = await fetch(
              "http://localhost:5001/ho-fi-598a7/us-central1/app/api/v1/expenses/test",
              {
                method: "GET",
                headers: {
                  Authorization: "Bearer " + token,
                },
                // body: JSON.stringify({
                //   vendor: "Taco Bell",
                //   total: 10.98,
                //   transactionDate: "2021-11-21",
                //   paymentMethod: "credit/debit",
                //   category: "Food",
                //   description: "",
                // }),
              }
            );
            console.log(resp);
          } catch (e) {
            console.log(e);
          }
        }}
      />
      <h1>Dashboard</h1>
      <div className="flex flex-col lg:flex-row">
        <div
          className="w-full lg:w-1/2 max-h-full border-4
     rounded p-4 mx-1"
        >
          <Overview
            dataProp={expensesData}
            selectValue={expensesGroup}
            handleSelect={setExpensesGroup}
          />
          {expensesData.data ? (
            <>
              <PieViz selectValue={expensesGroup} data={expensesData} />
              <DetailedFeed
                dataProp={expensesData}
                selectValue={expensesGroup}
              />
            </>
          ) : (
            <div>
              No data to display! You can fix that by
              <Link to="/expenses/add"> adding an expense!</Link>
            </div>
          )}
        </div>
        <div
          className="w-full lg:w-1/2 max-h-full border-4
     rounded p-4 mx-1"
        >
          {/* <Overview
            of="Income"
            dataProp={incomeData}
            formattedData={formattedIData}
            handleData={(key, value) =>
              setFormattedIData((prev) => {
                return { ...prev, [key]: value };
              })
            }
          /> */}
          {null && (
            <>
              <PieViz selectValue={expensesGroup} data={expensesData} />
              <DetailedFeed dataProp={formattedIData} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
