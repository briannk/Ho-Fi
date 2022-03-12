import React from "react";
import PieViz from "./PieViz";
import LineViz from "./LineViz";
import DISPLAYS from "../../constants/displays";
import CHART_TYPE from "../../constants/chartTypes";

// refactor each model into its own component to allow
// toggling categories and data processing catered to the
// category

const DataViz = ({ data = {}, display, chart }) => {
  const containerStyles = `container`;

  const displayVisual = () => {
    switch (chart) {
      case CHART_TYPE.PIE:
        return <PieViz dataProp={data} display={display} />;
      case CHART_TYPE.LINE:
        return <LineViz dataProp={data} display={display} />;
      default:
        break;
    }
  };

  return (
    <div className="min-w-full max-h-full rounded border-2 my-2">
      {displayVisual()}
    </div>
  );
};

export default DataViz;
