import { ResponsiveLine } from "@nivo/line";
import React, { useState, useEffect } from "react";
import round from "../utilities/Round";
import { Radio, Label } from "semantic-ui-react";
import { useDataContext } from "../contexts/DataContext";

const LineViz = ({ dataProp = {}, showArea = false }) => {
  const [formattedData, setFormattedData] = useState([]);
  const [summedData, setSummedData] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const { budget } = useDataContext();

  const getMax = (data) => {
    let values = [];

    data.forEach(
      (group) => (values = [...values, ...group.data.map((data) => data.y)])
    );
    return Math.max(...values);
  };

  // create format options between per day vs cummulative spending
  const formatData = (data) => {
    return data.map((dataGroup) => {
      let insertedPoints = {};

      dataGroup.items.forEach((dataPoint) => {
        let newTotal = dataPoint.total;
        if (insertedPoints[dataPoint.transactionDate || dataPoint.payDate]) {
          newTotal +=
            insertedPoints[dataPoint.transactionDate || dataPoint.payDate];
        }
        insertedPoints[dataPoint.transactionDate || dataPoint.payDate] =
          round(newTotal);
      });

      let dataPoints = [];

      for (const x in insertedPoints) {
        dataPoints.push({ x: x, y: insertedPoints[x] });
      }

      return {
        id: dataGroup.id,
        color:
          dataGroup.color ||
          `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
            Math.random() * 255
          )}, ${Math.floor(Math.random() * 255)}, 0.6)`,
        data: dataPoints.sort((a, b) => a.x.localeCompare(b.x)),
      };
    });
  };

  const sumData = (data) => {
    return data.map((dataGroup) => {
      return {
        ...dataGroup,
        data: dataGroup.data.map((dataPoint, index) => {
          return {
            ...dataPoint,
            y: dataGroup.data.slice(0, index + 1).reduce(
              (prev, curr) => {
                return prev + curr.y;
              },

              0
            ),
          };
        }),
      };
    });
  };

  const toggleView = (e, { checked }) => {
    setIsChecked(checked);
  };

  useEffect(() => {
    let data = formatData(dataProp.data);
    setFormattedData(data);
    let sum = sumData(data);
    setSummedData(sum);
  }, [dataProp]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Radio toggle label="Show up-to-date total" onChange={toggleView} />
        <Label>{isChecked ? "Cummulative" : "Per Day"}</Label>
      </div>
      <div className="h-128">
        <ResponsiveLine
          data={isChecked ? summedData : formattedData}
          colors={{ datum: "color" }}
          margin={{ top: 40, right: 110, bottom: 60, left: 60 }}
          markers={[
            {
              axis: "y",
              value:
                budget.limit > getMax(isChecked ? summedData : formattedData)
                  ? getMax(isChecked ? summedData : formattedData)
                  : budget.limit,
              lineStyle: { stroke: "#b0413e", strokeWidth: 1 },
              legend: `Target Limit: $${budget.limit}`,
              legendPosition: "top-right",
            },
          ]}
          xScale={{
            type: "time",
            format: "%Y-%m-%d",
            useUTC: false,
            precision: "day",
          }}
          xFormat="time:%Y-%m-%d"
          yScale={{
            type: "linear",
            min: 0,
            max: getMax(isChecked ? summedData : formattedData),
            stacked: false,
          }}
          yFormat=" >-$0.2f"
          axisLeft={{
            legend: "Amount spent in USD",
            legendOffset: -40,
          }}
          axisBottom={{
            format: "%b %d",
            tickValues: "every 7 days",
            legend: "time scale",
            legendOffset: 30,
          }}
          axisTop={null}
          axisRight={null}
          lineWidth={3}
          pointColor={{ theme: "background" }}
          pointBorderWidth={6}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          enableArea={showArea}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
};

export default LineViz;
