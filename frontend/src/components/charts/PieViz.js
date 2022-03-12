import React, { useState, useEffect, useRef } from "react";
import { ResponsivePie } from "@nivo/pie";
import { useDataContext } from "../../contexts/DataContext";

const PieViz = ({ dataProp, selectValue }) => {
  const [pieData, setPieData] = useState([]);

  const { colorThemes } = useDataContext();

  const mergeCommon = (_data) => {
    let mergedData = {};
    let chartData = {};
    _data.forEach((dataPoint) => {
      if (mergedData[dataPoint.id]) {
        mergedData[dataPoint.id].value += dataPoint.value;
      } else {
        mergedData[dataPoint.id] = dataPoint;
      }
    });

    let otherList = [];
    Object.values(mergedData).forEach((group) => {
      if (
        group.value < dataProp.total / 10 ||
        group.id.toLowerCase() === "other"
      ) {
        otherList.push(group);
        if (otherList.length > 1) {
          chartData["other"] = {
            id: "Other",
            items: otherList,
            value: group.value + (chartData["other"]?.value || 0),
            color: colorThemes[selectValue]["other"],
          };
          return;
        }
      } else {
        chartData[group.id] = group;
      }
    });
    let result = Object.values(chartData);
    if (!chartData["other"]) {
      result.push(...otherList);
    }
    return result;
  };

  useEffect(() => {
    const mergedData = mergeCommon(dataProp.data);
    setPieData(mergedData);
  }, [dataProp, selectValue]);

  return dataProp ? (
    <div
      className="h-96 border-4
     rounded p-4 mx-1"
    >
      <ResponsivePie
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        valueFormat=" >-$0.2f"
        data={pieData}
        colors={{ datum: "data.color" }}
        theme={{ fontSize: "0.8em" }}
        animate={true}
        activeOuterRadiusOffset={8}
        innerRadius={0.5}
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
  ) : (
    <>No data to display!</>
  );
};

export default PieViz;
