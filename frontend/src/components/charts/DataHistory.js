import React from "react";
import LineViz from "./LineViz";
import DataTable from "./DataTable";

const DataHistory = ({ dataProp = {}, selectValue }) => {
  return (
    <div>
      <LineViz dataProp={dataProp} selectValue={selectValue} />
      <DataTable dataProp={dataProp} selectValue={selectValue} />
    </div>
  );
};

export default DataHistory;
