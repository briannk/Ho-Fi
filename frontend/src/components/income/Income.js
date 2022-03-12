import React from "react";
import Overview from "../common/Overview";
import DataHistory from "../charts/DataHistory";
import PieViz from "../charts/PieViz";
import DetailedFeed from "../feed/DetailedFeed";
import { useDataContext } from "../../contexts/DataContext";
import Missing from "../charts/Missing";

const containerStyles = `container mx-auto py-12`;

const Income = () => {
  const { incomeData, incomeGroup, setIncomeGroup } = useDataContext();

  return (
    <div className={containerStyles}>
      <div className="flex flex-col xl:flex-row ">
        <div
          className="w-full xl:w-1/2  border-4
     rounded p-4 mx-1"
        >
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
        <div className="w-full xl:w-1/2  border-4 rounded p-4 mx-1">
          {incomeData.data ? (
            <DataHistory dataProp={incomeData} selectValue={incomeGroup} />
          ) : (
            <div>No data to visualize!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Income;
