import React, { useState, useEffect, useRef } from "react";
import { ResponsivePie } from "@nivo/pie";
import getTotal from "../utilities/total";
import DISPLAYS from "../constants/displays";
// import { curveFromProp } from "@nivo/core";
import ToolTipValues from "./ToolTipValues";

const PieViz = ({ dataProp = {} }) => {
  const [data, setData] = useState([]);
  const dataRef = useRef();

  const sumSmall = () => {
    let summedData = [];
    let other = {
      id: "Other",
      value: 0,
      color: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 0.6)`,
      items: [],
    };
    const total = dataProp.data
      .map((dataGroup) => getTotal(dataGroup.items))
      .reduce((p, c) => p + c);
    dataProp.data.forEach((dataGroup) => {
      if (dataGroup.value < total / 10) {
        other.value += dataGroup.value;
        other.items.push(...dataGroup.items);
      } else {
        summedData.push(dataGroup);
      }
    });
    if (other.value > 0) {
      summedData.push(other);
    }
    setData(summedData);
    dataRef.current = summedData;
  };

  // const ToolTipValues = ({ id }, dataProp) => {
  //   console.log(id);
  //   const group = data.find((point) => point.id === id);
  //   console.log(data, dataProp);
  //   return (
  //     <ul style={{ listStyle: "none", margin: 0 }}>
  //       {group &&
  //         group.items.map((point) => (
  //           <li>
  //             ${point.total.toFixed(2)}
  //             {group.id === "Other" && `(${point.vendor || point.source})`}
  //           </li>
  //         ))}
  //     </ul>
  //   );
  // };

  const ToolTip = ({ id, color }) => (
    <div
      style={{
        padding: 12,

        background: color,
      }}
    >
      <strong>
        {console.log(dataRef.current)}
        <ToolTipValues id={id} data={dataRef.current} />
      </strong>
    </div>
  );

  useEffect(() => {
    sumSmall();
  }, [dataProp]);

  return (
    <div
      className="h-96 border-4
     rounded p-4 mx-1"
    >
      <ResponsivePie
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        valueFormat=" >-$0.2f"
        data={data}
        colors={{ datum: "data.color" }}
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
        tooltip={({ datum: { id, color } }) => (
          <ToolTip id={id} color={color} />
        )}
      />
    </div>
  );
};

export default PieViz;
