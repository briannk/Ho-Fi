import React, { useState, useEffect, useRef } from "react";
import { ResponsivePie } from "@nivo/pie";
import getTotal from "../utilities/total";
import DISPLAYS from "../constants/displays";
import { patternDotsDef } from "@nivo/core";
import ToolTipValues from "./ToolTipValues";

import { useAuthContext } from "../contexts/AuthContext";
import { useDataContext } from "../contexts/DataContext";

const PieViz = ({ selectValue, data }) => {
  const [pieData, setPieData] = useState([]);
  const { getToken } = useAuthContext();

  const { colorThemes } = useDataContext();

  console.log(pieData);

  const mergeCommon = (_data) => {
    let chartData = {};
    _data.forEach((dataPoint) => {
      if (chartData[dataPoint.id]) {
        chartData[dataPoint.id].value += dataPoint.value;
      } else {
        chartData[dataPoint.id] = dataPoint;
      }
    });
    console.log(chartData);
    return Object.values(chartData);
  };

  const assignColors = (_data) => {
    _data.forEach((dataPoint) => {
      console.log(dataPoint);
      if (dataPoint.id === "Other") {
        // defs dont support hsl so need to use rgba
        dataPoint.color = `hsl(${Math.floor(Math.random() * 360)}, 91%, 71%)`;
      } else {
        dataPoint.color = colorThemes[selectValue][dataPoint.id];
      }
    });
    console.log(colorThemes[selectValue]);
    setPieData(_data);
  };

  useEffect(() => {
    async function getChartData() {
      try {
        console.log(selectValue);
        const token = await getToken();
        let resp = await fetch(
          `http://localhost:5001/ho-fi-598a7/us-central1/app/api/v1/${data.of}/charts/pie?selectValue=${selectValue}`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        const chartData = await resp.json();
        console.log(chartData.payload.pieData);
        const _data = mergeCommon(chartData.payload.pieData);
        assignColors(_data);
        console.log(_data);
      } catch (e) {
        console.log(e);
      }
    }

    getChartData();
  }, [selectValue, data]);

  return data ? (
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
        // defs={[
        //   // {
        //   //   id: "lines",
        //   //   type: "patternLines",
        //   //   // background: "inherit",
        //   //   color: "inherit",
        //   //   rotation: -45,
        //   //   lineWidth: 6,
        //   //   spacing: 10,
        //   // },
        //   patternDotsDef("dots", { color: "inherit" }),
        //   // patternLinesDef("lines", {
        //   //   color: "inherit",
        //   //   // background: "inherit",
        //   // }),
        // ]}
        // fill={[{ match: { id: "Other" }, id: "dots" }]}
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
        // tooltip={({ datum: { id, color } }) => (
        //   <ToolTip id={id} color={color} />
        // )}
      />
    </div>
  ) : (
    <>No data to display!</>
  );
};

export default PieViz;
