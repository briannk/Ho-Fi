import React from "react";
import Overview from "../common/Overview";
import DataHistory from "../charts/DataHistory";
import PieViz from "../charts/PieViz";
import DetailedFeed from "../feed/DetailedFeed";
import { useDataContext } from "../../contexts/DataContext";
import Missing from "../charts/Missing";

const containerStyles = `container mx-auto py-12`;

const Expenses = () => {
  const { expensesData, expensesGroup, setExpensesGroup } = useDataContext();

  return (
    <div className={containerStyles}>
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
              <PieViz dataProp={expensesData} selectValue={expensesGroup} />
              <DetailedFeed
                dataProp={expensesData}
                selectValue={expensesGroup}
              />
            </>
          ) : (
            <Missing item={"expenses"} />
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
