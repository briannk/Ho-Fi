import React, { useState } from "react";
import { Link } from "react-router-dom";
import Overview from "./Overview";
import DataHistory from "./DataHistory";
import DataTable from "./DataTable";
import PieViz from "./PieViz";
import DetailedFeed from "./DetailedFeed";
// import { spendingData } from "../data/data";
import { useDataContext } from "../contexts/DataContext";

const containerStyles = `container mx-auto py-12`;

const Expenses = () => {
  const { expensesData, expensesGroup, setExpensesGroup } = useDataContext();

  return (
    <div className={containerStyles}>
      <h1>Expenses</h1>
      <div className="flex flex-col xl:flex-row ">
        <div
          className="w-full xl:w-1/2  border-4
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
        <div className="w-full xl:w-1/2  border-4 rounded p-4 mx-1">
          {expensesData.data ? (
            <DataHistory dataProp={expensesData} selectValue={expensesGroup} />
          ) : (
            <div>No data to visualize!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Expenses;
