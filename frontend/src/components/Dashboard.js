import React from "react";
import Overview from "./common/Overview";
import { useDataContext } from "../contexts/DataContext";
import DetailedFeed from "./feed/DetailedFeed";
import PieViz from "./charts/PieViz";
import Missing from "./charts/Missing";

// const containerStyles = `container max-h-full border-4
//      rounded p-4 mx-1`;

const Dashboard = () => {
  const {
    expensesData,
    incomeData,
    expensesGroup,
    setExpensesGroup,
    incomeGroup,
    setIncomeGroup,
  } = useDataContext();

  const containerStyles = `container mx-auto`;

  return (
    <div className={containerStyles}>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2 max-h-full shadow-xl">
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
        <div className="w-full lg:w-1/2 max-h-full shadow-xl">
          <Overview
            dataProp={incomeData}
            selectValue={incomeGroup}
            handleSelect={setIncomeGroup}
          />
          {incomeData.data ? (
            <>
              <PieViz dataProp={incomeData} selectValue={incomeGroup} />
              <DetailedFeed dataProp={incomeData} selectValue={incomeGroup} />
            </>
          ) : (
            <Missing item={"income"} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
