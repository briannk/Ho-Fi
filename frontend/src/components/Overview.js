import React, { useState, useEffect } from "react";
import { Select } from "semantic-ui-react";
import { useDataContext } from "../contexts/DataContext";
import keyToText from "../utilities/keyToText";
import getTotal from "../utilities/total";
import DateSelect from "./DateSelect";

const containerStyles = `container border-4
     rounded p-4 mx-1`;

const Overview = ({ of, dataProp, formattedData, handleData }) => {
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [sortOptions, setSortOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const generateOptions = (data = {}) => {
    console.log(Object.keys(data[0]));
    return Object.keys(data[0])
      .filter((key) => key !== "id")
      .map((key) => {
        return { key: key, text: keyToText(key), value: key };
      });
  };

  console.log(sortOptions);

  // const { dataPointsData } = useDataContext();

  const generateThemes = (_formattedData) => {
    _formattedData.forEach((data) => {
      data["color"] = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 0.6)`;
    });
    handleData("data", _formattedData);
  };

  const sortData = (
    e,
    { value } = {
      value: dataProp?.data?.[0].category ? "category" : "source",
    }
  ) => {
    handleData("sortBy", value);

    let _formattedData = {};

    dataProp.data.forEach((dataPoint) => {
      console.log(dataProp);
      let matchingDataPoints = [];
      const categoryLabel = dataPoint[value];
      if (_formattedData[categoryLabel]?.["items"]) {
        matchingDataPoints = _formattedData[categoryLabel]["items"];
      }

      let newValue = dataPoint.total;
      if (_formattedData[categoryLabel]) {
        newValue += _formattedData[categoryLabel].value;
      }

      matchingDataPoints.push(dataPoint);

      _formattedData[categoryLabel] = {
        id: dataPoint[value],
        items: matchingDataPoints,
        value: newValue,
      };
    });
    generateThemes(Object.values(_formattedData));
    console.log(_formattedData);
  };

  useEffect(() => {
    if (dataProp) {
      setSortOptions(generateOptions(dataProp.data));
      sortData();
      setIsLoading(false);
    }
  }, [dataProp]);

  return (
    <>
      {isLoading ? (
        <div>Loading... </div>
      ) : (
        <>
          <div className={`${containerStyles}`}>
            <h1 className="flex flex-col xl:flex-row gap-4 justify-around items-center">
              {of} <DateSelect of={of} dataProp={dataProp} />
            </h1>
            <div className="flex-wrap sm:flex justify-between items-end my-2 ">
              <span className="text-6xl font-bold text-green-300">
                ${getTotal(dataProp.data).toFixed(2)}
              </span>
              <div>
                <span className="mx-2">Sort by:</span>
                <Select
                  value={formattedData ? formattedData.sortBy : "category"}
                  options={sortOptions}
                  onChange={sortData}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Overview;
