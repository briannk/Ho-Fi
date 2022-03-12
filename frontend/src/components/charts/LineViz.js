import { ResponsiveLine } from "@nivo/line";
import React, { useState, useEffect } from "react";
import { Radio, Label } from "semantic-ui-react";
import { useDataContext } from "../../contexts/DataContext";
import DEFAULT_THEMES from "../../constants/defaultThemes";
import isEmpty from "lodash.isempty";

const LineViz = ({ dataProp, selectValue }) => {
  const [formattedData, setFormattedData] = useState([]);
  const [summedData, setSummedData] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const { budget, colorThemes } = useDataContext();

  const getMax = (data) => {
    if (isEmpty(data)) return 0;
    let values = [];

    data.forEach(
      (group) => (values = [...values, ...group.data.map((data) => data.y)])
    );
    return Math.max(...values);
  };

  const round = (floatVal) => {
    return Number(floatVal.toFixed(2));
  };

  const formatData = (data) => {
    return data
      .map((dataGroup) => {
        let insertedPoints = {};
        if (isEmpty(dataGroup.items)) return null;
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
          data: dataPoints.sort((a, b) => a.x.localeCompare(b.x)),
          color:
            dataGroup.id.toLowerCase() === "total expenses"
              ? DEFAULT_THEMES["EXPENSES"]
              : dataGroup.id.toLowerCase() === "total income"
              ? DEFAULT_THEMES["INCOME"]
              : colorThemes[selectValue][dataGroup.id.toLowerCase()],
        };
      })
      .filter((nonNull) => nonNull);
  };

  const sumData = (data) => {
    return data.map((dataGroup) => {
      return {
        ...dataGroup,
        data: dataGroup.data.map((dataPoint, index) => {
          return {
            ...dataPoint,
            y: dataGroup.data.slice(0, index + 1).reduce((prev, curr) => {
              return prev + curr.y;
            }, 0),
          };
        }),
      };
    });
  };

  const toggleView = (e, { checked }) => {
    setIsChecked(checked);
  };

  useEffect(() => {
    if (!isEmpty(dataProp.data)) {
      const data = formatData(dataProp.data);
      if (isEmpty(data)) return;
      setFormattedData(data);
      setSummedData(sumData(data));
    }
  }, [dataProp, selectValue]);

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
          enableArea={true}
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
