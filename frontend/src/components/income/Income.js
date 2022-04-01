import React from "react";
import Overview from "../common/Overview";
import DataHistory from "../charts/DataHistory";
import PieViz from "../charts/PieViz";
import DetailedFeed from "../feed/DetailedFeed";
import { useDataContext } from "../../contexts/DataContext";
import Missing from "../charts/Missing";

const containerStyles = `container mx-auto`;

const Income = () => {
  const { incomeData, incomeGroup, setIncomeGroup } = useDataContext();

  return (
    <div className={containerStyles}>
      <div className="flex flex-col xl:flex-row gap-8">
        <div className="w-full xl:w-1/2 shadow-xl">
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
        <div className="w-full xl:w-1/2 shadow-xl">
          {incomeData.data ? (
            <DataHistory dataProp={incomeData} selectValue={incomeGroup} />
          ) : (
            <div className="p-8 text-2xl flex justify-center">
              No data to visualize!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Income;
