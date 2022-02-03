import { ResponsiveLine } from "@nivo/line";
import React, { useState, useEffect } from "react";
import round from "../utilities/Round";
import { Radio, Label } from "semantic-ui-react";
import { useDataContext } from "../contexts/DataContext";
import { useAuthContext } from "../contexts/AuthContext";

const LineViz = ({ dataProp, selectValue }) => {
  const [formattedData, setFormattedData] = useState([]);
  const [summedData, setSummedData] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const { getToken } = useAuthContext();
  const { budget, colorThemes } = useDataContext();

  console.log(formattedData, summedData);

  const getMax = (data) => {
    let values = [];

    data.forEach(
      (group) => (values = [...values, ...group.data.map((data) => data.y)])
    );
    return Math.max(...values);
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
    return _data;
  };

  const toggleView = (e, { checked }) => {
    setIsChecked(checked);
  };

  useEffect(() => {
    async function getChartData() {
      try {
        console.log(selectValue);
        const token = await getToken();
        let resp = await fetch(
          `http://localhost:5001/ho-fi-598a7/us-central1/app/api/v1/${dataProp.of}/charts/line?selectValue=${selectValue}`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        const chartData = await resp.json();
        console.log(chartData.payload.lineData);
        setFormattedData(assignColors(chartData.payload.lineData.unsummedData));
        setSummedData(assignColors(chartData.payload.lineData.summedData));
      } catch (e) {
        console.log(e);
      }
    }
    getChartData();
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
