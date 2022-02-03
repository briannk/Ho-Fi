import React from "react";
import LineViz from "./LineViz";
import DataViz from "./DataViz";
import { spendingData } from "../data/data";
import DISPLAYS from "../constants/displays";
import CHART_TYPE from "../constants/chartTypes";
import DataTable from "./DataTable";

const DataHistory = ({ dataProp = {}, selectValue }) => {
  return (
    <div>
      <LineViz dataProp={dataProp} selectValue={selectValue} />
      <DataTable dataProp={dataProp} />
    </div>
  );
};

export default DataHistory;
