import React from "react";
import PieViz from "./PieViz";
import LineViz from "./LineViz";

// refactor each model into its own component to allow
// toggling categories and data processing catered to the
// category

const DataViz = ({ data = {}, chart = "pie" }) => {
  const containerStyles = `container`;

  const displayVisual = () => {
    switch (chart) {
      case "pie":
        return <PieViz dataProp={data} />;
      case "line":
        return <LineViz dataProp={data} />;
      default:
        console.log("switch default");
        break;
    }
  };

  console.log(data);
  return (
    <div className="min-w-full max-h-full rounded border-2 border-red">
      {displayVisual()}
    </div>
  );
};

export default DataViz;
