import React from "react";
import LineViz from "./LineViz";
import DataTable from "./DataTable";

const DataHistory = ({ dataProp = {}, selectValue }) => {
  return (
    <div className="p-8 my-4">
      {/*add a recent activity widget*/}
      <LineViz dataProp={dataProp} selectValue={selectValue} />
      <DataTable dataProp={dataProp} selectValue={selectValue} />
    </div>
  );
};

export default DataHistory;
