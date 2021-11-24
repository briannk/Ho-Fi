import React from "react";
import { ResponsivePie } from "@nivo/pie";

const PieViz = ({ dataProp = {} }) => {
  const formattedData = dataProp.data.map((item) => {
    return {
      id: item.vendor,
      value: item.total,
    };
  });
  return (
    <div className="h-96">
      <ResponsivePie
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        data={formattedData}
        animate={true}
        activeOuterRadiusOffset={8}
        innerRadius={0.6}
        padAngle={0.5}
        cornerRadius={5}
        arcLinkLabelsColor={{
          from: "color",
        }}
        arcLinkLabelsThickness={3}
        arcLinkLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 1.2]],
        }}
      />
    </div>
  );
};

export default PieViz;
